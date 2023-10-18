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

export function bureauExceptionsBureauDataFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTION_BUREAU_DATA_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bureauExceptionsBureauDataFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTIONS_BUREAU_DATA_FETCH_IS_LOADING':
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
