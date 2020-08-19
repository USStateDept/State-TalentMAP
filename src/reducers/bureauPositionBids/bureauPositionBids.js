export function bureauPositionBidsHasErrored(state = false, action) {
  switch (action.type) {
    case 'BUREAU_POSITION_BIDS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bureauPositionBidsIsLoading(state = false, action) {
  switch (action.type) {
    case 'BUREAU_POSITION_BIDS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function bureauPositionBids(state = [], action) {
  switch (action.type) {
    case 'BUREAU_POSITION_BIDS_FETCH_DATA_SUCCESS':
      return action.bids;
    default:
      return state;
  }
}
