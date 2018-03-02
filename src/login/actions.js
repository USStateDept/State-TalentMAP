import {
  LOGOUT_REQUESTING,
  TOKEN_VALIDATION_REQUESTING,
} from './constants';

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
