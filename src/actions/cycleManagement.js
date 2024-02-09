import { batch } from 'react-redux';
import { formatDate } from 'utilities';
import { CancelToken } from 'axios';
import {
  ASSIGNMENT_CYCLE_DELETE_ERROR,
  ASSIGNMENT_CYCLE_DELETE_ERROR_TITLE,
  ASSIGNMENT_CYCLE_DELETE_SUCCESS,
  ASSIGNMENT_CYCLE_DELETE_SUCCESS_TITLE,
  ASSIGNMENT_CYCLE_EDIT_ERROR,
  ASSIGNMENT_CYCLE_EDIT_ERROR_TITLE,
  ASSIGNMENT_CYCLE_EDIT_SUCCESS,
  ASSIGNMENT_CYCLE_EDIT_SUCCESS_TITLE,
  ASSIGNMENT_CYCLE_POST_ERROR,
  ASSIGNMENT_CYCLE_POST_ERROR_TITLE,
  ASSIGNMENT_CYCLE_POST_SUCCESS,
  ASSIGNMENT_CYCLE_POST_SUCCESS_TITLE,
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
// import { convertQueryToString } from 'utilities';

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

const dummyAssignmentCycleInfo = {
  assignmentCycle: 'This is a dummy assignment cycle, data can be replaced with backend data',
  cycleCategory: 'Summer',
  cycleStatus: 'Winter',
  cycleBoundary: [formatDate('1976-10-01T21:12:12.854000Z'), formatDate('2014-31-12T21:12:12.854000Z')],
  sixMonthBoundary: [formatDate('1976-11-11T21:12:12.854000Z'), formatDate('2022-31-17T21:12:12.854000Z')],
  twelveMonthBoundary: [formatDate('2005-10-25T21:12:12.854000Z'), formatDate('2018-31-14T21:12:12.854000Z')],
  twentyFourMonthBoundary: [formatDate('2003-10-22T21:12:12.854000Z'), formatDate('2014-31-22T21:12:12.854000Z')],
  bureaPositionReview: new Date('Tue May 25 2023 00:00:00 GMT-0500 (Central Daylight Time)'),
  bidDueDate: new Date('Tue Aug 07 2023 00:00:00 GMT-0500 (Central Daylight Time)'),
  bureauPreSeasonBidReview: new Date('Tue Aug 29 2023 00:00:00 GMT-0500 (Central Daylight Time)'),
  bureauEarlySeasonBidReview: new Date('Tue Aug 29 2023 00:00:00 GMT-0500 (Central Daylight Time)'),
  bureauBidReview: new Date('Tue Aug 29 2023 00:00:00 GMT-0500 (Central Daylight Time)'),
  bidAudit: new Date('Tue Sep 22 2023 00:00:00 GMT-0500 (Central Daylight Time)'),
  bidBookReview: new Date('Tue Oct 11 2023 00:00:00 GMT-0500 (Central Daylight Time)'),
  bidCountReview: new Date('Tue Jan 29 2023 00:00:00 GMT-0500 (Central Daylight Time)'),
  htfReview: new Date('Tue Dec 29 2023 00:00:00 GMT-0500 (Central Daylight Time)'),
  organizationCountReview: new Date('Tue Aug 29 2023 00:00:00 GMT-0500 (Central Daylight Time)'),
  mdsReview: new Date('Tue Aug 14 2023 00:00:00 GMT-0500 (Central Daylight Time)'),
  assignedBidder: new Date('Tue Feb 22 2023 00:00:00 GMT-0500 (Central Daylight Time)'),
};

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
const dummyDataToReturn = (query) => new Promise((resolve) => {
  const { limit } = query;
  resolve({
    results: dummyData.slice(0, limit),
    count: dummyData.length,
    next: null,
    previous: null,
  });
});

const cyclePosDummyDataToReturn = (query) => new Promise((resolve) => {
  const { limit } = query;
  resolve({
    results: dummyData.slice(0, limit),
    count: dummyData.length,
    next: null,
    previous: null,
  });
});


// ================ Cycle Management GET ================

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
      dispatch(cycleManagementFetchDataLoading(true)); // ???
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
      .catch(() => {
        batch(() => {
          dispatch(cycleManagementFetchDataErrored(true));
          dispatch(cycleManagementFetchDataLoading(false));
        });
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


// ================ Cycle Management CREATE cycle ================

export function cycleManagementCreateCycleSuccess(bool) {
  return {
    type: 'CYCLE_MANAGEMENT_CREATE_CYCLE_SUCCESS',
    success: bool,
  };
}

export function cycleManagementCreateCycle(data) {
  return (dispatch) => {
    api()
      .post('/fsbid/assignment_cycles/create/', {
        data,
      })
      .then(() => {
        batch(() => {
          dispatch(toastSuccess(
            ASSIGNMENT_CYCLE_POST_SUCCESS, ASSIGNMENT_CYCLE_POST_SUCCESS_TITLE,
          ));
          dispatch(cycleManagementFetchData());
        });
      })
      .catch(() => {
        dispatch(toastError(ASSIGNMENT_CYCLE_POST_ERROR, ASSIGNMENT_CYCLE_POST_ERROR_TITLE));
      });
  };
}


// ================    ================
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
export function cycleManagementAssignmentCycleFetchData() {
  return (dispatch) => {
    batch(() => {
      dispatch(cycleManagementAssignmentCycleFetchDataLoading(true));
      dispatch(cycleManagementAssignmentCycleFetchDataErrored(false));
    });
    api().post('/placeholder/endpoint')
      .then(() => {
        batch(() => {
          dispatch(cycleManagementAssignmentCycleFetchDataSuccess(dummyAssignmentCycleInfo));
          dispatch(cycleManagementAssignmentCycleFetchDataErrored(false));
          dispatch(cycleManagementAssignmentCycleFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(cycleManagementAssignmentCycleFetchDataLoading(true));
            dispatch(cycleManagementAssignmentCycleFetchDataErrored(false));
          });
        } else {
          batch(() => {
            dispatch(
              cycleManagementAssignmentCycleFetchDataSuccess(dummyAssignmentCycleInfo),
            );
            dispatch(cycleManagementAssignmentCycleFetchDataErrored(false));
            dispatch(cycleManagementAssignmentCycleFetchDataLoading(false));
          });
        }
      });
  };
}


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

export function assignmentCycleFetchDataErrored(bool) {
  return {
    type: 'ASSIGNMENT_CYCLE_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function assignmentCycleFetchDataLoading(bool) {
  return {
    type: 'ASSIGNMENT_CYCLE_FETCH_IS_LOADING',
    isLoading: bool,
  };
}

export function assignmentCycleFetchDataSuccess(results) {
  return {
    type: 'ASSIGNMENT_CYCLE_FETCH_SUCCESS',
    results,
  };
}


export function assignmentCyclePostDataErrored(bool) {
  return {
    type: 'ASSIGNMENT_CYCLE_POST_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function assignmentCyclePostDataLoading(bool) {
  return {
    type: 'ASSIGNMENT_CYCLE_POST_IS_LOADING',
    isLoading: bool,
  };
}

export function assignmentCyclePostDataSuccess(results) {
  return {
    type: 'ASSIGNMENT_CYCLE_POST_SUCCESS',
    results,
  };
}

export function assignmentCycleDeleteDataErrored(bool) {
  return {
    type: 'ASSIGNMENT_CYCLE_DELETE_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function assignmentCycleDeleteDataLoading(bool) {
  return {
    type: 'ASSIGNMENT_CYCLE_DELETE_IS_LOADING',
    isLoading: bool,
  };
}

export function assignmentCycleDeleteDataSuccess(results) {
  return {
    type: 'ASSIGNMENT_CYCLE_DELETE_SUCCESS',
    results,
  };
}


export function assignmentCycleFetchData(query = {}) {
  return (dispatch) => {
    batch(() => {
      dispatch(assignmentCycleFetchDataLoading(true));
      dispatch(assignmentCycleFetchDataErrored(false));
    });
    // const q = convertQueryToString(query);
    // const endpoint = `sweet/new/endpoint/we/can/pass/a/query/to/?${q}`;
    // api().get(endpoint)
    dispatch(assignmentCycleFetchDataLoading(true));
    dummyDataToReturn(query)
      .then((data) => {
        batch(() => {
          dispatch(assignmentCycleFetchDataSuccess(data));
          dispatch(assignmentCycleFetchDataErrored(false));
          dispatch(assignmentCycleFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(assignmentCycleFetchDataLoading(true));
            dispatch(assignmentCycleFetchDataErrored(false));
          });
        } else {
          batch(() => {
            dispatch(assignmentCycleFetchDataSuccess(dummyDataToReturn));
            dispatch(assignmentCycleFetchDataErrored(false));
            dispatch(assignmentCycleFetchDataLoading(false));
          });
        }
      });
  };
}

export function saveAssignmentCyclesSelections(data) {
  return (dispatch) => {
    dispatch(assignmentCyclePostDataLoading(true));
    dispatch(assignmentCyclePostDataErrored(false));
    api().post('/Placeholder/', data)
      .then(({ res }) => {
        batch(() => {
          dispatch(assignmentCyclePostDataErrored(false));
          dispatch(assignmentCyclePostDataSuccess(res));
          dispatch(toastSuccess(ASSIGNMENT_CYCLE_EDIT_SUCCESS,
            ASSIGNMENT_CYCLE_EDIT_SUCCESS_TITLE));
          dispatch(assignmentCyclePostDataLoading(false));
        });
      }).catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(assignmentCyclePostDataLoading(true));
            dispatch(assignmentCyclePostDataErrored(false));
          });
        } else {
          batch(() => {
            dispatch(toastError(ASSIGNMENT_CYCLE_EDIT_ERROR,
              ASSIGNMENT_CYCLE_EDIT_ERROR_TITLE));
            dispatch(assignmentCyclePostDataErrored(true));
            dispatch(assignmentCyclePostDataLoading(false));
          });
        }
      });
  };
}

export function deleteAssignmentCyclesSelections(id) {
  return (dispatch) => {
    dispatch(assignmentCycleDeleteDataLoading(true));
    dispatch(assignmentCycleDeleteDataErrored(false));
    api().delete('/Placeholder/', id)
      .then(({ res }) => {
        batch(() => {
          dispatch(assignmentCycleDeleteDataErrored(false));
          dispatch(assignmentCycleDeleteDataSuccess(res));
          dispatch(toastSuccess(ASSIGNMENT_CYCLE_DELETE_SUCCESS,
            ASSIGNMENT_CYCLE_DELETE_SUCCESS_TITLE));
          dispatch(assignmentCycleDeleteDataLoading(false));
        });
      },
      ).catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(assignmentCycleDeleteDataLoading(true));
            dispatch(assignmentCycleDeleteDataErrored(false));
          });
        } else {
          batch(() => {
            dispatch(toastError(ASSIGNMENT_CYCLE_DELETE_ERROR,
              ASSIGNMENT_CYCLE_DELETE_ERROR_TITLE));
            dispatch(assignmentCycleDeleteDataErrored(true));
            dispatch(assignmentCycleDeleteDataLoading(false));
          });
        }
      },
      );
  };
}

