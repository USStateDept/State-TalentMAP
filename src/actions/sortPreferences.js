export function sortPreference(key, value) {
  return {
    type: 'SET_SORT_PREFERENCE',
    key,
    value,
  };
}

export function setSortPreference(key, value) {
  return (dispatch) => {
    dispatch(sortPreference(key, value));
  };
}
