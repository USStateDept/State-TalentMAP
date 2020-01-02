import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './userProfile';

const { mockStore, mockAdapter } = setupAsyncMocks();

describe('async actions', () => {
  const profile = {
    id: 2,
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

  const permission = {
    groups: [
      'post_editors_215',
      'glossary_editors',
    ],
  };

  // reset the mockAdapter since we repeat specific requests
  beforeEach(() => {
    mockAdapter.reset();
  });

  it('can fetch a position', (done) => {
    const store = mockStore({ profile: {} });

    mockAdapter.onGet('/profile/').reply(200,
      profile,
    );

    mockAdapter.onGet('/permission/user/').reply(200,
      permission,
    );

    mockAdapter.onPost('/stats/login/').reply(200,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.userProfileFetchData(false, () => {}));
        done();
      }, 0);
    };
    f();
  });

  it('can remove a favorite position', (done) => {
    const store = mockStore({ profile: {} });

    mockAdapter.onDelete('/cycleposition/1/favorite/').reply(204,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.userProfileToggleFavoritePosition('1', true, true));
        done();
      }, 0);
    };
    f();
  });

  it('can add a favorite position', (done) => {
    const store = mockStore({ profile: {} });

    mockAdapter.onGet('/cycleposition/1/').reply(200,
      {},
    );

    mockAdapter.onPut('/cycleposition/1/favorite/').reply(204,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.userProfileToggleFavoritePosition('1', false, true));
        done();
      }, 0);
    };
    f();
  });

  it('can handle favoriting errors when favoriting fails', (done) => {
    const store = mockStore({ profile: {} });

    mockAdapter.onPut('/cycleposition/1/favorite/').reply(404,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.userProfileToggleFavoritePosition('1', false, true));
        done();
      }, 0);
    };
    f();
  });

  it('can handle errors', (done) => {
    const store = mockStore({ profile: {} });

    mockAdapter.reset();

    mockAdapter.onGet('/profile/').reply(404,
      {},
    );

    mockAdapter.onGet('/permission/user/').reply(404,
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

  it('can unsetUserProfile', (done) => {
    const store = mockStore({ profile: {} });
    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.unsetUserProfile());
        done();
      }, 0);
    };
    f();
  });

  it('calls trackLogin', (done) => {
    const f = () => {
      setTimeout(() => {
        actions.trackLogin();
        done();
      }, 0);
    };
    f();
  });
});
