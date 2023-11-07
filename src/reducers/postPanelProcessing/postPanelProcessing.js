// =============== FETCH DATA ===============

export function postPanelProcessingFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'POST_PANEL_PROCESSING_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function postPanelProcessingFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'POST_PANEL_PROCESSING_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function postPanelProcessingFetchDataSuccess(state = {}, action) {
  switch (action.type) {
    case 'POST_PANEL_PROCESSING_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

// =============== CREATE DATA ===============

export function editPostPanelProcessingHasErrored(state = false, action) {
  switch (action.type) {
    case 'EDIT_POST_PANEL_PROCESSING_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

export function editPostPanelProcessingIsLoading(state = false, action) {
  switch (action.type) {
    case 'EDIT_POST_PANEL_PROCESSING_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function editPostPanelProcessingSuccess(state = [], action) {
  switch (action.type) {
    case 'EDIT_POST_PANEL_PROCESSING_SUCCESS':
      return action.data;
    default:
      return state;
  }
}
