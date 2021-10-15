import { expectMockWasCalled, setupAsyncMocks, spyMockAdapter } from '../testUtilities/testUtilities';
import * as actions from './bureauPositionDetails';

const { mockStore } = setupAsyncMocks();

describe('async actions', () => {
  let mock;
  let spy;

  it('fetches bureauPositionDetailsFetchData', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: '/fsbid/bureau/positions/1/', response: [200, {}],
    })); mock();

    store.dispatch(actions.bureauPositionDetailsFetchData(1));

    expectMockWasCalled({ spy, cb: done });
  });

  it('handles errors when fetching bureauPositionDetailsFetchData', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: '/fsbid/bureau/positions/1/', response: [404, null],
    })); mock();

    store.dispatch(actions.bureauPositionDetailsFetchData(1));

    expectMockWasCalled({ spy, cb: done });
  });
});
