// ================ ASSIGNMENT LIST ================

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
export function assignment(state = { assignments: [], separations: [] }, action) {
  switch (action.type) {
    case 'ASSIGNMENT_FETCH_DATA_SUCCESS':
      return action.assignment;
    default:
      return state;
  }
}

// ================ ALTERNATIVE ASSIGNMENTS AND SEPARATIONS LIST ================

export function altAssignmentsSeparationsErrored(state = false, action) {
  switch (action.type) {
    case 'ALT_ASSIGNMENTS_SEPARATIONS_FETCH_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function altAssignmentsSeparationsLoading(state = true, action) {
  switch (action.type) {
    case 'ALT_ASSIGNMENTS_SEPARATIONS_FETCH_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function altAssignmentsSeparations(state = [], action) {
  switch (action.type) {
    case 'ALT_ASSIGNMENTS_SEPARATIONS_FETCH_SUCCESS':
      return action.data;
    default:
      return state;
  }
}

// ================ ALTERNATIVE ASSIGNMENT DETAIL ================

export function altAssignmentErrored(state = false, action) {
  switch (action.type) {
    case 'ALT_ASSIGNMENT_FETCH_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function altAssignmentLoading(state = true, action) {
  switch (action.type) {
    case 'ALT_ASSIGNMENT_FETCH_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function altAssignment(state = [], action) {
  switch (action.type) {
    case 'ALT_ASSIGNMENT_FETCH_SUCCESS':
      return action.data;
    default:
      return state;
  }
}

// ================ ALTERNATIVE SEPARATION DETAIL ================

export function altSeparationErrored(state = false, action) {
  switch (action.type) {
    case 'ALT_SEPARATION_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function altSeparationLoading(state = true, action) {
  switch (action.type) {
    case 'ALT_SEPARATION_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function altSeparation(state = [], action) {
  switch (action.type) {
    case 'ALT_SEPARATION_SUCCESS':
      return action.data;
    default:
      return state;
  }
}
