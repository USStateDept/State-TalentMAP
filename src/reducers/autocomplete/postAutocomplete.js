export function postSearchHasErrored(state = false, action) {
  switch (action.type) {
    case 'POST_SEARCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function postSearchIsLoading(state = false, action) {
  switch (action.type) {
    case 'POST_SEARCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function postSearchSuccess(state = [], action) {
  switch (action.type) {
    case 'POST_SEARCH_FETCH_DATA_SUCCESS':
      return action.posts;
    default:
      return state;
  }
}
