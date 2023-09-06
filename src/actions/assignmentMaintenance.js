import { batch } from 'react-redux';
import { CREATE_ASSIGNMENT_ERROR,
  CREATE_ASSIGNMENT_ERROR_TITLE,
  CREATE_ASSIGNMENT_SUCCESS,
  CREATE_ASSIGNMENT_SUCCESS_TITLE,
  EDIT_ASSIGNMENT_ERROR,
  EDIT_ASSIGNMENT_ERROR_TITLE,
  EDIT_ASSIGNMENT_SUCCESS,
  EDIT_ASSIGNMENT_SUCCESS_TITLE,
} from 'Constants/SystemMessages';
import api from '../api';
import { toastError, toastSuccess } from './toast';

export function editAssignmentHasErrored(bool) {
  return {
    type: 'EDIT_ASSIGNMENT_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function editAssignmentIsLoading(bool) {
  return {
    type: 'EDIT_ASSIGNMENT_IS_LOADING',
    isLoading: bool,
  };
}
export function editAssignmentSuccess(data) {
  return {
    type: 'EDIT_ASSIGNMENT_SUCCESS',
    data,
  };
}

// eslint-disable-next-line arrow-body-style
export const editAssignment = (data) => {
  return (dispatch) => {
    dispatch(editAssignmentIsLoading(true));
    dispatch(editAssignmentHasErrored(false));
    api().post('/assignment-maintenance-endpoint-TBD/', data)
      .then(({ res }) => {
        batch(() => {
          dispatch(editAssignmentHasErrored(false));
          dispatch(editAssignmentSuccess(res));
          dispatch(toastSuccess(EDIT_ASSIGNMENT_SUCCESS, EDIT_ASSIGNMENT_SUCCESS_TITLE));
          dispatch(editAssignmentIsLoading(false));
        });
      }).catch(() => {
        dispatch(toastError(EDIT_ASSIGNMENT_ERROR, EDIT_ASSIGNMENT_ERROR_TITLE));
        dispatch(editAssignmentHasErrored(true));
        dispatch(editAssignmentIsLoading(false));
      });
  };
};

export function createAssignmentHasErrored(bool) {
  return {
    type: 'CREATE_ASSIGNMENT_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function createAssignmentIsLoading(bool) {
  return {
    type: 'CREATE_ASSIGNMENT_IS_LOADING',
    isLoading: bool,
  };
}
export function createAssignmentSuccess(data) {
  return {
    type: 'CREATE_ASSIGNMENT_SUCCESS',
    data,
  };
}

// eslint-disable-next-line arrow-body-style
export const createAssignmentSeparation = (data) => {
  return (dispatch) => {
    dispatch(createAssignmentIsLoading(true));
    dispatch(createAssignmentHasErrored(false));
    api().put('/new/assginment/separation/ep/TBD/', data)
      .then(({ res }) => {
        batch(() => {
          dispatch(createAssignmentHasErrored(false));
          dispatch(createAssignmentSuccess(res));
          dispatch(toastSuccess(CREATE_ASSIGNMENT_SUCCESS, CREATE_ASSIGNMENT_SUCCESS_TITLE));
          dispatch(createAssignmentIsLoading(false));
        });
      }).catch(() => {
        dispatch(toastError(CREATE_ASSIGNMENT_ERROR, CREATE_ASSIGNMENT_ERROR_TITLE));
        dispatch(createAssignmentHasErrored(true));
        dispatch(createAssignmentIsLoading(false));
      });
  };
};
