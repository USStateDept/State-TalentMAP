export function bidderClassificationsHasErrored(state = false, action) {
  switch (action.type) {
    case 'BIDDER_CLASSIFICATIONS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

export function bidderClassificationsIsLoading(state = false, action) {
  switch (action.type) {
    case 'BIDDER_CLASSIFICATIONS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function bidderClassifications(state = [], action) {
  switch (action.type) {
    case 'BIDDER_CLASSIFICATIONS_FETCH_DATA_SUCCESS':
      return action.classifications;
    default:
      return state;
  }
}
