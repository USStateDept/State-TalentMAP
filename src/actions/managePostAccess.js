import { batch } from 'react-redux';
import { CancelToken } from 'axios';
import { convertQueryToString } from 'utilities';
import {
  MANAGE_POST_ACCESS_ADD_ERROR,
  MANAGE_POST_ACCESS_ADD_ERROR_TITLE,
  MANAGE_POST_ACCESS_ADD_SUCCESS,
  MANAGE_POST_ACCESS_ADD_SUCCESS_TITLE,
} from 'Constants/SystemMessages';
import api from '../api';
import { toastError, toastSuccess } from './toast';


export function managePostEditErrored(bool) {
  return {
    type: 'MANAGE_POST_EDIT_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function managePostEditLoading(bool) {
  return {
    type: 'MANAGE_POST_EDIT_IS_LOADING',
    isLoading: bool,
  };
}
export function managePostEditSuccess(results) {
  return {
    type: 'MANAGE_POST_EDIT_SUCCESS',
    results,
  };
}

let cancel;
export function managePostEdit(positions) {
  return (dispatch) => {
    if (cancel) { cancel('cancel'); }
    dispatch(managePostEditLoading(true));
    dispatch(managePostEditErrored(false));
    api()
      .post('/placeholder/POST/endpoint', {
        positions,
      }, {
        cancelToken: new CancelToken((c) => {
          cancel = c;
        }),
      })
      .then(({ data }) => {
        batch(() => {
          dispatch(managePostEditErrored(false));
          dispatch(managePostEditSuccess(data || []));
          dispatch(
            toastSuccess(
              MANAGE_POST_ACCESS_ADD_SUCCESS, MANAGE_POST_ACCESS_ADD_SUCCESS_TITLE,
            ));
          dispatch(managePostEditLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          dispatch(managePostEditErrored(false));
          dispatch(managePostEditLoading(false));
        } else {
          dispatch(toastError(
            MANAGE_POST_ACCESS_ADD_ERROR, MANAGE_POST_ACCESS_ADD_ERROR_TITLE,
          ));
          dispatch(managePostEditErrored(true));
          dispatch(managePostEditLoading(false));
        }
      });
  };
}


export function managePostFetchDataErrored(bool) {
  return {
    type: 'MANAGE_POST_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function managePostFetchDataLoading(bool) {
  return {
    type: 'MANAGE_POST_FETCH_IS_LOADING',
    isLoading: bool,
  };
}

export function managePostFetchDataSuccess(results) {
  return {
    type: 'MANAGE_POST_FETCH_SUCCESS',
    results,
  };
}

let cancelManagePostAccess;

export function managePostFetchData(query = {}) {
  return (dispatch) => {
    if (cancelManagePostAccess) { cancelManagePostAccess('cancel'); }
    batch(() => {
      dispatch(managePostFetchDataLoading(true));
      dispatch(managePostFetchDataErrored(false));
    });
    const endpoint = 'fsbid/post_access/';
    const q = convertQueryToString(query);
    const ep = `${endpoint}?${q}`;
    api().get(ep, {
      cancelToken: new CancelToken((c) => {
        cancelManagePostAccess = c;
      }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(managePostFetchDataSuccess(data));
          dispatch(managePostFetchDataErrored(false));
          dispatch(managePostFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(managePostFetchDataLoading(true));
            dispatch(managePostFetchDataErrored(false));
          });
        } else {
          batch(() => {
            dispatch(managePostFetchDataSuccess([]));
            dispatch(managePostFetchDataErrored(false));
            dispatch(managePostFetchDataLoading(false));
          });
        }
      });
  };
}

export function managePostSelectionsSaveSuccess(result) {
  return {
    type: 'MANAGE_POST_SELECTIONS_SAVE_SUCCESS',
    result,
  };
}

export function saveManagePostSelections(queryObject) {
  return (dispatch) => dispatch(managePostSelectionsSaveSuccess(queryObject));
}

export function managePostFiltersFetchDataErrored(bool) {
  return {
    type: 'MANAGE_POST_FILTERS_FETCH_ERRORED',
    hasErrored: bool,
  };
}


export function managePostFetchFiltersErrored(bool) {
  return {
    type: 'MANAGE_POST_FETCH_FILTERS_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function managePostFetchFiltersLoading(bool) {
  return {
    type: 'MANAGE_POST_FETCH_FILTERS_IS_LOADING',
    isLoading: bool,
  };
}

export function managePostFetchFiltersSuccess(results) {
  return {
    type: 'MANAGE_POST_FETCH_FILTERS_SUCCESS',
    results,
  };
}

export function managePostFetchFilters() {
  return (dispatch) => {
    batch(() => {
      dispatch(managePostFetchFiltersLoading(true));
      dispatch(managePostFetchFiltersErrored(false));
    });
    const endpoint = 'fsbid/post_access/filters/';
    dispatch(managePostFetchFiltersLoading(true));
    api().get(endpoint)
      .then(({ data }) => {
        batch(() => {
          dispatch(managePostFetchFiltersSuccess(data));
          dispatch(managePostFetchFiltersErrored(false));
          dispatch(managePostFetchFiltersLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(managePostFetchFiltersLoading(true));
            dispatch(managePostFetchFiltersErrored(false));
          });
        } else {
          batch(() => {
            dispatch(managePostFetchFiltersSuccess([]));
            dispatch(managePostFetchFiltersErrored(true));
            dispatch(managePostFetchFiltersLoading(false));
          });
        }
      });
  };
}
