export function sortPreference(key, value) {
  return {
    type: 'SET_SORT_PREFERENCE',
    key,
    value,
  };
}

export function darkModePreference(value) {
  return {
    type: 'SET_DARK_MODE_PREFERENCE',
    value,
  };
}

export function setSortPreference(key, value) {
  return (dispatch) => {
    dispatch(sortPreference(key, value));
  };
}

export function setDarkModePreference(value) {
  return (dispatch) => {
    dispatch(darkModePreference(value));
  };
}
