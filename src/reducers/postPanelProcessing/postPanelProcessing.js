export function postPanelProcessingErrored(state = false, action) {
  switch (action.type) {
    case 'POST_PANEL_PROCESSING_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function postPanelProcessingLoading(state = false, action) {
  switch (action.type) {
    case 'POST_PANEL_PROCESSING_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function postPanelProcessing(state = {}, action) {
  switch (action.type) {
    case 'POST_PANEL_PROCESSING_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

export function postPanelProcessingSelections(state = {}, action) {
  switch (action.type) {
    case 'POST_PANEL_PROCESSING_SAVE_SUCCESS':
      return action.result;
    default:
      return state;
  }
}
