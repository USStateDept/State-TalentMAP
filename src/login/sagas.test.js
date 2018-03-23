import axios from 'axios';
import { expectSaga } from 'redux-saga-test-plan';
import MockAdapter from 'axios-mock-adapter';
import loginWatcher, { changeErrorMessage, errorMessage, tokenApi } from './sagas';
import { bidderUserObject } from '../__mocks__/userObject';

describe('login functions', () => {
  xit('can set the client upon providing a valid token', () => {
    const mockAdapter = new MockAdapter(axios);
    mockAdapter.onGet('http://localhost:8000/api/v1/profile/').reply(200,
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

  xit('can log out and unset the client', () => expectSaga(loginWatcher)
      // Assert that the `put` will eventually happen.
      .put({ type: 'CLIENT_UNSET' })

      // Dispatch any actions that the saga will `take`.
      .dispatch({
        type: 'LOGOUT_REQUESTING',
      })

      // Start the test. Returns a Promise. [silent warnings]
      .silentRun());

  xit('can can catch empty login fields', () => {
    const mockAdapter = new MockAdapter(axios);
    mockAdapter.onPost('http://localhost:8000/api/v1/accounts/token/').reply(200,
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

  xit('returns an error callback when calling the tokenApi function and there is no token', () => {
    tokenApi();
    expect(errorMessage.message).toBe('Token cannot be blank');
  });

  xit('can catch AJAX errors', () => {
    const mockAdapter = new MockAdapter(axios);
    mockAdapter.onGet('http://localhost:8000/api/v1/profile/').reply(401,
      'Invalid token',
    );
    tokenApi('123');
    expect(errorMessage.message).toBeDefined();
  });

  xit('can change the error message', () => {
    changeErrorMessage('error');
    expect(errorMessage.message).toBe('error');
  });
});
