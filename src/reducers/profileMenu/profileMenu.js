export function profileMenuExpanded(state = true, action) {
  switch (action.type) {
    case 'PROFILE_MENU_EXPANDED':
      return action.isExpanded;
    default:
      return state;
  }
}

export function profileMenuSectionExpanded(state = { title: '', display: false }, action) {
  switch (action.type) {
    case 'PROFILE_MENU_SECTION_EXPANDED':
      return action.isExpanded;
    // reset on route change
    case '@@router/LOCATION_CHANGE':
      return { title: '', display: false };
    default:
      return state;
  }
}
