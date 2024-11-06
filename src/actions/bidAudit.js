import { CancelToken } from 'axios';
import { convertQueryToString } from 'utilities';
import {
  CREATE_BID_AUDIT_CATEGORY_ERROR,
  CREATE_BID_AUDIT_CATEGORY_ERROR_TITLE,
  CREATE_BID_AUDIT_CATEGORY_SUCCESS,
  CREATE_BID_AUDIT_CATEGORY_SUCCESS_TITLE,
  CREATE_BID_AUDIT_ERROR,
  CREATE_BID_AUDIT_ERROR_TITLE,
  CREATE_BID_AUDIT_GRADE_ERROR,
  CREATE_BID_AUDIT_GRADE_ERROR_TITLE,
  CREATE_BID_AUDIT_GRADE_SUCCESS,
  CREATE_BID_AUDIT_GRADE_SUCCESS_TITLE,
  CREATE_BID_AUDIT_SUCCESS,
  CREATE_BID_AUDIT_SUCCESS_TITLE,
  DELETE_IN_CATEGORY_AT_GRADE_ERROR,
  DELETE_IN_CATEGORY_AT_GRADE_ERROR_TITLE,
  DELETE_IN_CATEGORY_AT_GRADE_SUCCESS,
  DELETE_IN_CATEGORY_AT_GRADE_SUCCESS_TITLE,
  RUN_BID_AUDIT_ERROR,
  RUN_BID_AUDIT_ERROR_TITLE,
  RUN_BID_AUDIT_SUCCESS,
  RUN_BID_AUDIT_SUCCESS_TITLE,
  UPDATE_BID_AUDIT_ERROR,
  UPDATE_BID_AUDIT_ERROR_2,
  UPDATE_BID_AUDIT_ERROR_TITLE,
  UPDATE_BID_AUDIT_ERROR_TITLE_2,
  UPDATE_BID_AUDIT_SUCCESS,
  UPDATE_BID_AUDIT_SUCCESS_2,
  UPDATE_BID_AUDIT_SUCCESS_TITLE,
  UPDATE_BID_AUDIT_SUCCESS_TITLE_2,
  UPDATE_BID_COUNT_ERROR,
  UPDATE_BID_COUNT_ERROR_TITLE,
  UPDATE_BID_COUNT_SUCCESS,
  UPDATE_BID_COUNT_SUCCESS_TITLE,
  UPDATE_HTF_ERROR,
  UPDATE_HTF_ERROR_TITLE,
  UPDATE_HTF_SUCCESS,
  UPDATE_HTF_SUCCESS_TITLE,
} from 'Constants/SystemMessages';
import { batch } from 'react-redux';
import api from '../api';
import { toastError, toastSuccess } from './toast';


// ================ Bid Audit: Get List ================

let cancelBidAuditFetch;

