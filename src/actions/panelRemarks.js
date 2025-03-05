import { CancelToken } from 'axios';
import { batch } from 'react-redux';
import { sortBy } from 'lodash';
import { convertQueryToString } from 'utilities';
import { toastError, toastSuccess } from './toast';
import api from './../api';

const PANEL_REMARK_CREATE_SUCCESS = 'Panel Remark created successfully';
const PANEL_REMARK_CREATE_ERRORED = 'Panel Remark creation failed';

let cancelPanelRemarksData;

// ======================== Panel Remarks Create ========================
export function panelRemarksCreateErrored(bool) {
  return {
    type: 'PANEL_REMARKS_CREATE_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function panelRemarksCreateLoading(bool) {
  return {
    type: 'PANEL_REMARKS_CREATE_IS_LOADING',
    isLoading: bool,
  };
}

export function panelRemarksCreateSuccess(bool) {
  return {
    type: 'PANEL_REMARKS_CREATE_SUCCESS',
    success: bool,
  };
}

export function createPanelRemark(newRemark) {
  return (dispatch) => {
    batch(() => {
      dispatch(panelRemarksCreateLoading(true));
      dispatch(panelRemarksCreateErrored(false));
    });
    const endpoint = '/fsbid/panel_remarks/create_remark/';
    api().post(endpoint, newRemark)
      .then(() => {
        dispatch(panelRemarksCreateSuccess(true));
        dispatch(panelRemarksCreateErrored(false));
        dispatch(panelRemarksCreateLoading(false));
        dispatch(toastSuccess(PANEL_REMARK_CREATE_SUCCESS));
      })
      .catch(() => {
        dispatch(panelRemarksCreateSuccess(false));
        dispatch(panelRemarksCreateErrored(true));
        dispatch(panelRemarksCreateLoading(false));
        dispatch(toastError(PANEL_REMARK_CREATE_ERRORED));
      });
  };
}

// ======================== Update Panel Remarks ========================
export function panelRemarksEditHasErrored(bool) {
  return {
    type: 'PANEL_REMARKS_EDIT_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function panelRemarksEditIsLoading(bool) {
  return {
    type: 'PANEL_REMARKS_EDIT_IS_LOADING',
    isLoading: bool,
  };
}

export function panelRemarksEditSuccess(bool) {
  return {
    type: 'PANEL_REMARKS_EDIT_SUCCESS',
    success: bool,
  };
}

export function editPanelRemark(data) {
  return (dispatch) => {
    batch(() => {
      dispatch(panelRemarksEditIsLoading(true));
      dispatch(panelRemarksEditHasErrored(false));
    });
    const endpoint = '/fsbid/panel_remarks/update_remark/';
    api().post(endpoint, data, {
      cancelToken: new CancelToken((c) => { cancelPanelRemarksData = c; }),
    })
      .then(() => {
        batch(() => {
          dispatch(panelRemarksEditSuccess(true));
          dispatch(panelRemarksEditHasErrored(false));
          dispatch(panelRemarksEditIsLoading(false));
          dispatch(toastSuccess('Panel Remark Updated', 'Success'));
        });
      })
      .catch(() => {
        dispatch(panelRemarksEditHasErrored(true));
        dispatch(panelRemarksEditIsLoading(false));
        dispatch(panelRemarksEditSuccess(false));
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
