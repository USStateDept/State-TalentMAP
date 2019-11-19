import * as reducers from './positionCount';

describe('reducers', () => {
  it('can set reducer POSITION_COUNT_HAS_ERRORED', () => {
    expect(reducers.positionCountHasErrored(false, { type: 'POSITION_COUNT_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer POSITION_COUNT_IS_LOADING', () => {
    expect(reducers.positionCountIsLoading(false, { type: 'POSITION_COUNT_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer POSITION_COUNT_SUCCESS', () => {
    expect(reducers.positionCount(5, { type: 'POSITION_COUNT_SUCCESS', count: 10 })).toBe(10);
  });
});
