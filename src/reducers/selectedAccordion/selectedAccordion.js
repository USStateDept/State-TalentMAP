export default function selectedAccordion(state = { main: '', sub: '' }, action) {
  switch (action.type) {
    case 'SELECTED_ACCORDION':
      return action.accordion;
    default:
      return state;
  }
}
