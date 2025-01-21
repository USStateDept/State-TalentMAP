import { CancelToken } from 'axios';
import { batch } from 'react-redux';
import api from '../api';
import { toastError, toastSuccess } from './toast';
import { convertQueryToString } from '../utilities';
import {
  EMAIL_MEMO_ERROR, EMAIL_MEMO_ERROR_TITLE, EMAIL_MEMO_SUCCESS, EMAIL_MEMO_SUCCESS_TITLE,
  EMAIL_NOTIFICATION_ERROR, EMAIL_NOTIFICATION_ERROR_TITLE, EMAIL_NOTIFICATION_SUCCESS, EMAIL_NOTIFICATION_SUCCESS_TITLE,
  GET_MEMO_ERROR, GET_MEMO_ERROR_TITLE,
  GET_NOTIFICATION_ERROR, GET_NOTIFICATION_ERROR_TITLE,
  INSERT_NOTIFICATION_OPS_LOG_ERROR,
  INSERT_NOTIFICATION_OPS_LOG_ERROR_TITLE,
  REBUILD_MEMO_ERROR, REBUILD_MEMO_ERROR_TITLE, REBUILD_MEMO_SUCCESS, REBUILD_MEMO_SUCCESS_TITLE,
  REBUILD_NOTIFICATION_ERROR, REBUILD_NOTIFICATION_ERROR_TITLE, REBUILD_NOTIFICATION_SUCCESS, REBUILD_NOTIFICATION_SUCCESS_TITLE,
  SEND_MEMO_ERROR, SEND_MEMO_ERROR_TITLE, SEND_MEMO_SUCCESS, SEND_MEMO_SUCCESS_TITLE,
  SEND_NOTIFICATION_ERROR, SEND_NOTIFICATION_ERROR_TITLE,
  SEND_NOTIFICATION_SOAP_ERROR, SEND_NOTIFICATION_SOAP_ERROR_TITLE,
  SEND_NOTIFICATION_SUCCESS, SEND_NOTIFICATION_SUCCESS_TITLE,
  SEND_NOTIFICATION_TO_EOPF_ERROR, SEND_NOTIFICATION_TO_EOPF_ERROR_TITLE, SEND_NOTIFICATION_TO_EOPF_SUCCESS, SEND_NOTIFICATION_TO_EOPF_SUCCESS_TITLE,
  UPDATE_MEMO_ERROR, UPDATE_MEMO_ERROR_TITLE, UPDATE_MEMO_SUCCESS, UPDATE_MEMO_SUCCESS_TITLE,
  UPDATE_NOTIFICATION_ERROR, UPDATE_NOTIFICATION_ERROR_TITLE,
  UPDATE_NOTIFICATION_OPS_LOG_ERROR,
  UPDATE_NOTIFICATION_OPS_LOG_ERROR_TITLE,
  UPDATE_NOTIFICATION_SUCCESS, UPDATE_NOTIFICATION_SUCCESS_TITLE,
} from '../Constants/SystemMessages';
import { history } from '../store';
import { extractSoapResponse } from '../Components/AssignmentsSeparations/AssignmentTMOne/TMOneCard/Common/Utilities';


// ================ GET TM1 DATA ================

