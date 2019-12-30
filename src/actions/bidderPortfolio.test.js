import { setupAsyncMocks, spyMockAdapter, expectMockWasCalled } from '../testUtilities/testUtilities';
import * as actions from './bidderPortfolio';
import bidderListObject from '../__mocks__/bidderListObject';
import bidderPortfolioCountsObject from '../__mocks__/bidderPortfolioCountsObject';

const { mockStore } = setupAsyncMocks();

describe('bidderPortfolio async actions', () => {
  let [mock, spy, store] = Array(3);

  beforeEach(() => {
    store = mockStore({ results: [] });

    ({ mock, spy } = spyMockAdapter({
      url: '/fsbid/client/?', response: [200, bidderListObject],
    })); mock();
  });

  it("can fetch a CDO's client/bidder list", (done) => {
    store.dispatch(actions.bidderPortfolioFetchData());
    store.dispatch(actions.bidderPortfolioIsLoading());
    expectMockWasCalled({ spy, cb: done });
  });

  it('can fetch data from the last query', (done) => {
    store = mockStore({ results: [], bidderPortfolioLastQuery: '/client/?test=true' });

    ({ mock, spy } = spyMockAdapter({
      url: '/client/?test=true', response: [200, bidderListObject],
    })); mock();

    store.dispatch(actions.bidderPortfolioFetchDataFromLastQuery());
    store.dispatch(actions.lastBidderPortfolioIsLoading());

    expectMockWasCalled({ spy, cb: done });
  });

  it('can handle errors when fetching data from the last query', (done) => {
    store = mockStore({ results: [], bidderPortfolioLastQuery: '/client/?test=true' });

    ({ mock, spy } = spyMockAdapter({
      url: '/client/?test=true', response: [404, bidderListObject],
    })); mock();

    store.dispatch(actions.bidderPortfolioFetchDataFromLastQuery());
    store.dispatch(actions.lastBidderPortfolioIsLoading());

    expectMockWasCalled({ spy, cb: done });
  });

  it('can handle failures when fetching data from the last query', (done) => {
    ({ mock, spy } = spyMockAdapter({
      url: '/fsbid/client/?q=failure', response: [404],
    })); mock();

    store.dispatch(actions.bidderPortfolioFetchData({ q: 'failure' }));
    store.dispatch(actions.bidderPortfolioIsLoading());

    expectMockWasCalled({ spy, cb: done });
  });

  it('can fetch client statistics', (done) => {
    store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: '/client/statistics/', response: [200, bidderPortfolioCountsObject],
    })); mock();

    store.dispatch(actions.bidderPortfolioCountsFetchData());
    store.dispatch(actions.bidderPortfolioCountsIsLoading());

    expectMockWasCalled({ spy, cb: done });
  });

  it('can handle failures when fetching client statistics', (done) => {
    store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: '/client/statistics/', response: [404, null],
    })); mock();

    store.dispatch(actions.bidderPortfolioCountsFetchData());
    store.dispatch(actions.bidderPortfolioCountsIsLoading());

    expectMockWasCalled({ spy, cb: done });
  });
});
