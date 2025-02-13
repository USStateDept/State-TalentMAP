// creating functionality to get panel remarks data from the API and dispatch actions to update the store

import {
    PANEL_REMARKS_FETCH_HAS_ERRORED,
    PANEL_REMARKS_FETCH_IS_LOADING,
    PANEL_REMARKS_FETCH_SUCCESS,
  } from 'Constants/panelRemarksActionTypes';

  export function panelRemarksFetchErrored(state = false, action) {
    switch (action.type) {
      case PANEL_REMARKS_FETCH_HAS_ERRORED:
        return action.hasErrored;
      default:
        return state;
    }
  }

  export function panelRemarksFetchLoading(state = false, action) {
    switch (action.type) {
      case PANEL_REMARKS_FETCH_IS_LOADING:
        return action.isLoading;
      default:
        return state;
    }
  }

  export function panelRemarks(state = [], action) {
    switch (action.type) {
      case PANEL_REMARKS_FETCH_SUCCESS:
        return action.data;
      default:
        return state;
    }
  }