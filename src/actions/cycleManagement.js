import { batch } from 'react-redux';
import { CancelToken } from 'axios';
import {
  ASSIGNMENT_CYCLE_CREATE_ERROR,
  ASSIGNMENT_CYCLE_CREATE_ERROR_TITLE,
  ASSIGNMENT_CYCLE_CREATE_SUCCESS,
  ASSIGNMENT_CYCLE_CREATE_SUCCESS_TITLE,
  ASSIGNMENT_CYCLE_DELETE_ERROR,
  ASSIGNMENT_CYCLE_DELETE_ERROR_TITLE,
  ASSIGNMENT_CYCLE_DELETE_SUCCESS,
  ASSIGNMENT_CYCLE_DELETE_SUCCESS_TITLE,
  ASSIGNMENT_CYCLE_EDIT_ERROR,
  ASSIGNMENT_CYCLE_EDIT_ERROR_TITLE,
  ASSIGNMENT_CYCLE_EDIT_SUCCESS,
  ASSIGNMENT_CYCLE_EDIT_SUCCESS_TITLE,
  ASSIGNMENT_CYCLE_POST_POSITIONS_ERROR,
  ASSIGNMENT_CYCLE_POST_POSITIONS_ERROR_TITLE,
  ASSIGNMENT_CYCLE_POST_POSITIONS_SUCCESS,
  ASSIGNMENT_CYCLE_POST_POSITIONS_TITLE,
  EDIT_CYCLE_POSITION_ERROR,
  EDIT_CYCLE_POSITION_ERROR_TITLE,
  EDIT_CYCLE_POSITION_SUCCESS,
  EDIT_CYCLE_POSITION_SUCCESS_TITLE,
  REMOVE_CYCLE_POSITION_ERROR,
  REMOVE_CYCLE_POSITION_ERROR_TITLE,
  REMOVE_CYCLE_POSITION_SUCCESS,
  REMOVE_CYCLE_POSITION_SUCCESS_TITLE,
} from 'Constants/SystemMessages';
import api from '../api';
import { toastError, toastSuccess } from './toast';

const dummyData = [
  {
    cycle_name: 'Fall Cycle 2023',
    id: 96,
    cycle_status: 'Proposed',
    cycle_category: 'Active',
    cycle_begin_date: '2023-09-01T21:12:12.854000Z',
    cycle_end_date: '2025-11-30T21:12:12.854000Z',
    cycle_excl_position: 'Y',
    cycle_post_view: 'Y',
  },
  {
    cycle_name: 'Summer Cycle 2023',
    id: 97,
    cycle_status: 'Complete',
    cycle_category: 'Active',
    cycle_begin_date: '2025-06-01T21:12:12.854000Z',
    cycle_end_date: '2025-08-30T21:12:12.854000Z',
    cycle_excl_position: 'Y',
    cycle_post_view: 'Y',
  },
  {
    cycle_name: 'Spring Cycle 2023',
    id: 98,
    cycle_status: 'Closed',
    cycle_category: 'Closed',
    cycle_begin_date: '2025-03-01T21:12:12.854000Z',
    cycle_end_date: '2025-05-30T21:12:12.854000Z',
    cycle_excl_position: 'Y',
    cycle_post_view: 'Y',
  },
  {
    cycle_name: 'Winter Cycle 2023',
    id: 99,
    cycle_status: 'Merged',
    cycle_category: 'Active',
    cycle_begin_date: '2022-12-01T21:12:12.854000Z',
    cycle_end_date: '2023-02-28T21:12:12.854000Z',
    cycle_excl_position: 'Y',
    cycle_post_view: 'Y',
  },
];


// eslint-disable-next-line no-loops/no-loops
for (let index = 2022; index > 1975; index -= 1) {
  const monthInt = Math.floor(Math.random() * 10) + 1;
  const seasons = ['Fall', 'Winter', 'Summer', 'Spring'];
  const statuses = ['Proposed', 'Complete', 'Closed', 'Merged'];
  const randomSeason = seasons[Math.floor(Math.random() * seasons.length)];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  dummyData.push({
    cycle_name: `${randomSeason} Cycle ${index}`,
    id: index,
    cycle_status: randomStatus,
    cycle_category: 'Closed',
    cycle_begin_date: `${index}-${monthInt < 10 ? (`0${monthInt}`) : monthInt}-01T21:12:12.854000Z`,
    cycle_end_date: `${index}-${monthInt < 10 ? (`0${monthInt}`) : monthInt + 2}-28T21:12:12.854000Z`,
    cycle_excl_position: 'Y',
    cycle_post_view: 'Y',
  });
}

