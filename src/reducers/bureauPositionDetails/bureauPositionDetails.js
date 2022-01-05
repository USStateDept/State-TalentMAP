export function bureauPositionDetailsHasErrored(state = false, action) {
  switch (action.type) {
    case 'BUREAU_POSITION_DETAILS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bureauPositionDetailsIsLoading(state = false, action) {
  switch (action.type) {
    case 'BUREAU_POSITION_DETAILS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function bureauPositionDetails(state = {}, action) {
  switch (action.type) {
    case 'BUREAU_POSITION_DETAILS_FETCH_DATA_SUCCESS':
      return action.bureauPositionDetails;
    default:
      return state;
  }
}
