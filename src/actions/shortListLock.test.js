import { expectMockWasCalled, setupAsyncMocks, spyMockAdapter } from '../testUtilities/testUtilities';
import * as actions from './shortListLock';

const { mockStore } = setupAsyncMocks();

describe('async actions', () => {
  let mock;
  let spy;

  it('fetches shortListLockFetchData - 200', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: '/available_position/1/ranking/lock/', response: [200, {}],
    })); mock();

    store.dispatch(actions.shortListLockFetchData(1));

    expectMockWasCalled({ spy, cb: done });
  });

  it('fetches shortListLockFetchData - 204', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: '/available_position/1/ranking/lock/', response: [204, {}],
    })); mock();

    store.dispatch(actions.shortListLockFetchData(1));

    expectMockWasCalled({ spy, cb: done });
  });

  it('handles errors when fetching shortListLockFetchData - 400', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: '/available_position/1/ranking/lock/', response: [400, null],
    })); mock();

    store.dispatch(actions.shortListLockFetchData(1));

    expectMockWasCalled({ spy, cb: done });
  });

  it('handles errors when fetching shortListLockFetchData - 403', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: '/available_position/1/ranking/lock/', response: [403, null],
    })); mock();

    store.dispatch(actions.shortListLockFetchData(1));

    expectMockWasCalled({ spy, cb: done });
  });

  it('handles errors when fetching shortListLockFetchData - 404', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: '/available_position/1/ranking/lock/', response: [404, null],
    })); mock();

    store.dispatch(actions.shortListLockFetchData(1));

    expectMockWasCalled({ spy, cb: done });
  });
});
