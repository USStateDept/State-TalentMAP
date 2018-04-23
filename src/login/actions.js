import {
  LOGIN_REQUESTING,
  LOGOUT_REQUESTING,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_ERROR,
  TOKEN_VALIDATION_REQUESTING,
} from './constants';

export const authRequest = (isLogin = true, credentials = { username: null, password: null }) => ({
  type: isLogin ? LOGIN_REQUESTING : LOGOUT_REQUESTING,
  username: credentials.username,
  password: credentials.password,
});

export const authSuccess = (isLogin = true) => ({
  type: isLogin ? LOGIN_SUCCESS : LOGOUT_SUCCESS,
});

export const authError = (isLogin = true, message = null) => ({
  type: isLogin ? LOGIN_ERROR : LOGOUT_ERROR,
  message,
});

export const tokenValidationRequest = function tokenValidationRequest(token) {
  return {
    type: TOKEN_VALIDATION_REQUESTING,
    token,
  };
};
