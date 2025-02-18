import { batch } from 'react-redux';
import { CancelToken } from 'axios';
import api from '../api';
import { convertQueryToString } from '../utilities';

let cancelPanelRemarksData;

export function panelRemarksFetchDataErrored(bool) {
  // console.log('inside panelRemarksFetchDataErrored in actions/panelRemarks.js');
  return {
    type: 'PANEL_REMARKS_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function panelRemarksFetchDataLoading(bool) {
  // console.log('inside panelRemarksFetchDataLoading in actions/panelRemarks.js');
  return {
    type: 'PANEL_REMARKS_FETCH_IS_LOADING',
    isLoading: bool,
  };
}

// taking the count away from this function for the moment
export function panelRemarksFetchDataSuccess(results) {
  // vconsole.log('inside panelRemarksFetchDataSuccess in actions/panelRemarks.js');
  // console.log('results', results);
  return {
    type: 'PANEL_REMARKS_FETCH_SUCCESS',
    data: {
      results,
    },
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
          const results = data.results;
          // logging to see if the results are working
          // console.log('inside fetchPanelRemarksData in actions/panelRemarks.js');
          // console.log('results', results);
          dispatch(panelRemarksFetchDataSuccess(results));
          dispatch(panelRemarksFetchDataErrored(false));
          dispatch(panelRemarksFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          batch(() => {
            // console.log('Error fetching panel remarks:', err);
            dispatch(panelRemarksFetchDataSuccess([]));
            dispatch(panelRemarksFetchDataErrored(true));
            dispatch(panelRemarksFetchDataLoading(false));
          });
        }
      });
  };
}
