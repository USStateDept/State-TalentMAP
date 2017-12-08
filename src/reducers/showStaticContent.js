export default function shouldShowStaticContent(state = false, action) {
  switch (action.type) {
    case 'SHOULD_SHOW_STATIC_CONTENT':
      return action.shouldShow;
    default:
      return state;
  }
}
