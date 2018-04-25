import * as reducers from './notifications';

describe('notifications reducers', () => {
  it('can set reducer NOTIFICATIONS_HAS_ERRORED', () => {
    expect(reducers.notificationsHasErrored(false, { type: 'NOTIFICATIONS_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer NOTIFICATIONS_IS_LOADING', () => {
    expect(reducers.notificationsIsLoading(false, { type: 'NOTIFICATIONS_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer NOTIFICATIONS_FETCH_DATA_SUCCESS', () => {
    expect(reducers.notifications({}, { type: 'NOTIFICATIONS_FETCH_DATA_SUCCESS', notifications: true })).toBe(true);
  });

  it('can set reducer NOTIFICATIONS_COUNT_HAS_ERRORED', () => {
    expect(reducers.notificationsCountHasErrored(false, { type: 'NOTIFICATIONS_COUNT_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer NOTIFICATIONS_COUNT_IS_LOADING', () => {
    expect(reducers.notificationsCountIsLoading(false, { type: 'NOTIFICATIONS_COUNT_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer NOTIFICATIONS_COUNT_FETCH_DATA_SUCCESS', () => {
    expect(reducers.notificationsCount(1, { type: 'NOTIFICATIONS_COUNT_FETCH_DATA_SUCCESS', count: 1 })).toBe(1);
  });

  it('can set reducer MARK_NOTIFICATION_HAS_ERRORED', () => {
    expect(reducers.markNotificationHasErrored(false, { type: 'MARK_NOTIFICATION_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer MARK_NOTIFICATION_IS_LOADING', () => {
    expect(reducers.markNotificationIsLoading(false, { type: 'MARK_NOTIFICATION_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer MARK_NOTIFICATION_FETCH_DATA_SUCCESS', () => {
    expect(reducers.markNotificationSuccess(false, { type: 'MARK_NOTIFICATION_SUCCESS', response: true })).toBe(true);
  });

  it('can call default state reducer MARK_NOTIFICATION_HAS_ERRORED', () => {
    expect(reducers.markNotificationHasErrored(false, { type: 'OTHER', hasErrored: true })).toBe(false);
  });

  it('can call default state reducer MARK_NOTIFICATION_IS_LOADING', () => {
    expect(reducers.markNotificationIsLoading(false, { type: 'OTHER', isLoading: true })).toBe(false);
  });

  it('can call default state reducer MARK_NOTIFICATION_FETCH_DATA_SUCCESS', () => {
    expect(reducers.markNotificationSuccess(false, { type: 'OTHER', response: true })).toBe(false);
  });
});
