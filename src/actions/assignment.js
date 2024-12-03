import { CancelToken } from 'axios';
import { batch } from 'react-redux';
import { toastError, toastSuccess } from './toast';
import api from '../api';
import {
  CREATE_ALT_ASSIGNMENT_ERROR, CREATE_ALT_ASSIGNMENT_ERROR_TITLE,
  CREATE_ALT_ASSIGNMENT_SUCCESS, CREATE_ALT_ASSIGNMENT_SUCCESS_TITLE,
  CREATE_ALT_SEPARATION_ERROR, CREATE_ALT_SEPARATION_ERROR_TITLE,
  CREATE_ALT_SEPARATION_SUCCESS, CREATE_ALT_SEPARATION_SUCCESS_TITLE,
  UPDATE_ALT_ASSIGNMENT_ERROR, UPDATE_ALT_ASSIGNMENT_ERROR_TITLE,
  UPDATE_ALT_ASSIGNMENT_SUCCESS, UPDATE_ALT_ASSIGNMENT_SUCCESS_TITLE, UPDATE_ALT_SEPARATION_ERROR, UPDATE_ALT_SEPARATION_ERROR_TITLE, UPDATE_ALT_SEPARATION_SUCCESS, UPDATE_ALT_SEPARATION_SUCCESS_TITLE,
} from '../Constants/SystemMessages';

// ================ ASSIGNMENT HISTORY LIST ================

