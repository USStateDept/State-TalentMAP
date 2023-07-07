import { batch } from 'react-redux';
import { get } from 'lodash';
import { convertQueryToString } from 'utilities';
import api from '../api';

const dummyData = [
  {
    cycle_name: 'Fall Cycle 2023',
    id: 1,
    cycle_status: 'Proposed',
    cycle_category: 'Active',
    cycle_begin_date: '2023-09-01T21:12:12.854000Z',
    cycle_end_date: '2025-11-30T21:12:12.854000Z',
    cycle_excl_position: 'Y',
    cycle_post_view: 'Y',
  },
  {
    cycle_name: 'Summer Cycle 2023',
    id: 2,
    cycle_status: 'Complete',
    cycle_category: 'Active',
    cycle_begin_date: '2025-06-01T21:12:12.854000Z',
    cycle_end_date: '2025-08-30T21:12:12.854000Z',
    cycle_excl_position: 'Y',
    cycle_post_view: 'Y',
  },
  {
    cycle_name: 'Spring Cycle 2023',
    id: 3,
    cycle_status: 'Closed',
    cycle_category: 'Closed',
    cycle_begin_date: '2025-03-01T21:12:12.854000Z',
    cycle_end_date: '2025-05-30T21:12:12.854000Z',
    cycle_excl_position: 'Y',
    cycle_post_view: 'Y',
  },
  {
    cycle_name: 'Winter Cycle 2023',
    id: 4,
    cycle_status: 'Merged',
    cycle_category: 'Active',
    cycle_begin_date: '2022-12-01T21:12:12.854000Z',
    cycle_end_date: '2023-02-28T21:12:12.854000Z',
    cycle_excl_position: 'Y',
    cycle_post_view: 'Y',
  },
];

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
    batch(() => {
      dispatch(cycleManagementFetchDataLoading(true));
      dispatch(cycleManagementFetchDataErrored(false));
    });
    const q = convertQueryToString(query);
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
            dispatch(cycleManagementFetchDataSuccess(dummyData));
            dispatch(cycleManagementFetchDataErrored(true));
            dispatch(cycleManagementFetchDataLoading(false));
          });
        }
      });
  };
}

export function cycleManagementSelectionsSaveSuccess(result) {
  return {
    type: 'CYCLE_MANAGEMENT_SELECTIONS_SAVE_SUCCESS',
    result,
  };
}

export function saveCycleManagementSelections(queryObject) {
  return (dispatch) => dispatch(cycleManagementSelectionsSaveSuccess(queryObject));
}
