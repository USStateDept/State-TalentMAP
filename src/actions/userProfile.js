import { batch } from 'react-redux';
import axios from 'axios';
import { get, indexOf, omit } from 'lodash';
import Q from 'q';
import imagediff from 'imagediff';
import Bowser from 'bowser';
import { loadImg } from 'utilities';
import api, { INTERCEPTORS } from '../api';
import { favoritePositionsFetchData } from './favoritePositions';
import { toastError, toastSuccess } from './toast';
import * as SystemMessages from '../Constants/SystemMessages';

export function userProfileHasErrored(bool) {
  return {
    type: 'USER_PROFILE_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function userProfileIsLoading(bool) {
  return {
    type: 'USER_PROFILE_IS_LOADING',
    isLoading: bool,
  };
}

export function userProfileFetchDataSuccess(userProfile) {
  return {
    type: 'USER_PROFILE_FETCH_DATA_SUCCESS',
    userProfile,
  };
}

// when adding or removing a favorite
export function userProfileFavoritePositionIsLoading(bool, id) {
  return {
    type: 'USER_PROFILE_FAVORITE_POSITION_IS_LOADING',
    userProfileFavoritePositionIsLoading: { bool, id },
  };
}

// when adding or removing a favorite has errored
export function userProfileFavoritePositionHasErrored(bool) {
  return {
    type: 'USER_PROFILE_FAVORITE_POSITION_HAS_ERRORED',
    userProfileFavoritePositionHasErrored: bool,
  };
}

export function unsetUserProfile() {
  return (dispatch) => {
    dispatch(userProfileFetchDataSuccess({}));
  };
}

// include an optional bypass for when we want to silently update the profile
export function userProfileFetchData(bypass, cb) {
  return (dispatch) => {
    if (!bypass) {
      batch(() => {
        dispatch(userProfileIsLoading(true));
        dispatch(userProfileHasErrored(false));
      });
    }

    /**
     * create functions to fetch user's profile and permissions
     */
      // profile
    const getUserAccount = () => api().get('/profile/', { headers: { [INTERCEPTORS.PUT_PERDET.value]: true } });
    // permissions
    const getUserPermissions = () => api().get('/permission/user/', { headers: { [INTERCEPTORS.PUT_PERDET.value]: true } });
    // AP favorites
    const getAPFavorites = () => api().get('/available_position/favorites/ids/');
    const getAPTandemFavorites = () => api().get('/available_position/tandem/favorites/ids/');

    // PV favorites
    const getPVFavorites = () => api().get('/projected_vacancy/favorites/ids/');
    const getPVTandemFavorites = () => api().get('/projected_vacancy/tandem/favorites/ids/');

    const getBureauPermissions = () => api().get('/fsbid/employee/bureau_permissions/');
    const getOrgPermissions = () => api().get('/fsbid/employee/org_permissions/');

    const promises = [getUserPermissions(), getAPFavorites(), getPVFavorites(),
      getAPTandemFavorites(), getPVTandemFavorites(), getBureauPermissions(), getOrgPermissions()];

    if (!bypass) {
      promises.push(getUserAccount());
    }

    // use api' Promise.all to fetch the profile and permissions, and then combine them
    // into one object
    Q.allSettled(promises)
      .then((results) => {
        // form the userProfile object
        const permissions = get(results, '[0].value.data', {});
        const apFavorites = get(results, '[1].value.data', []).map(id => ({ id }));
        const pvFavorites = get(results, '[2].value.data', []).map(id => ({ id }));
        const apTandemFavorites = get(results, '[3].value.data', []).map(id => ({ id }));
        const pvTandemFavorites = get(results, '[4].value.data', []).map(id => ({ id }));
        const bureauPermissions = get(results, '[5].value.data', []);
        const orgPermissions = get(results, '[6].value.data', []);
        const account = get(results, '[7].value.data', {});

        let newProfileObject = {
          is_superuser: indexOf(permissions.groups, 'superuser') > -1,
          permission_groups: permissions.groups,
          permissions: permissions.permissions,
          favorite_positions_pv: pvFavorites,
          favorite_positions: apFavorites,
          favorite_tandem_positions_pv: pvTandemFavorites,
          favorite_tandem_positions: apTandemFavorites,
          cdo: account.cdo_info, // don't use deprecated CDO API model
          bureau_permissions: bureauPermissions,
          org_permissions: orgPermissions,
        };

        if (!bypass) {
          newProfileObject = {
            ...account,
            ...newProfileObject,
          };
        }

        // function to success perform dispatches
        const dispatchSuccess = () => {
          if (cb) {
            dispatch(cb());
          }
          batch(() => {
            dispatch(userProfileFetchDataSuccess(newProfileObject));
            dispatch(userProfileIsLoading(false));
            dispatch(userProfileHasErrored(false));
            dispatch(userProfileFavoritePositionHasErrored(false));
          });
        };

        function unsetAvatar() { newProfileObject.avatar = {}; }

        // Compare the images in the compare array. One of the URLs
        // is a link to a default profile picture. If the user's
        // profile picture (the other URL in the array)
        // is the same as the default, then return an empty object so that
        // it doesn't get displayed.
        const compare = get(newProfileObject, 'avatar.compare', []);

        if (bypass) { // use existing avatar and let reducer use it
          newProfileObject = omit(newProfileObject, ['avatar']);
          dispatchSuccess();
        } else if (compare.length) {
          const proms = compare.map(path => (
            new Promise((resolve, reject) => {
              loadImg(path, (img) => {
                if (get(img, 'path[0]')) {
                  resolve(img.path[0]);
                } else {
                  reject();
                }
              });
            })
          ));

          Promise.all(proms)
            .then((res) => {
              const equal$ = imagediff.equal(res[0], res[1]);
              if (equal$) {
                unsetAvatar();
              }
              dispatchSuccess();
            })
            .catch(() => {
              unsetAvatar();
              dispatchSuccess();
            });
        }
      })
      .catch(() => {
        if (cb) {
          dispatch(cb());
        }
        batch(() => {
          dispatch(userProfileHasErrored(true));
          dispatch(userProfileIsLoading(false));
        });
      });
  };
}

// Toggling a favorite position:
// We want to be explicit by having a 'remove' param,
// so that the visual indicator for the user's action always aligns
// what we're actually doing.
// We also want to refresh their favorites, in case they made changes on another page.
// Since we have to pass the entire array to the API, we want to make sure it's accurate.
// If we need a full refresh of Favorite Positions, such as for the profile's favorite sub-section,
// we can pass a third arg, refreshFavorites.
export function userProfileToggleFavoritePosition(id, remove, refreshFavorites = false,
                                                  isPV = false, sortType, isTandem = false) {
  const idString = id.toString();
  return (dispatch) => {
    const apiURL =
      `/${isPV ? 'projected_vacancy' : 'available_position'}/${isTandem ? 'tandem/' : ''}${idString}/favorite/`;
    const config = {
      method: remove ? 'delete' : 'put',
      url: apiURL,
    };

    /**
     * create functions for creating the action and fetching position data to supply to message
     */
      // action
    const getAction = () => api()(config);

    // position
    const posURL = `/fsbid/${isPV ? 'projected_vacancies' : 'available_positions'}/${id}/`;
    const getPosition = () => api().get(posURL);

    batch(() => {
      dispatch(userProfileFavoritePositionIsLoading(true, id));
      dispatch(userProfileFavoritePositionHasErrored(false));
    });

    axios.all([getAction(), getPosition()])
      .then(axios.spread((action, position) => {
        const pos = position.data;
        // The undo action. Take the props that were already passed in,
        // except declare the second argument (remove) to the opposite of what was
        // originally provided.
        const undo = () => dispatch(userProfileToggleFavoritePosition(
          id, !remove, refreshFavorites, isPV, sortType, isTandem,
        ));
        const message = remove ?
          SystemMessages.DELETE_FAVORITE_SUCCESS(pos.position, undo) :
          SystemMessages.ADD_FAVORITE_SUCCESS(pos.position);
        const title = remove ? SystemMessages.DELETE_FAVORITE_TITLE
          : SystemMessages.ADD_FAVORITE_TITLE;
        const cb = () => userProfileFavoritePositionIsLoading(false, id);
        batch(() => {
          dispatch(userProfileFetchData(true, cb));
          dispatch(userProfileFavoritePositionHasErrored(false));
        });
        dispatch(toastSuccess(message, title));
        if (refreshFavorites) {
          let openPV = '';
          if (isPV && isTandem) {
            openPV = 'pvTandem';
          } else if (isPV) {
            openPV = 'pv';
          } else if (isTandem) {
            openPV = 'openTandem';
          } else {
            openPV = 'open';
          }
          dispatch(favoritePositionsFetchData(sortType, undefined, undefined, openPV));
        }
      }))
      .catch(({ response }) => {
        const limit = get(response, 'data.limit', false);
        let message = '';
        if (remove) {
          message = SystemMessages.DELETE_FAVORITE_ERROR();
        } else if (response.status === 507 && isPV && limit) {
          message = SystemMessages.ADD_FAVORITE_LIMIT_ERROR_PV(limit);
        } else if (response.status === 507 && limit) {
          message = SystemMessages.ADD_FAVORITE_LIMIT_ERROR_AP(limit);
        } else {
          message = SystemMessages.ADD_FAVORITE_ERROR();
        }
        const title = SystemMessages.ERROR_FAVORITE_TITLE;
        batch(() => {
          dispatch(userProfileFavoritePositionIsLoading(false, id));
          dispatch(userProfileFavoritePositionHasErrored(true));
          dispatch(toastError(message, title));
        });
      });
  };
}

// The use of this endpoint has no implications on the user experience of the site,
// so we don't use our typical dispatch/loading/error/success state management paradigm.
export function trackLogin() {
  const details = Bowser.parse(get(window, 'navigator.userAgent')) || {};
  api().post('/stats/login/', { details });
}

export function updateSavedSearches() {
  api().put('/searches/listcount/');
}

// IMPORTANT: return the function instead of calling it, since this is used in the interceptor
export function setUserEmpId() {
  return api().put('/fsbid/employee/perdet_seq_num/');
}
