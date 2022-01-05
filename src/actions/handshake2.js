import { batch } from 'react-redux';
import * as SystemMessages from 'Constants/SystemMessages';
import { get } from 'lodash';
import { userProfilePublicFetchData } from './userProfilePublic';
import { bidListFetchData } from './bidList/bidList';
import api from '../api';
import { toastError, toastHandshake, toastSuccess } from './toast';
// TODO: move contents of this file over to handshake.js after PR 1494 merged
export function acceptedHandshakeNotification(notificationInformation) {
  return {
    type: 'ACCEPTED_HANDSHAKE_NOTIFICATION',
    notificationInformation,
  };
}

export function acceptHandshakeHasErrored(bool) {
  return {
    type: 'ACCEPT_HANDSHAKE_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function acceptHandshakeIsLoading(bool) {
  return {
    type: 'ACCEPT_HANDSHAKE_IS_LOADING',
    isLoading: bool,
  };
}

export function acceptHandshakeSuccess(bool) {
  return {
    type: 'ACCEPT_HANDSHAKE_SUCCESS',
    success: bool,
  };
}

export function declineHandshakeHasErrored(bool) {
  return {
    type: 'DECLINE_HANDSHAKE_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function declineHandshakeIsLoading(bool) {
  return {
    type: 'DECLINE_HANDSHAKE_IS_LOADING',
    isLoading: bool,
  };
}

export function declineHandshakeSuccess(bool) {
  return {
    type: 'DECLINE_HANDSHAKE_SUCCESS',
    success: bool,
  };
}

export function acceptHandshake(position_info, username, isCDO, emp_id) {
  return (dispatch) => {
    batch(() => {
      dispatch(acceptHandshakeIsLoading(true));
      dispatch(acceptHandshakeHasErrored(false));
    });
    const url = `/bidding/handshake/${isCDO ? `cdo/${emp_id}` : 'bidder'}/${get(position_info, 'id')}/`;
    api().put(url)
      .then(() => {
        batch(() => {
          dispatch(acceptedHandshakeNotification({
            title: SystemMessages.HANDSHAKE_ACCEPTED_TITLE,
            message: SystemMessages.HANDSHAKE_ACCEPTED_BODY({ position_info, username, isCDO }),
          }));
          dispatch(toastHandshake(
            SystemMessages.HANDSHAKE_ACCEPTED_BODY({ position_info, username, isCDO }),
            SystemMessages.HANDSHAKE_ACCEPTED_TITLE,
          ));
          dispatch(acceptHandshakeSuccess(true));
          dispatch(acceptHandshakeHasErrored(false));
          dispatch(acceptHandshakeIsLoading(false));
        });
        if (isCDO) {
          dispatch(userProfilePublicFetchData(emp_id));
        } else {
          dispatch(bidListFetchData());
        }
      })
      .catch(() => {
        batch(() => {
          dispatch(toastError(SystemMessages.HANDSHAKE_ACCEPT_ERROR));
          dispatch(acceptHandshakeHasErrored(true));
          dispatch(acceptHandshakeIsLoading(false));
        });
      });
  };
}

export function declineHandshake(cp_id, isCDO, emp_id) {
  return (dispatch) => {
    batch(() => {
      dispatch(declineHandshakeIsLoading(true));
      dispatch(declineHandshakeHasErrored(false));
    });
    const url = `/bidding/handshake/${isCDO ? `cdo/${emp_id}` : 'bidder'}/${cp_id}/`;
    api().delete(url)
      .then(() => {
        batch(() => {
          dispatch(toastSuccess(SystemMessages.HANDSHAKE_DECLINE_BODY,
            SystemMessages.HANDSHAKE_DECLINE_TITLE));
          dispatch(declineHandshakeSuccess(true));
          dispatch(declineHandshakeHasErrored(false));
          dispatch(declineHandshakeIsLoading(false));
        });
        if (isCDO) {
          dispatch(userProfilePublicFetchData(emp_id));
        } else {
          dispatch(bidListFetchData());
        }
      })
      .catch(() => {
        batch(() => {
          dispatch(toastError(SystemMessages.HANDSHAKE_DECLINE_ERROR));
          dispatch(declineHandshakeHasErrored(true));
          dispatch(declineHandshakeIsLoading(false));
        });
      });
  };
}
