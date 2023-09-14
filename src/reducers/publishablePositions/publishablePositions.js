export function publishablePositionsHasErrored(state = false, action) {
  switch (action.type) {
    case 'PUBLISHABLE_POSITIONS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function publishablePositionsIsLoading(state = false, action) {
  switch (action.type) {
    case 'PUBLISHABLE_POSITIONS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function publishablePositions(state = {}, action) {
  switch (action.type) {
    case 'PUBLISHABLE_POSITIONS_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

export function publishablePositionsSelections(state = {}, action) {
  switch (action.type) {
    case 'PUBLISHABLE_POSITIONS_SELECTIONS_SUCCESS':
      return action.result;
    default:
      return state;
  }
}

export function publishablePositionsFiltersHasErrored(state = false, action) {
  switch (action.type) {
    case 'PUBLISHABLE_POSITIONS_FILTERS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function publishablePositionsFiltersIsLoading(state = false, action) {
  switch (action.type) {
    case 'PUBLISHABLE_POSITIONS_FILTERS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function publishablePositionsFilters(state = {}, action) {
  switch (action.type) {
    case 'PUBLISHABLE_POSITIONS_FILTERS_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
