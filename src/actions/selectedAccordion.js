export function selectedAccordion(accordion) {
  return {
    type: 'SELECTED_ACCORDION',
    accordion,
  };
}

export function setSelectedAccordion(accordion) {
  return (dispatch) => {
    dispatch(selectedAccordion(accordion));
  };
}
