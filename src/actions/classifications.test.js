import { expectMockWasCalled, setupAsyncMocks, spyMockAdapter } from '../testUtilities/testUtilities';
import * as actions from './classifications';
import classificationsObject from '../__mocks__/classificationsObject';

const { mockStore } = setupAsyncMocks();

describe('classifications async actions', () => {
  let [mock, spy, store] = Array(3);

  beforeEach(() => {
    store = mockStore({ results: [] });

    ({ mock, spy } = spyMockAdapter({
      url: '/fsbid/reference/classifications/', response: [200, classificationsObject],
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