export function noteCableFetchDataErrored(bool) {
  return {
    type: 'NOTE_CABLE_FETCH_ERRORED',
    hasErrored: bool,
  };
}
export function noteCableFetchDataLoading(bool) {
  return {
    type: 'NOTE_CABLE_FETCH_LOADING',
    isLoading: bool,
  };
}
export function noteCableFetchDataSuccess(results) {
  return {
    type: 'NOTE_CABLE_FETCH_SUCCESS',
    results,
  };
}
export function noteCableAssignmentsRef(assignmentsRef) {
  return {
    type: 'NOTE_CABLE_ASSIGNMENTS_REFERENCE',
    assignmentsRef,
  };
}
let cancelNoteCable;
export function noteCableFetchData(query = {}, location, memo, assignments) {
  return (dispatch) => {
    if (cancelNoteCable) { cancelNoteCable('cancel'); }
    batch(() => {
      dispatch(noteCableFetchDataLoading(true));
      dispatch(noteCableFetchDataErrored(false));
    });
    const q = convertQueryToString(query);
    const endpoint = '/fsbid/tmone/';
    const ep = `${endpoint}?${q}`;
    api().get(ep, {
      cancelToken: new CancelToken((c) => { cancelNoteCable = c; }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(noteCableFetchDataSuccess(data));
          dispatch(noteCableAssignmentsRef(assignments));
          dispatch(noteCableFetchDataErrored(false));
          dispatch(noteCableFetchDataLoading(false));
          history.push(`${location}/${memo ? 'memo' : 'notification'}/${data[0]?.NM_SEQ_NUM}`);
        });
      })
      .catch((err) => {
        batch(() => {
          dispatch(noteCableFetchDataSuccess([]));
          dispatch(noteCableAssignmentsRef([]));
        });
        if (err?.message !== 'cancel') {
          batch(() => {
            dispatch(noteCableFetchDataErrored(true));
            dispatch(noteCableFetchDataLoading(false));
            if (memo) {
              dispatch(toastError(
                GET_MEMO_ERROR,
                GET_MEMO_ERROR_TITLE,
              ));
            } else {
              dispatch(toastError(
                GET_NOTIFICATION_ERROR,
                GET_NOTIFICATION_ERROR_TITLE,
              ));
            }
          });
        } else {
          batch(() => {
            dispatch(noteCableFetchDataErrored(false));
            dispatch(noteCableFetchDataLoading(true));
          });
        }
      });
  };
}

// ================ GET TM1 REF ================

