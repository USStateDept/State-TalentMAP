import { merge } from 'lodash';

import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
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
  let state$;

  switch (action.type) {
    case TOKEN_VALIDATION_REQUESTING:
    case LOGIN_REQUESTING:
      state$ = {
        requesting: true,
        messages: [{ body: 'Logging in...', time: new Date() }],
      };

      break;

    case LOGIN_SUCCESS:
      state$ = {
        successful: true,
        loggedIn: true,
      };

      break;

    case LOGOUT_REQUESTING:
      state$ = {
        requesting: true,
        messages: [{ body: 'Logging out...', time: new Date() }],
        loggedIn: true,
      };

      break;

    case LOGOUT_SUCCESS:
      state$ = {
        successful: true,
      };

      break;

    case LOGIN_ERROR:
      state$ = {
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
      };

      break;

    default:
      break;
  }

  return merge({}, initialState, state$, state);
};

export default reducer;
