import { batch } from 'react-redux';
import { CancelToken } from 'axios';
import { get } from 'lodash';
import { convertQueryToString } from 'utilities';
import {
  SEARCH_POST_ACCESS_REMOVE_ERROR,
  SEARCH_POST_ACCESS_REMOVE_ERROR_TITLE,
  SEARCH_POST_ACCESS_REMOVE_SUCCESS,
  SEARCH_POST_ACCESS_REMOVE_SUCCESS_TITLE,
} from 'Constants/SystemMessages';
import { toastError, toastSuccess } from './toast';
import api from '../api';

export function searchPostAccessFetchDataErrored(bool) {
  return {
    type: 'SEARCH_POST_ACCESS_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function searchPostAccessFetchDataLoading(bool) {
  return {
    type: 'SEARCH_POST_ACCESS_FETCH_IS_LOADING',
    isLoading: bool,
  };
}

export function searchPostAccessFetchDataSuccess(results) {
  return {
    type: 'SEARCH_POST_ACCESS_FETCH_SUCCESS',
    results,
  };
}

let cancelSearchPostAccess;

export function searchPostAccessFetchData(query = {}) {
  return (dispatch) => {
    if (cancelSearchPostAccess) { cancelSearchPostAccess('cancel'); }
    batch(() => {
      dispatch(searchPostAccessFetchDataLoading(true));
      dispatch(searchPostAccessFetchDataErrored(false));
    });
    const endpoint = 'fsbid/post_access/';
    const q = convertQueryToString(query);
    const ep = `${endpoint}?${q}`;
    api().get(ep, {
      cancelToken: new CancelToken((c) => {
        cancelSearchPostAccess = c;
      }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(searchPostAccessFetchDataSuccess(data));
          dispatch(searchPostAccessFetchDataErrored(false));
          dispatch(searchPostAccessFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (get(err, 'message') === 'cancel') {
          batch(() => {
            dispatch(searchPostAccessFetchDataErrored(false));
            dispatch(searchPostAccessFetchDataLoading(true));
          });
        } else {
          batch(() => {
            dispatch(searchPostAccessFetchDataSuccess([]));
            dispatch(searchPostAccessFetchDataErrored(true));
            dispatch(searchPostAccessFetchDataLoading(false));
          });
        }
      });
  };
}


export function searchPostAccessSelectionsSaveSuccess(result) {
  return {
    type: 'SEARCH_POST_ACCESS_SELECTIONS_SAVE_SUCCESS',
    result,
  };
}
export function searchPostAccessSaveSelections(queryObject) {
  return (dispatch) => dispatch(searchPostAccessSelectionsSaveSuccess(queryObject));
}


export function searchPostAccessRemoveHasErrored(bool) {
  return {
    type: 'SEARCH_POST_ACCESS_REMOVE_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function searchPostAccessRemoveIsLoading(bool) {
  return {
    type: 'SEARCH_POST_ACCESS_REMOVE_IS_LOADING',
    isLoading: bool,
  };
}

export function searchPostAccessRemoveSuccess(results) {
  return {
    type: 'SEARCH_POST_ACCESS_REMOVE_SUCCESS',
    results,
  };
}

export function searchPostAccessRemove(positions) {
  return (dispatch) => {
    dispatch(searchPostAccessRemoveIsLoading(true));
    dispatch(searchPostAccessRemoveHasErrored(false));
    api()
      .delete('fsbid/post_access/permissions/', { data: positions })
      .then(({ data }) => {
        batch(() => {
          dispatch(searchPostAccessRemoveHasErrored(false));
          dispatch(searchPostAccessRemoveSuccess(data));
          dispatch(
            toastSuccess(
              SEARCH_POST_ACCESS_REMOVE_SUCCESS, SEARCH_POST_ACCESS_REMOVE_SUCCESS_TITLE,
            ));
          dispatch(searchPostAccessRemoveIsLoading(false));
        });
      })
      .catch(() => {
        dispatch(toastError(
          SEARCH_POST_ACCESS_REMOVE_ERROR, SEARCH_POST_ACCESS_REMOVE_ERROR_TITLE,
        ));
        dispatch(searchPostAccessRemoveHasErrored(true));
        dispatch(searchPostAccessRemoveIsLoading(false));
      });
  };
}

export function searchPostAccessFetchFiltersErrored(bool) {
  return {
    type: 'SEARCH_POST_ACCESS_FETCH_FILTERS_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function searchPostAccessFetchFiltersLoading(bool) {
  return {
    type: 'SEARCH_POST_ACCESS_FETCH_FILTERS_IS_LOADING',
    isLoading: bool,
  };
}

export function searchPostAccessFetchFiltersSuccess(results) {
  return {
    type: 'SEARCH_POST_ACCESS_FETCH_FILTERS_SUCCESS',
    results,
  };
}

export function searchPostAccessFetchFilters() {
  return (dispatch) => {
    batch(() => {
      dispatch(searchPostAccessFetchFiltersLoading(true));
      dispatch(searchPostAccessFetchFiltersErrored(false));
    });
    const endpoint = 'fsbid/post_access/filters/';
    dispatch(searchPostAccessFetchFiltersLoading(true));
    api().get(endpoint)
      .then(({ data }) => {
        batch(() => {
          dispatch(searchPostAccessFetchFiltersSuccess(data));
          dispatch(searchPostAccessFetchFiltersErrored(false));
          dispatch(searchPostAccessFetchFiltersLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(searchPostAccessFetchFiltersLoading(true));
            dispatch(searchPostAccessFetchFiltersErrored(false));
          });
        } else {
          batch(() => {
            dispatch(searchPostAccessFetchFiltersSuccess([]));
            dispatch(searchPostAccessFetchFiltersErrored(true));
            dispatch(searchPostAccessFetchFiltersLoading(false));
          });
        }
      });
  };
}
