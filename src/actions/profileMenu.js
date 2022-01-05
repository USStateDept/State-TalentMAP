export function profileMenuExpanded(isExpanded) {
  return {
    type: 'PROFILE_MENU_EXPANDED',
    isExpanded,
  };
}

export function profileMenuSectionExpanded(isExpanded) {
  return {
    type: 'PROFILE_MENU_SECTION_EXPANDED',
    isExpanded,
  };
}

// Store the value of the profile menu being expanded or not
export function setProfileMenuExpanded(bool) {
  return (dispatch) => {
    dispatch(profileMenuExpanded(bool));
  };
}

// If section is empty string, no section is expanded.
export function setProfileMenuSectionExpanded(section) {
  return (dispatch) => {
    dispatch(profileMenuSectionExpanded(section));
  };
}
