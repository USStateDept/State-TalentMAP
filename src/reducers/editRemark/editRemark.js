export function createRemarkError(state = false, action) {
  switch (action.type) {
    case 'CREATE_REMARK_ERROR':
      return action.hasErrored;
    default:
      return state;
  }
}

export function createRemarkLoading(state = false, action) {
  switch (action.type) {
    case 'CREATE_REMARK_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function createRemarkSuccess(state = false, action) {
  switch (action.type) {
    case 'CREATE_REMARK_SUCCESS':
      return action.data;
    default:
      return state;
  }
}
