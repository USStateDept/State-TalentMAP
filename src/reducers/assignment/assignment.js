export function assignmentHasErrored(state = false, action) {
  switch (action.type) {
    case 'ASSIGNMENT_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function assignmentIsLoading(state = true, action) {
  switch (action.type) {
    case 'ASSIGNMENT_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function assignment(state = [], action) {
  switch (action.type) {
    case 'ASSIGNMENT_FETCH_DATA_SUCCESS':
      return action.assignment;
    default:
      return state;
  }
}
