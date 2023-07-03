import { batch } from 'react-redux';
import { get } from 'lodash';
import { convertQueryToString } from 'utilities';
import api from '../api';

export function cycleManagementFetchDataErrored(bool) {
  return {
    type: 'CYCLE_MANAGEMENT_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function cycleManagementFetchDataLoading(bool) {
  return {
    type: 'CYCLE_MANAGEMENT_FETCH_IS_LOADING',
    isLoading: bool,
  };
}

export function cycleManagementFetchDataSuccess(results) {
  return {
    type: 'CYCLE_MANAGEMENT_FETCH_SUCCESS',
    results,
  };
}

export function cycleManagementFetchData(query = {}) {
  return (dispatch) => {
    // for testing
    console.log(query);

    batch(() => {
      dispatch(cycleManagementFetchDataLoading(true));
      dispatch(cycleManagementFetchDataErrored(false));
    });
    const q = convertQueryToString(query);

    // for testing
    console.log(q);

    const endpoint = `sweet/new/endpoint/we/can/pass/a/query/to/?${q}`;
    dispatch(cycleManagementFetchDataLoading(true));
    api().get(endpoint)
      .then(({ data }) => {
        batch(() => {
          dispatch(cycleManagementFetchDataSuccess(data.results));
          dispatch(cycleManagementFetchDataErrored(false));
          dispatch(cycleManagementFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (get(err, 'message') === 'cancel') {
          batch(() => {
            dispatch(cycleManagementFetchDataLoading(true));
            dispatch(cycleManagementFetchDataErrored(false));
          });
        } else {
          batch(() => {
            dispatch(cycleManagementFetchDataSuccess([]));
            dispatch(cycleManagementFetchDataErrored(true));
            dispatch(cycleManagementFetchDataLoading(false));
          });
        }
      });
  };
}

export function cycleManagementSelectionsSaveSuccess(result) {
  return {
    type: 'PANEL_MEETING_AGENDAS_SELECTIONS_SAVE_SUCCESS',
    result,
  };
}

export function saveCycleManagementSelections(queryObject) {
  // for testing
  console.log(queryObject);

  return (dispatch) => dispatch(cycleManagementSelectionsSaveSuccess(queryObject));
}
