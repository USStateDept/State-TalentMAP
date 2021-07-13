import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_REQUESTING,
  LOGOUT_SUCCESS,
  TOKEN_VALIDATION_REQUESTING,
} from './constants';

export const logoutRequest = () => ({
  type: LOGOUT_REQUESTING,
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
