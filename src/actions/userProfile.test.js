import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from './userProfile';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  it('can fetch a position', (done) => {
    const store = mockStore({ profile: {} });

    const mockAdapter = new MockAdapter(axios);

    const profile = {
      id: 2,
      user: {
        username: 'townpostj',
        email: 'townpostj@state.gov',
        first_name: 'Jenny',
        last_name: 'Townpost',
      },
      language_qualifications: [],
      favorite_positions: [],
      received_shares: [],
    };

    mockAdapter.onGet('http://localhost:8000/api/v1/profile/').reply(200,
      profile,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.userProfileFetchData());
        done();
      }, 0);
    };
    f();
  });

  it('can handle errors', (done) => {
    const store = mockStore({ profile: {} });

    const mockAdapter = new MockAdapter(axios);

    mockAdapter.onGet('http://localhost:8000/api/v1/profile').reply(404,
      {},
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.userProfileFetchData());
        done();
      }, 0);
    };
    f();
  });
});
