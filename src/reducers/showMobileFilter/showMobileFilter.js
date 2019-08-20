export default function shouldShowMobileFilter(state = false, action) {
  switch (action.type) {
    case 'SHOULD_SHOW_MOBILE_FILTER':
      return action.shouldShow;
    default:
      return state;
  }
}
