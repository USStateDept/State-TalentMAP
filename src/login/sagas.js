import { take, call, put, cancelled, race } from 'redux-saga/effects';
import Cookies from 'universal-cookie';
import { push } from 'react-router-redux';
import api from '../api';
import isCurrentPath from '../Components/ProfileMenu/navigation';

import { redirectToLogout, redirectToLogin } from '../utilities';

// Our login constants
import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_REQUESTING,
  LOGOUT_SUCCESS,
  TOKEN_VALIDATION_REQUESTING,
} from './constants';

// So that we can modify our Client piece of state
import {
  setClient,
  unsetClient,
} from '../client/actions';

// So that we can pull the user's profile
// and unset the profile object on logout
import {
  userProfileFetchData,
  unsetUserProfile,
} from '../actions/userProfile';

// We'll also clear any notifications on logout
import {
  unsetNotificationsCount,
} from '../actions/notifications';

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

/* Development Login */
export function loginApi(username, password) {
  if (!username || !password) {
    return changeErrorMessage('Fields cannot be blank');
  }

  return api.post('/accounts/token/', { username, password })
    .then(response => response.data.token)
    .catch((error) => { changeErrorMessage(error.message); });
}

function* logout() {
  // dispatches the CLIENT_UNSET action
  yield put(unsetClient());

  // unset the user profile
  yield put(unsetUserProfile());

  // unset notifications count
  yield put(unsetNotificationsCount());

  // remove our local storage token
  localStorage.removeItem('token');

  // remove our cookie token
  cookies.remove('tmApiToken');

  // .. inform redux that our logout was successful
  yield put({ type: LOGOUT_SUCCESS });

  redirectToLogout();
}

function* tokenFlow(tokenToCheck) {
  // try to call to our loginApi() function. Redux Saga
  // will pause here until we either are successful or
  // receive an error
  const tokenWasSuccessful = yield call(tokenApi, tokenToCheck);

  if (tokenWasSuccessful) {
    // inform Redux to set our client token
    yield put(setClient(tokenToCheck));

    // also inform redux that our login was successful
    yield put({ type: LOGIN_SUCCESS });

    // set a stringified version of our token to localstorage on our domain
    localStorage.setItem('token', JSON.stringify(tokenToCheck));

    // get the user's profile data
    yield put(userProfileFetchData());

    // redirect them to home
    yield put(push('/'));
  } else {
    // error? send it to redux
    yield put({ type: LOGIN_ERROR, error: errorMessage.message });
  }
  if (yield cancelled()) {
    redirectToLogin();
  }

  // return the token for health and wealth
  return tokenToCheck;
}

// Our watcher (saga).  It will watch for many things.
function* loginWatcher() {
  // Check if user entered already logged in or not
  while (true) { // eslint-disable-line no-constant-condition
    const { tokenValidating } = yield race({
      tokenValidating: take(TOKEN_VALIDATION_REQUESTING),
      loggingOut: take(LOGOUT_REQUESTING),
    });

    if (tokenValidating) {
      const { token } = tokenValidating;
      yield call(tokenFlow, token);
    } else {
      // log out
      yield call(logout);
    }
  }
}

export default loginWatcher;
