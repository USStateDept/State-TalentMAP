// =================== CYCLE CATEGORIES ===================

export function cycleCategories(state = {}, action) {
  switch (action.type) {
    case 'CYCLE_CATEGORIES_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
export function cycleCategoriesErrored(state = false, action) {
  switch (action.type) {
    case 'CYCLE_CATEGORIES_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function cycleCategoriesLoading(state = false, action) {
  switch (action.type) {
    case 'CYCLE_CATEGORIES_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

// =================== CYCLE JOB CATEGORIES ===================

export function cycleJobCategories(state = {}, action) {
  switch (action.type) {
    case 'CYCLE_JOB_CATEGORIES_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
export function cycleJobCategoriesErrored(state = false, action) {
  switch (action.type) {
    case 'CYCLE_JOB_CATEGORIES_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function cycleJobCategoriesLoading(state = false, action) {
  switch (action.type) {
    case 'CYCLE_JOB_CATEGORIES_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

// =================== CYCLE JOB CATEGORIES STATUSES ===================

export function cycleJobCategoriesStatuses(state = {}, action) {
  switch (action.type) {
    case 'CYCLE_JOB_CATEGORIES_STATUSES_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
export function cycleJobCategoriesStatusesErrored(state = false, action) {
  switch (action.type) {
    case 'CYCLE_JOB_CATEGORIES_STATUSES_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function cycleJobCategoriesStatusesLoading(state = false, action) {
  switch (action.type) {
    case 'CYCLE_JOB_CATEGORIES_STATUSES_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

// =================== CYCLE JOB CATEGORIES EDIT ===================

export function cycleJobCategoriesEdit(state = {}, action) {
  switch (action.type) {
    case 'CYCLE_JOB_CATEGORIES_EDIT_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
