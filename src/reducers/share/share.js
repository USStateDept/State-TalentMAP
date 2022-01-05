export function shareHasErrored(state = false, action) {
  switch (action.type) {
    case 'SHARE_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function shareIsSending(state = false, action) {
  switch (action.type) {
    case 'SHARE_IS_SENDING':
      return action.isLoading;
    default:
      return state;
  }
}
export function share(state = false, action) {
  switch (action.type) {
    case 'SHARE_SUCCESS':
      return true;
    default:
      return state;
  }
}
