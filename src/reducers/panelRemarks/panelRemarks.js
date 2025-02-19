/* eslint-disable no-console */

// ======= Panel Remarks: Get Panel Remarks =======
export function panelRemarksFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'PANEL_REMARKS_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

export function panelRemarksFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'PANEL_REMARKS_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

const initialState = {
  results: [],
};
export function panelRemarks(state = initialState, action) {
  console.log('inside panelRemarks reducer');
  console.log('panelRemarks action', action);
  console.log('panelRemarks action.data:', action.data);
  // console.log('panelRemarks data.results:', action.data.results);
  switch (action.type) {
    case 'PANEL_REMARKS_FETCH_SUCCESS':
      return {
        results: action.results,
      };
    default:
      return state;
  }
}

// ======= Panel Remarks: Get Remark Categories =======
export function panelRemarksCategoriesFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'PANEL_REMARKS_CATEGORIES_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

export function panelRemarksCategoriesFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'PANEL_REMARKS_CATEGORIES_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function panelRemarksCategories(state = [], action) {
  switch (action.type) {
    case 'PANEL_REMARKS_CATEGORIES_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
