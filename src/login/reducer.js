import { merge } from 'lodash';
import { propOrDefault } from '../utilities';

import {
  LOGIN_ERROR,
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGOUT_REQUESTING,
  LOGOUT_SUCCESS,
  TOKEN_VALIDATION_REQUESTING,
} from './constants';

export const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
  loggedIn: false,
};

const reducer = function loginReducer(state = initialState, action) {
  const state$ = merge({}, initialState);

  switch (action.type) {
    case TOKEN_VALIDATION_REQUESTING:
    case LOGIN_REQUESTING:
      state$.requesting = true;
      state$.messages = [{ body: 'Logging in...', time: new Date() }];
      break;

    case LOGIN_SUCCESS:
      state$.successful = true;
      state$.loggedIn = true;
      break;

    case LOGOUT_REQUESTING:
      state$.requesting = true;
      state$.messages = [{ body: 'Logging in...', time: new Date() }];
      state$.loggedIn = true;
      break;

    case LOGOUT_SUCCESS:
      state$.successful = true;
      break;

    case LOGIN_ERROR:
      state$.errors = state.errors.concat([{
        body: propOrDefault(action, 'error', '').toString(),
        time: new Date(),
      }]);

      break;

    default:
      break;
  }

  return state$;
};

export default reducer;
