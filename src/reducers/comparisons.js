export function comparisonsHasErrored(state = false, action) {
  switch (action.type) {
    case 'COMPARISONS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function comparisonsIsLoading(state = false, action) {
  switch (action.type) {
    case 'COMPARISONS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function comparisons(state = [], action) {
  switch (action.type) {
    case 'COMPARISONS_FETCH_DATA_SUCCESS':
      return action.comparisons;
    default:
      return state;
  }
}
