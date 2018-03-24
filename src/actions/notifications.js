import api from '../api';
import { hasValidToken } from '../utilities';

export function notificationsHasErrored(bool) {
  return {
    type: 'NOTIFICATIONS_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function notificationsIsLoading(bool) {
  return {
    type: 'NOTIFICATIONS_IS_LOADING',
    isLoading: bool,
  };
}
export function notificationsFetchDataSuccess(notifications) {
  return {
    type: 'NOTIFICATIONS_FETCH_DATA_SUCCESS',
    notifications,
  };
}

export function notificationsCountHasErrored(bool) {
  return {
    type: 'NOTIFICATIONS_COUNT_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function notificationsCountIsLoading(bool) {
  return {
    type: 'NOTIFICATIONS_COUNT_IS_LOADING',
    isLoading: bool,
  };
}
export function notificationsCountFetchDataSuccess(count) {
  return {
    type: 'NOTIFICATIONS_COUNT_FETCH_DATA_SUCCESS',
    count,
  };
}

export function markNotificationHasErrored(bool) {
  return {
    type: 'MARK_NOTIFICATION_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function markNotificationIsLoading(bool) {
  return {
    type: 'MARK_NOTIFICATION_IS_LOADING',
    isLoading: bool,
  };
}
export function markNotificationSuccess(response) {
  return {
    type: 'MARK_NOTIFICATION_SUCCESS',
    response,
  };
}

export function unsetNotificationsCount() {
  return (dispatch) => {
    dispatch(notificationsCountFetchDataSuccess(0));
  };
}

export function notificationsCountFetchData() {
  return (dispatch) => {
    if (hasValidToken()) {
      api.get('/notification/?limit=1&is_read=false')
        .then(({ data }) => {
          dispatch(notificationsCountFetchDataSuccess(data.count));
          dispatch(notificationsCountIsLoading(false));
          dispatch(notificationsCountHasErrored(false));
        })
        .catch(() => {
          dispatch(notificationsCountHasErrored(true));
          dispatch(notificationsCountIsLoading(false));
        });
    } else {
      dispatch(notificationsCountHasErrored(true));
      dispatch(notificationsCountIsLoading(false));
    }
  };
}

export function notificationsFetchData(limit = 3, ordering = '-date_updated', tags = undefined, isRead = undefined) {
  return (dispatch) => {
    api.get(`/notification/?limit=${limit}&ordering=${ordering}${tags !== undefined ? `&tags=${tags}` : ''}${isRead !== undefined ? `&is_read=${isRead}` : ''}`)
      .then(({ data }) => {
        dispatch(notificationsFetchDataSuccess(data));
        dispatch(notificationsIsLoading(false));
        dispatch(notificationsHasErrored(false));
      })
      .catch(() => {
        dispatch(notificationsHasErrored(true));
        dispatch(notificationsIsLoading(false));
      });
  };
}

export function bidTrackerNotificationsFetchData() {
  return (dispatch) => {
    dispatch(notificationsFetchData(1, '-date_created', 'bidding'));
  };
}

export function markNotification(id, isRead = true) {
  return (dispatch) => {
    api.patch(`/notification/${id}/`, { is_read: isRead })
      .then(({ data }) => {
        dispatch(markNotificationSuccess(data));
        dispatch(markNotificationIsLoading(false));
        dispatch(markNotificationHasErrored(false));
        dispatch(bidTrackerNotificationsFetchData());
      })
      .catch(() => {
        dispatch(markNotificationHasErrored(true));
        dispatch(markNotificationIsLoading(false));
      });
  };
}
