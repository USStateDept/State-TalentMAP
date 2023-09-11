import { batch } from 'react-redux';
import swal from '@sweetalert/with-react';
import { SAVE_ADMIN_REMARK_HAS_ERRORED,
  SAVE_ADMIN_REMARK_HAS_ERRORED_TITLE, SAVE_ADMIN_REMARK_SUCCESS,
  SAVE_ADMIN_REMARK_SUCCESS_TITLE,
} from 'Constants/SystemMessages';
import api from '../api';
import { toastError, toastSuccess } from './toast';

export function fetchRemarksHasErrored(bool) {
  return {
    type: 'FETCH_REMARKS_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function fetchRemarksIsLoading(bool) {
  return {
    type: 'FETCH_REMARKS_IS_LOADING',
    isLoading: bool,
  };
}
export function fetchRemarksSuccess(data) {
  return {
    type: 'FETCH_REMARKS_SUCCESS',
    results: data,
  };
}

export function fetchRemarks() {
  return (dispatch) => {
    dispatch(fetchRemarksIsLoading(true));
    dispatch(fetchRemarksHasErrored(false));
    api().get('/fsbid/agenda/remarks/')
      .then(({ data }) => {
        batch(() => {
          dispatch(fetchRemarksHasErrored(false));
          dispatch(fetchRemarksSuccess(data));
          dispatch(fetchRemarksIsLoading(false));
        });
      })
      .catch(() => {
        dispatch(fetchRemarksHasErrored(true));
        dispatch(fetchRemarksIsLoading(false));
      });
  };
}

export function fetchRemarkCategoriesHasErrored(bool) {
  return {
    type: 'FETCH_REMARK_CATEGORIES_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function fetchRemarkCategoriesIsLoading(bool) {
  return {
    type: 'FETCH_REMARK_CATEGORIES_IS_LOADING',
    isLoading: bool,
  };
}
export function fetchRemarkCategoriesSuccess(data) {
  return {
    type: 'FETCH_REMARK_CATEGORIES_SUCCESS',
    results: data,
  };
}

export function fetchRemarkCategories() {
  return (dispatch) => {
    dispatch(fetchRemarkCategoriesIsLoading(true));
    dispatch(fetchRemarkCategoriesHasErrored(false));
    api().get('/fsbid/agenda/remark-categories/')
      .then(({ data }) => {
        batch(() => {
          dispatch(fetchRemarkCategoriesHasErrored(false));
          dispatch(fetchRemarkCategoriesSuccess(data));
          dispatch(fetchRemarkCategoriesIsLoading(false));
        });
      })
      .catch(() => {
        dispatch(fetchRemarkCategoriesHasErrored(true));
        dispatch(fetchRemarkCategoriesIsLoading(false));
      });
  };
}

export function saveAdminRemarkHasErrored(bool) {
  return {
    type: 'SAVE_ADMIN_REMARK_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function saveAdminRemarkIsLoading(bool) {
  return {
    type: 'SAVE_ADMIN_REMARK_IS_LOADING',
    isLoading: bool,
  };
}
export function saveAdminRemarkSuccess(bool) {
  return {
    type: 'SAVE_ADMIN_REMARK_SUCCESS',
    success: bool,
  };
}

export function saveRemark(props) {
  return (dispatch) => {
    dispatch(saveAdminRemarkSuccess(false));
    dispatch(saveAdminRemarkIsLoading(true));
    dispatch(saveAdminRemarkHasErrored(false));
    api().post('/fsbid/remark/', props)
      .then(() => {
        batch(() => {
          dispatch(saveAdminRemarkHasErrored(false));
          dispatch(saveAdminRemarkSuccess(true));
          dispatch(toastSuccess(SAVE_ADMIN_REMARK_SUCCESS, SAVE_ADMIN_REMARK_SUCCESS_TITLE));
          dispatch(saveAdminRemarkIsLoading(false));
          swal.close();
        });
      })
      .catch(() => {
        dispatch(toastError(SAVE_ADMIN_REMARK_HAS_ERRORED, SAVE_ADMIN_REMARK_HAS_ERRORED_TITLE));
        dispatch(saveAdminRemarkHasErrored(true));
        dispatch(saveAdminRemarkIsLoading(false));
      });
  };
}
