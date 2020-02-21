import { setupAsyncMocks, spyMockAdapter, expectMockWasCalled } from '../testUtilities/testUtilities';
import * as actions from './classifications';
// import bidderClassifications object

const { mockStore } = setupAsyncMocks();

describe('classifications async actions', () => {
  let [mock, spy, store] = Array(3);

  beforeEach(() => {
    store = mockStore({ results: [] });

    ({ mock, spy } = spyMockAdapter({
      // url: '/fsbid/bidderTrackingProgram/?', response: [200, bidderClassificationObject],
    })); mock();
  });

  it('fetches a selected bidder classifications', (done) => {
    store.dispatch(actions.fetchClassifications());
    store.dispatch(actions.classificationsIsLoading());
    expectMockWasCalled({ spy, cb: done });
  });

  it('handles failures when fetching bidder classifications', (done) => {
    store = mockStore({});
    ({ mock, spy } = spyMockAdapter({
      url: '/fsbid/reference/classifications/', respone: [404, null],
    })); mock();

    store.dispatch(actions.fetchClassifications());
    store.dispatch(actions.classificationsIsLoading());
    expectMockWasCalled({ spy, cb: done });
  });
});

