import * as reducers from './favoritePositions';

describe('reducers', () => {
  it('can set reducer FAVORITE_POSITIONS_HAS_ERRORED', () => {
    expect(reducers.favoritePositionsHasErrored(false, { type: 'FAVORITE_POSITIONS_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer FAVORITE_POSITIONS_IS_LOADING', () => {
    expect(reducers.favoritePositionsIsLoading(false, { type: 'FAVORITE_POSITIONS_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer FAVORITE_POSITIONS_FETCH_DATA_SUCCESS', () => {
    const original = { a: 1, b: 2 };
    const updated = { a: 'one', c: 'two' };
    const expected = { ...original, ...updated, counts: {} };
    expect(reducers.favoritePositions(original, { type: 'FAVORITE_POSITIONS_FETCH_DATA_SUCCESS', results: updated })).toEqual(expected);
  });
});
