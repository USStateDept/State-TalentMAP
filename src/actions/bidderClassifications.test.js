import { setupAsyncMocks, spyMockAdapter, expectMockWasCalled } from '../testUtilities/testUtilities';
import * as actions from './bidderClassifications';
// import bidderClassifications object

const { mockStore } = setupAsyncMocks();

describe('bidderClassifications async actions', () => {
  let [mock, spy, store] = Array(3);

  beforeEach(() => {
    store = mockStore({ results: [] });

    ({ mock, spy } = spyMockAdapter({
      // url: '/fsbid/bidderTrackingProgram/?', response: [200, bidderClassificationObject],
    })); mock();
  });

  it('fetches a selected bidder classifications', (done) => {
    store.dispatch(actions.fetchBidderClassifications());
    store.dispatch(actions.bidderClassificationsIsLoading());
    expectMockWasCalled({ spy, cb: done });
  });

  it('handles failures when fetching bidder classifications', (done) => {
    store = mockStore({});
    ({ mock, spy } = spyMockAdapter({
      url: '/fsbid/bidderTrackingProgram/?', respone: [404, null],
    })); mock();

    store.dispatch(actions.fetchBidderClassifications());
    store.dispatch(actions.bidderClassificationsIsLoading());
    expectMockWasCalled({ spy, cb: done });
  });
});

