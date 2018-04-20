import { isObject } from 'lodash';
import { take, call, put, cancelled, race } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import api from '../api';
import { unsetNotificationsCount } from '../actions/notifications';
import { userProfileFetchData, unsetUserProfile } from '../actions/userProfile';
import { setClient, unsetClient } from '../client/actions';
import isCurrentPath from '../Components/ProfileMenu/navigation';
import { redirectToLogout, redirectToLogin } from '../utilities';
import { authError, authRequest, authSuccess } from './actions';

// Our login constants
import {
  LOGIN_REQUESTING,
  LOGOUT_REQUESTING,
  TOKEN_VALIDATION_REQUESTING,
} from './constants';

export const errorMessage = { message: null };

export function changeErrorMessage(e) {
  errorMessage.message = e;
}

export function tokenApi(token) {
  if (!token) {
    return changeErrorMessage('Token cannot be blank');
  }
  return api.get('/profile/', { headers: { Authorization: `Token ${token}` } })
    .then(response => response.data)
    .catch(error => changeErrorMessage(error.message));
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

  // set login method, default to username + password
  mode: () => (process.env.LOGIN_MODE || 'basic'),

  isBasicAuth: () => (auth.mode() === 'basic'),
  isSAMLAuth: () => (auth.mode() !== 'basic'),
};

function loginRequest(username, password) {
  if (!username || !password) {
    return changeErrorMessage('Fields cannot be blank');
  }

  put(authRequest(true, username, password));

  return api.post('/accounts/token/', { username, password })
    .then((response) => {
      const token = response.data.token;

      if (token) {
        // inform Redux to set our client token
        put(setClient(token));
        // also inform redux that our login was successful
        put(authSuccess());
        // get the user's profile data
        put(userProfileFetchData());
      }

      put(authError(true, 'API response error'));

      return token;
    })
    .catch((error) => {
      put(authError(true, error.message));
      return error;
    });
}

function* logoutRequest() {
  // dispatches the CLIENT_UNSET action
  yield put(unsetClient());
  // unset the user profile
  yield put(unsetUserProfile());
  // unset notifications count
  yield put(unsetNotificationsCount());
  // .. inform redux that our logout was successful
  yield put(authSuccess(false));
}

export function* login(credentials = {}) {
  let token = credentials;

  // Determine between basic and saml auth
  if (isObject(token)) {
    // try to call to our loginApi() function.  Redux Saga
    // will pause here until we either are successful or
    // receive an error
    token = yield call(loginRequest, token.username, token.password);
  }

  if (token) {
    auth.set(token);
    // redirect them to home
    yield put(push('/'));
  }

  if (yield cancelled()) {
    redirectToLogin();
  }

  // return the token for health and wealth
  return token;
}

export function* logout() {
  yield put(logoutRequest);
  auth.reset();

  if (auth.isSAML) {
    redirectToLogout();
  } else {
    const isOnLoginPage = isCurrentPath(window.location.pathname, '/login');

    if (!isOnLoginPage) {
      yield put(push('/login'));
    }
  }
}

// Our watcher (saga).  It will watch for many things.
function* loginWatcher() {
  const evaluate = true;
  const isSAML = auth.isSAMLAuth();
  const races = {
    loggingIn: take(isSAML ? TOKEN_VALIDATION_REQUESTING : LOGIN_REQUESTING),
    loggingOut: take(LOGOUT_REQUESTING),
  };

  // Check if user entered already logged in or not
  while (evaluate) {
    const { loggingIn } = yield race(races);

    if (loggingIn) {
      let credentials;

      if (isSAML) {
        credentials = loggingIn.token;
      } else {
        credentials = {
          username: loggingIn.username,
          password: loggingIn.password,
        };
      }

      yield call(login, credentials);
    } else {
      // log out
      yield call(logout);
    }
  }
}

export default loginWatcher;
