import { expectMockWasCalled, setupAsyncMocks, spyMockAdapter } from '../testUtilities/testUtilities';
import * as actions from './availableBidders';

const { mockStore } = setupAsyncMocks();

describe('async actions', () => {
  let mock;
  let spy;

  it('fetches availableBiddersIds', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: 'cdo/availablebidders/ids/', response: [200, {}],
    })); mock();

    store.dispatch(actions.availableBiddersIds());

    expectMockWasCalled({ spy, cb: done });
  });

  it('handles errors when fetching availableBiddersIds', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: 'cdo/availablebidders/ids/', response: [404, null],
    })); mock();

    store.dispatch(actions.availableBiddersIds());

    expectMockWasCalled({ spy, cb: done });
  });

  it('fetches availableBiddersFetchData', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: 'cdo/availablebidders/?ordering=Name', response: [200, {}],
    })); mock();

    store.dispatch(actions.availableBiddersFetchData(true));

    expectMockWasCalled({ spy, cb: done });
  });

  it('handles errors when fetching availableBiddersFetchData', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: 'cdo/availablebidders/?ordering=Name', response: [404, null],
    })); mock();

    store.dispatch(actions.availableBiddersFetchData(true));

    expectMockWasCalled({ spy, cb: done });
  });

  it('fetches availableBiddersToggleUser - PUT', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: 'cdo/1/availablebidders/', response: [200, {}], type: 'onPut',
    })); mock();

    store.dispatch(actions.availableBiddersToggleUser(1));

    expectMockWasCalled({ spy, cb: done });
  });

  it('handles errors when fetching availableBiddersToggleUser - PUT', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: 'cdo/1/availablebidders/', response: [404, null], type: 'onPut',
    })); mock();

    store.dispatch(actions.availableBiddersToggleUser(1));

    expectMockWasCalled({ spy, cb: done });
  });
});
