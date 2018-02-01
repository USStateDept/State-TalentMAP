export default function selectedSearchbarFilters(state = {}, action) {
  switch (action.type) {
    case 'SELECTED_SEARCHBAR_FILTERS':
      console.log(action.filters);
      return action.filters;
    default:
      return state;
  }
}
