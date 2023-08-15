export function publishablePositionsErrored(state = false, action) {
  switch (action.type) {
    case 'PUBLISHABLE_POSITIONS_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function publishablePositionsLoading(state = false, action) {
  switch (action.type) {
    case 'PUBLISHABLE_POSITIONS_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function publishablePositions(state = {}, action) {
  switch (action.type) {
    case 'PUBLISHABLE_POSITIONS_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

export function publishablePositionEditErrored(state = false, action) {
  switch (action.type) {
    case 'PUBLISHABLE_POSITION_EDIT_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function publishablePositionEditLoading(state = false, action) {
  switch (action.type) {
    case 'PUBLISHABLE_POSITION_EDIT_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function publishablePositionEdit(state = {}, action) {
  switch (action.type) {
    case 'PUBLISHABLE_POSITION_EDIT_SUCCESS':
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

export function publishablePositionsFiltersErrored(state = false, action) {
  switch (action.type) {
    case 'PUBLISHABLE_POSITIONS_FILTERS_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function publishablePositionsFiltersLoading(state = false, action) {
  switch (action.type) {
    case 'PUBLISHABLE_POSITIONS_FILTERS_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function publishablePositionsFilters(state = {}, action) {
  switch (action.type) {
    case 'PUBLISHABLE_POSITIONS_FILTERS_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}