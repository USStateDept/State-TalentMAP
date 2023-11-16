import { batch } from 'react-redux';
import { CancelToken } from 'axios';
import { convertQueryToString } from 'utilities';
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
  BUREAU_EXCEPTIONS_UPDATE_ERROR,
  BUREAU_EXCEPTIONS_UPDATE_ERROR_TITLE,
  BUREAU_EXCEPTIONS_UPDATE_SUCCESS,
  BUREAU_EXCEPTIONS_UPDATE_SUCCESS_TITLE,
} from '../Constants/SystemMessages';

let cancelUserBureauExceptionsAndMetaData;
let cancelBureauExceptionsRefDataBureaus;
let cancelBureauExceptions;
let cancelAddUserBureauExceptions;
let cancelUpdateUserBureauExceptions;
let cancelDeleteUserBureauExceptions;

export function userBureauExceptionsAndMetaDataErrored(bool) {
  return {
    type: 'USER_BUREAU_EXCEPTIONS_AND_METADATA_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function userBureauExceptionsAndMetaDataLoading(bool) {
  return {
    type: 'USER_BUREAU_EXCEPTIONS_AND_METADATA_IS_LOADING',
    isLoading: bool,
  };
}
export function userBureauExceptionsAndMetaDataSuccess(results) {
  return {
    type: 'USER_BUREAU_EXCEPTIONS_AND_METADATA_SUCCESS',
    results,
  };
}
export function userBureauExceptionsAndMetaDataFetch(query = {}) {
  return (dispatch) => {
    if (cancelUserBureauExceptionsAndMetaData) { cancelUserBureauExceptionsAndMetaData('cancel'); dispatch(userBureauExceptionsAndMetaDataLoading(true)); }
    batch(() => {
      dispatch(userBureauExceptionsAndMetaDataLoading(true));
      dispatch(userBureauExceptionsAndMetaDataErrored(false));
    });
    const q = convertQueryToString(query);
    api().get(`/fsbid/bureau_exceptions/metadata/?${q}`, {
      cancelToken: new CancelToken((c) => { cancelUserBureauExceptionsAndMetaData = c; }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(userBureauExceptionsAndMetaDataSuccess(data));
          dispatch(userBureauExceptionsAndMetaDataErrored(false));
          dispatch(userBureauExceptionsAndMetaDataLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(userBureauExceptionsAndMetaDataLoading(true));
            dispatch(userBureauExceptionsAndMetaDataErrored(false));
          });
        } else {
          batch(() => {
            // 📝📝 reminder dbl check expected data structure
            dispatch(userBureauExceptionsAndMetaDataSuccess([]));
            dispatch(userBureauExceptionsAndMetaDataErrored(true));
            dispatch(userBureauExceptionsAndMetaDataLoading(false));
          });
        }
      });
  };
}


export function bureauExceptionsRefDataBureausErrored(bool) {
  return {
    type: 'BUREAU_EXCEPTIONS_REF_DATA_BUREAUS_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function bureauExceptionsRefDataBureausLoading(bool) {
  return {
    type: 'BUREAU_EXCEPTIONS_REF_DATA_BUREAUS_IS_LOADING',
    isLoading: bool,
  };
}
export function bureauExceptionsRefDataBureausSuccess(results) {
  return {
    type: 'BUREAU_EXCEPTIONS_REF_DATA_BUREAUS_SUCCESS',
    results,
  };
}
export function bureauExceptionsRefDataBureausFetchData() {
  return (dispatch) => {
    if (cancelBureauExceptionsRefDataBureaus) { cancelBureauExceptionsRefDataBureaus('cancel'); dispatch(bureauExceptionsRefDataBureausLoading(true)); }
    batch(() => {
      dispatch(bureauExceptionsRefDataBureausLoading(true));
      dispatch(bureauExceptionsRefDataBureausErrored(false));
    });
    api().get('/fsbid/bureau_exceptions/ref_data_bureaus/', {
      cancelToken: new CancelToken((c) => {
        cancelBureauExceptions = c;
      }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(bureauExceptionsRefDataBureausSuccess(data));
          dispatch(bureauExceptionsRefDataBureausErrored(false));
          dispatch(bureauExceptionsRefDataBureausLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(bureauExceptionsRefDataBureausLoading(true));
            dispatch(bureauExceptionsRefDataBureausErrored(false));
          });
        } else {
          batch(() => {
            dispatch(bureauExceptionsRefDataBureausSuccess([]));
            dispatch(bureauExceptionsRefDataBureausErrored(true));
            dispatch(bureauExceptionsRefDataBureausLoading(false));
          });
        }
      });
  };
}


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
            dispatch(bureauExceptionsErrored(true));
            dispatch(bureauExceptionsLoading(false));
          });
        }
      });
  };
}


export function addUserBureauExceptions(data) {
  return (dispatch) => {
    if (cancelAddUserBureauExceptions) { cancelAddUserBureauExceptions('cancel'); }

    api().post('/fsbid/bureau_exceptions/add/', data, {
      cancelToken: new CancelToken((c) => {
        cancelAddUserBureauExceptions = c;
      }),
    })
      .then(() => {
        batch(() => {
          dispatch(toastSuccess(BUREAU_EXCEPTIONS_ADD_SUCCESS,
            BUREAU_EXCEPTIONS_ADD_SUCCESS_TITLE));
          dispatch(bureauExceptionsFetchData());
        });
      }).catch((err) => {
        if (err?.message !== 'cancel') {
          dispatch(toastError(BUREAU_EXCEPTIONS_ADD_ERROR,
            BUREAU_EXCEPTIONS_ADD_ERROR_TITLE));
        }
      });
  };
}

export function updateUserBureauExceptions(data) {
  return (dispatch) => {
    if (cancelUpdateUserBureauExceptions) { cancelUpdateUserBureauExceptions('cancel'); }
    api().post('/fsbid/bureau_exceptions/update/', data, {
      cancelToken: new CancelToken((c) => {
        cancelUpdateUserBureauExceptions = c;
      }),
    })
      .then(() => {
        batch(() => {
          dispatch(toastSuccess(BUREAU_EXCEPTIONS_UPDATE_SUCCESS,
            BUREAU_EXCEPTIONS_UPDATE_SUCCESS_TITLE));
          dispatch(bureauExceptionsFetchData());
        });
      }).catch((err) => {
        if (err?.message !== 'cancel') {
          dispatch(toastError(BUREAU_EXCEPTIONS_UPDATE_ERROR,
            BUREAU_EXCEPTIONS_UPDATE_ERROR_TITLE));
        }
      });
  };
}

export function deleteUserBureauExceptions(data) {
  return (dispatch) => {
    if (cancelDeleteUserBureauExceptions) { cancelDeleteUserBureauExceptions('cancel'); }
    api().post('/fsbid/bureau_exceptions/delete/', data, {
      cancelToken: new CancelToken((c) => {
        cancelDeleteUserBureauExceptions = c;
      }),
    })
      .then(() => {
        batch(() => {
          dispatch(toastSuccess(BUREAU_EXCEPTIONS_DELETE_SUCCESS,
            BUREAU_EXCEPTIONS_DELETE_SUCCESS_TITLE));
          dispatch(bureauExceptionsFetchData());
        });
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          dispatch(toastError(BUREAU_EXCEPTIONS_DELETE_ERROR,
            BUREAU_EXCEPTIONS_DELETE_ERROR_TITLE));
        }
      });
  };
}
