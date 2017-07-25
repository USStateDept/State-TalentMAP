import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_REQUESTING,
  LOGOUT_SUCCESS,
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
    // Set the requesting flag and append a message to be shown
    case LOGIN_REQUESTING:
      return {
        requesting: true,
        successful: false,
        messages: [{ body: 'Logging in...', time: new Date() }],
        errors: [],
        loggedIn: false,
      };

    // Successful?  Reset the login state.
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

      // Successful?  Reset the login state.
    case LOGOUT_SUCCESS:
      return {
        errors: [],
        messages: [],
        requesting: false,
        successful: true,
        loggedIn: false,
      };

    // Append the error returned from our api
    // set the success and requesting flags to false
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
