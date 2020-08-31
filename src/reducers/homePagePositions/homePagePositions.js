export function homePageRecommendedPositionsHasErrored(state = false, action) {
  switch (action.type) {
    case 'HOME_PAGE_RECOMMENDED_POSITIONS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function homePageRecommendedPositionsIsLoading(state = false, action) {
  switch (action.type) {
    case 'HOME_PAGE_RECOMMENDED_POSITIONS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function homePageRecommendedPositions(state = {}, action) {
  switch (action.type) {
    case 'HOME_PAGE_RECOMMENDED_POSITIONS_FETCH_DATA_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
export function homePageFeaturedPositionsHasErrored(state = false, action) {
  switch (action.type) {
    case 'HOME_PAGE_FEATURED_POSITIONS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function homePageFeaturedPositionsIsLoading(state = false, action) {
  switch (action.type) {
    case 'HOME_PAGE_FEATURED_POSITIONS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function homePageFeaturedPositions(state = {}, action) {
  switch (action.type) {
    case 'HOME_PAGE_FEATURED_POSITIONS_FETCH_DATA_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
