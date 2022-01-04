export function selectedSearchbarFilters(filters) {
  return {
    type: 'SELECTED_SEARCHBAR_FILTERS',
    filters,
  };
}

export function setSelectedSearchbarFilters(filters) {
  return (dispatch) => {
    dispatch(selectedSearchbarFilters(filters));
  };
}
