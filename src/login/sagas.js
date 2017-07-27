import { take, call, put, cancelled, race } from 'redux-saga/effects';
import axios from 'axios';

import { push } from 'react-router-redux';

// Our login constants
import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_REQUESTING,
  LOGOUT_SUCCESS,
} from './constants';

// So that we can modify our Client piece of state
import {
  setClient,
  unsetClient,
} from '../client/actions';

const loginUrl = 'http://localhost:8000/api/v1/accounts/token/';

function loginApi(email, password) {
  return axios.post(loginUrl, { username: email, password })
    .then(response => response.data.token)
    .catch((error) => { throw error; });
}

function* logout() {
  // dispatches the CLIENT_UNSET action
  yield put(unsetClient());

  // remove our token
  localStorage.removeItem('token');

  // .. inform redux that our logout was successful
  yield put({ type: LOGOUT_SUCCESS });

  // redirect to the /login screen
  yield put(push('/login'));
}

function* loginFlow(email, password) {
  let token;
  try {
    // try to call to our loginApi() function.  Redux Saga
    // will pause here until we either are successful or
    // receive an error
    token = yield call(loginApi, email, password);

    // inform Redux to set our client token
    yield put(setClient(token));

    // also inform redux that our login was successful
    yield put({ type: LOGIN_SUCCESS });

    // set a stringified version of our token to localstorage on our domain
    localStorage.setItem('token', JSON.stringify(token));

    // redirect them to home
    yield put(push('/'));
  } catch (error) {
    // error? send it to redux
    yield put({ type: LOGIN_ERROR, error });
  } finally {
    // No matter what, if our `forked` `task` was cancelled
    // we will then just redirect them to login
    if (yield cancelled()) {
      push('/login');
    }
  }

  // return the token for health and wealth
  return token;
}

// Our watcher (saga).  It will watch for many things.
function* loginWatcher() {
  // Check if user entered already logged in or not
  while (true) {
    const { loggingIn } = yield race({
      loggingIn: take(LOGIN_REQUESTING),
      loggingOut: take(LOGOUT_REQUESTING),
    });

    if (loggingIn) {
      // grab username and password
      const { email, password } = loggingIn;

      // attempt log in
      yield call(loginFlow, email, password);
    } else {
      // log out
      yield call(logout);
    }
  }
}

export default loginWatcher;
