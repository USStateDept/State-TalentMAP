import {
  UPDATE_CYCLE_JOB_CATEGORIES_ERROR,
  UPDATE_CYCLE_JOB_CATEGORIES_ERROR_TITLE,
  UPDATE_CYCLE_JOB_CATEGORIES_SUCCESS,
  UPDATE_CYCLE_JOB_CATEGORIES_SUCCESS_TITLE,
} from 'Constants/SystemMessages';
import { batch } from 'react-redux';
import api from '../api';
import { toastError, toastSuccess } from './toast';

// =================== CYCLE JOB CATEGORIES EDIT ===================

export function cycleJobCategoriesEditErrored(bool) {
  return {
    type: 'CYCLE_JOB_CATEGORIES_EDIT_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function cycleJobCategoriesEditLoading(bool) {
  return {
    type: 'CYCLE_JOB_CATEGORIES_EDIT_IS_LOADING',
    isLoading: bool,
  };
}
export function cycleJobCategoriesEditSuccess(results) {
  return {
    type: 'CYCLE_JOB_CATEGORIES_DATA_SUCCESS',
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

// =================== CYCLE JOB CATEGORIES DATA ===================

export function cycleJobCategoriesDataErrored(bool) {
  return {
    type: 'CYCLE_JOB_CATEGORIES_DATA_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function cycleJobCategoriesDataLoading(bool) {
  return {
    type: 'CYCLE_JOB_CATEGORIES_DATA_IS_LOADING',
    isLoading: bool,
  };
}
export function cycleJobCategoriesDataSuccess(results) {
  return {
    type: 'CYCLE_JOB_CATEGORIES_DATA_SUCCESS',
    results,
  };
}
export function cycleJobCategoriesData(id) {
  // TODO: Use id of selected cycle in EP to get job categories of cycle
  console.log(id);

  const dummyCategories = [{
    id: 1,
    description: 'Construction Engineers',
    active: true,
    selected: false,
  }, {
    id: 2,
    description: 'Consular',
    active: false,
    selected: false,
  }, {
    id: 3,
    description: 'DCM-PO',
    active: false,
    selected: true,
  }, {
    id: 4,
    description: 'Diplomatic Courier',
    active: true,
    selected: false,
  }, {
    id: 5,
    description: 'Economic',
    active: true,
    selected: false,
  }];

  return (dispatch) => {
    dispatch(cycleJobCategoriesDataSuccess([]));
    dispatch(cycleJobCategoriesDataLoading(true));
    batch(() => {
      dispatch(cycleJobCategoriesDataSuccess(dummyCategories));
      dispatch(cycleJobCategoriesDataErrored(false));
      dispatch(cycleJobCategoriesDataLoading(false));
    });
  };
}

// =================== CYCLE JOB CATEGORIES FILTERS ===================

export function cycleJobCategoriesFiltersErrored(bool) {
  return {
    type: 'CYCLE_JOB_CATEGORIES_FILTERS_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function cycleJobCategoriesFiltersLoading(bool) {
  return {
    type: 'CYCLE_JOB_CATEGORIES_FILTERS_IS_LOADING',
    isLoading: bool,
  };
}
export function cycleJobCategoriesFiltersSuccess(results) {
  return {
    type: 'CYCLE_JOB_CATEGORIES_FILTERS_SUCCESS',
    results,
  };
}
export function cycleJobCategoriesFilters() {
  const dummyCategories = [{
    id: 1,
    description: '(A) A100 Class',
  }, {
    id: 2,
    description: '(B) B100 Class',
  }];

  return (dispatch) => {
    dispatch(cycleJobCategoriesFiltersSuccess([]));
    dispatch(cycleJobCategoriesFiltersLoading(true));
    batch(() => {
      dispatch(cycleJobCategoriesFiltersSuccess(dummyCategories));
      dispatch(cycleJobCategoriesFiltersLoading(false));
    });
  };
}
