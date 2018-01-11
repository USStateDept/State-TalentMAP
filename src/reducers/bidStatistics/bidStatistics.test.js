import * as reducers from './bidStatistics';

describe('reducers', () => {
  it('can set reducer BID_STATISTICS_HAS_ERRORED', () => {
    expect(reducers.bidStatisticsHasErrored(false, { type: 'BID_STATISTICS_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer BID_STATISTICS_IS_LOADING', () => {
    expect(reducers.bidStatisticsIsLoading(false, { type: 'BID_STATISTICS_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer BID_STATISTICS_FETCH_DATA_SUCCESS', () => {
    expect(reducers.bidStatistics({ id: 2 }, { type: 'BID_STATISTICS_FETCH_DATA_SUCCESS', bidStatistics: { id: 1 } }).id).toBe(1);
  });
});
