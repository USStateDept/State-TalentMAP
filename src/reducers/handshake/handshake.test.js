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
  it('can set reducer UNREGISTER_HANDSHAKE_HAS_ERRORED', () => {
    expect(reducers.unregisterHandshakeHasErrored(false, { type: 'UNREGISTER_HANDSHAKE_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer UNREGISTER_HANDSHAKE_IS_LOADING', () => {
    expect(reducers.unregisterHandshakeIsLoading(false, { type: 'UNREGISTER_HANDSHAKE_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer UNREGISTER_HANDSHAKE_SUCCESS', () => {
    expect(reducers.unregisterHandshakeSuccess(false, { type: 'UNREGISTER_HANDSHAKE_SUCCESS', response: true })).toBe(true);
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

  it('can set reducer HANDSHAKE_OFFERED_NOTIFICATION', () => {
    expect(reducers.handshakeOfferedNotification({ name: 'Alice', position: { name: 'Assignment Officer', link: '/profile/bidtracker' } }, { type: 'HANDSHAKE_OFFERED_NOTIFICATION', notificationInformation: { name: 'Alice', position: { name: 'Assignment Officer', link: '/profile/bidtracker' } } }))
      .toMatchObject({ name: 'Alice', position: { name: 'Assignment Officer', link: '/profile/bidtracker' } });
  });
});

