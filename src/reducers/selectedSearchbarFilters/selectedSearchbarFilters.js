export default function selectedSearchbarFilters(state = {}, action) {
  switch (action.type) {
    case 'SELECTED_SEARCHBAR_FILTERS':
      return action.filters;
    // reset on route change
    case '@@router/LOCATION_CHANGE':
      return { position_q: '' };
    default:
      return state;
  }
}
