export function aiCreateErrored(state = false, action) {
  switch (action.type) {
    case 'AI_CREATE_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function aiCreateLoading(state = false, action) {
  switch (action.type) {
    case 'AI_CREATE_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function aiCreateSuccess(state = [], action) {
  switch (action.type) {
    case 'AI_CREATE_SUCCESS':
      return action.data;
    default:
      return state;
  }
}

