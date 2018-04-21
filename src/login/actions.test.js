import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { authRequest, tokenValidationRequest } from './actions';
import { LOGOUT_REQUESTING, TOKEN_VALIDATION_REQUESTING } from './constants';

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

  it('can perform logout', () => {
    const result = store.dispatch(authRequest(false));
    expect(result.type).toBe(LOGOUT_REQUESTING);
  });
});
