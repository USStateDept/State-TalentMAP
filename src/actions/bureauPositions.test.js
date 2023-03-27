import { expectMockWasCalled, setupAsyncMocks, spyMockAdapter } from '../testUtilities/testUtilities';
import * as actions from './bureauPositions';

const { mockStore } = setupAsyncMocks();

describe('async actions', () => {
  let mock;
  let spy;

  it('fetches bureauPositionsFetchData', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: '/fsbid/bureau/positions/?position__bureau__code__in=1%2C2', response: [200, {}],
    })); mock();

    store.dispatch(actions.bureauPositionsFetchData({ position__bureau__code__in: [1, 2] }, true));

    expectMockWasCalled({ spy, cb: done });
  });

  it('handles errors when fetching bureauPositionsFetchData', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: '/fsbid/bureau/positions/?position__bureau__code__in=1%2C2', response: [404, null],
    })); mock();

    store.dispatch(actions.bureauPositionsFetchData({ position__bureau__code__in: [1, 2] }, true));

    expectMockWasCalled({ spy, cb: done });
  });
});
