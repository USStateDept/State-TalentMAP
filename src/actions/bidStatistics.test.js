import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './bidStatistics';
import { bidStatisticsList } from '../__mocks__/bidStatistics';

const { mockStore, mockAdapter } = setupAsyncMocks();

describe('async actions', () => {
  beforeEach(() => {
    mockAdapter.onGet('http://localhost:8000/api/v1/bidcycle/statistics/?ordering=-cycle_start_date&limit=1').reply(200,
      bidStatisticsList,
    );

    mockAdapter.onGet('http://localhost:8000/api/v1/bidcycle/statistics/?custom=true').reply(200,
      { results: [] },
    );

    mockAdapter.onGet('http://localhost:8000/api/v1/bidcycle/statistics/?fake=true').reply(404,
      {},
    );
  });

  it('can fetch bidcycle statistics', (done) => {
    const store = mockStore({ bidStatistics: {} });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.bidStatisticsFetchData());
        store.dispatch(actions.bidStatisticsIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it('can handle an empty results array', (done) => {
    const store = mockStore({ bidStatistics: {} });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.bidStatisticsFetchData('?custom=true'));
        store.dispatch(actions.bidStatisticsIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it('can handle errors', (done) => {
    const store = mockStore({ bidStatistics: {} });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.bidStatisticsFetchData('?fake=true'));
        store.dispatch(actions.bidStatisticsIsLoading());
        done();
      }, 0);
    };
    f();
  });
});
