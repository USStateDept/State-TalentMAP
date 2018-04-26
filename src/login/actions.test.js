import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { authRequest, tokenValidationRequest, authSuccess, authError } from './actions';
import { LOGOUT_REQUESTING, TOKEN_VALIDATION_REQUESTING, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_ERROR, LOGIN_REQUESTING } from './constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('login actions', () => {
  const store = mockStore({ login: [] });

  const token = {
    token: '93d2b76091f8d3f1fdf6b2d8d64a89004c5fb8bd',
  };

  it('can perform tokenValidationRequest', () => {
    const result = store.dispatch(tokenValidationRequest(token));
    expect(result.type).toBe(TOKEN_VALIDATION_REQUESTING);
    expect(result.token).toBe(token);
  });

  it('can perform login', () => {
    const result = store.dispatch(authRequest());
    expect(result.type).toBe(LOGIN_REQUESTING);
  });

  it('can perform logout', () => {
    const result = store.dispatch(authRequest(false));
    expect(result.type).toBe(LOGOUT_REQUESTING);
  });

  it('can handle login error', () => {
    const result = store.dispatch(authError());
    expect(result.type).toBe(LOGIN_ERROR);
    expect(result.message).toEqual(null);
  });

  it('can handle logout error', () => {
    const message = { body: 'error' };
    const result = store.dispatch(authError(false, message));
    expect(result.type).toBe(LOGOUT_ERROR);
    expect(result.message).toEqual(message);
  });

  it('can handle authSuccess', () => {
    const result = store.dispatch(authSuccess(true));
    expect(result.type).toBe(LOGIN_SUCCESS);
  });
});
