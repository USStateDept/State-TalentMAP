import * as reducers from './bureauPositionBids';

describe('bureauPositionBids reducers', () => {
  it('can set reducer BUREAU_POSITION_BIDS_HAS_ERRORED', () => {
    expect(reducers.bureauPositionBidsHasErrored(false, { type: 'BUREAU_POSITION_BIDS_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer BUREAU_POSITION_BIDS_IS_LOADING', () => {
    expect(reducers.bureauPositionBidsIsLoading(false, { type: 'BUREAU_POSITION_BIDS_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer BUREAU_POSITION_BIDS_FETCH_DATA_SUCCESS', () => {
    expect(reducers.bureauPositionBids(false, { type: 'BUREAU_POSITION_BIDS_FETCH_DATA_SUCCESS', bids: [] })).toEqual([]);
  });

  it('can set reducer BUREAU_POSITION_BIDS_ALL_HAS_ERRORED', () => {
    expect(reducers.bureauPositionBidsAllHasErrored(false, { type: 'BUREAU_POSITION_BIDS_ALL_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer BUREAU_POSITION_BIDS_ALL_IS_LOADING', () => {
    expect(reducers.bureauPositionBidsAllIsLoading(false, { type: 'BUREAU_POSITION_BIDS_ALL_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer BUREAU_POSITION_BIDS_ALL_FETCH_DATA_SUCCESS', () => {
    expect(reducers.bureauPositionBidsAll(false, { type: 'BUREAU_POSITION_BIDS_ALL_FETCH_DATA_SUCCESS', bids: [] })).toEqual([]);
  });

  it('can set reducer BUREAU_POSITION_BIDS_RANKING_HAS_ERRORED', () => {
    expect(reducers.bureauPositionBidsRankingHasErrored(false, { type: 'BUREAU_POSITION_BIDS_RANKING_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer BUREAU_POSITION_BIDS_RANKING_IS_LOADING', () => {
    expect(reducers.bureauPositionBidsRankingIsLoading(false, { type: 'BUREAU_POSITION_BIDS_RANKING_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer BUREAU_POSITION_BIDS_RANKING_FETCH_DATA_SUCCESS', () => {
    expect(reducers.bureauPositionBidsRanking(false, { type: 'BUREAU_POSITION_BIDS_RANKING_FETCH_DATA_SUCCESS', bids: [] })).toEqual([]);
  });

  it('can set reducer BUREAU_POSITION_BIDS_SET_RANKING_HAS_ERRORED', () => {
    expect(reducers.bureauPositionBidsSetRankingHasErrored(false, { type: 'BUREAU_POSITION_BIDS_SET_RANKING_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer BUREAU_POSITION_BIDS_SET_RANKING_IS_LOADING', () => {
    expect(reducers.bureauPositionBidsSetRankingIsLoading(false, { type: 'BUREAU_POSITION_BIDS_SET_RANKING_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer BUREAU_POSITION_BIDS_SET_RANKING_FETCH_DATA_SUCCESS', () => {
    expect(reducers.bureauPositionBidsSetRanking(false, { type: 'BUREAU_POSITION_BIDS_SET_RANKING_FETCH_DATA_SUCCESS', success: true })).toBe(true);
  });
});
