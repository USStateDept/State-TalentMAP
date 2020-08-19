import * as reducers from './bureauPositionBids';

describe('assignment reducers', () => {
  it('can set reducer BUREAU_POSITION_BIDS_HAS_ERRORED', () => {
    expect(reducers.bureauPositionBidsHasErrored(false, { type: 'BUREAU_POSITION_BIDS_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer BUREAU_POSITION_BIDS_IS_LOADING', () => {
    expect(reducers.bureauPositionBidsIsLoading(false, { type: 'BUREAU_POSITION_BIDS_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer BUREAU_POSITION_BIDS_FETCH_DATA_SUCCESS', () => {
    expect(reducers.bureauPositionBids(false, { type: 'BUREAU_POSITION_BIDS_FETCH_DATA_SUCCESS', bids: [] })).toEqual([]);
  });
});
