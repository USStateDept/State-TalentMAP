import { batch } from 'react-redux';
import { toastError, toastSuccess } from './toast';
import api from '../api';
import {
  BUREAU_EXCEPTION_ADD_ERROR,
  BUREAU_EXCEPTION_ADD_ERROR_TITLE,
  BUREAU_EXCEPTION_ADD_SUCCESS,
  BUREAU_EXCEPTION_ADD_SUCCESS_TITLE,
  BUREAU_EXCEPTION_DELETE_ERROR,
  BUREAU_EXCEPTION_DELETE_ERROR_TITLE,
  BUREAU_EXCEPTION_DELETE_SUCCESS,
  BUREAU_EXCEPTION_DELETE_SUCCESS_TITLE,
  BUREAU_EXCEPTION_EDIT_ERROR,
  BUREAU_EXCEPTION_EDIT_ERROR_TITLE,
  BUREAU_EXCEPTION_EDIT_SUCCESS,
  BUREAU_EXCEPTION_EDIT_SUCCESS_TITLE,
} from '../Constants/SystemMessages';
// import { convertQueryToString } from 'utilities';

export function bureauExceptionFetchDataErrored(bool) {
  return {
    type: 'BUREAU_EXCEPTION_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function bureauExceptionFetchDataLoading(bool) {
  return {
    type: 'BUREAU_EXCEPTION_FETCH_IS_LOADING',
    isLoading: bool,
  };
}

export function bureauExceptionBureauDataFetchDataErrored(bool) {
  return {
    type: 'BUREAU_EXCEPTION_BUREAU_DATA_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function bureauExceptionBureauDataFetchDataLoading(bool) {
  return {
    type: 'BUREAU_EXCEPTION_BUREAU_DATA_FETCH_IS_LOADING',
    isLoading: bool,
  };
}

export function bureauExceptionFetchDataSuccess(results) {
  return {
    type: 'BUREAU_EXCEPTION_FETCH_SUCCESS',
    results,
  };
}

export function bureauExceptionOptionsFetchDataSuccess(results) {
  return {
    type: 'BUREAU_EXCEPTION_OPTIONS_FETCH_SUCCESS',
    results,
  };
}

export function bureauExceptionFetchData() {
  return (dispatch) => {
    batch(() => {
      dispatch(bureauExceptionFetchDataLoading(true));
      dispatch(bureauExceptionFetchDataErrored(false));
    });
    dispatch(bureauExceptionFetchDataLoading(true));
    api().get('/fsbid/bureau_exceptions/')
      .then((data) => {
        batch(() => {
          dispatch(bureauExceptionFetchDataSuccess(data?.data));
          dispatch(bureauExceptionFetchDataErrored(false));
          dispatch(bureauExceptionFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(bureauExceptionFetchDataLoading(true));
            dispatch(bureauExceptionFetchDataErrored(false));
          });
        } else {
          batch(() => {
            dispatch(bureauExceptionFetchDataErrored(false));
            dispatch(bureauExceptionFetchDataLoading(false));
          });
        }
      });
  };
}

export function bureauExceptionBureauDataFetchData() {
  return (dispatch) => {
    batch(() => {
      dispatch(bureauExceptionBureauDataFetchDataLoading(true));
      dispatch(bureauExceptionBureauDataFetchDataErrored(false));
    });
    api().get('/fsbid/bureau_exceptions/bureaus/')
      .then((data) => {
        batch(() => {
          dispatch(bureauExceptionOptionsFetchDataSuccess(data));
          dispatch(bureauExceptionBureauDataFetchDataErrored(false));
          dispatch(bureauExceptionBureauDataFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(bureauExceptionBureauDataFetchDataLoading(true));
            dispatch(bureauExceptionBureauDataFetchDataErrored(false));
          });
        } else {
          batch(() => {
            dispatch(bureauExceptionBureauDataFetchDataErrored(false));
            dispatch(bureauExceptionBureauDataFetchDataLoading(false));
          });
        }
      });
  };
}


export function bureauExceptionPositionEditHasErrored(bool) {
  return {
    type: 'BUREAU_EXCEPTION_POSITION_EDIT_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function bureauExceptionPositionEditIsLoading(bool) {
  return {
    type: 'BUREAU_EXCEPTION_POSITION_EDIT_IS_LOADING',
    isLoading: bool,
  };
}
export function bureauExceptionPositionEditSuccess(data) {
  return {
    type: 'BUREAU_EXCEPTION_POSITION_EDIT_SUCCESS',
    data,
  };
}

export function addBureauExceptionSelections(data) {
  return (dispatch) => {
    dispatch(bureauExceptionPositionEditIsLoading(true));
    dispatch(bureauExceptionPositionEditHasErrored(false));
    api().post('/fsbid/bureau_exceptions/add/', data)
      .then(({ res }) => {
        batch(() => {
          dispatch(bureauExceptionPositionEditHasErrored(false));
          dispatch(bureauExceptionPositionEditSuccess(res));
          dispatch(toastSuccess(BUREAU_EXCEPTION_ADD_SUCCESS,
            BUREAU_EXCEPTION_ADD_SUCCESS_TITLE));
          dispatch(bureauExceptionPositionEditIsLoading(false));
        });
      }).catch(() => {
        batch(() => {
          dispatch(toastError(BUREAU_EXCEPTION_ADD_ERROR,
            BUREAU_EXCEPTION_ADD_ERROR_TITLE));
          dispatch(bureauExceptionPositionEditHasErrored(true));
          dispatch(bureauExceptionPositionEditIsLoading(false));
        });
      });
  };
}

export function saveBureauExceptionSelections(data) {
  return (dispatch) => {
    dispatch(bureauExceptionPositionEditIsLoading(true));
    dispatch(bureauExceptionPositionEditHasErrored(false));
    api().post(`/fsbid/bureau_exceptions/update/${data.id}/`, data)
      .then(({ res }) => {
        batch(() => {
          dispatch(bureauExceptionPositionEditHasErrored(false));
          dispatch(bureauExceptionPositionEditSuccess(res));
          dispatch(toastSuccess(BUREAU_EXCEPTION_EDIT_SUCCESS,
            BUREAU_EXCEPTION_EDIT_SUCCESS_TITLE));
          dispatch(bureauExceptionPositionEditIsLoading(false));
        });
      }).catch(() => {
        batch(() => {
          dispatch(toastError(BUREAU_EXCEPTION_EDIT_ERROR,
            BUREAU_EXCEPTION_EDIT_ERROR_TITLE));
          dispatch(bureauExceptionPositionEditHasErrored(true));
          dispatch(bureauExceptionPositionEditIsLoading(false));
        });
      });
  };
}

export function deleteBureauExceptionList(data) {
  return (dispatch) => {
    dispatch(bureauExceptionPositionEditIsLoading(true));
    dispatch(bureauExceptionPositionEditHasErrored(false));
    api().post(`/fsbid/bureau_exceptions/delete/${data.id}/`, data)
      .then(({ res }) => {
        batch(() => {
          dispatch(bureauExceptionPositionEditHasErrored(false));
          dispatch(bureauExceptionPositionEditSuccess(res));
          dispatch(toastSuccess(BUREAU_EXCEPTION_DELETE_SUCCESS,
            BUREAU_EXCEPTION_DELETE_SUCCESS_TITLE));
          dispatch(bureauExceptionPositionEditIsLoading(false));
        });
      }).catch(() => {
        batch(() => {
          dispatch(toastError(BUREAU_EXCEPTION_DELETE_ERROR,
            BUREAU_EXCEPTION_DELETE_ERROR_TITLE));
          dispatch(bureauExceptionPositionEditHasErrored(true));
          dispatch(bureauExceptionPositionEditIsLoading(false));
        });
      });
  };
}
