export function acceptHandshakeHasErrored(state = false, action) {
  switch (action.type) {
    case 'ACCEPT_HANDSHAKE_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function acceptHandshakeIsLoading(state = false, action) {
  switch (action.type) {
    case 'ACCEPT_HANDSHAKE_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function acceptHandshakeSuccess(state = false, action) {
  switch (action.type) {
    case 'ACCEPT_HANDSHAKE_SUCCESS':
      return action.success;
    default:
      return state;
  }
}
export function declineHandshakeHasErrored(state = false, action) {
  switch (action.type) {
    case 'DECLINE_HANDSHAKE_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function declineHandshakeIsLoading(state = false, action) {
  switch (action.type) {
    case 'DECLINE_HANDSHAKE_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function declineHandshakeSuccess(state = false, action) {
  switch (action.type) {
    case 'DECLINE_HANDSHAKE_SUCCESS':
      return action.success;
    default:
      return state;
  }
}
