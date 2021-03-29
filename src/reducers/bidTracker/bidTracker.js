export function handshakeOfferedNotification(state = { name: null, position_name: null, bidtracker: null }, action) {
  switch (action.type) {
    case 'HANDSHAKE_OFFERED_NOTIFICATION':
      return action.notificationInformation;
    default:
      return state;
  }
}