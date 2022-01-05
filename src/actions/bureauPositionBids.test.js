import { expectMockWasCalled, setupAsyncMocks, spyMockAdapter } from '../testUtilities/testUtilities';
import * as actions from './bureauPositionBids';

const { mockStore } = setupAsyncMocks();

describe('async actions', () => {
  let mock;
  let spy;
  const query = {
    ordering: 'bidder_name',
  };
  it('fetches bureauBidsFetchData', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: '/fsbid/bureau/positions/1/bids/?', response: [200, []],
    })); mock();

    store.dispatch(actions.bureauBidsFetchData(1));

    expectMockWasCalled({ spy, cb: done });
  });

  it('handles errors when fetching bureauBidsFetchData', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: '/fsbid/bureau/positions/1/bids/?', response: [404, null],
    })); mock();

    store.dispatch(actions.bureauBidsFetchData(1));

    expectMockWasCalled({ spy, cb: done });
  });

  it('fetches bureauBidsAllFetchData', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: '/fsbid/bureau/positions/1/bids/?ordering=bidder_name', response: [200, []],
    })); mock();

    store.dispatch(actions.bureauBidsAllFetchData(1, query));

    expectMockWasCalled({ spy, cb: done });
  });

  it('handles errors when fetching bureauBidsAllFetchData', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: '/fsbid/bureau/positions/1/bids/?ordering=bidder_name', response: [404, null],
    })); mock();

    store.dispatch(actions.bureauBidsAllFetchData(1, query));

    expectMockWasCalled({ spy, cb: done });
  });

  it('fetches bureauBidsSetRanking - DELETE', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: '/available_position/1/ranking/', response: [200, []], type: 'onDelete',
    })); mock();

    store.dispatch(actions.bureauBidsSetRanking(1));

    expectMockWasCalled({ spy, cb: done });
  });

  it('handles errors when fetching bureauBidsSetRanking - DELETE', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: '/available_position/1/ranking/', response: [404, null], type: 'onDelete',
    })); mock();

    store.dispatch(actions.bureauBidsSetRanking(1));

    expectMockWasCalled({ spy, cb: done });
  });

  it('fetches bureauBidsRankingFetchData', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: '/available_position/ranking/?cp_id=1&page=1&limit=500', response: [200, { results: [] }],
    })); mock();

    store.dispatch(actions.bureauBidsRankingFetchData(1));

    expectMockWasCalled({ spy, cb: done });
  });

  it('handles errors when fetching bureauBidsRankingFetchData', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: '/available_position/ranking/?cp_id=1&page=1&limit=500', response: [404, null],
    })); mock();

    store.dispatch(actions.bureauBidsRankingFetchData(1));

    expectMockWasCalled({ spy, cb: done });
  });
});