export function bidAuditFetchDataErrored(bool) {
  return {
    type: 'BID_AUDIT_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function bidAuditFetchDataLoading(bool) {
  return {
    type: 'BID_AUDIT_FETCH_IS_LOADING',
    isLoading: bool,
  };
}
export function bidAuditFetchDataSuccess(results) {
  return {
    type: 'BID_AUDIT_FETCH_SUCCESS',
    results,
  };
}
export function bidAuditFetchData() {
  return (dispatch) => {
    if (cancelBidAuditFetch) {
      cancelBidAuditFetch('cancel');
    }
    batch(() => {
      dispatch(bidAuditFetchDataLoading(true));
      dispatch(bidAuditFetchDataErrored(false));
    });
    api().get('/fsbid/bid_audit/', {
      cancelToken: new CancelToken((c) => { cancelBidAuditFetch = c; }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(bidAuditFetchDataSuccess(data));
          dispatch(bidAuditFetchDataErrored(false));
          dispatch(bidAuditFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          batch(() => {
            dispatch(bidAuditFetchDataSuccess([]));
            dispatch(bidAuditFetchDataErrored(true));
            dispatch(bidAuditFetchDataLoading(false));
          });
        }
      });
  };
}


// ================ Bid Audit: Get Cycles ================

let cancelBidAuditGetCycles;

export function bidAuditFetchCyclesLoading(bool) {
  return {
    type: 'BID_AUDIT_CYCLE_FETCH_IS_LOADING',
    isLoading: bool,
  };
}
export function bidAuditFetchCyclesSuccess(results) {
  return {
    type: 'BID_AUDIT_CYCLE_FETCH_SUCCESS',
    results,
  };
}
export function bidAuditFetchCycles() {
  return (dispatch) => {
    if (cancelBidAuditGetCycles) {
      cancelBidAuditGetCycles('cancel');
    }
    batch(() => {
      dispatch(bidAuditFetchCyclesLoading(true));
    });
    api().get('/fsbid/bid_audit/cycles/', {
      cancelToken: new CancelToken((c) => { cancelBidAuditGetCycles = c; }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(bidAuditFetchCyclesSuccess(data));
          dispatch(bidAuditFetchCyclesLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          batch(() => {
            dispatch(bidAuditFetchCyclesSuccess({}));
            dispatch(bidAuditFetchCyclesLoading(false));
          });
        }
      });
  };
}


// ================ Bid Audit: Create New Audit ================

let cancelBidAuditCreate;

export function bidAuditCreateAudit(data, onSuccess) {
  return (dispatch) => {
    if (cancelBidAuditCreate) {
      cancelBidAuditCreate('cancel');
    }
    api()
      .post('/fsbid/bid_audit/create/', data, {
        cancelToken: new CancelToken((c) => { cancelBidAuditCreate = c; }),
      })
      .then(() => {
        batch(() => {
          dispatch(toastSuccess(
            CREATE_BID_AUDIT_SUCCESS, CREATE_BID_AUDIT_SUCCESS_TITLE,
          ));
          dispatch(bidAuditFetchData());
          if (onSuccess) onSuccess();
        });
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          dispatch(toastError(CREATE_BID_AUDIT_ERROR, CREATE_BID_AUDIT_ERROR_TITLE));
        }
      });
  };
}


// ================ Bid Audit: Update Audit ================

let cancelModifyAuditUpdate;

export function bidAuditUpdateAudit(data, onSuccess) {
  return (dispatch) => {
    if (cancelModifyAuditUpdate) {
      cancelModifyAuditUpdate('cancel');
    }
    api()
      .post('/fsbid/bid_audit/update/', data, {
        cancelToken: new CancelToken((c) => { cancelModifyAuditUpdate = c; }),
      })
      .then(() => {
        batch(() => {
          dispatch(toastSuccess(
            UPDATE_BID_AUDIT_SUCCESS, UPDATE_BID_AUDIT_SUCCESS_TITLE,
          ));
          dispatch(bidAuditFetchData());
          if (onSuccess) onSuccess();
        });
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          dispatch(toastError(UPDATE_BID_AUDIT_ERROR, UPDATE_BID_AUDIT_ERROR_TITLE));
        }
      });
  };
}

// ================ Bid Audit: Update Bid Counts ================

let cancelBidAuditUpdateCount;

export function updateBidCount() {
  return (dispatch) => {
    if (cancelBidAuditUpdateCount) {
      cancelBidAuditUpdateCount('cancel');
    }
    api()
      .get('/fsbid/bid_audit/update_count/', {
        cancelToken: new CancelToken((c) => { cancelBidAuditUpdateCount = c; }),
      })
      .then(() => {
        batch(() => {
          dispatch(toastSuccess(
            UPDATE_BID_COUNT_SUCCESS,
            UPDATE_BID_COUNT_SUCCESS_TITLE,
          ));
        });
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          batch(() => {
            dispatch(
              toastError(
                UPDATE_BID_COUNT_ERROR,
                UPDATE_BID_COUNT_ERROR_TITLE,
              ),
            );
          });
        }
      });
  };
}


// ================ Bid Audit: Get In Category/At Grade ================

let cancelBidAuditSecondFetch;

