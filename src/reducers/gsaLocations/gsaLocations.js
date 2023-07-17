export function gsaLocationsFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'GSA_LOCATIONS_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function gsaLocationsFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'GSA_LOCATIONS_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function gsaLocations(state = {}, action) {
  switch (action.type) {
    case 'GSA_LOCATIONS_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

