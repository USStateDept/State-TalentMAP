import {
  LOGIN_REQUESTING,
  LOGOUT_REQUESTING,
} from './constants';

// In order to perform an action of type LOGIN_REQUESTING
// we need an email and password
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
