import * as reducers from './filters';

describe('reducers', () => {
  it('can set reducer FILTERS_HAS_ERRORED', () => {
    expect(reducers.filtersHasErrored(false, { type: 'FILTERS_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer FILTERS_IS_LOADING', () => {
    expect(reducers.filtersIsLoading(false, { type: 'FILTERS_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer FILTERS_FETCH_DATA_SUCCESS', () => {
    expect(reducers.filters([], { type: 'FILTERS_FETCH_DATA_SUCCESS', filters: true })).toBe(true);
  });
});
