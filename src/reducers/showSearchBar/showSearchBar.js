export default function shouldShowSearchBar(state = false, action) {
  switch (action.type) {
    case 'SHOULD_SHOW_SEARCH_BAR':
      return action.shouldShow;
    default:
      return state;
  }
}
