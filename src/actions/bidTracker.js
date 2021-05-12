import * as SystemMessages from '../Constants/SystemMessages';
import { toastHandshake } from './toast';

export function handshakeOfferedNotification(notificationInformation) {
  return {
    type: 'HANDSHAKE_OFFERED_NOTIFICATION',
    notificationInformation,
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

export function handshakeAcceptedNotification(notificationInformation) {
  return {
    type: 'HANDSHAKE_ACCEPTED_NOTIFICATION',
    notificationInformation,
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
