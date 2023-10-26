export function bureauExceptionFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTION_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bureauExceptionFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTION_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function bureauExceptionBureauDataFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTION_BUREAU_DATA_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bureauExceptionBureauDataFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTION_BUREAU_DATA_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function bureauException(state = [], action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTION_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

export function bureauExceptionOptions(state = [], action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTION_OPTIONS_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
