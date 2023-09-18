import { batch } from 'react-redux';
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
} from '../Constants/SystemMessages';
import { toastError, toastSuccess } from './toast';
import api from '../api';

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
const dummyDataToReturn = (query) => new Promise((resolve) => {
  const { limit } = query;
  resolve({
    results: dummyData.slice(0, limit),
    count: dummyData.length,
    next: null,
    previous: null,
  });
});

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
