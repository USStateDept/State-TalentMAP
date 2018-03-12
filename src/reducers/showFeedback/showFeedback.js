export default function shouldShowFeedback(state = false, action) {
  switch (action.type) {
    case 'SHOULD_SHOW_FEEDBACK':
      return action.shouldShow;
    // close Feedback on route change
    case '@@router/LOCATION_CHANGE':
      return false;
    default:
      return state;
  }
}
