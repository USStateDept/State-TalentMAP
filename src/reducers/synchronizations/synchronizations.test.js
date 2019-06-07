import * as reducers from './synchronizations';

describe('reducers', () => {
  it('can set reducer SYNCS_HAS_ERRORED', () => {
    expect(reducers.syncsHasErrored(false, { type: 'SYNCS_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer SYNCS_IS_LOADING', () => {
    expect(reducers.syncsIsLoading(false, { type: 'SYNCS_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer SYNCS_FETCH_DATA_SUCCESS', () => {
    expect(reducers.syncs(null, { type: 'SYNCS_FETCH_DATA_SUCCESS', syncs: [] })).toEqual([]);
  });
});
