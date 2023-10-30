export function bureauExceptionErrored(state = false, action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTION_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bureauExceptionLoading(state = false, action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTION_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function bureauExceptionSuccess(state = [], action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTION_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

export function bureauExceptionListErrored(state = false, action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTION_LIST_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bureauExceptionListLoading(state = false, action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTION_LIST_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function bureauExceptionListSuccess(state = [], action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTION_LIST_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
