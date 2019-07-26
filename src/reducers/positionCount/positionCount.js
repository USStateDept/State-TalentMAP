export function positionCountHasErrored(state = false, action) {
  switch (action.type) {
    case 'POSITION_COUNT_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function positionCountIsLoading(state = false, action) {
  switch (action.type) {
    case 'POSITION_COUNT_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function positionCount(state = 0, action) {
  switch (action.type) {
    case 'POSITION_COUNT_SUCCESS':
      return action.count;
    default:
      return state;
  }
}
