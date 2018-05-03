import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { routerMiddleware } from 'react-router-redux';

import createSagaMiddleware from 'redux-saga';

import createHistory from 'history/createBrowserHistory';

import rootReducer from './reducers';

import IndexSagas from './index-sagas';

// Setup the middleware to watch between the Reducers and the Actions
const sagaMiddleware = createSagaMiddleware();

const history = createHistory({ basename: process.env.PUBLIC_URL });

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

export { store, history };
