import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_REQUESTING,
  LOGOUT_SUCCESS,
  TOKEN_VALIDATION_REQUESTING,
} from './constants';

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
  loggedIn: false,
};

const reducer = function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUESTING:
    case TOKEN_VALIDATION_REQUESTING:
      return {
        requesting: true,
        successful: false,
        messages: [{ body: 'Logging in...', time: new Date() }],
        errors: [],
        loggedIn: false,
      };

    case LOGIN_SUCCESS:
      return {
        errors: [],
        messages: [],
        requesting: false,
        successful: true,
        loggedIn: true,
      };

    case LOGOUT_REQUESTING:
      return {
        requesting: true,
        successful: false,
        messages: [{ body: 'Logging out...', time: new Date() }],
        errors: [],
        loggedIn: true,
      };

    case LOGOUT_SUCCESS:
      return {
        errors: [],
        messages: [],
        requesting: false,
        successful: true,
        loggedIn: false,
      };

    case LOGIN_ERROR:
      return {
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
        messages: [],
        requesting: false,
        successful: false,
        loggedIn: false,
      };

    default:
      return state;
  }
};

export default reducer;
