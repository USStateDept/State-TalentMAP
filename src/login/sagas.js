import { isObject, merge } from 'lodash';
import { call, cancelled, put, race, take } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import api from '../api';
import { unsetNotificationsCount } from '../actions/notifications';
import { trackLogin, unsetUserProfile, updateSavedSearches, userProfileFetchData } from '../actions/userProfile';
import { setClient, unsetClient } from '../client/actions';
import isCurrentPath from '../Components/ProfileMenu/navigation';
import { redirectToLogin, redirectToLogout } from '../utilities';
import { authError, authSuccess } from './actions';

// Our login constants
import {
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

// Track whether we've made a request in this session to the login tracking endpoint.
let loginHasBeenTracked = false;

export const auth = {
  get: () => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));

      // Track login. Don't attempt without a token, or endless redirect will occur.
      if (!loginHasBeenTracked && token) {
        trackLogin();
        updateSavedSearches();
        loginHasBeenTracked = true;
      }

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
};

/**
 * API Requests
 */
// This creates short chainable axios object similar to Observables.map()
// Mainly so we can do some data pre-processing first for sake of reusability
export const requests = {
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

export function* login(token = {}) {
  // if credentials is null, don't attempt login, to prevent a loop
  if (token === null) {
    yield put(authError(true, 'An issue during login has occured'));
  } else {
    // We have a token, proceed to log user in
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

function getLoginCredentials(loggingIn) {
  return loggingIn.token;
}

// Our watcher (saga).  It will watch for many things.
function* loginWatcher() {
  const evaluate = true;
  // Check if user entered already logged in or not
  // eslint-disable-next-line no-loops/no-loops
  while (evaluate) {
    const races = {
      loggingIn: take(TOKEN_VALIDATION_REQUESTING),
      loggingOut: take(LOGOUT_REQUESTING),
    };

    const { loggingIn } = yield race(races);

    if (loggingIn) {
      yield call(login, getLoginCredentials(loggingIn));
    } else {
      // log out
      yield call(logout);
    }
  }
}

export default loginWatcher;
