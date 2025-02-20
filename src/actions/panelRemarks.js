/* eslint-disable no-console */

import { batch } from 'react-redux';
import { sortBy } from 'lodash';
import { CancelToken } from 'axios';
import { convertQueryToString } from 'utilities';
import api from './../api';

let cancelPanelRemarksData;

// ======================== Panel Remarks ========================
export function panelRemarksFetchDataErrored(bool) {
  return {
    type: 'PANEL_REMARKS_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function panelRemarksFetchDataLoading(bool) {
  return {
    type: 'PANEL_REMARKS_FETCH_IS_LOADING',
    isLoading: bool,
  };
}

export function panelRemarksFetchDataSuccess(results) {
  return {
    type: 'PANEL_REMARKS_FETCH_SUCCESS',
    results,
  };
}

export function fetchPanelRemarksData(query = {}) {
  return (dispatch) => {
    if (cancelPanelRemarksData) { cancelPanelRemarksData('cancel'); }
    batch(() => {
      dispatch(panelRemarksFetchDataLoading(true));
      dispatch(panelRemarksFetchDataErrored(false));
    });
    const q = convertQueryToString(query);
    const endpoint = '/fsbid/panel_remarks/remarks/';
    const ep = `${endpoint}?${q}`;
    api().get(ep, {
      cancelToken: new CancelToken((c) => { cancelPanelRemarksData = c; }),
    })
      .then(({ data }) => {
        const results = data; // just remove this? data is already an array (accordig to the console.log above)
        batch(() => {
          dispatch(panelRemarksFetchDataSuccess(results));
          dispatch(panelRemarksFetchDataErrored(false));
          dispatch(panelRemarksFetchDataLoading(false));
        });
        cancelPanelRemarksData = null;
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          batch(() => {
            dispatch(panelRemarksFetchDataErrored(true));
            dispatch(panelRemarksFetchDataLoading(false));
          });
        }
      });
  };
}

// ======================== Panel Remarks Categories ========================
export function panelRemarksCategoriesFetchDataErrored(bool) {
  return {
    type: 'PANEL_REMARKS_CATEGORIES_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function panelRemarksCategoriesFetchDataLoading(bool) {
  return {
    type: 'PANEL_REMARKS_CATEGORIES_FETCH_IS_LOADING',
    isLoading: bool,
  };
}

export function panelRemarksCategoriesFetchDataSuccess(results) {
  return {
    type: 'PANEL_REMARKS_CATEGORIES_FETCH_SUCCESS',
    results,
  };
}

export function fetchPanelRemarksCategoriesData() {
  return (dispatch) => {
    batch(() => {
      dispatch(panelRemarksCategoriesFetchDataLoading(true));
      dispatch(panelRemarksCategoriesFetchDataErrored(false));
    });
    const endpoint = '/fsbid/panel_remarks/ws_categories/';
    api().get(endpoint)
      .then(({ data }) => {
        const sortedData = sortBy(data, 'rcdesctext');
        batch(() => {
          dispatch(panelRemarksCategoriesFetchDataSuccess(sortedData));
          dispatch(panelRemarksCategoriesFetchDataErrored(false));
          dispatch(panelRemarksCategoriesFetchDataLoading(false));
        });
      })
      .catch(() => {
        batch(() => {
          dispatch(panelRemarksCategoriesFetchDataErrored(true));
          dispatch(panelRemarksCategoriesFetchDataLoading(false));
        });
      });
  };
}
