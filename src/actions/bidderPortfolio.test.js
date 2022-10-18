import { expectMockWasCalled, setupAsyncMocks, spyMockAdapter } from '../testUtilities/testUtilities';
import * as actions from './bidderPortfolio';
import bidderListObject from '../__mocks__/bidderListObject';
import bidderPortfolioCountsObject from '../__mocks__/bidderPortfolioCountsObject';

const { mockStore } = setupAsyncMocks();

describe('bidderPortfolio async actions', () => {
  let [mock, spy, store] = Array(3);

  beforeEach(() => {
    store = mockStore({ results: [], bidderPortfolioSelectedCDOsToSearchBy: [{ hru_id: 1 }] });

    ({ mock, spy } = spyMockAdapter({
      url: '/fsbid/client/?hru_id__in=1&ordering=client_last_name%2Cclient_first_name%2Cclient_middle_name', response: [200, bidderListObject],
    })); mock();
  });

  it("fetches a CDO's client/bidder list", (done) => {
    store.dispatch(actions.bidderPortfolioFetchData());
    store.dispatch(actions.bidderPortfolioIsLoading());
    expectMockWasCalled({ spy, cb: done });
  });

  it('fetches data from the last query', (done) => {
    store = mockStore({ results: [], bidderPortfolioLastQuery: '/client/?test=true' });

    ({ mock, spy } = spyMockAdapter({
      url: '/client/?test=true', response: [200, bidderListObject],
    })); mock();

    store.dispatch(actions.bidderPortfolioFetchDataFromLastQuery());
    store.dispatch(actions.lastBidderPortfolioIsLoading());

    expectMockWasCalled({ spy, cb: done });
  });

  it('handles errors when fetching data from the last query', (done) => {
    store = mockStore({ results: [], bidderPortfolioLastQuery: '/client/?test=true' });

    ({ mock, spy } = spyMockAdapter({
      url: '/client/?test=true', response: [404, bidderListObject],
    })); mock();

    store.dispatch(actions.bidderPortfolioFetchDataFromLastQuery());
    store.dispatch(actions.lastBidderPortfolioIsLoading());

    expectMockWasCalled({ spy, cb: done });
  });

  it('handles failures when fetching data from the last query', (done) => {
    ({ mock, spy } = spyMockAdapter({
      url: '/fsbid/client/?hru_id__in=1&ordering=client_last_name%2Cclient_first_name%2Cclient_middle_name&q=failure', response: [404],
    })); mock();

    store.dispatch(actions.bidderPortfolioFetchData({ q: 'failure' }));
    store.dispatch(actions.bidderPortfolioIsLoading());

    expectMockWasCalled({ spy, cb: done });
  });

  it('fetches client bidder portfolio CDOs', (done) => {
    store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: '/fsbid/cdo/', response: [200, [{ hru_id: 1, name: 'name' }]],
    })); mock();

    store.dispatch(actions.bidderPortfolioCDOsFetchData());

    expectMockWasCalled({ spy, cb: done });
  });

  it('handles errors when fetching client bidder portfolio CDOs', (done) => {
    store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: '/fsbid/cdo/', response: [404, null],
    })); mock();

    store.dispatch(actions.bidderPortfolioCDOsFetchData());

    expectMockWasCalled({ spy, cb: done });
  });

  it('fetches bid seasons', (done) => {
    store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: '/fsbid/bid_seasons/', response: [200, [{ id: 1, description: 'a' }]],
    })); mock();

    store.dispatch(actions.bidderPortfolioSeasonsFetchData());

    expectMockWasCalled({ spy, cb: done });
  });

  it('handles errors when fetching client bidder portfolio CDOs', (done) => {
    store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: '/fsbid/bid_seasons/', response: [404, null],
    })); mock();

    store.dispatch(actions.bidderPortfolioSeasonsFetchData());

    expectMockWasCalled({ spy, cb: done });
  });
});