export function cableFetchDataErrored(bool) {
  return {
    type: 'CABLE_FETCH_ERRORED',
    hasErrored: bool,
  };
}
export function cableFetchDataLoading(bool) {
  return {
    type: 'CABLE_FETCH_LOADING',
    isLoading: bool,
  };
}
export function cableFetchDataSuccess(results) {
  return {
    type: 'CABLE_FETCH_SUCCESS',
    results,
  };
}
let cancelCable;
export function cableFetchData(query = {}) {
  return (dispatch) => {
    if (cancelCable) { cancelCable('cancel'); }
    batch(() => {
      dispatch(cableFetchDataLoading(true));
      dispatch(cableFetchDataErrored(false));
    });
    const q = convertQueryToString(query);
    const endpoint = '/fsbid/tmone/ref/';
    const ep = `${endpoint}?${q}`;
    api().get(ep, {
      cancelToken: new CancelToken((c) => { cancelCable = c; }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(cableFetchDataSuccess(data));
          dispatch(cableFetchDataErrored(false));
          dispatch(cableFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          batch(() => {
            dispatch(cableFetchDataSuccess({}));
            dispatch(cableFetchDataErrored(false));
            dispatch(cableFetchDataLoading(true));
          });
        } else {
          batch(() => {
            dispatch(cableFetchDataSuccess({}));
            dispatch(cableFetchDataErrored(true));
            dispatch(cableFetchDataLoading(false));
          });
        }
      });
  };
}

// ================ GET TM1 EDIT REF ================

export function noteCableRefFetchDataErrored(bool) {
  return {
    type: 'NOTE_CABLE_REF_FETCH_ERRORED',
    hasErrored: bool,
  };
}
export function noteCableRefFetchDataLoading(bool) {
  return {
    type: 'NOTE_CABLE_REF_FETCH_LOADING',
    isLoading: bool,
  };
}
export function noteCableRefFetchDataSuccess(results) {
  return {
    type: 'NOTE_CABLE_REF_FETCH_SUCCESS',
    results,
  };
}
let cancelNoteCableRef;
export function noteCableRefFetchData(query = {}) {
  return (dispatch) => {
    if (cancelNoteCableRef) { cancelNoteCableRef('cancel'); }
    batch(() => {
      dispatch(noteCableRefFetchDataLoading(true));
      dispatch(noteCableRefFetchDataErrored(false));
    });
    const q = convertQueryToString(query);
    const endpoint = '/fsbid/tmone/edit/ref/';
    const ep = `${endpoint}?${q}`;
    api().get(ep, {
      cancelToken: new CancelToken((c) => { cancelNoteCableRef = c; }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(noteCableRefFetchDataSuccess(data));
          dispatch(noteCableRefFetchDataErrored(false));
          dispatch(noteCableRefFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          batch(() => {
            dispatch(noteCableRefFetchDataSuccess({}));
            dispatch(noteCableRefFetchDataErrored(false));
            dispatch(noteCableRefFetchDataLoading(true));
          });
        } else {
          batch(() => {
            dispatch(noteCableRefFetchDataSuccess({}));
            dispatch(noteCableRefFetchDataErrored(true));
            dispatch(noteCableRefFetchDataLoading(false));
          });
        }
      });
  };
}

// ================ EDIT TM1 ================

let cancelEditNoteCable;
export function editNoteCable(data, onSuccess, memo) {
  return (dispatch) => {
    if (cancelEditNoteCable) {
      cancelEditNoteCable('cancel');
    }
    api()
      .post('/fsbid/tmone/edit/', data, {
        cancelToken: new CancelToken((c) => { cancelEditNoteCable = c; }),
      })
      .then(() => {
        if (memo) {
          dispatch(toastSuccess(
            UPDATE_MEMO_SUCCESS,
            UPDATE_MEMO_SUCCESS_TITLE,
          ));
        } else {
          dispatch(toastSuccess(
            UPDATE_NOTIFICATION_SUCCESS,
            UPDATE_NOTIFICATION_SUCCESS_TITLE,
          ));
        }
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          if (memo) {
            dispatch(toastSuccess(
              UPDATE_MEMO_ERROR,
              UPDATE_MEMO_ERROR_TITLE,
            ));
          } else {
            dispatch(toastError(
              UPDATE_NOTIFICATION_ERROR,
              UPDATE_NOTIFICATION_ERROR_TITLE,
            ));
          }
        }
      });
  };
}

// ================ REBUILD TM1 ================

let cancelRebuildNotification;
export function rebuildNotification(data, onSuccess, memo) {
  return (dispatch) => {
    if (cancelRebuildNotification) {
      cancelRebuildNotification('cancel');
    }
    api()
      .put('/fsbid/tmone/rebuild/', data, {
        cancelToken: new CancelToken((c) => { cancelRebuildNotification = c; }),
      })
      .then(() => {
        if (memo) {
          dispatch(toastSuccess(
            REBUILD_MEMO_SUCCESS,
            REBUILD_MEMO_SUCCESS_TITLE,
          ));
        } else {
          dispatch(toastSuccess(
            REBUILD_NOTIFICATION_SUCCESS,
            REBUILD_NOTIFICATION_SUCCESS_TITLE,
          ));
        }
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          if (memo) {
            dispatch(toastError(
              REBUILD_MEMO_ERROR,
              REBUILD_MEMO_ERROR_TITLE,
            ));
          } else {
            dispatch(toastError(
              REBUILD_NOTIFICATION_ERROR,
              REBUILD_NOTIFICATION_ERROR_TITLE,
            ));
          }
        }
      });
  };
}

// ================ GAL LOOKUP ================

