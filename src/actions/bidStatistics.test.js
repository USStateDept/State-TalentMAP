import { expectMockWasCalled, setupAsyncMocks, spyMockAdapter } from '../testUtilities/testUtilities';
import * as actions from './bidStatistics';
import { bidStatisticsList } from '../__mocks__/bidStatistics';

const { mockStore } = setupAsyncMocks();

describe('async actions', () => {
  let [mock, spy, store] = Array(3);

  beforeEach(() => {
    store = mockStore({ bidStatistics: {} });

    ({ mock, spy } = spyMockAdapter({
      url: '/bidcycle/statistics/?ordering=-cycle_start_date&limit=1', response: [200, bidStatisticsList],
    })); mock();
  });

  it('can fetch bidcycle statistics', (done) => {
    store.dispatch(actions.bidStatisticsFetchData());
    store.dispatch(actions.bidStatisticsIsLoading());
    expectMockWasCalled({ spy, cb: done });
  });

  it('can handle an empty results array', (done) => {
    ({ mock, spy } = spyMockAdapter({
      url: '/bidcycle/statistics/?custom=true', response: [200, { results: [] }],
    })); mock();

    store.dispatch(actions.bidStatisticsFetchData('?custom=true'));
    store.dispatch(actions.bidStatisticsIsLoading());

    expectMockWasCalled({ spy, cb: done });
  });

  it('can handle errors', (done) => {
    ({ mock, spy } = spyMockAdapter({
      url: '/bidcycle/statistics/?fake=true', response: [404],
    })); mock();
    store.dispatch(actions.bidStatisticsFetchData('?fake=true'));
    store.dispatch(actions.bidStatisticsIsLoading());
    expectMockWasCalled({ spy, cb: done });
  });
});
