import { CancelToken } from 'axios';
import { batch } from 'react-redux';
import { sortBy } from 'lodash';
import { convertQueryToString } from 'utilities';
import { toastError, toastSuccess } from './toast';
import api from './../api';

let cancelPanelRemarksData;

// ======================== Update Panel Remarks ========================
export function updatePanelRemarksHasErrored(bool) {
  return {
    type: 'PANEL_REMARKS_UPDATE_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function updatePanelRemarksIsLoading(bool) {
  return {
    type: 'PANEL_REMARKS_UPDATE_IS_LOADING',
    isLoading: bool,
  };
}

export function updatePanelRemarksSuccess(bool) {
  return {
    type: 'PANEL_REMARKS_UPDATE_SUCCESS',
    success: bool,
  };
}

export function updatePanelRemarksData(data) {
  return (dispatch) => {
    batch(() => {
      dispatch(updatePanelRemarksIsLoading(true));
      dispatch(updatePanelRemarksHasErrored(false));
    });
    const endpoint = '/fsbid/panel_remarks/update_remark/';
    api().post(endpoint, data, {
      cancelToken: new CancelToken((c) => { cancelPanelRemarksData = c; }),
    })
      .then(() => {
        batch(() => {
          dispatch(updatePanelRemarksSuccess(true));
          dispatch(updatePanelRemarksHasErrored(false));
          dispatch(updatePanelRemarksIsLoading(false));
          dispatch(toastSuccess('Panel Remark Updated', 'Success'));
        });
      })
      .catch(() => {
        dispatch(updatePanelRemarksHasErrored(true));
        dispatch(updatePanelRemarksIsLoading(false));
        dispatch(toastError('Error updating Panel Remark', 'Error'));
      });
  };
}
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
        batch(() => {
          dispatch(panelRemarksFetchDataSuccess(data));
          dispatch(panelRemarksFetchDataErrored(false));
          dispatch(panelRemarksFetchDataLoading(false));
        });
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
