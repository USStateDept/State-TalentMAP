import {
  LOGIN_REQUESTING,
  LOGOUT_REQUESTING,
} from './constants';

export const loginRequest = function loginRequest({ username, password }) {
  return {
    type: LOGIN_REQUESTING,
    username,
    password,
  };
};

export const logoutRequest = function logoutRequest() {
  return {
    type: LOGOUT_REQUESTING,
  };
};
