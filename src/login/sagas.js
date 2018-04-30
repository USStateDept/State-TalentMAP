import { isObject, merge } from 'lodash';
import { take, call, put, cancelled, race } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import api from '../api';
import { unsetNotificationsCount } from '../actions/notifications';
import { userProfileFetchData, unsetUserProfile } from '../actions/userProfile';
import { setClient, unsetClient } from '../client/actions';
import isCurrentPath from '../Components/ProfileMenu/navigation';
import { propOrDefault, redirectToLogout, redirectToLogin } from '../utilities';
import { authError, authRequest, authSuccess } from './actions';

// Our login constants
import {
  LOGIN_REQUESTING,
  LOGOUT_REQUESTING,
  TOKEN_VALIDATION_REQUESTING,
} from './constants';

/**
 * Utilities
 */
export function getError(e) {
  // Supports error messages or error objects
  if (isObject(e)) {
    return merge({
      message: null,
    }, e);
  }
  return {
    message: (e || ''),
  };
}

export const auth = {
  get: () => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      return token;
    } catch (error) {
      // If token exists and is bad (maybe user injected)
      // Drop the token anyways just so we can have the container render login directly
      auth.reset();
      return false;
    }
  },

  set: (token) => {
    // set a stringified version of our token to localstorage
    localStorage.setItem('token', JSON.stringify(token));
  },

  reset: () => {
    // remove our local storage token
    localStorage.removeItem('token');
  },

  /**
   * Auth/Login Mode
   *   @Values 'saml'|'basic'
   *   @Default 'basic' (username/password)
   */
  mode: () => (process.env.LOGIN_MODE || 'basic'),
  isBasicAuth: () => (auth.mode() === 'basic'),
  isSAMLAuth: () => (auth.mode() === 'saml'),
};

/**
 * API Requests
 */
 // This creates short chainable axios object similar to Observables.map()
 // Mainly so we can do some data pre-processing first for sake of reusability
export const requests = {
  basic: ({ username, password }) => {
    if (!username || !password) {
      return Promise.reject(
        new Error('Fields cannot be blank'),
      );
    }

    return api.post('/accounts/token/', { username, password });
  },

  saml: (token) => {
    if (!token) {
      return Promise.reject(
        new Error('Token cannot be blank'),
      );
    }

    const headers = { Authorization: `Token ${token}` };
    // This is to have one uniform api response from basic and saml api calls
    // So this is to transform the request before the caller gets it
    return api.get('/profile/', { headers });
  },
};

function loginRequest(credentials) {
  const request = requests[auth.isSAMLAuth() ? 'saml' : 'basic'](credentials);
  return request
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

/**
 * Sagas
 */
function* logout() {
  // dispatches the CLIENT_UNSET action
  yield put(unsetClient());
  // unset the user profile
  yield put(unsetUserProfile());
  // unset notifications count
  yield put(unsetNotificationsCount());

  // remove our token
  auth.reset();

  // .. inform redux that our logout was successful
  yield put(authSuccess(false));

  redirectToLogout();

  // Check if the user is already on the login page. We don't want a race
  // condition to infinitely loop them back to the login page, should
  // any requests be made that result in 401
  const isOnLoginPage = isCurrentPath(window.location.pathname, '/login');

  // redirect to the /login screen
  if (!isOnLoginPage) {
    yield put(push('/login'));
  }
}

export function* login(credentials = {}) {
  const isSAML = auth.isSAMLAuth();
  let token = null;

  // if credentials is null, don't attempt login, to prevent a loop
  if (credentials) {
    // Determine between basic and saml auth
    if (isSAML) {
      // set token
      token = credentials;
    } else {
      // create auth object
      const authCredentials = { username: credentials.username, password: credentials.password };
      yield put(authRequest(true, authCredentials));

      // try to call to our loginApi() function. Redux Saga will pause
      // here until we either are successful or receive an error
      const { response, error } = yield call(loginRequest, authCredentials);

      if (response) {
        token = response.data.token;
      } else {
        yield put(authError(true, propOrDefault(error, 'message', 'An issue during login has occured')));
      }
    }

    // We have a token, proceed to log user in
    if (token !== null) {
      // set token
      auth.set(token);

      // inform Redux to set our client token
      yield put(setClient(token));
      // get the user's profile data
      yield put(userProfileFetchData());
      // also inform redux that our login was successful
      yield put(authSuccess());

      // redirect them to home
      yield put(push('/'));
    } else {
      yield put(authError(true, 'An issue during login has occured'));
    }

    if (yield cancelled()) {
      redirectToLogin();
    }

    // return the token for health and wealth
    return token;
  }
  // if credentials is null, logout
  logout();
  return null;
}

// Our watcher (saga).  It will watch for many things.
function* loginWatcher() {
  const evaluate = true;
  // Check if user entered already logged in or not
  while (evaluate) {
    const isSAML = (process.env.LOGIN_MODE === 'saml');
    const races = {
      loggingIn: take(isSAML ? TOKEN_VALIDATION_REQUESTING : LOGIN_REQUESTING),
      loggingOut: take(LOGOUT_REQUESTING),
    };

    const { loggingIn } = yield race(races);

    if (loggingIn) {
      if (isSAML) {
        yield call(login, loggingIn.token);
      } else {
        const credentials = {
          username: loggingIn.username,
          password: loggingIn.password,
        };

        yield call(login, credentials);
      }
    } else {
      // log out
      yield call(logout);
    }
  }
}

export default loginWatcher;
