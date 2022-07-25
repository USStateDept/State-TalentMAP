import * as reducers from './positions';

describe('reducers', () => {
  it('can set reducer POSITIONS_HAS_ERRORED', () => {
    expect(reducers.positionsHasErrored(false, { type: 'POSITIONS_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer POSITIONS_IS_LOADING', () => {
    expect(reducers.positionsIsLoading(false, { type: 'POSITIONS_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer POSITIONS_SUCCESS', () => {
    expect(reducers.positions([], { type: 'POSITIONS_SUCCESS', data: true })).toBe(true);
  });
});
