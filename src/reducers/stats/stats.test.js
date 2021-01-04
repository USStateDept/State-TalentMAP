import * as reducers from './stats';

describe('reducers', () => {
  it('can set reducer STATS_HAS_ERRORED to true', () => {
    expect(reducers.statsHasErrored(false, { type: 'STATS_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer STATS_HAS_ERRORED to false', () => {
    expect(reducers.statsHasErrored(true, { type: 'STATS_HAS_ERRORED', hasErrored: false })).toBe(false);
  });

  it('can set reducer STATS_HAS_ERRORED default', () => {
    expect(reducers.statsHasErrored(false, { type: 'DEFAULT' })).toBe(false);
  });

  it('can set reducer STATS_IS_LOADING to true', () => {
    expect(reducers.statsIsLoading(false, { type: 'STATS_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer STATS_IS_LOADING to false', () => {
    expect(reducers.statsIsLoading(false, { type: 'STATS_IS_LOADING', isLoading: false })).toBe(false);
  });

  it('can set reducer STATS_IS_LOADING default', () => {
    expect(reducers.statsIsLoading(false, { type: 'DEFAULT', isLoading: false })).toBe(false);
  });

  it('can set reducer STATS_SUCCESS', () => {
    expect(reducers.stats([], { type: 'STATS_SUCCESS', count: 42 })).toBe(42);
  });

  it('can set reducer STATS_SUCCESS default', () => {
    expect(reducers.stats([], { type: 'DEFAULT' })).toEqual([]);
  });

  it('can set reducer STATS_INTERVALS_HAS_ERRORED', () => {
    expect(reducers.statsIntervalsHasErrored(true, { type: 'STATS_INTERVALS_HAS_ERRORED', hasErrored: false })).toBe(false);
  });

  it('can set reducer STATS_INTERVALS_IS_LOADING', () => {
    expect(reducers.statsIntervalsIsLoading(true, { type: 'STATS_INTERVALS_IS_LOADING', isLoading: false })).toBe(false);
  });

  it('can set reducer STATS_INTERVALS_SUCCESS', () => {
    expect(reducers.statsIntervals(true, { type: 'STATS_INTERVALS_SUCCESS', count: false })).toBe(false);
  });
});
