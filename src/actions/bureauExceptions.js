/* eslint-disable */
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

let cancelBureauExceptions;
let cancelBureauExceptionsList;
let cancelAddBureauExceptions;
let cancelSaveBureauExceptions;
let cancelDeleteBureauExceptions;


export function closeAllCards(id) {
  return {
    type: 'CLOSE_ALL_CARDS',
    id,
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
export function bureauExceptionUserBureausFetchData(userData) {
  return (dispatch) => {
    if (cancelbureauExceptionList) { cancelbureauExceptionList('cancel'); }
    batch(() => {
      dispatch(bureauExceptionListLoading(true));
      dispatch(bureauExceptionListErrored(false));
    });
    api().get('/fsbid/bureau_exceptions/metadata/', userData, {
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


// below are done

export function bureauExceptionsErrored(bool) {
  return {
    type: 'BUREAU_EXCEPTIONS_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function bureauExceptionsLoading(bool) {
  return {
    type: 'BUREAU_EXCEPTIONS_IS_LOADING',
    isLoading: bool,
  };
}
export function bureauExceptionsSuccess(results) {
  return {
    type: 'BUREAU_EXCEPTIONS_SUCCESS',
    results,
  };
}
export function bureauExceptionsFetchData() {
  return (dispatch) => {
    if (cancelBureauExceptions) { cancelBureauExceptions('cancel'); dispatch(bureauExceptionsLoading(true)); }
    batch(() => {
      dispatch(bureauExceptionsLoading(true));
      dispatch(bureauExceptionsErrored(false));
    });
    api().get('/fsbid/bureau_exceptions/', {
      cancelToken: new CancelToken((c) => {
        cancelBureauExceptions = c;
      }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(bureauExceptionsSuccess(data));
          dispatch(bureauExceptionsErrored(false));
          dispatch(bureauExceptionsLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(bureauExceptionsLoading(true));
            dispatch(bureauExceptionsErrored(false));
          });
        } else {
          batch(() => {
            /* eslint-disable no-console */
            console.log('🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳 reminder: verify the structure is []');
            console.log('🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳 redux says so, so update there too if not');
            dispatch(bureauExceptionsSuccess([]));
            dispatch(bureauExceptionsErrored(false));
            dispatch(bureauExceptionsLoading(false));
          });
        }
      });
  };
}
