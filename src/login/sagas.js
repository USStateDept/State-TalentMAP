import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects';
import axios from 'axios';

// We'll use this function to redirect to different routes based on cases
// import { browserHistory } from 'react-router';
// import createHistory from 'history/createBrowserHistory';
import { push } from 'react-router-redux';

// Helper for api errors
// import { handleApiErrors } from '../lib/api-errors';

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

import {
  CLIENT_UNSET,
} from '../client/constants';

// const history = createHistory();

const loginUrl = 'http://localhost:8000/api/v1/accounts/token/';

function loginApi(email, password) {
  return axios.post(loginUrl, { username: email, password })
    // .then(handleApiErrors)
    .then(response => response.data.token)
    .catch((error) => { throw error; });
}

function* logout() {
  console.log('logout');

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

    // inform Redux to set our client token, this is non blocking so...
    yield put(setClient(token));

    // .. also inform redux that our login was successful
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
  // Generators halt execution until their next step is ready/occurring
  // So it's not like this loop is firing in the background 1000/sec
  // Instead, it says, "okay, true === true", and hits the first step...
  while (true) {
    //
    // ... and in this first it sees a yield statement with `take` which
    // pauses the loop.  It will sit here and WAIT for this action.
    //
    // yield take(ACTION) just says, when our generator sees the ACTION
    // it will pull from that ACTION's payload that we send up, its
    // email and password.  ONLY when this happens will the loop move
    // forward...
    const { email, password } = yield take([LOGIN_REQUESTING, LOGOUT_REQUESTING]);

    // ... and pass the email and password to our loginFlow() function.
    // The fork() method spins up another "process" that will deal with
    // handling the loginFlow's execution in the background!
    // Think, "fork another process".
    //
    // It also passes back to us, a reference to this forked task
    // which is stored in our const task here.  We can use this to manage
    // the task.
    //
    // However, fork() does not block our loop.  It's in the background
    // therefore as soon as our loop executes this it mores forward...
    const task = yield fork(loginFlow, email, password);

    // ... and begins looking for either CLIENT_UNSET or LOGIN_ERROR!
    // That's right, it gets to here and stops and begins watching
    // for these tasks only.  Why would it watch for login any more?
    // During the life cycle of this generator, the user will login once
    // and all we need to watch for is either logging out, or a login
    // error.  The moment it does grab either of these though it will
    // once again move forward...
    const action = yield take([CLIENT_UNSET, LOGIN_ERROR, LOGOUT_REQUESTING]);

    // ... if, for whatever reason, we decide to logout during this
    // cancel the current action.  i.e. the user is being logged
    // in, they get impatient and start hammering the logout button.
    // this would result in the above statement seeing the CLIENT_UNSET
    // action, and down here, knowing that we should cancel the
    // forked `task` that was trying to log them in.  It will do so
    // and move forward...
    if (action.type === CLIENT_UNSET || action.type === LOGOUT_REQUESTING) yield cancel(task);

    // ... finally we'll just log them out.  This will unset the client
    // access token ... -> follow this back up to the top of the while loop
    yield call(logout);
  }
}

export default loginWatcher;
