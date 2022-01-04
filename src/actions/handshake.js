import { batch } from 'react-redux';
import api from '../api';
import { toastError, toastHandshake, toastHandshakeRevoke, toastSuccess } from './toast';
import { userProfilePublicFetchData } from './userProfilePublic';
import { bureauBidsAllFetchData, bureauBidsFetchData, bureauBidsRankingFetchData } from './bureauPositionBids';
import * as SystemMessages from '../Constants/SystemMessages';


export function registerHandshakeHasErrored(bool) {
  return {
    type: 'REGISTER_HANDSHAKE_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function registerHandshakeIsLoading(bool) {
  return {
    type: 'REGISTER_HANDSHAKE_IS_LOADING',
    isLoading: bool,
  };
}

export function registerHandshakeSuccess(response) {
  return {
    type: 'REGISTER_HANDSHAKE_SUCCESS',
    response,
  };
}

export function unregisterHandshakeHasErrored(bool) {
  return {
    type: 'UNREGISTER_HANDSHAKE_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function unregisterHandshakeIsLoading(bool) {
  return {
    type: 'UNREGISTER_HANDSHAKE_IS_LOADING',
    isLoading: bool,
  };
}

export function unregisterHandshakeSuccess(response) {
  return {
    type: 'UNREGISTER_HANDSHAKE_SUCCESS',
    response,
  };
}

export function offerHandshakeHasErrored(bool) {
  return {
    type: 'OFFER_HANDSHAKE_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function offerHandshakeIsLoading(bool) {
  return {
    type: 'OFFER_HANDSHAKE_IS_LOADING',
    isLoading: bool,
  };
}

export function offerHandshakeSuccess(response) {
  return {
    type: 'OFFER_HANDSHAKE_SUCCESS',
    response,
  };
}

export function revokeHandshakeHasErrored(bool) {
  return {
    type: 'REVOKE_HANDSHAKE_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function revokeHandshakeIsLoading(bool) {
  return {
    type: 'REVOKE_HANDSHAKE_IS_LOADING',
    isLoading: bool,
  };
}

export function revokeHandshakeSuccess(response) {
  return {
    type: 'REVOKE_HANDSHAKE_SUCCESS',
    response,
  };
}

export function handshakeOfferedNotification(notificationInformation) {
  return {
    type: 'HANDSHAKE_OFFERED_NOTIFICATION',
    notificationInformation,
  };
}

export function handshakeRevokedNotification(notificationInformation) {
  return {
    type: 'HANDSHAKE_REVOKED_NOTIFICATION',
    notificationInformation,
  };
}

export function handshakeAcceptedNotification(notificationInformation) {
  return {
    type: 'HANDSHAKE_ACCEPTED_NOTIFICATION',
    notificationInformation,
  };
}

// to reset state
export function routeChangeResetState() {
  return (dispatch) => {
    batch(() => {
      dispatch(registerHandshakeSuccess(false));
      dispatch(registerHandshakeHasErrored(false));
      dispatch(registerHandshakeIsLoading(false));
    });
  };
}

export function unregisterHandshake(id, clientId) {
  return (dispatch) => {
    const idString = id.toString();
    // reset the states to ensure only one message can be shown
    batch(() => {
      dispatch(routeChangeResetState());
      dispatch(unregisterHandshakeIsLoading(true));
      dispatch(unregisterHandshakeHasErrored(false));
    });

    const url = `/fsbid/cdo/position/${idString}/client/${clientId}/register/`;

    api().delete(url)
      .then(response => response.data)
      .then(() => {
        // eslint-disable-next-line no-use-before-define
        const undo = () => dispatch(registerHandshake(id, clientId));
        const message = SystemMessages.UNREGISTER_HANDSHAKE_SUCCESS(undo);
        batch(() => {
          dispatch(toastSuccess(message));
          dispatch(unregisterHandshakeHasErrored(false));
          dispatch(unregisterHandshakeIsLoading(false));
          dispatch(unregisterHandshakeSuccess(message));
        });
        dispatch(userProfilePublicFetchData(clientId));
      })
      .catch(() => {
        const message = SystemMessages.UNREGISTER_HANDSHAKE_ERROR;
        batch(() => {
          dispatch(toastError(message));
          dispatch(unregisterHandshakeHasErrored(message));
          dispatch(unregisterHandshakeIsLoading(false));
        });
      });
  };
}

export function registerHandshake(id, clientId) {
  return (dispatch) => {
    const idString = id.toString();
    // reset the states to ensure only one message can be shown
    batch(() => {
      dispatch(routeChangeResetState());
      dispatch(registerHandshakeIsLoading(true));
      dispatch(registerHandshakeHasErrored(false));
    });

    const url = `/fsbid/cdo/position/${idString}/client/${clientId}/register/`;

    api().put(url)
      .then(response => response.data)
      .then(() => {
        const undo = () => dispatch(unregisterHandshake(id, clientId));
        const message = SystemMessages.REGISTER_HANDSHAKE_SUCCESS(undo);
        batch(() => {
          dispatch(toastSuccess(message));
          dispatch(registerHandshakeHasErrored(false));
          dispatch(registerHandshakeIsLoading(false));
          dispatch(registerHandshakeSuccess(message));
        });
        dispatch(userProfilePublicFetchData(clientId));
      })
      .catch(() => {
        const message = SystemMessages.REGISTER_HANDSHAKE_ERROR;
        batch(() => {
          dispatch(toastError(message));
          dispatch(registerHandshakeHasErrored(message));
          dispatch(registerHandshakeIsLoading(false));
        });
      });
  };
}

export function offerHandshake(perdet, cp_id, data) {
  return (dispatch) => {
    const perdetString = perdet.toString();
    const cpString = cp_id.toString();
    // reset the states to ensure only one message can be shown
    batch(() => {
      dispatch(routeChangeResetState());
      dispatch(offerHandshakeIsLoading(true));
      dispatch(offerHandshakeHasErrored(false));
    });

    const url = `/bidding/handshake/bureau/${perdetString}/${cpString}/`;

    api().put(url, data)
      .then(response => response.data)
      .then(() => {
        const message = SystemMessages.OFFER_HANDSHAKE_SUCCESS;
        batch(() => {
          dispatch(toastSuccess(message));
          dispatch(offerHandshakeHasErrored(false));
          dispatch(offerHandshakeIsLoading(false));
          dispatch(offerHandshakeSuccess(message));
        });
        dispatch(bureauBidsAllFetchData(cp_id, {}));
        dispatch(bureauBidsFetchData(cp_id, {}));
        dispatch(bureauBidsRankingFetchData(cp_id));
      })
      .catch(() => {
        const message = SystemMessages.OFFER_HANDSHAKE_ERROR;
        batch(() => {
          dispatch(toastError(message));
          dispatch(offerHandshakeHasErrored(message));
          dispatch(offerHandshakeIsLoading(false));
        });
      });
  };
}

export function revokeHandshake(perdet, cp_id) {
  return (dispatch) => {
    const perdetString = perdet.toString();
    const cpString = cp_id.toString();
    // reset the states to ensure only one message can be shown
    batch(() => {
      dispatch(routeChangeResetState());
      dispatch(revokeHandshakeIsLoading(true));
      dispatch(revokeHandshakeHasErrored(false));
    });

    const url = `/bidding/handshake/bureau/${perdetString}/${cpString}/`;

    api().delete(url)
      .then(response => response.data)
      .then(() => {
        const message = SystemMessages.REVOKE_HANDSHAKE_SUCCESS;
        batch(() => {
          dispatch(toastSuccess(message));
          dispatch(revokeHandshakeHasErrored(false));
          dispatch(revokeHandshakeIsLoading(false));
          dispatch(revokeHandshakeSuccess(message));
        });
        dispatch(bureauBidsAllFetchData(cp_id, {}));
        dispatch(bureauBidsFetchData(cp_id, {}));
        dispatch(bureauBidsRankingFetchData(cp_id));
      })
      .catch(() => {
        const message = SystemMessages.REVOKE_HANDSHAKE_ERROR;
        batch(() => {
          dispatch(toastError(message));
          dispatch(revokeHandshakeHasErrored(message));
          dispatch(revokeHandshakeIsLoading(false));
        });
      });
  };
}

export function handshakeOffered(name, message, options) {
  return (dispatch) => {
    dispatch(handshakeOfferedNotification({
      title: SystemMessages.HANDSHAKE_OFFERED_TITLE,
      message: SystemMessages.HANDSHAKE_OFFERED_BODY({ name, message }),
    }));
    dispatch(toastHandshake(
      SystemMessages.HANDSHAKE_OFFERED_BODY({ name, message }),
      SystemMessages.HANDSHAKE_OFFERED_TITLE,
      options,
    ));
  };
}

export function handshakeRevoked(name, message, customClassName, options) {
  return (dispatch) => {
    dispatch(handshakeRevokedNotification({
      title: SystemMessages.HANDSHAKE_REVOKED_TITLE,
      message: SystemMessages.HANDSHAKE_REVOKED_BODY({ name, message }),
    }));
    dispatch(toastHandshakeRevoke(
      SystemMessages.HANDSHAKE_REVOKED_BODY({ name, message }),
      SystemMessages.HANDSHAKE_REVOKED_TITLE,
      customClassName,
      options,
    ));
  };
}

export function handshakeAccepted() {
  return (dispatch) => {
    const x = { name: 'Tarek Rehman', position: { name: 'Special Agent (56013011)', link: '/details/8006' }, bid: '/profile/bidtracker/public/6' };
    dispatch(handshakeAcceptedNotification({
      title: SystemMessages.HANDSHAKE_ACCEPTED_TITLE,
      message: SystemMessages.HANDSHAKE_ACCEPTED_BODY(x),
    }));
    dispatch(toastHandshake(
      SystemMessages.HANDSHAKE_ACCEPTED_BODY(x),
      SystemMessages.HANDSHAKE_ACCEPTED_TITLE,
    ));
  };
}