export function getGalErrored(bool) {
  return {
    type: 'GAL_FETCH_ERRORED',
    hasErrored: bool,
  };
}
export function getGalLoading(bool) {
  return {
    type: 'GAL_FETCH_LOADING',
    isLoading: bool,
  };
}
export function getGalSuccess(results) {
  return {
    type: 'GAL_FETCH_SUCCESS',
    results,
  };
}
let cancelGetGal;
export function getGal(query = {}) {
  return (dispatch) => {
    if (cancelGetGal) { cancelGetGal('cancel'); }
    batch(() => {
      dispatch(getGalLoading(true));
      dispatch(getGalErrored(false));
    });
    const q = convertQueryToString(query);
    const endpoint = '/fsbid/tmone/gal/';
    const ep = `${endpoint}?${q}`;
    api().get(ep, {
      cancelToken: new CancelToken((c) => { cancelGetGal = c; }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(getGalSuccess(data));
          dispatch(getGalErrored(false));
          dispatch(getGalLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          batch(() => {
            dispatch(getGalSuccess({}));
            dispatch(getGalErrored(true));
            dispatch(getGalLoading(false));
          });
        } else {
          batch(() => {
            dispatch(getGalSuccess({}));
            dispatch(getGalErrored(false));
            dispatch(getGalLoading(true));
          });
        }
      });
  };
}

// ================ SEND TM1 ================

let cancelSendNotification;
export function sendNotification(data, onSuccess, memo) {
  return (dispatch) => {
    if (cancelSendNotification) {
      cancelSendNotification('cancel');
    }
    api()
      .post('/fsbid/tmone/send/', data, {
        cancelToken: new CancelToken((c) => { cancelSendNotification = c; }),
      })
      .then(() => {
        if (memo) {
          dispatch(toastSuccess(
            SEND_MEMO_SUCCESS,
            SEND_MEMO_SUCCESS_TITLE,
          ));
        } else {
          dispatch(toastSuccess(
            SEND_NOTIFICATION_SUCCESS,
            SEND_NOTIFICATION_SUCCESS_TITLE,
          ));
        }
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          if (memo) {
            dispatch(toastError(
              SEND_MEMO_ERROR,
              SEND_MEMO_ERROR_TITLE,
            ));
          } else {
            dispatch(toastError(
              SEND_NOTIFICATION_ERROR,
              SEND_NOTIFICATION_ERROR_TITLE,
            ));
          }
        }
      });
  };
}

// ================ STORE TM1 ================

