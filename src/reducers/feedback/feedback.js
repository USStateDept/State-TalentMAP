export function feedbackHasErrored(state = { hasErrored: false, message: null }, action) {
  switch (action.type) {
    case 'FEEDBACK_HAS_ERRORED':
      return action.hasErrored ?
        { hasErrored: true, message: action.hasErrored } :
        { hasErrored: false, message: null };
    default:
      return state;
  }
}
export function feedbackIsSending(state = false, action) {
  switch (action.type) {
    case 'FEEDBACK_IS_SENDING':
      return action.isLoading;
    default:
      return state;
  }
}
export function feedbackSuccess(state = false, action) {
  switch (action.type) {
    case 'FEEDBACK_SUCCESS':
      return action.isSuccess;
    default:
      return state;
  }
}
