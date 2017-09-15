import axios from 'axios';
import { fetchUserToken } from '../utilities';
import api from '../api';

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
export function userProfileToggleFavoritePosition(id, remove) {
  const idString = id.toString();
  return (dispatch) => {
    dispatch(userProfileFavoritePositionIsLoading(true));
    dispatch(userProfileFavoritePositionHasErrored(false));
    axios.get(`${api}/profile/`, { headers: { Authorization: fetchUserToken() } })
            .then(response => response.data)
            .then((userProfile) => {
              // the user's refreshed favorites
              let favorites = userProfile.favorite_positions;
              favorites = favorites.map(f => f.id.toString());
              // the index of the position in question
              const indexOfFavorite = favorites.indexOf(idString);
              // did we explicitly called to remove this position?
              if (remove) {
                // and does the id actually exist in the array? if so, remove it
                if (indexOfFavorite > -1) {
                  favorites.splice(indexOfFavorite, 1);
                }
              } else if (!remove) { // did we call to add the position?
                // and was it not already present in the array? if so, add it
                if (indexOfFavorite <= -1) {
                  favorites.push(idString);
                }
              }
              // make sure we have a clean object with no other params
              const favoritesObject = Object.assign({}, { favorite_positions: favorites });
              // now we can patch our profile with the new favorites
              axios.patch(`${api}/profile/`, favoritesObject, { headers: { Authorization: fetchUserToken() } })
                      .then(() => {
                        dispatch(userProfileFetchData(true));
                      })
                      .catch(() => {
                        dispatch(userProfileFavoritePositionHasErrored(true));
                        dispatch(userProfileFavoritePositionIsLoading(false));
                      });
            })
            .catch(() => {
              dispatch(userProfileFavoritePositionHasErrored(true));
              dispatch(userProfileFavoritePositionIsLoading(false));
            });
  };
}
