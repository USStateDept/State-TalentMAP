import * as reducers from './comparisons';

describe('reducers', () => {
  it('can set reducer COMPARISONS_HAS_ERRORED', () => {
    expect(reducers.comparisonsHasErrored(false, { type: 'COMPARISONS_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer COMPARISONS_IS_LOADING', () => {
    expect(reducers.comparisonsIsLoading(false, { type: 'COMPARISONS_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer COMPARISONS_FETCH_DATA_SUCCESS', () => {
    expect(reducers.comparisons([], { type: 'COMPARISONS_FETCH_DATA_SUCCESS', comparisons: true })).toBe(true);
  });
});
