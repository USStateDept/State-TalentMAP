import {
  LOGIN_REQUESTING,
  LOGOUT_REQUESTING,
  TOKEN_VALIDATION_REQUESTING,
} from './constants';

export const loginRequest = function loginRequest({ username, password }) {
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
