// ========== POSITION CLASSIFICATIONS FETCH ==========

export function positionClassificationsIsLoading(state = false, action) {
  switch (action.type) {
    case 'POSITION_CLASSIFICATIONS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function positionClassifications(state = [], action) {
  switch (action.type) {
    case 'POSITION_CLASSIFICATIONS_FETCH_DATA_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

// ========== POSITION CLASSIFICATIONS EDIT ==========

export function positionClassificationsEditHasErrored(state = false, action) {
  switch (action.type) {
    case 'POSITION_CLASSIFICATIONS_EDIT_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

export function positionClassificationsEditIsLoading(state = false, action) {
  switch (action.type) {
    case 'POSITION_CLASSIFICATIONS_EDIT_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function positionClassificationsEdit(state = [], action) {
  switch (action.type) {
    case 'POSITION_CLASSIFICATIONS_EDIT_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
