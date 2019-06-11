export function logsHasErrored(state = false, action) {
  switch (action.type) {
    case 'LOGS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function logsIsLoading(state = false, action) {
  switch (action.type) {
    case 'LOGS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function logsSuccess(state = '', action) {
  switch (action.type) {
    case 'LOGS_SUCCESS':
      return action.success;
    default:
      return state;
  }
}
