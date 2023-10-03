import { batch } from 'react-redux';
import {
  MANAGE_POST_ACCESS_ADD_ERROR,
  MANAGE_POST_ACCESS_ADD_ERROR_TITLE,
  MANAGE_POST_ACCESS_ADD_SUCCESS,
  MANAGE_POST_ACCESS_ADD_SUCCESS_TITLE,
} from 'Constants/SystemMessages';
import api from '../api';
import { toastError, toastSuccess } from './toast';


export function managePostEditSuccess(bool) {
  return {
    type: 'MANAGE_POST_EDIT_SUCCESS',
    success: bool,
  };
}

export function managePostEdit(accessors) {
  return (dispatch) => {
    api()
      .post('fsbid/post_access/permissions/', { data: accessors })
      .then(() => {
        batch(() => {
          dispatch(managePostEditSuccess(true));
          dispatch(
            toastSuccess(
              MANAGE_POST_ACCESS_ADD_SUCCESS, MANAGE_POST_ACCESS_ADD_SUCCESS_TITLE,
            ));
        });
      })
      .catch(() => {
        dispatch(managePostEditSuccess(false));
        dispatch(toastError(
          MANAGE_POST_ACCESS_ADD_ERROR, MANAGE_POST_ACCESS_ADD_ERROR_TITLE,
        ));
      });
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
