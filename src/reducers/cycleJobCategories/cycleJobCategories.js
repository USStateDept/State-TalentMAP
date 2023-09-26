// =================== CYCLE JOB CATEGORIES DATA ===================

export function cycleJobCategoriesData(state = {}, action) {
  switch (action.type) {
    case 'CYCLE_JOB_CATEGORIES_DATA_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
export function cycleJobCategoriesDataErrored(state = false, action) {
  switch (action.type) {
    case 'CYCLE_JOB_CATEGORIES_DATA_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function cycleJobCategoriesDataLoading(state = false, action) {
  switch (action.type) {
    case 'CYCLE_JOB_CATEGORIES_DATA_IS_LOADING':
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
export function cycleJobCategoriesEditErrored(state = false, action) {
  switch (action.type) {
    case 'CYCLE_JOB_CATEGORIES_EDIT_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function cycleJobCategoriesEditLoading(state = false, action) {
  switch (action.type) {
    case 'CYCLE_JOB_CATEGORIES_EDIT_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

// =================== CYCLE JOB CATEGORIES FILTERS ===================

export function cycleJobCategoriesFilters(state = {}, action) {
  switch (action.type) {
    case 'CYCLE_JOB_CATEGORIES_FILTERS_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
export function cycleJobCategoriesFiltersErrored(state = false, action) {
  switch (action.type) {
    case 'CYCLE_JOB_CATEGORIES_FILTERS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function cycleJobCategoriesFiltersLoading(state = false, action) {
  switch (action.type) {
    case 'CYCLE_JOB_CATEGORIES_FILTERS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
