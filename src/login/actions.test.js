import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { loginRequest } from './actions';

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

  it('can fetch a position', (done) => {
    const store = mockStore({ post: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(loginRequest({ email: 'admin', password: 'admin' }));
    // .then(do something)
        done();
      }, 0);
    };
    f();
  });
});
