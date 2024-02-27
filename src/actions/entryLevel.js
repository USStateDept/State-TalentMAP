import {
  UPDATE_ENTRY_LEVEL_ERROR,
  UPDATE_ENTRY_LEVEL_ERROR_TITLE,
  UPDATE_ENTRY_LEVEL_SUCCESS,
  UPDATE_ENTRY_LEVEL_SUCCESS_TITLE,
} from 'Constants/SystemMessages';
import { batch } from 'react-redux';
import { CancelToken } from 'axios';
import api from '../api';
import { toastError, toastSuccess } from './toast';

let cancelELdata;
// let cancelELedit;
let cancelELfiltersData;

export function entryLevelEditErrored(bool) {
  return {
    type: 'ENTRY_LEVEL_EDIT_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function entryLevelEditLoading(bool) {
  return {
    type: 'ENTRY_LEVEL_EDIT_IS_LOADING',
    isLoading: bool,
  };
}
export function entryLevelEditSuccess(results) {
  return {
    type: 'ENTRY_LEVEL_EDIT_SUCCESS',
    results,
  };
}
export function entryLevelEdit(id, data) {
  return (dispatch) => {
    batch(() => {
      dispatch(entryLevelEditLoading(true));
      dispatch(entryLevelEditErrored(false));
    });

    api().patch(`/entryLevel/save/${id}`, data)
      .then(() => {
        const toastTitle = UPDATE_ENTRY_LEVEL_SUCCESS_TITLE;
        const toastMessage = UPDATE_ENTRY_LEVEL_SUCCESS;
        batch(() => {
          dispatch(entryLevelEditErrored(false));
          dispatch(entryLevelEditSuccess(true));
          dispatch(toastSuccess(toastMessage, toastTitle));
          dispatch(entryLevelEditSuccess());
          dispatch(entryLevelEditLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(entryLevelEditLoading(true));
            dispatch(entryLevelEditErrored(false));
          });
        } else {
          // Start: temp toast logic
          // temp to randomly show toast error or success
          // when set up, just keep the error toast here
          const randInt = Math.floor(Math.random() * 2);
          if (randInt) {
            const toastTitle = UPDATE_ENTRY_LEVEL_ERROR_TITLE;
            const toastMessage = UPDATE_ENTRY_LEVEL_ERROR;
            dispatch(toastError(toastMessage, toastTitle));
          } else {
            const toastTitle = UPDATE_ENTRY_LEVEL_SUCCESS_TITLE;
            const toastMessage = UPDATE_ENTRY_LEVEL_SUCCESS;
            dispatch(toastSuccess(toastMessage, toastTitle));
          }
          // End: temp toast logic
          batch(() => {
            dispatch(entryLevelEditErrored(true));
            dispatch(entryLevelEditLoading(false));
          });
        }
      });
  };
}


export function entryLevelFetchDataErrored(bool) {
  return {
    type: 'ENTRY_LEVEL_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function entryLevelFetchDataLoading(bool) {
  return {
    type: 'ENTRY_LEVEL_FETCH_IS_LOADING',
    isLoading: bool,
  };
}
export function entryLevelFetchDataSuccess(results) {
  return {
    type: 'ENTRY_LEVEL_FETCH_SUCCESS',
    results,
  };
}

export function entryLevelFetchData() {
  return (dispatch) => {
    if (cancelELdata) { cancelELdata('cancel'); }
    batch(() => {
      dispatch(entryLevelFetchDataLoading(true));
      dispatch(entryLevelFetchDataErrored(false));
    });
    api().get('/fsbid/positions/el_positions/', {
      cancelToken: new CancelToken((c) => { cancelELdata = c; }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(entryLevelFetchDataSuccess(data));
          dispatch(entryLevelFetchDataErrored(false));
          dispatch(entryLevelFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          batch(() => {
            dispatch(entryLevelFetchDataSuccess([]));
            dispatch(entryLevelFetchDataErrored(true));
            dispatch(entryLevelFetchDataLoading(false));
          });
        }
      });
  };
}


export function entryLevelSelectionsSaveSuccess(result) {
  return {
    type: 'ENTRY_LEVEL_SELECTIONS_SAVE_SUCCESS',
    result,
  };
}
export function saveEntryLevelSelections(queryObject) {
  return (dispatch) => dispatch(entryLevelSelectionsSaveSuccess(queryObject));
}


export function entryLevelFiltersFetchDataErrored(bool) {
  return {
    type: 'ENTRY_LEVEL_FILTERS_FETCH_ERRORED',
    hasErrored: bool,
  };
}
export function entryLevelFiltersFetchDataLoading(bool) {
  return {
    type: 'ENTRY_LEVEL_FILTERS_FETCH_IS_LOADING',
    isLoading: bool,
  };
}
export function entryLevelFiltersFetchDataSuccess(results) {
  return {
    type: 'ENTRY_LEVEL_FILTERS_FETCH_SUCCESS',
    results,
  };
}

export function entryLevelFiltersFetchData() {
  return (dispatch) => {
    if (cancelELfiltersData) { cancelELfiltersData('cancel'); }
    batch(() => {
      dispatch(entryLevelFiltersFetchDataLoading(true));
      dispatch(entryLevelFiltersFetchDataErrored(false));
    });
    api().get('/fsbid/positions/el_positions/filters/', {
      cancelToken: new CancelToken((c) => { cancelELfiltersData = c; }),
    })
      .then(({ data }) => {
        batch(() => {
          // dispatch(entryLevelFetchDataErrored(false));
          // dispatch(entryLevelFetchDataLoading(false));
          dispatch(entryLevelFiltersFetchDataSuccess(data));
          dispatch(entryLevelFiltersFetchDataErrored(false));
          dispatch(entryLevelFiltersFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(entryLevelFiltersFetchDataLoading(true));
            dispatch(entryLevelFiltersFetchDataErrored(false));
          });
        } else {
          batch(() => {
            dispatch(entryLevelFiltersFetchDataSuccess({}));
            dispatch(entryLevelFiltersFetchDataErrored(true));
            dispatch(entryLevelFiltersFetchDataLoading(false));
          });
        }
      });
  };
}
