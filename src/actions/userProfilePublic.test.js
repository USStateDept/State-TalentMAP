import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './userProfilePublic';
import bidListObject from '../__mocks__/bidListObject';

const { mockStore, mockAdapter } = setupAsyncMocks();

describe('async actions', () => {
  const profile = {
    id: 1,
    user: {
      username: 'townpostj',
      email: 'townpostj@state.gov',
      first_name: 'Jenny',
      last_name: 'Townpost',
    },
    languages: [],
    favorite_positions: [{ id: 1 }],
    received_shares: [],
  };

  const bids = bidListObject;

  // reset the mockAdapter since we repeat specific requests
  beforeEach(() => {
    mockAdapter.reset();
  });

  it('can fetch a client', (done) => {
    const store = mockStore({ profile: {} });

    mockAdapter.onGet('http://localhost:8000/api/v1/client/1/').reply(200,
      profile,
    );

    mockAdapter.onGet('http://localhost:8000/api/v1/client/1/bids/').reply(200,
      { results: bids },
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.userProfilePublicFetchData(1));
        done();
      }, 0);
    };
    f();
  });

  it('can fetch a client when user id is undefined', (done) => {
    const store = mockStore({ profile: {} });

    mockAdapter.onGet('http://localhost:8000/api/v1/client/1/').reply(200,
      { ...profile, id: null },
    );

    mockAdapter.onGet('http://localhost:8000/api/v1/client/1/bids/').reply(200,
      { results: bids },
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.userProfilePublicFetchData(1));
        done();
      }, 0);
    };
    f();
  });

  it('can handle errors', (done) => {
    const store = mockStore({ profile: {} });

    mockAdapter.reset();

    mockAdapter.onGet('http://localhost:8000/api/v1/client/1/').reply(404,
      {},
    );

    mockAdapter.onGet('http://localhost:8000/api/v1/client/1/bids/').reply(404,
      {},
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.userProfilePublicFetchData(1));
        done();
      }, 0);
    };
    f();
  });

  it('can unsetUserProfile', (done) => {
    const store = mockStore({ profile: {} });
    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.unsetUserProfilePublic());
        done();
      }, 0);
    };
    f();
  });
});
