export function registerHandshakeHasErrored(state = false, action) {
  switch (action.type) {
    case 'REGISTER_HANDSHAKE_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function registerHandshakeIsLoading(state = false, action) {
  switch (action.type) {
    case 'REGISTER_HANDSHAKE_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function registerHandshakeSuccess(state = false, action) {
  switch (action.type) {
    case 'REGISTER_HANDSHAKE_SUCCESS':
      return action.response;
    default:
      return state;
  }
}
export function unregisterHandshakeHasErrored(state = false, action) {
  switch (action.type) {
    case 'UNREGISTER_HANDSHAKE_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function unregisterHandshakeIsLoading(state = false, action) {
  switch (action.type) {
    case 'UNREGISTER_HANDSHAKE_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function unregisterHandshakeSuccess(state = false, action) {
  switch (action.type) {
    case 'UNREGISTER_HANDSHAKE_SUCCESS':
      return action.response;
    default:
      return state;
  }
}
export function offerHandshakeHasErrored(state = false, action) {
  switch (action.type) {
    case 'OFFER_HANDSHAKE_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function offerHandshakeIsLoading(state = false, action) {
  switch (action.type) {
    case 'OFFER_HANDSHAKE_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function offerHandshakeSuccess(state = false, action) {
  switch (action.type) {
    case 'OFFER_HANDSHAKE_SUCCESS':
      return action.response;
    default:
      return state;
  }
}
export function revokeHandshakeHasErrored(state = false, action) {
  switch (action.type) {
    case 'REVOKE_HANDSHAKE_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function revokeHandshakeIsLoading(state = false, action) {
  switch (action.type) {
    case 'REVOKE_HANDSHAKE_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function revokeHandshakeSuccess(state = false, action) {
  switch (action.type) {
    case 'REVOKE_HANDSHAKE_SUCCESS':
      return action.response;
    default:
      return state;
  }
}
export function handshakeOfferedNotification(state = { name: null, message: null }, action) {
  switch (action.type) {
    case 'HANDSHAKE_OFFERED_NOTIFICATION':
      return action.notificationInformation;
    default:
      return state;
  }
}
export function handshakeRevokedNotification(state = { name: null, message: null }, action) {
  switch (action.type) {
    case 'HANDSHAKE_REVOKED_NOTIFICATION':
      return action.notificationInformation;
    default:
      return state;
  }
}
export function handshakeAcceptedNotification(
  state = { name: null, position_name: null, bidtracker: null }, action) {
  switch (action.type) {
    case 'HANDSHAKE_ACCEPTED_NOTIFICATION':
      return action.notificationInformation;
    default:
      return state;
  }
}

