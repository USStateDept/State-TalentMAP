export function homePagePositionsHasErrored(state = false, action) {
  switch (action.type) {
    case 'HOME_PAGE_POSITIONS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function homePagePositionsIsLoading(state = false, action) {
  switch (action.type) {
    case 'HOME_PAGE_POSITIONS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function homePagePositions(state = {}, action) {
  switch (action.type) {
    case 'HOME_PAGE_POSITIONS_FETCH_DATA_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
