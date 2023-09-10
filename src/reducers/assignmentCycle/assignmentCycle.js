export function assignmentCycleFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'ASSIGNMENT_CYCLE_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function assignmentCycleFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'ASSIGNMENT_CYCLE_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function assignmentCycle(state = [], action) {
  switch (action.type) {
    case 'ASSIGNMENT_CYCLE_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

export function assignmentCycleSelections(state = {}, action) {
  switch (action.type) {
    case 'ASSIGNMENT_CYCLE_SELECTIONS_SAVE_SUCCESS':
      return action.result;
    default:
      return state;
  }
}
