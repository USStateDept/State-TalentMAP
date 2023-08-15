export function cycleManagementFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'CYCLE_MANAGEMENT_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function cycleManagementFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'CYCLE_MANAGEMENT_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function cycleManagement(state = [], action) {
  switch (action.type) {
    case 'CYCLE_MANAGEMENT_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

export function cycleManagementSelections(state = {}, action) {
  switch (action.type) {
    case 'CYCLE_MANAGEMENT_SELECTIONS_SAVE_SUCCESS':
      return action.result;
    default:
      return state;
  }
}

export function cyclePositionSearchFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'CYCLE_POSITION_SEARCH_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function cyclePositionSearchFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'CYCLE_POSITION_SEARCH_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function cyclePositionSearch(state = [], action) {
  switch (action.type) {
    case 'CYCLE_POSITION_SEARCH_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

export function cyclePositionSearchSelections(state = {}, action) {
  switch (action.type) {
    case 'CYCLE_POSITION_SEARCH_SELECTIONS_SAVE_SUCCESS':
      return action.result;
    default:
      return state;
  }
}

export function cyclePositionRemoveHasErrored(state = false, action) {
  switch (action.type) {
    case 'CYCLE_POSITION_REMOVE_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function cyclePositionRemoveIsLoading(state = false, action) {
  switch (action.type) {
    case 'CYCLE_POSITION_REMOVE_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function cyclePositionRemoveSuccess(state = [], action) {
  switch (action.type) {
    case 'CYCLE_POSITION_REMOVE_SUCCESS':
      return action.data;
    default:
      return state;
  }
}

export function cyclePositionEditHasErrored(state = false, action) {
  switch (action.type) {
    case 'CYCLE_POSITION_EDIT_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function cyclePositionEditIsLoading(state = false, action) {
  switch (action.type) {
    case 'CYCLE_POSITION_EDIT_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function cyclePositionEditSuccess(state = [], action) {
  switch (action.type) {
    case 'CYCLE_POSITION_EDIT_SUCCESS':
      return action.data;
    default:
      return state;
  }
}