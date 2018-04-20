import api from '../api';
import { changeErrorMessage, tokenFlow } from './sagas';
import { setClient } from '../client/actions';
import { userProfileFetchData } from '../actions/userProfile';
import {
  LOGIN_SUCCESS,
  LOGIN_REQUESTING,
  LOGOUT_REQUESTING,
  TOKEN_VALIDATION_REQUESTING,
} from './constants';

export const loginRequest = function loginRequest(username, password) {
  return {
    type: LOGIN_REQUESTING,
    username,
    password,
  };
};

export const tokenValidationRequest = function tokenValidationRequest(token) {
  return {
    type: TOKEN_VALIDATION_REQUESTING,
    token,
  };
};

export const logoutRequest = function logoutRequest() {
  return {
    type: LOGOUT_REQUESTING,
  };
};

/* Development Login */
export const login = (username, password) => (dispatch) => {
  if (!username || !password) {
    return changeErrorMessage('Fields cannot be blank');
  }

  dispatch(loginRequest(username, password));
  return api.post('/accounts/token/', { username, password })
    .then((response) => {
      const token = response.data.token;

      dispatch(tokenFlow(token));
      setClient(token);

      // also inform redux that our login was successful
      dispatch(() => ({ type: LOGIN_SUCCESS }));

      // set a stringified version of our token to localstorage on our domain
      localStorage.setItem('token', JSON.stringify(token));

      // get the user's profile data
      dispatch(userProfileFetchData());

      // redirect them to home
      // yield put(push('/'));
    })
    .catch((error) => { changeErrorMessage(error.message); });
};
