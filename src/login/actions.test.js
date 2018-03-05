import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { loginRequest, logoutRequest } from './actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('login actions', () => {
  beforeEach(() => {
    const mockAdapter = new MockAdapter(axios);

    const token = {
      token: '93d2b76091f8d3f1fdf6b2d8d64a89004c5fb8bd',
    };

    mockAdapter.onPost('http://localhost:8000/api/v1/accounts/token/').reply(200,
      token,
    );
  });

  xit('can perform login', (done) => {
    const store = mockStore({ login: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(loginRequest({ username: 'admin', password: 'admin' }));
        done();
      }, 0);
    };
    f();
  });

  it('can perform logout', () => {
    const store = mockStore({ login: [] });
    store.dispatch(logoutRequest());
  });
});
