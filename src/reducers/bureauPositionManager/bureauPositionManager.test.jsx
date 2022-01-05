import * as reducers from './bureauPositionManager';

describe('bureauPositionManager reducers', () => {
  it('can set reducer BUREAU_POSITIONS_HAS_ERRORED', () => {
    expect(reducers.bureauPositionsHasErrored(false, { type: 'BUREAU_POSITIONS_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer BUREAU_POSITIONS_IS_LOADING', () => {
    expect(reducers.bureauPositionsIsLoading(false, { type: 'BUREAU_POSITIONS_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer BUREAU_POSITIONS_FETCH_DATA_SUCCESS', () => {
    expect(reducers.bureauPositions(false, { type: 'BUREAU_POSITIONS_FETCH_DATA_SUCCESS', results: [] })).toEqual([]);
  });

  it('can set reducer BUREAU_SELECTIONS_SAVE_SUCCESS', () => {
    expect(reducers.bureauUserSelections(false, { type: 'BUREAU_SELECTIONS_SAVE_SUCCESS', result: {} })).toEqual({});
  });
});
