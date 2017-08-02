import React from 'react';
import { Switch, Route } from 'react-router-dom';
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
import Compare from '../../Containers/Compare/Compare';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

import checkIndexAuthorization from '../../lib/check-auth';

import IndexSagas from '../../index-sagas';

// Setup the middleware to watch between the Reducers and the Actions
const sagaMiddleware = createSagaMiddleware();

const history = createHistory();

const middleware = routerMiddleware(history);

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
      <div>
        <Header {...props} isAuthorized={isAuthorized()} />
        <main id="main-content">
          <Switch {...props}>
            <Route
              path="/login"
              component={() => (<Login {...props} isAuthorized={isAuthorized} />)}
            />
            <Route
              exact
              path="/"
              component={() => (<Home {...props} isAuthorized={isAuthorized} />)}
            />
            <Route
              path="/results"
              component={() => (<Results {...props} isAuthorized={isAuthorized} />)}
            />
            <Route
              path="/details/:id"
              component={() => (<Position {...props} isAuthorized={isAuthorized} />)}
            />
            <Route
              path="/post/:id"
              component={() => (<Post {...props} isAuthorized={isAuthorized} />)}
            />
            <Route
              path="/compare/:ids"
              component={() => (<Compare {...props} isAuthorized={isAuthorized} />)}
            />
          </Switch>
        </main>
        <Footer />
      </div>
    </ConnectedRouter>
  </Provider>
);

export default Main;
