import * as reducers from './bureauPositionDetails';

describe('assignment reducers', () => {
  it('can set reducer BUREAU_POSITION_DETAILS_HAS_ERRORED', () => {
    expect(reducers.bureauPositionDetailsHasErrored(false, { type: 'BUREAU_POSITION_DETAILS_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer BUREAU_POSITION_DETAILS_IS_LOADING', () => {
    expect(reducers.bureauPositionDetailsIsLoading(false, { type: 'BUREAU_POSITION_DETAILS_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer BUREAU_POSITION_DETAILS_FETCH_DATA_SUCCESS', () => {
    expect(reducers.bureauPositionDetails(false, { type: 'BUREAU_POSITION_DETAILS_FETCH_DATA_SUCCESS', bureauPositionDetails: {} })).toEqual({});
  });
});
