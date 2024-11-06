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
import { convertQueryToString } from '../utilities';

let cancelELdata;
let cancelELedit;
let cancelELfiltersData;

// ================ Entry Level: Edit ================
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
export function entryLevelEditSuccess(bool) {
  return {
    type: 'ENTRY_LEVEL_EDIT_SUCCESS',
    success: bool,
  };
}
export function entryLevelEdit(data) {
  return (dispatch) => {
    if (cancelELedit) { cancelELedit('cancel'); }
    batch(() => {
      dispatch(entryLevelEditLoading(true));
      dispatch(entryLevelEditErrored(false));
    });
    api().post('/fsbid/positions/el_positions/save/', data, {
      cancelToken: new CancelToken((c) => { cancelELedit = c; }),
    })
      .then(() => {
        batch(() => {
          dispatch(entryLevelEditErrored(false));
          dispatch(entryLevelEditLoading(false));
          dispatch(entryLevelEditSuccess(true));
          dispatch(toastSuccess(UPDATE_ENTRY_LEVEL_SUCCESS, UPDATE_ENTRY_LEVEL_SUCCESS_TITLE));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(entryLevelEditLoading(true));
            dispatch(entryLevelEditErrored(false));
          });
        } else {
          batch(() => {
            dispatch(entryLevelEditErrored(true));
            dispatch(entryLevelEditLoading(false));
            dispatch(toastError(UPDATE_ENTRY_LEVEL_ERROR_TITLE, UPDATE_ENTRY_LEVEL_ERROR));
          });
        }
      });
  };
}

// ================ Entry Level: Get Positions ================
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
export function entryLevelFetchDataSuccess(count, results) {
  return {
    type: 'ENTRY_LEVEL_FETCH_SUCCESS',
    data: {
      count,
      results,
    },
  };
}
export function entryLevelFetchData(query = {}) {
  return (dispatch) => {
    if (cancelELdata) { cancelELdata('cancel'); }
    batch(() => {
      dispatch(entryLevelFetchDataLoading(true));
      dispatch(entryLevelFetchDataErrored(false));
    });
    const q = convertQueryToString(query);
    const endpoint = '/fsbid/positions/el_positions/';
    const ep = `${endpoint}?${q}`;
    api().get(ep, {
      cancelToken: new CancelToken((c) => { cancelELdata = c; }),
    })
      .then(({ data }) => {
        batch(() => {
          const count = data.count;
          const results = data.results;
          dispatch(entryLevelFetchDataSuccess(count, results));
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

// ================ Entry Level: User Filter Selections ================
export function entryLevelSelectionsSaveSuccess(result) {
  return {
    type: 'ENTRY_LEVEL_SELECTIONS_SAVE_SUCCESS',
    result,
  };
}
export function saveEntryLevelSelections(queryObject) {
  return (dispatch) => dispatch(entryLevelSelectionsSaveSuccess(queryObject));
}

// ================ Entry Level: Filters ================
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
          dispatch(entryLevelFiltersFetchDataSuccess(data));
          dispatch(entryLevelFiltersFetchDataErrored(false));
          dispatch(entryLevelFiltersFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          batch(() => {
            dispatch(entryLevelFiltersFetchDataSuccess({}));
            dispatch(entryLevelFiltersFetchDataErrored(true));
            dispatch(entryLevelFiltersFetchDataLoading(false));
          });
        }
      });
  };
}
