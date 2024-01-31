import { batch } from 'react-redux';
import { CancelToken } from 'axios';
import { convertQueryToString } from 'utilities';
import api from '../api';

let cancelOrgStats;

export function orgStatsFetchDataErrored(bool) {
  return {
    type: 'ORG_STATS_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function orgStatsFetchDataLoading(bool) {
  return {
    type: 'ORG_STATS_FETCH_IS_LOADING',
    isLoading: bool,
  };
}
export function orgStatsFetchDataSuccess(results) {
  return {
    type: 'ORG_STATS_FETCH_SUCCESS',
    results,
  };
}

export function orgStatsFetchData(query = {}) {
  return (dispatch) => {
    if (cancelOrgStats) { cancelOrgStats('cancel'); dispatch(orgStatsFetchDataLoading(true)); }
    batch(() => {
      dispatch(orgStatsFetchDataLoading(true));
      dispatch(orgStatsFetchDataErrored(false));
    });
    const q = convertQueryToString(query);
    api().get(`/fsbid/org_stats/?${q}`, {
      cancelToken: new CancelToken((c) => {
        cancelOrgStats = c;
      }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(orgStatsFetchDataSuccess(data));
          dispatch(orgStatsFetchDataErrored(false));
          dispatch(orgStatsFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(orgStatsFetchDataLoading(true));
            dispatch(orgStatsFetchDataErrored(false));
          });
        } else {
          batch(() => {
            dispatch(orgStatsFetchDataSuccess([]));
            dispatch(orgStatsFetchDataErrored(true));
            dispatch(orgStatsFetchDataLoading(false));
          });
        }
      });
  };
}


export function orgStatsSelectionsSaveSuccess(result) {
  return {
    type: 'ORG_STATS_SELECTIONS_SAVE_SUCCESS',
    result,
  };
}

export function saveOrgStatsSelections(queryObject) {
  return (dispatch) => dispatch(orgStatsSelectionsSaveSuccess(queryObject));
}
