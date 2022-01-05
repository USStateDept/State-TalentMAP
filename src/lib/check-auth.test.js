import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import checkIndexAuthentication from './check-auth';
import rootReducer from '../reducers';

describe('check-auth', () => {
  let store = null;
  beforeEach(() => {
    const sagaMiddleware = createSagaMiddleware();

    const history = createBrowserHistory();

    const middleware = routerMiddleware(history);

    function configureStore(initialState) {
      return createStore(
        rootReducer(history),
        initialState,
        applyMiddleware(thunk, middleware, sagaMiddleware),
      );
    }

    store = configureStore();
  });

  it('can return false when a token is not set in local storage', () => {
    localStorage.clear();
    expect(checkIndexAuthentication(store)).toBe(false);
    localStorage.clear();
  });

  it('can return false when a token is not set in local storage', () => {
    localStorage.clear();
    localStorage.setItem('token', '1234');
    expect(checkIndexAuthentication(store)).toBe(true);
    localStorage.clear();
  });
});
