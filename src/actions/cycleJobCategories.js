import {
  UPDATE_CYCLE_JOB_CATEGORIES_ERROR,
  UPDATE_CYCLE_JOB_CATEGORIES_ERROR_TITLE,
  UPDATE_CYCLE_JOB_CATEGORIES_SUCCESS,
  UPDATE_CYCLE_JOB_CATEGORIES_SUCCESS_TITLE,
} from 'Constants/SystemMessages';
import { CancelToken } from 'axios';
import { batch } from 'react-redux';
import api from '../api';
import { toastError, toastSuccess } from './toast';
import { convertQueryToString } from '../utilities';

let cancelCycleCategories;
let cancelCycleJobCategories;
let cancelCycleJobCategoriesStatuses;
// let cancelEditCycleJobCategories;

// =================== CYCLE CATEGORIES LIST ===================

export function cycleCategoriesErrored(bool) {
  return {
    type: 'CYCLE_CATEGORIES_ERRORED',
    hasErrored: bool,
  };
}
export function cycleCategoriesLoading(bool) {
  return {
    type: 'CYCLE_CATEGORIES_LOADING',
    isLoading: bool,
  };
}
export function cycleCategoriesSuccess(results) {
  return {
    type: 'CYCLE_CATEGORIES_SUCCESS',
    results,
  };
}
export function cycleCategories() {
  return (dispatch) => {
    if (cancelCycleCategories) { cancelCycleCategories('cancel'); }
    batch(() => {
      dispatch(cycleCategoriesLoading(true));
      dispatch(cycleCategoriesErrored(false));
    });
    api().get('/fsbid/cycle_job_categories/', {
      cancelToken: new CancelToken((c) => { cancelCycleCategories = c; }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(cycleCategoriesSuccess(data));
          dispatch(cycleCategoriesErrored(false));
          dispatch(cycleCategoriesLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          batch(() => {
            dispatch(cycleCategoriesSuccess({}));
            dispatch(cycleCategoriesErrored(true));
            dispatch(cycleCategoriesLoading(false));
          });
        }
      });
  };
}

// =================== CYCLE JOB CATEGORIES LIST ===================

export function cycleJobCategoriesErrored(bool) {
  return {
    type: 'CYCLE_JOB_CATEGORIES_ERRORED',
    hasErrored: bool,
  };
}
export function cycleJobCategoriesLoading(bool) {
  return {
    type: 'CYCLE_JOB_CATEGORIES_LOADING',
    isLoading: bool,
  };
}
export function cycleJobCategoriesSuccess(results) {
  return {
    type: 'CYCLE_JOB_CATEGORIES_SUCCESS',
    results,
  };
}
export function cycleJobCategories(query) {
  return (dispatch) => {
    if (cancelCycleJobCategories) { cancelCycleJobCategories('cancel'); }
    batch(() => {
      dispatch(cycleJobCategoriesLoading(true));
      dispatch(cycleJobCategoriesErrored(false));
    });
    const q = convertQueryToString(query);
    const endpoint = '/fsbid/cycle_job_categories/job_categories/';
    const ep = `${endpoint}?${q}`;
    api().get(ep, {
      cancelToken: new CancelToken((c) => { cancelCycleJobCategories = c; }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(cycleJobCategoriesSuccess(data));
          dispatch(cycleJobCategoriesErrored(false));
          dispatch(cycleJobCategoriesLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          batch(() => {
            dispatch(cycleJobCategoriesSuccess({}));
            dispatch(cycleJobCategoriesErrored(true));
            dispatch(cycleJobCategoriesLoading(false));
          });
        }
      });
  };
}

// =================== CYCLE JOB CATEGORIES STATUSES LIST ===================

export function cycleJobCategoriesStatusesErrored(bool) {
  return {
    type: 'CYCLE_JOB_CATEGORIES_STATUSES_ERRORED',
    hasErrored: bool,
  };
}
export function cycleJobCategoriesStatusesLoading(bool) {
  return {
    type: 'CYCLE_JOB_CATEGORIES_STATUSES_LOADING',
    isLoading: bool,
  };
}
export function cycleJobCategoriesStatusesSuccess(results) {
  return {
    type: 'CYCLE_JOB_CATEGORIES_STATUSES_SUCCESS',
    results,
  };
}
export function cycleJobCategoriesStatuses() {
  return (dispatch) => {
    if (cancelCycleJobCategoriesStatuses) { cancelCycleJobCategoriesStatuses('cancel'); }
    batch(() => {
      dispatch(cycleJobCategoriesStatusesLoading(true));
      dispatch(cycleJobCategoriesStatusesErrored(false));
    });
    api().get('/fsbid/cycle_job_categories/status/', {
      cancelToken: new CancelToken((c) => { cancelCycleJobCategoriesStatuses = c; }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(cycleJobCategoriesStatusesSuccess(data));
          dispatch(cycleJobCategoriesStatusesErrored(false));
          dispatch(cycleJobCategoriesStatusesLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          batch(() => {
            dispatch(cycleJobCategoriesStatusesSuccess({}));
            dispatch(cycleJobCategoriesStatusesErrored(true));
            dispatch(cycleJobCategoriesStatusesLoading(false));
          });
        }
      });
  };
}

// =================== CYCLE JOB CATEGORIES EDIT ===================

export function cycleJobCategoriesEditErrored(bool) {
  return {
    type: 'CYCLE_JOB_CATEGORIES_EDIT_ERRORED',
    hasErrored: bool,
  };
}
export function cycleJobCategoriesEditLoading(bool) {
  return {
    type: 'CYCLE_JOB_CATEGORIES_EDIT_LOADING',
    isLoading: bool,
  };
}
export function cycleJobCategoriesEditSuccess(results) {
  return {
    type: 'CYCLE_JOB_CATEGORIES_SUCCESS',
    results,
  };
}
export function cycleJobCategoriesEdit(data) {
  return (dispatch) => {
    batch(() => {
      dispatch(cycleJobCategoriesEditLoading(true));
      dispatch(cycleJobCategoriesEditErrored(false));
    });

    api().patch('/cycle-job-categories-ep/', data)
      .then(() => {
        const toastTitle = UPDATE_CYCLE_JOB_CATEGORIES_SUCCESS_TITLE;
        const toastMessage = UPDATE_CYCLE_JOB_CATEGORIES_SUCCESS;
        batch(() => {
          dispatch(cycleJobCategoriesEditErrored(false));
          dispatch(cycleJobCategoriesEditSuccess(true));
          dispatch(toastSuccess(toastMessage, toastTitle));
          dispatch(cycleJobCategoriesEditSuccess());
          dispatch(cycleJobCategoriesEditLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(cycleJobCategoriesEditLoading(true));
            dispatch(cycleJobCategoriesEditErrored(false));
          });
        } else {
          // Start: temp toast logic
          // temp to randomly show toast error or success
          // when set up, just keep the error toast here
          const randInt = Math.floor(Math.random() * 2);
          if (randInt) {
            const toastTitle = UPDATE_CYCLE_JOB_CATEGORIES_ERROR_TITLE;
            const toastMessage = UPDATE_CYCLE_JOB_CATEGORIES_ERROR;
            dispatch(toastError(toastMessage, toastTitle));
          } else {
            const toastTitle = UPDATE_CYCLE_JOB_CATEGORIES_SUCCESS_TITLE;
            const toastMessage = UPDATE_CYCLE_JOB_CATEGORIES_SUCCESS;
            dispatch(toastSuccess(toastMessage, toastTitle));
          }
          // End: temp toast logic
          batch(() => {
            dispatch(cycleJobCategoriesEditErrored(true));
            dispatch(cycleJobCategoriesEditLoading(false));
          });
        }
      });
  };
}
