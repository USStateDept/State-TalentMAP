export function editAssignmentHasErrored(state = false, action) {
  switch (action.type) {
    case 'EDIT_ASSIGNMENT_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function editAssignmentIsLoading(state = true, action) {
  switch (action.type) {
    case 'EDIT_ASSIGNMENT_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function editAssignment(state = {}, action) {
  switch (action.type) {
    case 'EDIT_ASSIGNMENT_SUCCESS':
      return action.editAssignment;
    default:
      return state;
  }
}
export function createAssignmentHasErrored(state = false, action) {
  switch (action.type) {
    case 'CREATE_ASSIGNMENT_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function createAssignmentIsLoading(state = true, action) {
  switch (action.type) {
    case 'CREATE_ASSIGNMENT_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function createAssignmentSeparation(state = {}, action) {
  switch (action.type) {
    case 'CREATE_ASSIGNMENT_SUCCESS':
      return action.createAssignmentSeparation;
    default:
      return state;
  }
}