const cyclePosDummyDataToReturn = (query) => new Promise((resolve) => {
  const { limit } = query;
  resolve({
    results: dummyData.slice(0, limit),
    count: dummyData.length,
    next: null,
    previous: null,
  });
});


// ================ Cycle Management GET cycles ================

let cancelCycleManagementFetch;

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

export function cycleManagementFetchData() {
  return (dispatch) => {
    if (cancelCycleManagementFetch) {
      cancelCycleManagementFetch('cancel');
    }
    batch(() => {
      dispatch(cycleManagementFetchDataLoading(true));
      dispatch(cycleManagementFetchDataErrored(false));
    });
    const endpoint = '/fsbid/assignment_cycles/';
    api().get(endpoint, {
      cancelToken: new CancelToken((c) => { cancelCycleManagementFetch = c; }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(cycleManagementFetchDataSuccess(data));
          dispatch(cycleManagementFetchDataErrored(false));
          dispatch(cycleManagementFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          batch(() => {
            dispatch(cycleManagementFetchDataSuccess([]));
            dispatch(cycleManagementFetchDataErrored(true));
            dispatch(cycleManagementFetchDataLoading(false));
          });
        }
      });
  };
}

// ================ Cycle Management Filters ================

export function cycleManagementSelectionsSaveSuccess(result) {
  return {
    type: 'CYCLE_MANAGEMENT_SELECTIONS_SAVE_SUCCESS',
    result,
  };
}

export function saveCycleManagementSelections(queryObject) {
  return (dispatch) => dispatch(cycleManagementSelectionsSaveSuccess(queryObject));
}


// ================ Cycle Management CREATE cycle ================

export function cycleManagementCreateCycle(data) {
  return (dispatch) => {
    api()
      .post('/fsbid/assignment_cycles/create/', {
        data,
      })
      .then(() => {
        batch(() => {
          dispatch(toastSuccess(
            ASSIGNMENT_CYCLE_CREATE_SUCCESS, ASSIGNMENT_CYCLE_CREATE_SUCCESS_TITLE,
          ));
          dispatch(cycleManagementFetchData());
        });
      })
      .catch(() => {
        dispatch(toastError(ASSIGNMENT_CYCLE_CREATE_ERROR, ASSIGNMENT_CYCLE_CREATE_ERROR_TITLE));
      });
  };
}


// ================  Cycle Management GET single cycle  ================

export function cycleManagementAssignmentCycleFetchDataErrored(bool) {
  return {
    type: 'CYCLE_MANAGEMENT_ASSIGNMENT_CYCLE_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function cycleManagementAssignmentCycleFetchDataLoading(bool) {
  return {
    type: 'CYCLE_MANAGEMENT_ASSIGNMENT_CYCLE_FETCH_IS_LOADING',
    isLoading: bool,
  };
}

export function cycleManagementAssignmentCycleFetchDataSuccess(results) {
  return {
    type: 'CYCLE_MANAGEMENT_ASSIGNMENT_CYCLE_FETCH_SUCCESS',
    results,
  };
}


// eslint-disable-next-line no-unused-vars
export function cycleManagementAssignmentCycleFetchData(id) {
  return (dispatch) => {
    batch(() => {
      dispatch(cycleManagementAssignmentCycleFetchDataLoading(true));
      dispatch(cycleManagementAssignmentCycleFetchDataErrored(false));
    });
    api().post(`/fsbid/assignment_cycles/${id}/`)
      .then(({ data }) => {
        batch(() => {
          dispatch(cycleManagementAssignmentCycleFetchDataSuccess(data));
          dispatch(cycleManagementAssignmentCycleFetchDataErrored(false));
          dispatch(cycleManagementAssignmentCycleFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          batch(() => {
            dispatch(cycleManagementAssignmentCycleFetchDataSuccess({}));
            dispatch(cycleManagementAssignmentCycleFetchDataErrored(true));
            dispatch(cycleManagementAssignmentCycleFetchDataLoading(false));
          });
        }
      });
  };
}


// ================  Cycle Management UPDATE cycle  ================

export function cycleManagementUpdateCycleSuccess(bool) {
  return {
    type: 'CYCLE_MANAGEMENT_ASSIGNMENT_CYCLE_UPDATE_SUCCESS',
    success: bool,
  };
}

export function cycleManagementUpdateCycle(data) {
  return (dispatch) => {
    api()
      .post('/fsbid/assignment_cycles/update/', {
        data,
      })
      .then(() => {
        batch(() => {
          dispatch(toastSuccess(
            ASSIGNMENT_CYCLE_EDIT_SUCCESS, ASSIGNMENT_CYCLE_EDIT_SUCCESS_TITLE,
          ));
          dispatch(cycleManagementUpdateCycleSuccess(true));
        });
      })
      .catch(() => {
        dispatch(toastError(ASSIGNMENT_CYCLE_EDIT_ERROR, ASSIGNMENT_CYCLE_EDIT_ERROR_TITLE));
      });
  };
}

export function cycleManagementPostOpenPositions(id) {
  return (dispatch) => {
    dispatch(cycleManagementUpdateCycleSuccess(false));
    api()
      .post(`/fsbid/assignment_cycles/post/${id}/`)
      .then(() => {
        batch(() => {
          dispatch(toastSuccess(
            ASSIGNMENT_CYCLE_POST_POSITIONS_SUCCESS, ASSIGNMENT_CYCLE_POST_POSITIONS_TITLE,
          ));
          dispatch(cycleManagementUpdateCycleSuccess(true));
        });
      })
      .catch(() => {
        dispatch(
          toastError(
            ASSIGNMENT_CYCLE_POST_POSITIONS_ERROR,
            ASSIGNMENT_CYCLE_POST_POSITIONS_ERROR_TITLE,
          ),
        );
      });
  };
}


// ================ Cycle Management DELETE cycle ================

export function cycleManagementDeleteCycleSuccess(bool) {
  return {
    type: 'ASSIGNMENT_CYCLE_DELETE_SUCCESS',
    success: bool,
  };
}

export function cycleManagementDeleteCycle(id) {
  return (dispatch) => {
    dispatch(cycleManagementDeleteCycleSuccess(false));
    api()
      .post(`/fsbid/assignment_cycles/delete/${id}/`)
      .then(() => {
        batch(() => {
          dispatch(toastSuccess(ASSIGNMENT_CYCLE_DELETE_SUCCESS,
            ASSIGNMENT_CYCLE_DELETE_SUCCESS_TITLE));
          dispatch(cycleManagementDeleteCycleSuccess(true));
        });
      },
      ).catch((err) => {
        if (err?.message !== 'cancel') {
          batch(() => {
            dispatch(
              toastError(
                ASSIGNMENT_CYCLE_DELETE_ERROR,
                ASSIGNMENT_CYCLE_DELETE_ERROR_TITLE,
              ),
            );
          });
        }
      });
  };
}


// ================ Cycle Positions ================

export function cyclePositionSearchFetchDataErrored(bool) {
  return {
    type: 'CYCLE_POSITION_SEARCH_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function cyclePositionSearchFetchDataLoading(bool) {
  return {
    type: 'CYCLE_POSITION_SEARCH_FETCH_IS_LOADING',
    isLoading: bool,
  };
}
export function cyclePositionSearchFetchDataSuccess(results) {
  return {
    type: 'CYCLE_POSITION_SEARCH_FETCH_SUCCESS',
    results,
  };
}

export function cyclePositionSearchFetchData(query = {}) {
  return (dispatch) => {
    batch(() => {
      dispatch(cyclePositionSearchFetchDataLoading(true));
      dispatch(cyclePositionSearchFetchDataErrored(false));
    });
    // const q = convertQueryToString(query);
    // const endpoint = `sweet/new/endpoint/we/can/pass/a/query/to/?${q}`;
    // api().get(endpoint)
    dispatch(cyclePositionSearchFetchDataLoading(true));
    cyclePosDummyDataToReturn(query)
      .then((data) => {
        batch(() => {
          dispatch(cyclePositionSearchFetchDataSuccess(data));
          dispatch(cyclePositionSearchFetchDataErrored(false));
          dispatch(cyclePositionSearchFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(cyclePositionSearchFetchDataLoading(true));
            dispatch(cyclePositionSearchFetchDataErrored(false));
          });
        } else {
          batch(() => {
            dispatch(cyclePositionSearchFetchDataErrored(true));
            dispatch(cyclePositionSearchFetchDataLoading(false));
          });
        }
      });
  };
}

export function cyclePositionSearchSelectionsSaveSuccess(result) {
  return {
    type: 'CYCLE_POSITION_SEARCH_SELECTIONS_SAVE_SUCCESS',
    result,
  };
}

export function saveCyclePositionSearchSelections(queryObject) {
  return (dispatch) => dispatch(cyclePositionSearchSelectionsSaveSuccess(queryObject));
}

export function cyclePositionRemoveHasErrored(bool) {
  return {
    type: 'CYCLE_POSITION_REMOVE_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function cyclePositionRemoveIsLoading(bool) {
  return {
    type: 'CYCLE_POSITION_REMOVE_IS_LOADING',
    isLoading: bool,
  };
}
export function cyclePositionRemoveSuccess(data) {
  return {
    type: 'CYCLE_POSITION_REMOVE_SUCCESS',
    data,
  };
}

let cancel;

export function cyclePositionRemove(position) {
  return (dispatch) => {
    if (cancel) { cancel('cancel'); }
    dispatch(cyclePositionRemoveIsLoading(true));
    dispatch(cyclePositionRemoveHasErrored(false));
    api()
      .post('/placeholder/POST/endpoint', {
        position,
      }, {
        cancelToken: new CancelToken((c) => {
          cancel = c;
        }),
      })
      .then(({ data }) => {
        batch(() => {
          dispatch(cyclePositionRemoveHasErrored(false));
          dispatch(cyclePositionRemoveSuccess(data || []));
          dispatch(
            toastSuccess(REMOVE_CYCLE_POSITION_SUCCESS, REMOVE_CYCLE_POSITION_SUCCESS_TITLE));
          dispatch(cyclePositionRemoveIsLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          dispatch(cyclePositionRemoveHasErrored(false));
          dispatch(cyclePositionRemoveIsLoading(false));
        } else {
          dispatch(toastError(REMOVE_CYCLE_POSITION_ERROR, REMOVE_CYCLE_POSITION_ERROR_TITLE));
          dispatch(cyclePositionRemoveHasErrored(true));
          dispatch(cyclePositionRemoveIsLoading(false));
        }
      });
  };
}

export function cyclePositionEditHasErrored(bool) {
  return {
    type: 'CYCLE_POSITION_EDIT_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function cyclePositionEditIsLoading(bool) {
  return {
    type: 'CYCLE_POSITION_EDIT_IS_LOADING',
    isLoading: bool,
  };
}
export function cyclePositionEditSuccess(data) {
  return {
    type: 'CYCLE_POSITION_EDIT_SUCCESS',
    data,
  };
}

export function cyclePositionEdit(position, incumbent, status) {
  return (dispatch) => {
    if (cancel) { cancel('cancel'); }
    dispatch(cyclePositionEditIsLoading(true));
    dispatch(cyclePositionEditHasErrored(false));
    api()
      .post('/placeholder/POST/endpoint', {
        position,
        incumbent,
        status,
      }, {
        cancelToken: new CancelToken((c) => {
          cancel = c;
        }),
      })
      .then(({ data }) => {
        batch(() => {
          dispatch(cyclePositionEditHasErrored(false));
          dispatch(cyclePositionEditSuccess(data || []));
          dispatch(
            toastSuccess(EDIT_CYCLE_POSITION_SUCCESS, EDIT_CYCLE_POSITION_SUCCESS_TITLE));
          dispatch(cyclePositionEditIsLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          dispatch(cyclePositionEditHasErrored(false));
          dispatch(cyclePositionEditIsLoading(false));
        } else {
          dispatch(toastError(EDIT_CYCLE_POSITION_ERROR, EDIT_CYCLE_POSITION_ERROR_TITLE));
          dispatch(cyclePositionEditHasErrored(true));
          dispatch(cyclePositionEditIsLoading(false));
        }
      });
  };
}