let cancelStoreNotification;
export function storeNotification(data, onSuccess) {
  return () => {
    if (cancelStoreNotification) {
      cancelStoreNotification('cancel');
    }
    api()
      .post('/fsbid/tmone/store/', data, {
        cancelToken: new CancelToken((c) => { cancelStoreNotification = c; }),
      })
      .then(() => {
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch(() => {
      });
  };
}

// ================ SEND TO EOPF ================

let cancelSendToEopf;
export function sendToEopf(data, onSuccess, memo) {
  return (dispatch) => {
    if (cancelSendToEopf) {
      cancelSendToEopf('cancel');
    }
    api()
      .post('/fsbid/tmone/eopf/', data, {
        cancelToken: new CancelToken((c) => { cancelSendToEopf = c; }),
      })
      .then(() => {
        dispatch(storeNotification({
          PV_NM_SEQ_NUM_I: data.perseqnum,
          PV_FILE_NAME_I: data.pdffilename,
          PV_NOTE_TYPE_I: memo ? 'M' : 'C',
        }));
        dispatch(toastSuccess(
          SEND_NOTIFICATION_TO_EOPF_SUCCESS,
          SEND_NOTIFICATION_TO_EOPF_SUCCESS_TITLE,
        ));
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          dispatch(toastError(
            SEND_NOTIFICATION_TO_EOPF_ERROR,
            SEND_NOTIFICATION_TO_EOPF_ERROR_TITLE,
          ));
        }
      });
  };
}

// ================ GET OPS WSDL ================

export function getOpsWsdlErrored(bool) {
  return {
    type: 'OPS_WSDL_FETCH_ERRORED',
    hasErrored: bool,
  };
}
export function getOpsWsdlLoading(bool) {
  return {
    type: 'OPS_WSDL_FETCH_LOADING',
    isLoading: bool,
  };
}
export function getOpsWsdlSuccess(results) {
  return {
    type: 'OPS_WSDL_FETCH_SUCCESS',
    results,
  };
}
let cancelGetOpsWsdl;
export function getOpsWsdl() {
  return (dispatch) => {
    if (cancelGetOpsWsdl) { cancelGetOpsWsdl('cancel'); }
    batch(() => {
      dispatch(getOpsWsdlLoading(true));
      dispatch(getOpsWsdlErrored(false));
    });
    const ep = '/fsbid/tmone/ops/wsdl/';
    api().get(ep, {
      cancelToken: new CancelToken((c) => { cancelGetOpsWsdl = c; }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(getOpsWsdlSuccess(data));
          dispatch(getOpsWsdlErrored(false));
          dispatch(getOpsWsdlLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          batch(() => {
            dispatch(getOpsWsdlSuccess({}));
            dispatch(getOpsWsdlErrored(true));
            dispatch(getOpsWsdlLoading(false));
          });
        } else {
          batch(() => {
            dispatch(getOpsWsdlSuccess({}));
            dispatch(getOpsWsdlErrored(false));
            dispatch(getOpsWsdlLoading(true));
          });
        }
      });
  };
}

// ================ GET OPS SOAP ACTION ================

export function getOpsSoapActionErrored(bool) {
  return {
    type: 'OPS_SOAP_ACTION_FETCH_ERRORED',
    hasErrored: bool,
  };
}
export function getOpsSoapActionLoading(bool) {
  return {
    type: 'OPS_SOAP_ACTION_FETCH_LOADING',
    isLoading: bool,
  };
}
export function getOpsSoapActionSuccess(results) {
  return {
    type: 'OPS_SOAP_ACTION_FETCH_SUCCESS',
    results,
  };
}
let cancelGetOpsSoapAction;
export function getOpsSoapAction() {
  return (dispatch) => {
    if (cancelGetOpsSoapAction) { cancelGetOpsSoapAction('cancel'); }
    batch(() => {
      dispatch(getOpsSoapActionLoading(true));
      dispatch(getOpsSoapActionErrored(false));
    });
    const ep = '/fsbid/tmone/ops/action/';
    api().get(ep, {
      cancelToken: new CancelToken((c) => { cancelGetOpsSoapAction = c; }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(getOpsSoapActionSuccess(data));
          dispatch(getOpsSoapActionErrored(false));
          dispatch(getOpsSoapActionLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          batch(() => {
            dispatch(getOpsSoapActionSuccess({}));
            dispatch(getOpsSoapActionErrored(true));
            dispatch(getOpsSoapActionLoading(false));
          });
        } else {
          batch(() => {
            dispatch(getOpsSoapActionSuccess({}));
            dispatch(getOpsSoapActionErrored(false));
            dispatch(getOpsSoapActionLoading(true));
          });
        }
      });
  };
}

// ================ GET OPS SOAP DATA ================

export function getOpsDataErrored(bool) {
  return {
    type: 'OPS_DATA_FETCH_ERRORED',
    hasErrored: bool,
  };
}
export function getOpsDataLoading(bool) {
  return {
    type: 'OPS_DATA_FETCH_LOADING',
    isLoading: bool,
  };
}
export function getOpsDataSuccess(results) {
  return {
    type: 'OPS_DATA_FETCH_SUCCESS',
    results,
  };
}
let cancelGetOpsData;
export function getOpsData(query = {}) {
  return (dispatch) => {
    if (cancelGetOpsData) { cancelGetOpsData('cancel'); }
    batch(() => {
      dispatch(getOpsDataLoading(true));
      dispatch(getOpsDataErrored(false));
    });
    const q = convertQueryToString(query);
    const endpoint = '/fsbid/tmone/ops/soap/';
    const ep = `${endpoint}?${q}`;
    api().get(ep, {
      cancelToken: new CancelToken((c) => { cancelGetOpsData = c; }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(getOpsDataSuccess(data));
          dispatch(getOpsDataErrored(false));
          dispatch(getOpsDataLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          batch(() => {
            dispatch(getOpsDataSuccess({}));
            dispatch(getOpsDataErrored(true));
            dispatch(getOpsDataLoading(false));
          });
        } else {
          batch(() => {
            dispatch(getOpsDataSuccess({}));
            dispatch(getOpsDataErrored(false));
            dispatch(getOpsWsdlLoading(true));
          });
        }
      });
  };
}

// ================ SEND SOAP TO WSDL // MAKE OPS LOG ================

let cancelSendSoap;
export function sendSoap(data, onSuccess) {
  return (dispatch) => {
    if (cancelSendSoap) {
      cancelSendSoap('cancel');
    }
    api().post('/fsbid/tmone/ops/send/', data.soapRequest, {
      cancelToken: new CancelToken((c) => { cancelSendSoap = c; }),
    })
      .then((response) => {
        api().put('/fsbid/tmone/ops/log/', data.logRequest)
          .then(() => {
            const soapResponse = extractSoapResponse(response.data);
            const updateRequest = {
              PV_OTL_ID_I: response.PV_OTL_ID_O,
              PV_OTL_SUBMIT_RETURN_CODE_I: soapResponse.code,
              PV_OTL_SUBMIT_MESSAGE_I: soapResponse.message || 'No Message',
            };
            api().post('/fsbid/tmone/ops/log/', updateRequest)
              .then(() => {
                dispatch(toastSuccess(
                  'TM1 SOAP Message and OPS Log',
                  'This TM1 SOAP Message has been successfully sent to OPS WSDL and OPS Logs were created.',
                ));
                if (onSuccess) {
                  onSuccess();
                }
              })
              .catch((err) => {
                if (err?.message !== 'cancel') {
                  dispatch(toastError(
                    UPDATE_NOTIFICATION_OPS_LOG_ERROR,
                    UPDATE_NOTIFICATION_OPS_LOG_ERROR_TITLE,
                  ));
                }
              });
          })
          .catch((err) => {
            if (err?.message !== 'cancel') {
              dispatch(toastError(
                INSERT_NOTIFICATION_OPS_LOG_ERROR,
                INSERT_NOTIFICATION_OPS_LOG_ERROR_TITLE,
              ));
            }
          });
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          dispatch(toastError(
            SEND_NOTIFICATION_SOAP_ERROR,
            SEND_NOTIFICATION_SOAP_ERROR_TITLE,
          ));
        }
      });
  };
}

// ================ EMAIL NOTIFICATION ================

let cancelEmailNotification;
export function emailNotification(data, onSuccess) {
  return (dispatch) => {
    if (cancelEmailNotification) {
      cancelEmailNotification('cancel');
    }
    api()
      .post('/fsbid/tmone/email/note/', data, {
        cancelToken: new CancelToken((c) => { cancelEmailNotification = c; }),
      })
      .then(() => {
        dispatch(toastSuccess(
          EMAIL_NOTIFICATION_SUCCESS,
          EMAIL_NOTIFICATION_SUCCESS_TITLE,
        ));
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          dispatch(toastError(
            EMAIL_NOTIFICATION_ERROR,
            EMAIL_NOTIFICATION_ERROR_TITLE,
          ));
        }
      });
  };
}

// ================ EMAIL MEMO ================

let cancelEmailMemo;
export function emailMemo(data, onSuccess) {
  return (dispatch) => {
    if (cancelEmailMemo) {
      cancelEmailMemo('cancel');
    }
    api()
      .post('/fsbid/tmone/email/memo/', data, {
        cancelToken: new CancelToken((c) => { cancelEmailMemo = c; }),
      })
      .then(() => {
        dispatch(toastSuccess(
          EMAIL_MEMO_SUCCESS,
          EMAIL_MEMO_SUCCESS_TITLE,
        ));
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          dispatch(toastError(
            EMAIL_MEMO_ERROR,
            EMAIL_MEMO_ERROR_TITLE,
          ));
        }
      });
  };
}
