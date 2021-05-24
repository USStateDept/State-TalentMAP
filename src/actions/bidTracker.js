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
