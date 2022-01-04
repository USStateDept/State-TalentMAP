export function bureauPositionsHasErrored(state = false, action) {
  switch (action.type) {
    case 'BUREAU_POSITIONS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bureauPositionsIsLoading(state = false, action) {
  switch (action.type) {
    case 'BUREAU_POSITIONS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function bureauPositions(state = {}, action) {
  switch (action.type) {
    case 'BUREAU_POSITIONS_FETCH_DATA_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

export function bureauUserSelections(state = {}, action) {
  switch (action.type) {
    case 'BUREAU_SELECTIONS_SAVE_SUCCESS':
      return action.result;
    default:
      return state;
  }
}
