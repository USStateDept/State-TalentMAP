import axios from 'axios';
import { fetchUserToken } from '../utilities';
import api from '../api';
import { favoritePositionsFetchData } from './favoritePositions';

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
export function userProfileFavoritePositionIsLoading(bool) {
  return {
    type: 'USER_PROFILE_FAVORITE_POSITION_IS_LOADING',
    userProfileFavoritePositionIsLoading: bool,
  };
}
// when adding or removing a favorite has errored
export function userProfileFavoritePositionHasErrored(bool) {
  return {
    type: 'USER_PROFILE_FAVORITE_POSITION_HAS_ERRORED',
    userProfileFavoritePositionHasErrored: bool,
  };
}

// include an optional bypass for when we want to silently update the profile
export function userProfileFetchData(bypass) {
  return (dispatch) => {
    if (!bypass) {
      dispatch(userProfileIsLoading(true));
      dispatch(userProfileHasErrored(false));
    }
    axios.get(`${api}/profile/`, { headers: { Authorization: fetchUserToken() } })
            .then((response) => {
              dispatch(userProfileIsLoading(false));
              dispatch(userProfileHasErrored(false));
              dispatch(userProfileFavoritePositionHasErrored(false));
              dispatch(userProfileFavoritePositionIsLoading(false));
              return response.data;
            })
            .then(userProfile => dispatch(userProfileFetchDataSuccess(userProfile)))
            .catch(() => dispatch(userProfileHasErrored(true)));
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
export function userProfileToggleFavoritePosition(id, remove, refreshFavorites) {
  const idString = id.toString();
  return (dispatch) => {
    dispatch(userProfileFavoritePositionIsLoading(true));
    dispatch(userProfileFavoritePositionHasErrored(false));
    let action = 'put';
    if (remove) {
      action = 'delete';
    }
    const auth = { headers: { Authorization: fetchUserToken() } };
    // now we can patch our profile with the new favorites
    // axios is a little weird here in that for PUTs, it expect a body as the second argument,
    // whereas for DELETEs, it expects the headers object...
    // so we have to conditionally decide what position to put the headers object in
    axios[action](`${api}/position/${idString}/favorite/`, action === 'delete' ? auth : {}, action === 'put' ? auth : null)
            .then(() => {
              dispatch(userProfileFetchData(true));
              dispatch(userProfileFavoritePositionIsLoading(false));
              dispatch(userProfileFavoritePositionHasErrored(false));
              if (refreshFavorites) {
                dispatch(favoritePositionsFetchData());
              }
            })
            .catch(() => {
              dispatch(userProfileFavoritePositionHasErrored(true));
              dispatch(userProfileFavoritePositionIsLoading(false));
            });
  };
}
