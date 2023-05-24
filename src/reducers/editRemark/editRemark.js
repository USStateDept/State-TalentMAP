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

export function saveAdminRemarkSuccess(state = [], action) {
  switch (action.type) {
    case 'SAVE_ADMIN_REMARK_SUCCESS':
      return action.data;
    default:
      return state;
  }
}
