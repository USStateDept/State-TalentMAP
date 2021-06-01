import * as reducers from './handshake';

describe('reducers', () => {
  it('can set reducer REGISTER_HANDSHAKE_HAS_ERRORED', () => {
    expect(reducers.registerHandshakeHasErrored(false, { type: 'REGISTER_HANDSHAKE_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer REGISTER_HANDSHAKE_IS_LOADING', () => {
    expect(reducers.registerHandshakeIsLoading(false, { type: 'REGISTER_HANDSHAKE_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer REGISTER_HANDSHAKE_SUCCESS', () => {
    expect(reducers.registerHandshakeSuccess(false, { type: 'REGISTER_HANDSHAKE_SUCCESS', response: true })).toBe(true);
  });

  it('can set reducer OFFER_HANDSHAKE_HAS_ERRORED', () => {
    expect(reducers.offerHandshakeHasErrored(false, { type: 'OFFER_HANDSHAKE_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer OFFER_HANDSHAKE_IS_LOADING', () => {
    expect(reducers.offerHandshakeIsLoading(false, { type: 'OFFER_HANDSHAKE_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer OFFER_HANDSHAKE_SUCCESS', () => {
    expect(reducers.offerHandshakeSuccess(false, { type: 'OFFER_HANDSHAKE_SUCCESS', response: true })).toBe(true);
  });

  it('can set reducer REVOKE_HANDSHAKE_HAS_ERRORED', () => {
    expect(reducers.revokeHandshakeHasErrored(false, { type: 'REVOKE_HANDSHAKE_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer REVOKE_HANDSHAKE_IS_LOADING', () => {
    expect(reducers.revokeHandshakeIsLoading(false, { type: 'REVOKE_HANDSHAKE_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer REVOKE_HANDSHAKE_SUCCESS', () => {
    expect(reducers.revokeHandshakeSuccess(false, { type: 'REVOKE_HANDSHAKE_SUCCESS', response: true })).toBe(true);
  });
});
