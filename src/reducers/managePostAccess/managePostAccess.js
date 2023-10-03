export function managePostEdit(state = false, action) {
  switch (action.type) {
    case 'MANAGE_POST_EDIT_SUCCESS':
      return action.success;
    default:
      return state;
  }
}


export function managePostFetchFiltersErrored(state = false, action) {
  switch (action.type) {
    case 'MANAGE_POST_FETCH_FILTERS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function managePostFetchFiltersLoading(state = false, action) {
  switch (action.type) {
    case 'MANAGE_POST_FETCH_FILTERS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function managePostFetchFilterData(state = [], action) {
  switch (action.type) {
    case 'MANAGE_POST_FETCH_FILTERS_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
