import * as reducers from './positionDetails';

describe('reducers', () => {
  it('can set reducer POSITION_DETAILS_HAS_ERRORED', () => {
    expect(reducers.positionDetailsHasErrored(false, { type: 'POSITION_DETAILS_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer POSITION_DETAILS_IS_LOADING', () => {
    expect(reducers.positionDetailsIsLoading(false, { type: 'POSITION_DETAILS_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer POSITION_DETAILS_FETCH_DATA_SUCCESS', () => {
    expect(reducers.positionDetails([], { type: 'POSITION_DETAILS_FETCH_DATA_SUCCESS', positionDetails: true })).toBe(true);
  });
});
