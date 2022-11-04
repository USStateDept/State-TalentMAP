export function editPositionDetailsFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'EDIT_POSITION_DETAILS_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function editPositionDetailsFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'EDIT_POSITION_DETAILS_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function editPositionDetails(state = {}, action) {
  switch (action.type) {
    case 'EDIT_POSITION_DETAILS_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

export function editPositionDetailsSelections(state = {}, action) {
  switch (action.type) {
    case 'EDIT_POSITION_DETAILS_SELECTIONS_SAVE_SUCCESS':
      return action.result;
    default:
      return state;
  }
}

export function editPositionDetailsFiltersFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'EDIT_POSITION_DETAILS_FILTERS_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function editPositionDetailsFiltersFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'EDIT_POSITION_DETAILS_FILTERS_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function editPositionDetailsFilters(state = {}, action) {
  switch (action.type) {
    case 'EDIT_POSITION_DETAILS_FILTERS_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
