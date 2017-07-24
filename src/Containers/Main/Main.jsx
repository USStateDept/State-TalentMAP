import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import createSagaMiddleware from 'redux-saga';

import createHistory from 'history/createBrowserHistory';

import rootReducer from '../../reducers';

import Home from '../../Containers/Home/Home';
import Results from '../../Containers/Results/Results';
import Position from '../../Containers/Position/Position';
import Post from '../../Containers/Post/Post';
import Login from '../../login';

import {
  checkIndexAuthorization,
} from '../../lib/check-auth';

import IndexSagas from '../../index-sagas';

// Setup the middleware to watch between the Reducers and the Actions
const sagaMiddleware = createSagaMiddleware();

const history = createHistory();

const middleware = routerMiddleware(history);

/*eslint-disable */
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
/*eslint-enable */

function configureStore(initialState) {
  return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk, middleware, sagaMiddleware),
    );
}

const store = configureStore();

// Begin our Index Saga
sagaMiddleware.run(IndexSagas);

const isAuthorized = () => checkIndexAuthorization(store);

const Main = props => (
  <Provider store={store} history={history}>
    <ConnectedRouter history={history}>
      <main id="main-content">
        <Switch {...props}>
          <Route
            path="/login"
            component={() => (!isAuthorized() ?
            (<Login {...props} />) : (<Redirect to="/" />))}
          />
          <Route
            exact
            path="/"
            component={() => (isAuthorized() ?
              (<Home {...props} />) : (<Redirect to="/login" />))}
          />
          <Route
            path="/results"
            component={() => (isAuthorized() ?
              (<Results {...props} />) : (<Redirect to="/login" />))}
          />
          <Route
            path="/details/:id"
            component={() => (isAuthorized() ?
              (<Position {...props} />) : (<Redirect to="/login" />))}
          />
          <Route
            path="/post/:id"
            component={() => (isAuthorized() ?
              (<Post {...props} />) : (<Redirect to="/login" />))}
          />
        </Switch>
      </main>
    </ConnectedRouter>
  </Provider>
);

export default Main;
