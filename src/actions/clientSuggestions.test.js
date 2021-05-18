import { expectMockWasCalled, setupAsyncMocks, spyMockAdapter } from '../testUtilities/testUtilities';
import * as actions from './clientSuggestions';

const { mockStore } = setupAsyncMocks();

describe('async actions', () => {
  let mock;
  let spy;

  it('fetches fetchClientSuggestions', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: '/fsbid/client/1/suggestions/', response: [200, {}],
    })); mock();

    store.dispatch(actions.fetchClientSuggestions(1));

    expectMockWasCalled({ spy, cb: done });
  });

  it('handles errors when fetching fetchClientSuggestions', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: '/fsbid/client/1/suggestions/', response: [404, null],
    })); mock();

    store.dispatch(actions.fetchClientSuggestions(1));

    expectMockWasCalled({ spy, cb: done });
  });
});
