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

  it('can set reducer PUT_ALL_SYNCS_HAS_ERRORED', () => {
    expect(reducers.putAllSyncsHasErrored(false, { type: 'PUT_ALL_SYNCS_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer PUT_ALL_SYNCS_IS_LOADING', () => {
    expect(reducers.putAllSyncsIsLoading(false, { type: 'PUT_ALL_SYNCS_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer PUT_ALL_SYNCS_SUCCESS', () => {
    expect(reducers.putAllSyncsSuccess(true, { type: 'PUT_ALL_SYNCS_SUCCESS', success: false })).toBe(false);
  });

  it('can set reducer PATCH_SYNC_HAS_ERRORED', () => {
    expect(reducers.patchSyncHasErrored(false, { type: 'PATCH_SYNC_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer PATCH_SYNC_IS_LOADING', () => {
    expect(reducers.patchSyncIsLoading(false, { type: 'PATCH_SYNC_IS_LOADING', isLoading: true })).toBe(true);
  });
});
