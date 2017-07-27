import {
  LOGIN_REQUESTING,
  LOGOUT_REQUESTING,
} from './constants';

export const loginRequest = function loginRequest({ email, password }) {
  return {
    type: LOGIN_REQUESTING,
    email,
    password,
  };
};

export const logoutRequest = function logoutRequest() {
  return {
    type: LOGOUT_REQUESTING,
  };
};
