export function managePostEditErrored(state = false, action) {
  switch (action.type) {
    case 'MANAGE_POST_EDIT_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

export function managePostEditLoading(state = false, action) {
  switch (action.type) {
    case 'MANAGE_POST_EDIT_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function managePostEdit(state = {}, action) {
  switch (action.type) {
    case 'MANAGE_POST_EDIT_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

export function managePostFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'MANAGE_POST_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

export function managePostFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'MANAGE_POST_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function managePost(state = {}, action) {
  switch (action.type) {
    case 'MANAGE_POST_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

export function managePostSelections(state = {}, action) {
  switch (action.type) {
    case 'MANAGE_POST_SELECTIONS_SAVE_SUCCESS':
      return action.result;
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