export function postAssignmentCyclesSelections(position) {
  return (dispatch) => {
    dispatch(assignmentCyclePostDataLoading(true));
    dispatch(assignmentCyclePostDataErrored(false));
    api().delete('/Placeholder/', position)
      .then(({ res }) => {
        batch(() => {
          dispatch(assignmentCyclePostDataErrored(false));
          dispatch(assignmentCyclePostDataSuccess(res));
          dispatch(toastSuccess(ASSIGNMENT_CYCLE_POST_SUCCESS,
            ASSIGNMENT_CYCLE_POST_SUCCESS_TITLE));
          dispatch(assignmentCyclePostDataLoading(false));
        });
      },
      ).catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(assignmentCyclePostDataLoading(true));
            dispatch(assignmentCyclePostDataErrored(false));
          });
        } else {
          batch(() => {
            dispatch(toastError(ASSIGNMENT_CYCLE_POST_ERROR,
              ASSIGNMENT_CYCLE_POST_ERROR_TITLE));
            dispatch(assignmentCyclePostDataErrored(true));
            dispatch(assignmentCyclePostDataLoading(false));
          });
        }
      },
      );
  };
}

export function assignmentCycleSelectionsSaveSuccess(result) {
  return {
    type: 'ASSIGNMENT_CYCLE_SELECTIONS_SAVE_SUCCESS',
    result,
  };
}

export function saveAssignmentCycleSelections(queryObject) {
  return (dispatch) => dispatch(assignmentCycleSelectionsSaveSuccess(queryObject));
}
