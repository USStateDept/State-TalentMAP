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

