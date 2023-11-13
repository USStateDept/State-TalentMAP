/* eslint-disable no-multiple-empty-lines */

export function bureauExceptionsListErrored(state = false, action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTIONS_LIST_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bureauExceptionsListLoading(state = false, action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTIONS_LIST_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function bureauExceptionsListSuccess(state = [], action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTIONS_LIST_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

export function closeAllCards(state = '', action) {
  switch (action.type) {
    case 'CLOSE_ALL_CARDS':
      return action.id;
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
