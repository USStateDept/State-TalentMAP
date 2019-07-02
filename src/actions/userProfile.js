import axios from 'axios';
import { get, indexOf } from 'lodash';
import Q from 'q';

import api from '../api';
import { favoritePositionsFetchData } from './favoritePositions';
import { toastSuccess, toastError } from './toast';
import * as SystemMessages from '../Constants/SystemMessages';
import { checkFlag } from '../flags';

const getUsePV = () => checkFlag('flags.projected_vacancy');

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
  const usePV = getUsePV();
  return (dispatch) => {
    if (!bypass) {
      dispatch(userProfileHasErrored(false));
    }

    /**
     * create functions to fetch user's profile and permissions
     */
    // profile
    const getUserAccount = () => api().get('/profile/');
    // permissions
    const getUserPermissions = () => api().get('/permission/user/');
    // PV favorites
    const getPVFavorites = () => api().get('/projected_vacancy/favorites/');

    const promises = [getUserAccount(), getUserPermissions()];

    if (usePV) {
      promises.push(getPVFavorites());
    }

    // use api' Promise.all to fetch the profile and permissions, and then combine them
    // into one object
    Q.allSettled(promises)
      .then((results) => {
        // form the userProfile object
        const account = get(results, '[0].value.data', {});
        const permissions = get(results, '[1].value.data', {});
        const pvFavorites = get(results[2], 'value.data.results', []).map(m => ({ id: m.id }));
        const newProfileObject = {
          ...account,
          is_superuser: indexOf(permissions.groups, 'superuser') > -1,
          permission_groups: permissions.groups,
          favorite_positions_pv: pvFavorites,
        };

        // then perform dispatches
        if (cb) {
          dispatch(cb());
        }
        dispatch(userProfileFetchDataSuccess(newProfileObject));
        dispatch(userProfileIsLoading(false));
        dispatch(userProfileHasErrored(false));
        dispatch(userProfileFavoritePositionHasErrored(false));
      })
      .catch(() => {
        if (cb) {
          dispatch(cb());
        }
        dispatch(userProfileHasErrored(true));
        dispatch(userProfileIsLoading(false));
      });
  };
}

// Toggling a favorite position:
// We want to be explicit by having a "remove" param,
// so that the visual indicator for the user's action always aligns
// what we're actually doing.
// We also want to refresh their favorites, in case they made changes on another page.
// Since we have to pass the entire array to the API, we want to make sure it's accurate.
// If we need a full refresh of Favorite Positions, such as for the profile's favorite sub-section,
// we can pass a third arg, refreshFavorites.
export function userProfileToggleFavoritePosition(id, remove, refreshFavorites = false,
  isPV = false) {
  const idString = id.toString();
  return (dispatch) => {
    const config = {
      method: remove ? 'delete' : 'put',
      url: isPV ? `/projected_vacancy/${idString}/favorite/` : `/position/${idString}/favorite/`,
    };

    /**
     * create functions for creating the action and fetching position data to supply to message
     */
    // action
    const getAction = () => api()(config);

    // position
    const getPosition = () => api().get(isPV ? `/fsbid/projected_vacancies/position_number__in=${id}/` : `/position/${id}/`);

    dispatch(userProfileFavoritePositionIsLoading(true, id));
    dispatch(userProfileFavoritePositionHasErrored(false));

    axios.all([getAction(), getPosition()])
      .then(axios.spread((action, position) => {
        const pos = isPV ? get(position, 'data.results[0]', {}) : position.data;
        const message = remove ?
          SystemMessages.DELETE_FAVORITE_SUCCESS(pos) : SystemMessages.ADD_FAVORITE_SUCCESS(pos);
        const title = remove ? SystemMessages.DELETE_FAVORITE_TITLE
          : SystemMessages.ADD_FAVORITE_TITLE;
        const cb = () => userProfileFavoritePositionIsLoading(false, id);
        dispatch(userProfileFetchData(true, cb));
        dispatch(userProfileFavoritePositionHasErrored(false));
        dispatch(toastSuccess(message, title));
        if (refreshFavorites) {
          dispatch(favoritePositionsFetchData());
        }
      }))
      .catch(() => {
        const message = remove ?
          SystemMessages.DELETE_FAVORITE_ERROR() : SystemMessages.ADD_FAVORITE_ERROR();
        const title = SystemMessages.ERROR_FAVORITE_TITLE;
        dispatch(userProfileFavoritePositionIsLoading(false, id));
        dispatch(userProfileFavoritePositionHasErrored(true));
        dispatch(toastError(message, title));
      });
  };
}
