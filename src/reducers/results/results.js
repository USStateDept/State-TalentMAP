export function resultsHasErrored(state = false, action) {
  switch (action.type) {
    case 'RESULTS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function resultsIsLoading(state = false, action) {
  switch (action.type) {
    case 'RESULTS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function results(state = {}, action) {
  switch (action.type) {
    case 'RESULTS_FETCH_DATA_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

export function similarPositionsHasErrored(state = false, action) {
  switch (action.type) {
    case 'RESULTS_SIMILAR_POSITIONS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function similarPositionsIsLoading(state = false, action) {
  switch (action.type) {
    case 'RESULTS_SIMILAR_POSITIONS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function similarPositions(state = {}, action) {
  switch (action.type) {
    case 'RESULTS_SIMILAR_POSITIONS_FETCH_DATA_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
