export function positionDetailsHasErrored(state = false, action) {
  switch (action.type) {
    case 'POSITION_DETAILS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function positionDetailsIsLoading(state = false, action) {
  switch (action.type) {
    case 'POSITION_DETAILS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function positionDetails(state = [], action) {
  switch (action.type) {
    case 'POSITION_DETAILS_FETCH_DATA_SUCCESS':
      return action.positionDetails;
    default:
      return state;
  }
}
