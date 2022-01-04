import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage

import { routerMiddleware } from 'connected-react-router';

import createSagaMiddleware from 'redux-saga';

import { createBrowserHistory } from 'history';

import createRootReducer from './reducers';

import IndexSagas from './index-sagas';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['sortPreferences', 'darkModePreference'], // only persist some reducers
};

// Setup the middleware to watch between the Reducers and the Actions
const sagaMiddleware = createSagaMiddleware();

const history = createBrowserHistory({ basename: process.env.PUBLIC_URL });

const middleware = routerMiddleware(history);

/* eslint-disable no-underscore-dangle */
// Enables the redux devtools extension only in development environment
const composeEnhancers = (
  process.env.NODE_ENV === 'development'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;
/* eslint-enable no-underscore-dangle */

const persistedReducer = persistReducer(persistConfig, createRootReducer(history));

function configureStore(initialState) {
  return createStore(
    persistedReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(thunk, middleware, sagaMiddleware),
    ),
  );
}

const store = configureStore();

const persistor = persistStore(store);

// Begin our Index Saga
sagaMiddleware.run(IndexSagas);

export { store, persistor, history };
