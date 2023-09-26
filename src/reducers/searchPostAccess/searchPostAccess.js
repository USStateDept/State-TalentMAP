export function searchPostAccessFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'SEARCH_POST_ACCESS_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function searchPostAccessFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'SEARCH_POST_ACCESS_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function searchPostAccess(state = [], action) {
  switch (action.type) {
    case 'SEARCH_POST_ACCESS_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}


export function searchPostAccessSelections(state = {}, action) {
  switch (action.type) {
    case 'SEARCH_POST_ACCESS_SELECTIONS_SAVE_SUCCESS':
      return action.result;
    default:
      return state;
  }
}


export function searchPostAccessRemoveHasErrored(state = false, action) {
  switch (action.type) {
    case 'SEARCH_POST_ACCESS_REMOVE_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function searchPostAccessRemoveIsLoading(state = false, action) {
  switch (action.type) {
    case 'SEARCH_POST_ACCESS_REMOVE_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function searchPostAccessRemoveSuccess(state = [], action) {
  switch (action.type) {
    case 'SEARCH_POST_ACCESS_REMOVE_SUCCESS':
      return action.results;
    default:
      return state;
  }
}


export function searchPostAccessFetchFiltersErrored(state = false, action) {
  switch (action.type) {
    case 'SEARCH_POST_ACCESS_FETCH_FILTERS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function searchPostAccessFetchFiltersLoading(state = false, action) {
  switch (action.type) {
    case 'SEARCH_POST_ACCESS_FETCH_FILTERS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function searchPostAccessFetchFilterData(state = [], action) {
  switch (action.type) {
    case 'SEARCH_POST_ACCESS_FETCH_FILTERS_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
