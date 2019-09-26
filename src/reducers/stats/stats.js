export function statsHasErrored(state = false, action) {
  switch (action.type) {
    case 'STATS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function statsIsLoading(state = false, action) {
  switch (action.type) {
    case 'STATS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function stats(state = [], action) {
  switch (action.type) {
    case 'STATS_SUCCESS':
      return action.count;
    default:
      return state;
  }
}
