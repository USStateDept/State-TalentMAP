import { batch } from 'react-redux';
import * as SystemMessages from 'Constants/SystemMessages';
import api from '../api';
import { toastError, toastHandshake } from './toast';

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

export function acceptHandshakeSuccess(response) {
  return {
    type: 'ACCEPT_HANDSHAKE_SUCCESS',
    response,
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

export function declineHandshakeSuccess(response) {
  return {
    type: 'DECLINE_HANDSHAKE_SUCCESS',
    response,
  };
}

export function acceptHandshake(cp_id) {
  return (dispatch) => {
    batch(() => {
      dispatch(acceptHandshakeIsLoading(true));
      dispatch(acceptHandshakeHasErrored(false));
    });
    const url = `/bidding/handshake/bidder/${cp_id}/`;
    api().put(url)
      .then((response) => {
        const x = { name: 'Tarek Rehman', position: { name: 'Special Agent (56013011)', link: '/details/8006' }, bid: '/profile/bidtracker/public/6' };
        batch(() => {
          dispatch(acceptedHandshakeNotification({
            title: SystemMessages.HANDSHAKE_ACCEPTED_TITLE,
            message: SystemMessages.HANDSHAKE_ACCEPTED_BODY(x),
          }));
          dispatch(toastHandshake(
            SystemMessages.HANDSHAKE_ACCEPTED_BODY(x),
            SystemMessages.HANDSHAKE_ACCEPTED_TITLE,
          ));
          dispatch(acceptHandshakeSuccess(response));
          dispatch(acceptHandshakeHasErrored(false));
          dispatch(acceptHandshakeIsLoading(false));
        });
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

// eslint-disable-next-line no-unused-vars
export function declineHandshake(cp_id) {
  return (dispatch) => {
    batch(() => {
      dispatch(declineHandshakeIsLoading(true));
      dispatch(declineHandshakeHasErrored(false));
    });
    const url = `/bidding/handshake/bidder/${cp_id}/`;
    api().delete(url)
      .then((response) => {
        batch(() => {
        //  need to add HS decline toast
        //   dispatch(declineHandshakeNotification({
        //     title: SystemMessages.HANDSHAKE_ACCEPTED_TITLE,
        //     message: SystemMessages.HANDSHAKE_ACCEPTED_BODY(x),
        //   }));
        //   dispatch(toastHandshake(
        //     SystemMessages.HANDSHAKE_ACCEPTED_BODY(x),
        //     SystemMessages.HANDSHAKE_ACCEPTED_TITLE,
        //   ));
          dispatch(declineHandshakeSuccess(response));
          dispatch(declineHandshakeHasErrored(false));
          dispatch(declineHandshakeIsLoading(false));
        });
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
