import * as reducers from './bidTracker';

describe('reducers', () => {
  it('can set reducer HANDSHAKE_OFFERED_NOTIFICATION', () => {
    expect(reducers.handshakeOfferedNotification({ name: 'Alice', position_name: 'Assignment Officer', bidtracker: '/public/34/' }, { type: 'HANDSHAKE_OFFERED_NOTIFICATION', notificationInformation: { name: 'A', position_name: 'A/O', bidtracker: '/public/34/' } })).toBe(true);
  });
});
