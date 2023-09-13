export function bureauExceptionsFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTIONS_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bureauExceptionsFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTIONS_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function bureauExceptions(state = [], action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTIONS_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

export function bureauExceptionsOptions(state = [], action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTIONS_OPTIONS_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

export function bureauExceptionsSelections(state = {}, action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTIONS_SELECTIONS_SAVE_SUCCESS':
      return action.result;
    default:
      return state;
  }
}

export function bureauExceptionsPositionSearchFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTIONS_POSITION_SEARCH_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bureauExceptionsPositionSearchFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTIONS_POSITION_SEARCH_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function bureauExceptionsPositionSearchSelections(state = {}, action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTIONS_POSITION_SEARCH_SELECTIONS_SAVE_SUCCESS':
      return action.result;
    default:
      return state;
  }
}

export function bureauExceptionsPositionRemoveHasErrored(state = false, action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTIONS_POSITION_REMOVE_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bureauExceptionsPositionRemoveIsLoading(state = false, action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTIONS_POSITION_REMOVE_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function bureauExceptionsPositionRemoveSuccess(state = [], action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTIONS_POSITION_REMOVE_SUCCESS':
      return action.data;
    default:
      return state;
  }
}

export function bureauExceptionsPositionEditHasErrored(state = false, action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTIONS_POSITION_EDIT_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bureauExceptionsPositionEditIsLoading(state = false, action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTIONS_POSITION_EDIT_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function bureauExceptionsPositionEditSuccess(state = [], action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTIONS_POSITION_EDIT_SUCCESS':
      return action.data;
    default:
      return state;
  }
}
