export function saveAdminRemarkHasErrored(state = false, action) {
  switch (action.type) {
    case 'SAVE_ADMIN_REMARK_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

export function saveAdminRemarkIsLoading(state = false, action) {
  switch (action.type) {
    case 'SAVE_ADMIN_REMARK_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function saveAdminRemarkSuccess(state = false, action) {
  switch (action.type) {
    case 'SAVE_ADMIN_REMARK_SUCCESS':
      return action.success;
    default:
      return state;
  }
}

export function fetchRemarksHasErrored(state = false, action) {
  switch (action.type) {
    case 'FETCH_REMARKS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

export function fetchRemarksIsLoading(state = false, action) {
  switch (action.type) {
    case 'FETCH_REMARKS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function fetchRemarksSuccess(state = {}, action) {
  switch (action.type) {
    case 'FETCH_REMARKS_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

export function fetchRemarkCategoriesHasErrored(state = false, action) {
  switch (action.type) {
    case 'FETCH_REMARK_CATEGORIES_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

export function fetchRemarkCategoriesIsLoading(state = false, action) {
  switch (action.type) {
    case 'FETCH_REMARK_CATEGORIES_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function fetchRemarkCategoriesSuccess(state = {}, action) {
  switch (action.type) {
    case 'FETCH_REMARK_CATEGORIES_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
