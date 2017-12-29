import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './bidderPortfolio';
import bidderListObject from '../__mocks__/bidderListObject';
import bidderPortfolioCountsObject from '../__mocks__/bidderPortfolioCountsObject';

const { mockStore, mockAdapter } = setupAsyncMocks();

describe('bidderPortfolio async actions', () => {
  beforeEach(() => {
    mockAdapter.onGet('http://localhost:8000/api/v1/client/?').reply(200,
      bidderListObject,
    );

    mockAdapter.onGet('http://localhost:8000/api/v1/client/statistics/').reply(200,
      bidderPortfolioCountsObject,
    );

    mockAdapter.onGet('http://localhost:8000/api/v1/client/?q=failure').reply(404,
      null,
    );
  });

  it("can fetch a CDO's client/bidder list", (done) => {
    const store = mockStore({ results: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.bidderPortfolioFetchData());
        store.dispatch(actions.bidderPortfolioIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it("can handle failures when fetching a CDO's client/bidder list", (done) => {
    const store = mockStore({ results: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.bidderPortfolioFetchData('q=failure'));
        store.dispatch(actions.bidderPortfolioIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it('can fetch client statistics', (done) => {
    const store = mockStore({});

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.bidderPortfolioCountsFetchData());
        store.dispatch(actions.bidderPortfolioCountsIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it('can handle failures when fetching client statistics', (done) => {
    const store = mockStore({});

    // reset() so that http requests fail.
    mockAdapter.reset();

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.bidderPortfolioCountsFetchData());
        store.dispatch(actions.bidderPortfolioCountsIsLoading());
        done();
      }, 0);
    };
    f();
  });
});
