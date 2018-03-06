import { expectSaga } from 'redux-saga-test-plan';
import MockAdapter from 'axios-mock-adapter';
import api from '../api';
import loginWatcher, { changeErrorMessage, errorMessage, loginApi, tokenApi } from './sagas';
import { bidderUserObject } from '../__mocks__/userObject';

describe('login functions', () => {
  it('can set the client upon providing a valid token (SAML Auth)', () => {
    const mockAdapter = new MockAdapter(api);
    mockAdapter.onGet('/api/v1/profile/').reply(200,
      bidderUserObject,
    );
    return expectSaga(loginWatcher)
      // Assert that the `put` will eventually happen.
      .put({ type: 'CLIENT_SET', token: '12345' })

      // Dispatch any actions that the saga will `take`.
      .dispatch({
        type: 'TOKEN_VALIDATION_REQUESTING',
        token: '12345',
      })

      // Start the test. Returns a Promise. [silent warnings]
      .silentRun();
  });

  xit('can log in and set the client (LocalStorage Auth)', () => {
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

  it('returns an error callback when calling the tokenApi function and there is no token', () => {
    tokenApi();
    expect(errorMessage.message).toBe('Token cannot be blank');
  });

  it('can catch AJAX errors (SAML Token Auth)', () => {
    const mockAdapter = new MockAdapter(api);
    mockAdapter.onGet('/api/v1/profile/').reply(401,
      'Invalid token',
    );
    tokenApi('123');
    expect(errorMessage.message).toBeDefined();
  });

  xit('can catch AJAX errors (LocalStorage Auth)', () => {
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
