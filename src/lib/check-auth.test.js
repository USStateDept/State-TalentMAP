import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import checkIndexAuthorization from './check-auth';
import rootReducer from '../reducers';

describe('check-auth', () => {
  let store = null;
  beforeEach(() => {
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

    store = configureStore();
  });

  it('can return false when a token is not set in session storage', () => {
    sessionStorage.clear();
    expect(checkIndexAuthorization(store)).toBe(false);
    sessionStorage.clear();
  });

  it('can return false when a token is not set in session storage', () => {
    sessionStorage.clear();
    sessionStorage.setItem('token', '1234');
    expect(checkIndexAuthorization(store)).toBe(true);
    sessionStorage.clear();
  });
});
