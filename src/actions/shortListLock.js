import { get } from 'lodash';
import { toastError, toastSuccess } from './toast';
import api from '../api';

export function shortListLockStatus(isLocked) {
  return {
    type: 'SHORT_LIST_LOCK_SUCCESS',
    isLocked,
  };
}

export function shortListLockIsLoading(bool) {
  return {
    type: 'SHORT_LIST_LOCK_IS_LOADING',
    isLoading: bool,
  };
}

export function shortListLockHasErrored(str) {
  return {
    type: 'SHORT_LIST_LOCK_HAS_ERRORED',
    hasErrored: str,
  };
}

export function shortListLockUpdateIsLoading(bool) {
  return {
    type: 'SHORT_LIST_LOCK_UPDATE_IS_LOADING',
    isLoading: bool,
  };
}

export function shortListLockUpdateHasErrored(str) {
  return {
    type: 'SHORT_LIST_LOCK_UPDATE_HAS_ERRORED',
    hasErrored: str,
  };
}

export function shortListLockFetchData(id) {
  return (dispatch) => {
    dispatch(shortListLockIsLoading(true));
    api().get(`/available_position/${id}/ranking/lock/`)
      .then((response) => {
        const statusCode = get(response, 'status', '');
        if (statusCode === 204) {
          dispatch(shortListLockStatus(true));
          dispatch(shortListLockHasErrored(false));
        } else {
          dispatch(shortListLockHasErrored(''));
        }
        dispatch(shortListLockIsLoading(false));
      })
      .catch((error) => {
        const statusCode = get(error, 'response.status', '');
        if (statusCode === 404) {
          dispatch(shortListLockStatus(false));
          dispatch(shortListLockHasErrored(false));
        } else if (statusCode === 403) {
          dispatch(shortListLockHasErrored('Insufficient permission'));
        }
        dispatch(shortListLockIsLoading(false));
      });
  };
}

/* status = true indicates that the position should be locked
   status = false indicates that the position should be unlocked */
export function shortListLockUpdateData(id, status) {
  return (dispatch) => {
    const method = status ? 'put' : 'delete';
    dispatch(shortListLockUpdateIsLoading(true));
    api()[method](`/available_position/${id}/ranking/lock/`)
      .then(() => {
        dispatch(shortListLockStatus(status));
        dispatch(shortListLockUpdateHasErrored(false));
        dispatch(shortListLockUpdateIsLoading(false));
        dispatch(toastSuccess(`Short list lock status been successfully ${status ? '' : 'un'}locked.`, 'Update successful'));
      })
      .catch(() => {
        dispatch(shortListLockUpdateHasErrored(false));
        dispatch(shortListLockUpdateIsLoading(false));
        dispatch(toastError(`Unable to ${status ? 'unlock' : 'lock'}.`, 'Error updating'));
      });
  };
}