export function bidAuditSecondFetchDataErrored(bool) {
  return {
    type: 'BID_AUDIT_SECOND_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function bidAuditSecondFetchDataLoading(bool) {
  return {
    type: 'BID_AUDIT_SECOND_FETCH_IS_LOADING',
    isLoading: bool,
  };
}
export function bidAuditSecondFetchDataSuccess(results) {
  return {
    type: 'BID_AUDIT_SECOND_FETCH_SUCCESS',
    results,
  };
}
export function bidAuditSecondFetchData(cycleId, auditId, type) {
  return (dispatch) => {
    if (cancelBidAuditSecondFetch) {
      cancelBidAuditSecondFetch('cancel');
    }
    batch(() => {
      dispatch(bidAuditSecondFetchDataLoading(true));
      dispatch(bidAuditSecondFetchDataErrored(false));
    });
    api()
      .post(`/fsbid/bid_audit/${type}/`, {
        cycleId, auditId,
      }, {
        cancelToken: new CancelToken((c) => { cancelBidAuditSecondFetch = c; }),
      })
      .then(({ data }) => {
        batch(() => {
          dispatch(bidAuditSecondFetchDataSuccess(data));
          dispatch(bidAuditSecondFetchDataErrored(false));
          dispatch(bidAuditSecondFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          batch(() => {
            dispatch(bidAuditSecondFetchDataSuccess([]));
            dispatch(bidAuditSecondFetchDataErrored(true));
            dispatch(bidAuditSecondFetchDataLoading(false));
          });
        }
      });
  };
}


// ================ Bid Audit: Get In Category/At Grade Modal Data ================

let cancelBidAuditSecondFetchModalData;

export function bidAuditSecondFetchModalDataErrored(bool) {
  return {
    type: 'BID_AUDIT_SECOND_FETCH_MODAL_DATA_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function bidAuditSecondFetchModalDataLoading(bool) {
  return {
    type: 'BID_AUDIT_SECOND_FETCH_MODAL_DATA_IS_LOADING',
    isLoading: bool,
  };
}
export function bidAuditSecondFetchModalDataSuccess(results) {
  return {
    type: 'BID_AUDIT_SECOND_FETCH_MODAL_DATA_SUCCESS',
    results,
  };
}
export function bidAuditSecondFetchModalData(cycleId, auditId, type) {
  return (dispatch) => {
    if (cancelBidAuditSecondFetchModalData) {
      cancelBidAuditSecondFetchModalData('cancel');
    }
    batch(() => {
      dispatch(bidAuditSecondFetchModalDataLoading(true));
      dispatch(bidAuditSecondFetchModalDataErrored(false));
    });
    api()
      .post(`/fsbid/bid_audit/options/${type}/`, {
        cycleId, auditId,
      }, {
        cancelToken: new CancelToken((c) => { cancelBidAuditSecondFetchModalData = c; }),
      })
      .then(({ data }) => {
        batch(() => {
          dispatch(bidAuditSecondFetchModalDataSuccess(data));
          dispatch(bidAuditSecondFetchModalDataErrored(false));
          dispatch(bidAuditSecondFetchModalDataLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          batch(() => {
            dispatch(bidAuditSecondFetchModalDataSuccess([]));
            dispatch(bidAuditSecondFetchModalDataErrored(true));
            dispatch(bidAuditSecondFetchModalDataLoading(false));
          });
        }
      });
  };
}

// ================ Bid Audit: Create New In-Category ================

let cancelBidAuditCreateCategory;

export function bidAuditCreateCategory(data, onSuccess, onSuccess2) {
  return (dispatch) => {
    if (cancelBidAuditCreateCategory) {
      cancelBidAuditCreateCategory('cancel');
    }
    api()
      .post('/fsbid/bid_audit/create/category/', data, {
        cancelToken: new CancelToken((c) => { cancelBidAuditCreateCategory = c; }),
      })
      .then(() => {
        batch(() => {
          dispatch(toastSuccess(
            CREATE_BID_AUDIT_CATEGORY_SUCCESS, CREATE_BID_AUDIT_CATEGORY_SUCCESS_TITLE,
          ));
          if (onSuccess) onSuccess();
          if (onSuccess2) onSuccess2();
        });
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          dispatch(toastError(CREATE_BID_AUDIT_CATEGORY_ERROR, CREATE_BID_AUDIT_CATEGORY_ERROR_TITLE));
        }
      });
  };
}

// ================ Bid Audit: Create New At-Grade ================

let cancelBidAuditCreateGrade;

export function bidAuditCreateGrade(data, onSuccess, onSuccess2) {
  return (dispatch) => {
    if (cancelBidAuditCreateGrade) {
      cancelBidAuditCreateGrade('cancel');
    }
    api()
      .post('/fsbid/bid_audit/create/grade/', data, {
        cancelToken: new CancelToken((c) => { cancelBidAuditCreateGrade = c; }),
      })
      .then(() => {
        batch(() => {
          dispatch(toastSuccess(
            CREATE_BID_AUDIT_GRADE_SUCCESS, CREATE_BID_AUDIT_GRADE_SUCCESS_TITLE,
          ));
          if (onSuccess) onSuccess();
          if (onSuccess2) onSuccess2();
        });
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          dispatch(toastError(CREATE_BID_AUDIT_GRADE_ERROR, CREATE_BID_AUDIT_GRADE_ERROR_TITLE));
        }
      });
  };
}

// ================ Bid Audit: Run Bid Audit ================

let cancelBidAuditRunAudit;

export function bidAuditRunAudit(data) {
  return (dispatch) => {
    if (cancelBidAuditRunAudit) {
      cancelBidAuditRunAudit('cancel');
    }
    api()
      .post('/fsbid/bid_audit/run/', data, {
        cancelToken: new CancelToken((c) => { cancelBidAuditRunAudit = c; }),
      })
      .then(() => {
        batch(() => {
          dispatch(toastSuccess(
            RUN_BID_AUDIT_SUCCESS,
            RUN_BID_AUDIT_SUCCESS_TITLE,
          ));
          dispatch(bidAuditFetchData());
        });
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          dispatch(toastError(
            RUN_BID_AUDIT_ERROR,
            RUN_BID_AUDIT_ERROR_TITLE));
        }
      });
  };
}

// ================ Bid Audit: Modify In-Catgory/At-Grade ================

let cancelModifyAuditGradeOrCategory;

export function bidAuditUpdateAuditGradeOrCategory(data, type, onSuccess) {
  return (dispatch) => {
    if (cancelModifyAuditGradeOrCategory) {
      cancelModifyAuditGradeOrCategory('cancel');
    }
    api()
      .post(`/fsbid/bid_audit/update_${type}/`, data, {
        cancelToken: new CancelToken((c) => { cancelModifyAuditGradeOrCategory = c; }),
      })
      .then(() => {
        batch(() => {
          dispatch(toastSuccess(
            UPDATE_BID_AUDIT_SUCCESS_2, UPDATE_BID_AUDIT_SUCCESS_TITLE_2,
          ));
          dispatch(bidAuditFetchData());
          if (onSuccess) onSuccess();
        });
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          dispatch(toastError(UPDATE_BID_AUDIT_ERROR_2, UPDATE_BID_AUDIT_ERROR_TITLE_2));
        }
      });
  };
}

// ================ Bid Audit: Delete In-Catgory/At-Grade ================

let cancelDeleteAuditGradeOrCategory;

export function bidAuditDeleteAuditGradeOrCategory(data, type, onSuccess) {
  return (dispatch) => {
    if (cancelDeleteAuditGradeOrCategory) {
      cancelDeleteAuditGradeOrCategory('cancel');
    }
    api()
      .post(`/fsbid/bid_audit/delete_${type}/`, data, {
        cancelToken: new CancelToken((c) => { cancelDeleteAuditGradeOrCategory = c; }),
      })
      .then(() => {
        batch(() => {
          dispatch(toastSuccess(
            DELETE_IN_CATEGORY_AT_GRADE_SUCCESS, DELETE_IN_CATEGORY_AT_GRADE_SUCCESS_TITLE,
          ));
          dispatch(bidAuditFetchData());
          if (onSuccess) onSuccess();
        });
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          dispatch(toastError(DELETE_IN_CATEGORY_AT_GRADE_ERROR, DELETE_IN_CATEGORY_AT_GRADE_ERROR_TITLE));
        }
      });
  };
}


// ================ Bid Audit: Get Audit Data ================

let cancelBidAuditGetAuditData;

export function bidAuditGetAuditFetchDataErrored(bool) {
  return {
    type: 'BID_AUDIT_GET_AUDIT_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function bidAuditGetAuditFetchDataLoading(bool) {
  return {
    type: 'BID_AUDIT_GET_AUDIT_FETCH_IS_LOADING',
    isLoading: bool,
  };
}
export function bidAuditGetAuditFetchDataSuccess(results) {
  return {
    type: 'BID_AUDIT_GET_AUDIT_FETCH_SUCCESS',
    results,
  };
}

export function bidAuditGetAuditFetchData(query = {}) {
  return (dispatch) => {
    if (cancelBidAuditGetAuditData) {
      cancelBidAuditGetAuditData('cancel');
    }
    batch(() => {
      dispatch(bidAuditGetAuditFetchDataLoading(true));
      dispatch(bidAuditGetAuditFetchDataErrored(false));
    });
    const q = convertQueryToString(query);
    api()
      .get(`/fsbid/bid_audit/data/?${q}`, {
        cancelToken: new CancelToken((c) => { cancelBidAuditGetAuditData = c; }),
      })
      .then(({ data }) => {
        batch(() => {
          dispatch(bidAuditGetAuditFetchDataSuccess(data));
          dispatch(bidAuditGetAuditFetchDataErrored(false));
          dispatch(bidAuditGetAuditFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          batch(() => {
            dispatch(bidAuditGetAuditFetchDataSuccess([]));
            dispatch(bidAuditGetAuditFetchDataErrored(true));
            dispatch(bidAuditGetAuditFetchDataLoading(false));
          });
        }
      });
  };
}

// ================ Bid Audit: Get Postion HTF Data ================

let cancelBidAuditGetHTFData;

export function bidAuditHTFFetchModalDataErrored(bool) {
  return {
    type: 'BID_AUDIT_HTF_FETCH_MODAL_DATA_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function bidAuditHTFFetchModalDataLoading(bool) {
  return {
    type: 'BID_AUDIT_HTF_FETCH_MODAL_DATA_IS_LOADING',
    isLoading: bool,
  };
}
export function bidAuditHTFFetchModalDataSuccess(results) {
  return {
    type: 'BID_AUDIT_HTF_FETCH_MODAL_DATA_SUCCESS',
    results,
  };
}
export function bidAuditHTFFetchModalData(cyclePositionId) {
  return (dispatch) => {
    if (cancelBidAuditGetHTFData) {
      cancelBidAuditGetHTFData('cancel');
    }
    batch(() => {
      dispatch(bidAuditHTFFetchModalDataLoading(true));
      dispatch(bidAuditHTFFetchModalDataErrored(false));
    });
    api()
      .get(`/fsbid/bid_audit/htf/${cyclePositionId}/`, {
        cancelToken: new CancelToken((c) => { cancelBidAuditGetHTFData = c; }),
      })
      .then(({ data }) => {
        batch(() => {
          dispatch(bidAuditHTFFetchModalDataSuccess(data));
          dispatch(bidAuditHTFFetchModalDataErrored(false));
          dispatch(bidAuditHTFFetchModalDataLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          batch(() => {
            dispatch(bidAuditHTFFetchModalDataSuccess({}));
            dispatch(bidAuditHTFFetchModalDataErrored(true));
            dispatch(bidAuditHTFFetchModalDataLoading(false));
          });
        }
      });
  };
}

// ================ Bid Audit: Update HTF ================

let cancelUpdateHTF;

export function bidAuditUpdateHTF(data, onSuccess) {
  return (dispatch) => {
    if (cancelUpdateHTF) {
      cancelUpdateHTF('cancel');
    }
    api()
      .post(`/fsbid/bid_audit/htf/${data.id}/`, data, {
        cancelToken: new CancelToken((c) => { cancelUpdateHTF = c; }),
      })
      .then(() => {
        batch(() => {
          dispatch(toastSuccess(
            UPDATE_HTF_SUCCESS, UPDATE_HTF_SUCCESS_TITLE,
          ));
          if (onSuccess) onSuccess();
        });
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          dispatch(toastError(UPDATE_HTF_ERROR, UPDATE_HTF_ERROR_TITLE));
        }
      });
  };
}

// ================ Bid Audit: Get MDS Data ================

let cancelBidAuditGetMDSData;

export function bidAuditGetMDSFetchDataErrored(bool) {
  return {
    type: 'BID_AUDIT_GET_MDS_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function bidAuditGetMDSFetchDataLoading(bool) {
  return {
    type: 'BID_AUDIT_GET_MDS_FETCH_IS_LOADING',
    isLoading: bool,
  };
}
export function bidAuditGetMDSFetchDataSuccess(results) {
  return {
    type: 'BID_AUDIT_GET_MDS_FETCH_SUCCESS',
    results,
  };
}

export function bidAuditGetMDSFetchData(query = {}) {
  return (dispatch) => {
    if (cancelBidAuditGetMDSData) {
      cancelBidAuditGetMDSData('cancel');
    }
    batch(() => {
      dispatch(bidAuditGetMDSFetchDataLoading(true));
      dispatch(bidAuditGetMDSFetchDataErrored(false));
    });
    const q = convertQueryToString(query);
    api()
      .get(`/fsbid/bid_audit/mds/?${q}`, {
        cancelToken: new CancelToken((c) => { cancelBidAuditGetMDSData = c; }),
      })
      .then(({ data }) => {
        batch(() => {
          dispatch(bidAuditGetMDSFetchDataSuccess(data));
          dispatch(bidAuditGetMDSFetchDataErrored(false));
          dispatch(bidAuditGetMDSFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          batch(() => {
            dispatch(bidAuditGetMDSFetchDataSuccess([]));
            dispatch(bidAuditGetMDSFetchDataErrored(true));
            dispatch(bidAuditGetMDSFetchDataLoading(false));
          });
        }
      });
  };
}
