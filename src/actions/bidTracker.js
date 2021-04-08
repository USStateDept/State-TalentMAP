import * as SystemMessages from '../Constants/SystemMessages';
import { toastHandshake } from './toast';

export function handshakeOfferedNotification(notificationInformation) {
  return {
    type: 'HANDSHAKE_OFFERED_NOTIFICATION',
    notificationInformation,
  };
}

export function handshakeOffered() {
  return (dispatch) => {
    const x = { name: 'Tarek Rehman', position: { name: 'ASST REGIONAL SECURITY OFCR (56562005)', link: '/details/2674' }, bid: '/profile/bidtracker/6_2144' };
    dispatch(handshakeOfferedNotification({
      title: SystemMessages.HANDSHAKE_OFFERED_TITLE,
      message: SystemMessages.HANDSHAKE_OFFERED_BODY(x),
    }));
    dispatch(toastHandshake(
      SystemMessages.HANDSHAKE_OFFERED_BODY(x),
      SystemMessages.HANDSHAKE_OFFERED_TITLE,
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
