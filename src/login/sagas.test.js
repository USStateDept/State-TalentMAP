import { expectSaga } from 'redux-saga-test-plan';
import MockAdapter from 'axios-mock-adapter';
import api from '../api';
import loginWatcher, { changeErrorMessage, errorMessage, loginApi } from './sagas';

describe('login functions', () => {
  xit('can log in and set the client', () => {
    const mockAdapter = new MockAdapter(api);
    mockAdapter.onPost('/accounts/token/').reply(200,
      { token: '12345' },
    );
    return expectSaga(loginWatcher)
      // Assert that the `put` will eventually happen.
      .put({ type: 'CLIENT_SET', token: '12345' })

      // Dispatch any actions that the saga will `take`.
      .dispatch({
        type: 'LOGIN_REQUESTING',
        username: 'admin',
        password: 'admin',
      })

      // Start the test. Returns a Promise. [silent warnings]
      .silentRun();
  });

  it('can log out and unset the client', () => expectSaga(loginWatcher)
      // Assert that the `put` will eventually happen.
      .put({ type: 'CLIENT_UNSET' })

      // Dispatch any actions that the saga will `take`.
      .dispatch({
        type: 'LOGOUT_REQUESTING',
      })

      // Start the test. Returns a Promise. [silent warnings]
      .silentRun());

  xit('can can catch empty login fields', () => {
    const mockAdapter = new MockAdapter(api);
    mockAdapter.onPost('/accounts/token/').reply(200,
      { token: '12345' },
    );
    return expectSaga(loginWatcher)
      // Assert that the `put` will eventually happen.
      .put({ type: 'LOGIN_ERROR', error: 'Fields cannot be blank' })

      // Dispatch any actions that the saga will `take`.
      .dispatch({
        type: 'LOGIN_REQUESTING',
        username: '',
        password: '',
      })

      // Start the test. Returns a Promise. [silent warnings]
      .silentRun();
  });

  xit('can catch AJAX errors', () => {
    const mockAdapter = new MockAdapter(api);
    mockAdapter.onPost('/accounts/token/').reply(400,
      'error',
    );
    loginApi('user', 'pass');
    expect(errorMessage.message).toBeDefined();
  });

  it('can change the error message', () => {
    changeErrorMessage('error');
    expect(errorMessage.message).toBe('error');
  });
});
