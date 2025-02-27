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

// ======================== Panel Remarks Create ========================
export function panelRemarksCreateDataErrored(bool) {
  console.log('inside actions panelRemarksCreateDataErrored');
  console.log('bool:', bool);
  return {
    type: 'PANEL_REMARKS_CREATE_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function panelRemarksCreateDataLoading(bool) {
  console.log('inside actions panelRemarksCreateDataLoading');
  console.log('bool:', bool);
  return {
    type: 'PANEL_REMARKS_CREATE_IS_LOADING',
    isLoading: bool,
  };
}

export function panelRemarksCreateDataSuccess(results) {
  console.log('inside actions panelRemarksCreateDataSuccess');
  console.log('results:', results);
  return {
    type: 'PANEL_REMARKS_CREATE_SUCCESS',
    results,
  };
}

// creating a function to take a JSON with all the values from the panel reamrks form and send it to the
// following POST API endpoint: /fsbid/panel_remarks/create_remark/. The sending part will currently be
// commented out for the time being but the final JSON that will be send to POST API endpoint will be logged
// to the console.
export function createPanelRemark(newRemark) {
  return (dispatch) => {
    batch(() => {
      dispatch(panelRemarksCreateDataLoading(true));
      dispatch(panelRemarksCreateDataErrored(false));
    });
    // eslint-disable-next-line no-unused-vars
    const endpoint = '/fsbid/panel_remarks/create_remark/';
    // api().post(endpoint, newRemark)
    //   .then(({ data }) => {
    //     dispatch(panelRemarksCreateDataSuccess(data));
    //   })
    //   .catch(() => {
    //     dispatch(panelRemarksCreateDataErrored(true));
    //   });
    console.log(newRemark);
    dispatch(panelRemarksCreateDataSuccess(newRemark));
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
