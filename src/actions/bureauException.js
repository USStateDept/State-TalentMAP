import { batch } from 'react-redux';
import { CancelToken } from 'axios';
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

let cancelbureauException;
let cancelbureauExceptionList;
let cancelAddBureauException;
let cancelSaveBureauException;
let cancelDeleteBureauException;

export function bureauExceptionErrored(bool) {
  return {
    type: 'BUREAU_EXCEPTION_IS_ERRORED',
    hasErrored: bool,
  };
}

export function bureauExceptionLoading(bool) {
  return {
    type: 'BUREAU_EXCEPTION_IS_LOADING',
    isLoading: bool,
  };
}

export function bureauExceptionSuccess(results) {
  return {
    type: 'BUREAU_EXCEPTION_FETCH_SUCCESS',
    results,
  };
}

export function bureauExceptionListErrored(bool) {
  return {
    type: 'BUREAU_EXCEPTION_LIST_IS_ERRORED',
    hasErrored: bool,
  };
}

export function bureauExceptionListLoading(bool) {
  return {
    type: 'BUREAU_EXCEPTION_LIST_IS_LOADING',
    isLoading: bool,
  };
}

export function bureauExceptionListSuccess(results) {
  return {
    type: 'BUREAU_EXCEPTION_LIST_SUCCESS',
    results,
  };
}

export function bureauExceptionEditHasErrored(bool) {
  return {
    type: 'BUREAU_EXCEPTION_EDIT_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function bureauExceptionEditIsLoading(bool) {
  return {
    type: 'BUREAU_EXCEPTION_EDIT_IS_LOADING',
    isLoading: bool,
  };
}
export function bureauExceptionEditSuccess(data) {
  return {
    type: 'BUREAU_EXCEPTION_EDIT_SUCCESS',
    data,
  };
}

export function bureauExceptionAddIsErrored(bool) {
  return {
    type: 'BUREAU_EXCEPTION_ADD_IS_ERRORED',
    hasErrored: bool,
  };
}
export function bureauExceptionAddIsLoading(bool) {
  return {
    type: 'BUREAU_EXCEPTION_ADD_IS_LOADING',
    isLoading: bool,
  };
}
export function bureauExceptionAddSuccess(data) {
  return {
    type: 'BUREAU_EXCEPTION_ADD_SUCCESS',
    data,
  };
}


export function bureauExceptionDeleteIsErrored(bool) {
  return {
    type: 'BUREAU_EXCEPTION_DELETE_IS_ERRORED',
    hasErrored: bool,
  };
}
export function bureauExceptionDeleteIsLoading(bool) {
  return {
    type: 'BUREAU_EXCEPTION_DELETE_IS_LOADING',
    isLoading: bool,
  };
}
export function bureauExceptionDeleteSuccess(data) {
  return {
    type: 'BUREAU_EXCEPTION_DELETE_SUCCESS',
    data,
  };
}

export function bureauExceptionFetchData() {
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

export function bureauExceptionListFetchData() {
  return (dispatch) => {
    if (cancelbureauExceptionList) { cancelbureauExceptionList('cancel'); }
    batch(() => {
      dispatch(bureauExceptionListLoading(true));
      dispatch(bureauExceptionListErrored(false));
    });
    api().get('/fsbid/bureau_exceptions/bureaus/', {
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
    dispatch(bureauExceptionAddIsLoading(true));
    dispatch(bureauExceptionAddIsErrored(false));
    api().post('/fsbid/bureau_exceptions/add/', data, {
      cancelToken: new CancelToken((c) => {
        cancelAddBureauException = c;
      }),
    })
      .then(({ res }) => {
        batch(() => {
          dispatch(bureauExceptionAddIsErrored(false));
          dispatch(bureauExceptionAddSuccess(res));
          dispatch(toastSuccess(BUREAU_EXCEPTION_ADD_SUCCESS,
            BUREAU_EXCEPTION_ADD_SUCCESS_TITLE));
          dispatch(bureauExceptionAddIsLoading(false));
        });
      }).catch(() => {
        batch(() => {
          dispatch(toastError(BUREAU_EXCEPTION_ADD_ERROR,
            BUREAU_EXCEPTION_ADD_ERROR_TITLE));
          dispatch(bureauExceptionAddIsErrored(true));
          dispatch(bureauExceptionAddIsLoading(false));
        });
      });
  };
}

export function saveBureauExceptionSelections(data) {
  return (dispatch) => {
    if (cancelSaveBureauException) { cancelSaveBureauException('cancel'); }
    dispatch(bureauExceptionEditIsLoading(true));
    dispatch(bureauExceptionEditHasErrored(false));
    api().post(`/fsbid/bureau_exceptions/update/${data.id}/`, data, {
      cancelToken: new CancelToken((c) => {
        cancelSaveBureauException = c;
      }),
    })
      .then(({ res }) => {
        batch(() => {
          dispatch(bureauExceptionEditHasErrored(false));
          dispatch(bureauExceptionEditSuccess(res));
          dispatch(toastSuccess(BUREAU_EXCEPTION_EDIT_SUCCESS,
            BUREAU_EXCEPTION_EDIT_SUCCESS_TITLE));
          dispatch(bureauExceptionEditIsLoading(false));
        });
      }).catch(() => {
        batch(() => {
          dispatch(toastError(BUREAU_EXCEPTION_EDIT_ERROR,
            BUREAU_EXCEPTION_EDIT_ERROR_TITLE));
          dispatch(bureauExceptionEditHasErrored(true));
          dispatch(bureauExceptionEditIsLoading(false));
        });
      });
  };
}

export function deleteBureauExceptionList(data) {
  return (dispatch) => {
    if (cancelDeleteBureauException) { cancelDeleteBureauException('cancel'); }
    dispatch(bureauExceptionDeleteIsLoading(true));
    dispatch(bureauExceptionDeleteIsErrored(false));
    api().post(`/fsbid/bureau_exceptions/delete/${data.id}/`, data, {
      cancelToken: new CancelToken((c) => {
        cancelDeleteBureauException = c;
      }),
    })
      .then(({ res }) => {
        batch(() => {
          dispatch(bureauExceptionDeleteIsErrored(false));
          dispatch(bureauExceptionDeleteSuccess(res));
          dispatch(toastSuccess(BUREAU_EXCEPTION_DELETE_SUCCESS,
            BUREAU_EXCEPTION_DELETE_SUCCESS_TITLE));
          dispatch(bureauExceptionDeleteIsLoading(false));
        });
      }).catch(() => {
        batch(() => {
          dispatch(toastError(BUREAU_EXCEPTION_DELETE_ERROR,
            BUREAU_EXCEPTION_DELETE_ERROR_TITLE));
          dispatch(bureauExceptionDeleteIsErrored(true));
          dispatch(bureauExceptionDeleteIsLoading(false));
        });
      });
  };
}
