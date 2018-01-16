/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import createSagaMiddleware from 'redux-saga';

import createHistory from 'history/createBrowserHistory';

import rootReducer from '../../reducers';

import Routes from '../../Containers/Routes/Routes';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Glossary from '../../Containers/Glossary';
import AuthorizedWrapper from '../../Containers/AuthorizedWrapper';

import checkIndexAuthorization from '../../lib/check-auth';

import IndexSagas from '../../index-sagas';

// Setup the middleware to watch between the Reducers and the Actions
const sagaMiddleware = createSagaMiddleware();

const history = createHistory({basename: process.env.PUBLIC_URL});

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
        <Header {...props} isAuthorized={isAuthorized} />
        <main id="main-content">
          <Routes {...props} isAuthorized={isAuthorized} />
        </main>
        <Footer />
        <AuthorizedWrapper {...props} isAuthorized={isAuthorized}>
          <Glossary />
        </AuthorizedWrapper>
      </div>
    </ConnectedRouter>
  </Provider>
);

export default Main;
