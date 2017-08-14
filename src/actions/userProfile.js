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

export function userProfileFetchData() {
  return (dispatch) => {
    dispatch(userProfileIsLoading(true));
    axios.get(`${api}/profile/`, { headers: { Authorization: fetchUserToken() } })
            .then((response) => {
              dispatch(userProfileIsLoading(false));
              return response.data;
            })
            .then(userProfile => dispatch(userProfileFetchDataSuccess(userProfile)))
            .catch(() => dispatch(userProfileHasErrored(true)));
  };
}
