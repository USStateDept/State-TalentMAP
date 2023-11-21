export function userBureauExceptionsAndMetaDataHasErrored(state = false, action) {
  switch (action.type) {
    case 'USER_BUREAU_EXCEPTIONS_AND_METADATA_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function userBureauExceptionsAndMetaDataIsLoading(state = false, action) {
  switch (action.type) {
    case 'USER_BUREAU_EXCEPTIONS_AND_METADATA_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function userBureauExceptionsAndMetaData(state = {}, action) {
  switch (action.type) {
    case 'USER_BUREAU_EXCEPTIONS_AND_METADATA_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

export function bureauExceptionsRefDataBureausHasErrored(state = false, action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTIONS_REF_DATA_BUREAUS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bureauExceptionsRefDataBureausIsLoading(state = false, action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTIONS_REF_DATA_BUREAUS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function bureauExceptionsRefDataBureaus(state = [], action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTIONS_REF_DATA_BUREAUS_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

export function bureauExceptionsHasErrored(state = false, action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTIONS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bureauExceptionsIsLoading(state = false, action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTIONS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function bureauExceptions(state = [], action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTIONS_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