export function assignmentHasErrored(bool) {
  return {
    type: 'ASSIGNMENT_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function assignmentIsLoading(bool) {
  return {
    type: 'ASSIGNMENT_IS_LOADING',
    isLoading: bool,
  };
}
export function assignmentFetchDataSuccess(assignment) {
  return {
    type: 'ASSIGNMENT_FETCH_DATA_SUCCESS',
    assignment,
  };
}
export function assignmentFetchData(id) {
  return (dispatch) => {
    batch(() => {
      dispatch(assignmentIsLoading(true));
      dispatch(assignmentHasErrored(false));
    });
    api()
      .get(`/fsbid/assignment_history/${id ? `${id}/` : ''}`)
      .then(({ data }) => {
        batch(() => {
          dispatch(assignmentFetchDataSuccess(data));
          dispatch(assignmentIsLoading(false));
          dispatch(assignmentHasErrored(false));
        });
      })
      .catch(() => {
        batch(() => {
          dispatch(assignmentHasErrored(true));
          dispatch(assignmentIsLoading(false));
        });
      });
  };
}

// ================ ALTERNATIVE ASSIGNMENTS AND SEPARATIONS LIST ================
// Uses FSBID fields 1:1 to fetch all assignments and separations for perdet

export function altAssignmentsSeparationsErrored(bool) {
  return {
    type: 'ALT_ASSIGNMENTS_SEPARATIONS_FETCH_ERRORED',
    hasErrored: bool,
  };
}
export function altAssignmentsSeparationsLoading(bool) {
  return {
    type: 'ALT_ASSIGNMENTS_SEPARATIONS_FETCH_LOADING',
    isLoading: bool,
  };
}
export function altAssignmentsSeparationsSuccess(data) {
  return {
    type: 'ALT_ASSIGNMENTS_SEPARATIONS_FETCH_SUCCESS',
    data,
  };
}
export function altAssignmentsSeparations(id) {
  return (dispatch) => {
    batch(() => {
      dispatch(altAssignmentsSeparationsLoading(true));
      dispatch(altAssignmentsSeparationsErrored(false));
    });
    api()
      .get(`/fsbid/assignment_history/${id}/assignments-separations/`)
      .then(({ data }) => {
        batch(() => {
          dispatch(altAssignmentsSeparationsSuccess(data));
          dispatch(altAssignmentsSeparationsLoading(false));
          dispatch(altAssignmentsSeparationsErrored(false));
        });
      })
      .catch(() => {
        batch(() => {
          dispatch(altAssignmentsSeparationsErrored(true));
          dispatch(altAssignmentsSeparationsLoading(false));
        });
      });
  };
}

// ================ ALTERNATIVE ASSIGNMENT DETAIL ================
// Uses FSBID fields 1:1 to fetch assignment detail and ref data

export function altAssignmentErrored(bool) {
  return {
    type: 'ALT_ASSIGNMENT_FETCH_ERRORED',
    hasErrored: bool,
  };
}
export function altAssignmentLoading(bool) {
  return {
    type: 'ALT_ASSIGNMENT_FETCH_LOADING',
    isLoading: bool,
  };
}
export function altAssignmentSuccess(data) {
  return {
    type: 'ALT_ASSIGNMENT_FETCH_SUCCESS',
    data,
  };
}
export function altAssignment(perdet, asgId, revision_num) {
  return (dispatch) => {
    batch(() => {
      dispatch(altAssignmentLoading(true));
      dispatch(altAssignmentErrored(false));
    });
    const base = `/fsbid/assignment_history/${perdet}/assignments`;
    api()
      .get(`${base}/${asgId || ''}/?revision_num=${revision_num || ''}`)
      .then(({ data }) => {
        batch(() => {
          dispatch(altAssignmentSuccess(data));
          dispatch(altAssignmentLoading(false));
          dispatch(altAssignmentErrored(false));
        });
      })
      .catch(() => {
        batch(() => {
          dispatch(altAssignmentErrored(true));
          dispatch(altAssignmentLoading(false));
        });
      });
  };
}


// ================ ALTERNATIVE SEPARATION DETAIL ================
// Uses FSBID fields 1:1 to fetch separation detail and ref data

export function altSeparationErrored(bool) {
  return {
    type: 'ALT_SEPARATION_ERRORED',
    hasErrored: bool,
  };
}
export function altSeparationLoading(bool) {
  return {
    type: 'ALT_SEPARATION_LOADING',
    isLoading: bool,
  };
}
export function altSeparationSuccess(data) {
  return {
    type: 'ALT_SEPARATION_SUCCESS',
    data,
  };
}
export function altSeparation(perdet, sepId, revision_num) {
  return (dispatch) => {
    batch(() => {
      dispatch(altSeparationLoading(true));
      dispatch(altSeparationErrored(false));
    });
    const base = `/fsbid/assignment_history/${perdet}/separations`;
    api()
      .get(`${base}/${sepId || ''}/?revision_num=${revision_num || ''}`)
      .then(({ data }) => {
        batch(() => {
          dispatch(altSeparationSuccess(data));
          dispatch(altSeparationLoading(false));
          dispatch(altSeparationErrored(false));
        });
      })
      .catch(() => {
        batch(() => {
          dispatch(altSeparationErrored(true));
          dispatch(altSeparationLoading(false));
        });
      });
  };
}


// ================ CREATE/UPDATE ASSIGNMENT/SEPARATION ================

let cancelAction;

export function assignmentSeparationAction(query, perdet, id, isSeparation, onSuccess) {
  const type = isSeparation ? 'separations' : 'assignments';

  let toastSuccessMessage = CREATE_ALT_ASSIGNMENT_SUCCESS;
  let toastSuccessTitle = CREATE_ALT_ASSIGNMENT_SUCCESS_TITLE;
  let toastErrorMessage = CREATE_ALT_ASSIGNMENT_ERROR;
  let toastErrorTitle = CREATE_ALT_ASSIGNMENT_ERROR_TITLE;

  if (!isSeparation && id) {
    toastSuccessMessage = UPDATE_ALT_ASSIGNMENT_SUCCESS;
    toastSuccessTitle = UPDATE_ALT_ASSIGNMENT_SUCCESS_TITLE;
    toastErrorMessage = UPDATE_ALT_ASSIGNMENT_ERROR;
    toastErrorTitle = UPDATE_ALT_ASSIGNMENT_ERROR_TITLE;
  }

  if (isSeparation) {
    if (id) {
      toastSuccessMessage = UPDATE_ALT_SEPARATION_SUCCESS;
      toastSuccessTitle = UPDATE_ALT_SEPARATION_SUCCESS_TITLE;
      toastErrorMessage = UPDATE_ALT_SEPARATION_ERROR;
      toastErrorTitle = UPDATE_ALT_SEPARATION_ERROR_TITLE;
    } else {
      toastSuccessMessage = CREATE_ALT_SEPARATION_SUCCESS;
      toastSuccessTitle = CREATE_ALT_SEPARATION_SUCCESS_TITLE;
      toastErrorMessage = CREATE_ALT_SEPARATION_ERROR;
      toastErrorTitle = CREATE_ALT_SEPARATION_ERROR_TITLE;
    }
  }

  return (dispatch) => {
    if (cancelAction) {
      cancelAction('cancel');
    }
    const promise = (instance) => {
      instance
        .then(() => {
          batch(() => {
            dispatch(toastSuccess(toastSuccessMessage, toastSuccessTitle));
            dispatch(altAssignmentsSeparations(perdet));
            if (onSuccess) {
              onSuccess();
            }
          });
        })
        .catch((err) => {
          const errorMsg = err?.response?.data?.error_message;
          if (err?.message !== 'cancel') {
            if (errorMsg) {
              dispatch(toastError(`${toastErrorMessage} ${errorMsg}`, toastErrorTitle));
            } else {
              dispatch(toastError(toastErrorMessage, toastErrorTitle));
            }
          }
        });
    };
    if (id) {
      promise(api().put(`/fsbid/assignment_history/${perdet}/${type}/${id}/`, query, {
        cancelToken: new CancelToken((c) => { cancelAction = c; }),
      }));
    } else {
      promise(api().post(`/fsbid/assignment_history/${perdet}/${type}/`, query, {
        cancelToken: new CancelToken((c) => { cancelAction = c; }),
      }));
    }
  };
}
