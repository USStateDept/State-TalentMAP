import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './bidList';

const { mockStore, mockAdapter } = setupAsyncMocks();

describe('async actions', () => {
  const bidList = {
    count: 2,
    next: null,
    previous: null,
    results: [
      {
        id: 4,
        bidcycle: 'Test bid cycle (1988-01-01 - 2088-01-01)',
        user: 'admin',
        position: '[00003026] OMS (COM) (Freetown, Sierra Leone)',
        status: 'draft',
        submission_date: null,
      },
      {
        id: 5,
        bidcycle: 'Test bid cycle (1988-01-01 - 2088-01-01)',
        user: 'admin',
        position: '[00004013] OMS (COM) (Maseru, Lesotho)',
        status: 'draft',
        submission_date: null,
      },
    ],
  };

  // reset the mockAdapter since we repeat specific requests
  beforeEach(() => {
    mockAdapter.reset();
  });

  it('parses state for shouldUseClient', () => {
    let id = 1;
    const getResult = () => actions.shouldUseClient(() => (
      { clientView: { client: { perdet_seq_number: id } } }),
    );
    expect(getResult()).toBe(true);
    id = null;
    expect(getResult()).toBe(false);
  });

  it('can fetch a bid list', (done) => {
    const store = mockStore({ });

    mockAdapter.onGet('http://localhost:8000/api/v1/fsbid/bidlist/?ordering=draft_date').reply(200,
      bidList,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.bidListFetchData());
        done();
      }, 0);
    };
    f();
  });

  it('can handle errors when fetching a bid list', (done) => {
    const store = mockStore({ });

    mockAdapter.onGet('http://localhost:8000/api/v1/fsbid/bidlist/?ordering=draft_date').reply(404,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.bidListFetchData());
        done();
      }, 0);
    };
    f();
  });

  it('can remove a position from the bid list', (done) => {
    const store = mockStore({ profile: {} });

    mockAdapter.onDelete('http://localhost:8000/api/v1/fsbid/bidlist/position/1/').reply(204,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.toggleBidPosition('1', true));
        done();
      }, 0);
    };
    f();
  });

  it('can add a position to the bid list', (done) => {
    const store = mockStore({ profile: {} });

    mockAdapter.onPut('http://localhost:8000/api/v1/fsbid/bidlist/position/1/').reply(204,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.toggleBidPosition('1'));
        done();
      }, 0);
    };
    f();
  });

  it('can submit a bid', (done) => {
    const store = mockStore({ profile: {} });

    mockAdapter.onPut('http://localhost:8000/api/v1/fsbid/bidlist/position/1/submit/').reply(204,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.submitBid('1'));
        done();
      }, 0);
    };
    f();
  });

  it('can handle errors when submitting a bid', (done) => {
    const store = mockStore({ profile: {} });

    mockAdapter.onPut('http://localhost:8000/api/v1/fsbid/bidlist/position/1/submit/').reply(404,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.submitBid('1'));
        done();
      }, 0);
    };
    f();
  });

  it('can handle errors when adding a position to the bid list', (done) => {
    const store = mockStore({ profile: {} });

    mockAdapter.onPut('http://localhost:8000/api/v1/fsbid/bidlist/position/1/').reply(404,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.toggleBidPosition('1'));
        done();
      }, 0);
    };
    f();
  });

  it('can accept a bid', (done) => {
    const store = mockStore({});

    mockAdapter.onGet('http://localhost:8000/api/v1/bid/1/accept_handshake/').reply(204,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.acceptBid('1'));
        done();
      }, 0);
    };
    f();
  });

  it('can handle errors when accepting a bid', (done) => {
    const store = mockStore({});

    mockAdapter.onGet('http://localhost:8000/api/v1/bid/1/accept_handshake/').reply(404,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.acceptBid('1'));
        done();
      }, 0);
    };
    f();
  });

  it('can decline a bid', (done) => {
    const store = mockStore({});

    mockAdapter.onGet('http://localhost:8000/api/v1/bid/1/decline_handshake/').reply(204,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.declineBid('1'));
        done();
      }, 0);
    };
    f();
  });

  it('can handle errors when declining a bid', (done) => {
    const store = mockStore({});

    mockAdapter.onGet('http://localhost:8000/api/v1/bid/1/decline_handshake/').reply(404,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.declineBid('1'));
        done();
      }, 0);
    };
    f();
  });

  it('can fetch a client bid list', (done) => {
    const store = mockStore({ clientView: { client: { perdet_seq_number: 1 } } });

    mockAdapter.onGet('http://localhost:8000/api/v1/fsbid/cdo/client/1/?ordering=draft_date').reply(200,
      { results: [] },
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.clientBidListFetchData());
        done();
      }, 0);
    };
    f();
  });

  it('can handle errors when fetching a client bid list', (done) => {
    const store = mockStore({});

    mockAdapter.onGet('http://localhost:8000/api/v1/fsbid/cdo/client/1/?ordering=draft_date').reply(404,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.clientBidListFetchData());
        done();
      }, 0);
    };
    f();
  });
});
