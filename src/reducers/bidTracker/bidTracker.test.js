import * as reducers from './bidTracker';

describe('reducers', () => {
  it('can set reducer HANDSHAKE_OFFERED_NOTIFICATION', () => {
    expect(reducers.handshakeOfferedNotification({ name: 'Alice', position: { name: 'Assignment Officer', link: '/profile/bidtracker' } }, { type: 'HANDSHAKE_OFFERED_NOTIFICATION', notificationInformation: { name: 'Alice', position: { name: 'Assignment Officer', link: '/profile/bidtracker' } } }))
      .toMatchObject({ name: 'Alice', position: { name: 'Assignment Officer', link: '/profile/bidtracker' } });
  });
});
