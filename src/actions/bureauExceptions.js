import { batch } from 'react-redux';
import { CancelToken } from 'axios';
import { toastError, toastSuccess } from './toast';
import api from '../api';
import {
  BUREAU_EXCEPTIONS_ADD_ERROR,
  BUREAU_EXCEPTIONS_ADD_ERROR_TITLE,
  BUREAU_EXCEPTIONS_ADD_SUCCESS,
  BUREAU_EXCEPTIONS_ADD_SUCCESS_TITLE,
  BUREAU_EXCEPTIONS_DELETE_ERROR,
  BUREAU_EXCEPTIONS_DELETE_ERROR_TITLE,
  BUREAU_EXCEPTIONS_DELETE_SUCCESS,
  BUREAU_EXCEPTIONS_DELETE_SUCCESS_TITLE,
  BUREAU_EXCEPTIONS_EDIT_ERROR,
  BUREAU_EXCEPTIONS_EDIT_ERROR_TITLE,
  BUREAU_EXCEPTIONS_EDIT_SUCCESS,
  BUREAU_EXCEPTIONS_EDIT_SUCCESS_TITLE,
} from '../Constants/SystemMessages';

let cancelbureauException;
let cancelbureauExceptionList;
let cancelAddBureauException;
let cancelSaveBureauException;
let cancelDeleteBureauException;

export function bureauExceptionErrored(bool) {
  return {
    type: 'BUREAU_EXCEPTIONS_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function bureauExceptionLoading(bool) {
  return {
    type: 'BUREAU_EXCEPTIONS_IS_LOADING',
    isLoading: bool,
  };
}

export function bureauExceptionSuccess(results) {
  return {
    type: 'BUREAU_EXCEPTIONS_FETCH_SUCCESS',
    results,
  };
}

export function bureauExceptionListErrored(bool) {
  return {
    type: 'BUREAU_EXCEPTIONS_LIST_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function bureauExceptionListLoading(bool) {
  return {
    type: 'BUREAU_EXCEPTIONS_LIST_IS_LOADING',
    isLoading: bool,
  };
}

export function bureauExceptionListSuccess(results) {
  return {
    type: 'BUREAU_EXCEPTIONS_LIST_SUCCESS',
    results,
  };
}

export function closeAllCards(id) {
  return {
    type: 'CLOSE_ALL_CARDS',
    id,
  };
}

export function bureauExceptionUsersListFetchData() {
  return (dispatch) => {
    if (cancelbureauException) { cancelbureauException('cancel'); }
    batch(() => {
      dispatch(bureauExceptionLoading(true));
      dispatch(bureauExceptionErrored(false));
    });
    dispatch(bureauExceptionLoading(true));
    api().get('/fsbid/bureau_exceptions/', {
      cancelToken: new CancelToken((c) => {
        cancelbureauException = c;
      }),
    })
      .then((data) => {
        batch(() => {
          dispatch(bureauExceptionSuccess(data?.data));
          dispatch(bureauExceptionErrored(false));
          dispatch(bureauExceptionLoading(false));
        });
      })
      .catch(() => {
        batch(() => {
          dispatch(bureauExceptionErrored(false));
          dispatch(bureauExceptionLoading(false));
        });
      });
  };
}

export function bureauExceptionUserBureausFetchData(userData) {
  return (dispatch) => {
    if (cancelbureauExceptionList) { cancelbureauExceptionList('cancel'); }
    batch(() => {
      dispatch(bureauExceptionListLoading(true));
      dispatch(bureauExceptionListErrored(false));
    });
    api().get('/fsbid/bureau_exceptions/bureaus/', userData, {
      cancelToken: new CancelToken((c) => {
        cancelbureauExceptionList = c;
      }),
    })
      .then((data) => {
        batch(() => {
          dispatch(bureauExceptionListSuccess(data));
          dispatch(bureauExceptionListErrored(false));
          dispatch(bureauExceptionListLoading(false));
        });
      })
      .catch(() => {
        batch(() => {
          dispatch(bureauExceptionListErrored(true));
          dispatch(bureauExceptionListLoading(false));
        });
      });
  };
}

export function addBureauExceptionSelections(data) {
  return (dispatch) => {
    if (cancelAddBureauException) { cancelAddBureauException('cancel'); }

    api().post('/fsbid/bureau_exceptions/add/', data, {
      cancelToken: new CancelToken((c) => {
        cancelAddBureauException = c;
      }),
    })
      .then(() => {
        batch(() => {
          dispatch(toastSuccess(BUREAU_EXCEPTIONS_ADD_SUCCESS,
            BUREAU_EXCEPTIONS_ADD_SUCCESS_TITLE));
          dispatch(bureauExceptionUsersListFetchData());
        });
      }).catch(() => {
        batch(() => {
          dispatch(toastError(BUREAU_EXCEPTIONS_ADD_ERROR,
            BUREAU_EXCEPTIONS_ADD_ERROR_TITLE));
        });
      });
  };
}

export function saveBureauExceptionSelections(data) {
  return (dispatch) => {
    if (cancelSaveBureauException) { cancelSaveBureauException('cancel'); }
    api().post('/fsbid/bureau_exceptions/update/', data, {
      cancelToken: new CancelToken((c) => {
        cancelSaveBureauException = c;
      }),
    })
      .then(() => {
        batch(() => {
          dispatch(toastSuccess(BUREAU_EXCEPTIONS_EDIT_SUCCESS,
            BUREAU_EXCEPTIONS_EDIT_SUCCESS_TITLE));
          dispatch(bureauExceptionUsersListFetchData());
        });
      }).catch(() => {
        batch(() => {
          dispatch(toastError(BUREAU_EXCEPTIONS_EDIT_ERROR,
            BUREAU_EXCEPTIONS_EDIT_ERROR_TITLE));
        });
      });
  };
}

export function deleteBureauExceptionList(data) {
  return (dispatch) => {
    if (cancelDeleteBureauException) { cancelDeleteBureauException('cancel'); }
    api().post('/fsbid/bureau_exceptions/delete/', data, {
      cancelToken: new CancelToken((c) => {
        cancelDeleteBureauException = c;
      }),
    })
      .then(() => {
        batch(() => {
          dispatch(toastSuccess(BUREAU_EXCEPTIONS_DELETE_SUCCESS,
            BUREAU_EXCEPTIONS_DELETE_SUCCESS_TITLE));
          dispatch(bureauExceptionUsersListFetchData());
        });
      }).catch(() => {
        batch(() => {
          dispatch(toastError(BUREAU_EXCEPTIONS_DELETE_ERROR,
            BUREAU_EXCEPTIONS_DELETE_ERROR_TITLE));
        });
      });
  };
}
