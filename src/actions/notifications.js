import Q from 'q';
import { CancelToken } from 'axios';
import { subDays } from 'date-fns';
import { get, isNull } from 'lodash';
import api from '../api';
import { hasValidToken } from '../utilities';
import { handshakeOffered, handshakeRevoked } from '../actions/handshake';

let cancelRanking;

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

export function notificationsPopoverHasErrored(bool) {
  return {
    type: 'NOTIFICATIONS_POPOVER_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function notificationsPopoverIsLoading(bool) {
  return {
    type: 'NOTIFICATIONS_POPOVER_IS_LOADING',
    isLoading: bool,
  };
}
export function notificationsPopoverFetchDataSuccess(notifications) {
  return {
    type: 'NOTIFICATIONS_POPOVER_FETCH_DATA_SUCCESS',
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

export function markNotificationsHasErrored(bool) {
  return {
    type: 'MARK_NOTIFICATIONS_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function markNotificationsIsLoading(bool) {
  return {
    type: 'MARK_NOTIFICATIONS_IS_LOADING',
    isLoading: bool,
  };
}
export function markNotificationsSuccess(response) {
  return {
    type: 'MARK_NOTIFICATIONS_SUCCESS',
    response,
  };
}

export function unsetNotificationsCount() {
  return (dispatch) => {
    dispatch(notificationsCountFetchDataSuccess(0));
  };
}

export const getDateRange = (toDate = 60) => {
  const today$ = new Date();
  const pastNumDays = subDays(today$, toDate).toJSON();
  return pastNumDays;
};

export function notificationsCountFetchData(useDateRange = true) {
  return (dispatch) => {
    if (hasValidToken()) {
      api().get(`/notification/?limit=1&is_read=false${useDateRange ? `&date_created__gte=${getDateRange()}` : ''}`)
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

export function notificationsFetchData(limit = 5, page = 1, ordering = '-date_created', tags = undefined, isRead = undefined, useDateRange = true) {
  return (dispatch) => {
    // Make use of any notifications request that could be used in the notifications popover
    const isForPopover = page === 1 && limit >= 5 && tags === undefined && isRead === undefined;

    dispatch(notificationsIsLoading(true));
    dispatch(notificationsHasErrored(false));

    if (isForPopover) {
      dispatch(notificationsPopoverIsLoading(true));
      dispatch(notificationsPopoverHasErrored(false));
    }

    api().get(`/notification/?limit=${limit}&page=${page}&ordering=${ordering}${tags !== undefined ? `&tags=${tags}` : ''}${isRead !== undefined ? `&is_read=${isRead}` : ''}${useDateRange ? `&date_created__gte=${getDateRange()}` : ''}`)
      .then(({ data }) => {
        dispatch(notificationsFetchDataSuccess(data));
        dispatch(notificationsHasErrored(false));
        dispatch(notificationsIsLoading(false));

        if (isForPopover) {
          dispatch(notificationsPopoverFetchDataSuccess(data));
          dispatch(notificationsPopoverHasErrored(false));
          dispatch(notificationsPopoverIsLoading(false));
        }
      })
      .catch(() => {
        dispatch(notificationsHasErrored(true));
        dispatch(notificationsIsLoading(false));

        if (isForPopover) {
          dispatch(notificationsPopoverHasErrored(true));
          dispatch(notificationsPopoverIsLoading(false));
        }
      });
  };
}

export function bidTrackerNotificationsFetchData() {
  return (dispatch) => {
    dispatch(notificationsFetchData(1, 1, '-date_created', 'bidding'));
  };
}

export function markNotification(id, isRead = true, shouldDelete = false,
  bypassTrackerUpdate = false, cb = () => {}) {
  return (dispatch) => {
    dispatch(markNotificationIsLoading(true));
    dispatch(markNotificationHasErrored(false));
    const method = shouldDelete ? 'delete' : 'patch';
    const body = shouldDelete ? {} : { is_read: isRead };
    api()[method](`/notification/${id}/`, body)
      .then(({ data }) => {
        cb();
        setTimeout(() => {
          dispatch(notificationsCountFetchData());
          dispatch(markNotificationSuccess(data));
          dispatch(markNotificationHasErrored(false));
          dispatch(markNotificationIsLoading(false));
          if (!bypassTrackerUpdate) {
            dispatch(bidTrackerNotificationsFetchData());
          }
        }, 0);
      })
      .catch(() => {
        dispatch(markNotificationHasErrored(true));
        dispatch(markNotificationIsLoading(false));
      });
  };
}

export function markNotifications({ ids = new Set(), markAsRead = false, shouldDelete = false,
  cb = () => {} }) {
  return (dispatch) => {
    dispatch(markNotificationsIsLoading(true));
    dispatch(markNotificationsHasErrored(false));
    dispatch(markNotificationsSuccess(false));
    const method = shouldDelete ? 'delete' : 'patch';
    const body = shouldDelete ? {} : { is_read: markAsRead };

    const queryProms = [...ids].map(id => (
      api()[method](`/notification/${id}/`, body)
        .then(() => ({ success: true, id }))
        .catch(() => ({ success: false, id }))
    ));

    Q.allSettled(queryProms)
      .then(() => {
        cb();
        setTimeout(() => {
          dispatch(notificationsCountFetchData());
          dispatch(markNotificationsSuccess(true));
          dispatch(markNotificationsHasErrored(false));
          dispatch(markNotificationsIsLoading(false));
        }, 0);
      });
  };
}

export function handshakeNotificationsFetchData(limit = 15, page = 1, ordering = '-date_created', isRead = false) {
  return (dispatch) => {
    if (cancelRanking) { cancelRanking('cancel'); }
    api().get(`/notification/?limit=${limit}&page=${page}&ordering=${ordering}&is_read=${isRead}&date_created__gte=${getDateRange(2)}&tags=handshake_bidder`, {
      cancelToken: new CancelToken((c) => {
        cancelRanking = c;
      }),
    })
      .then(({ data }) => {
        const data$ = get(data, 'results') || [];
        const ids = data$.map(b => b.id);
        // group by cp_id and sort on date_updated,
        // so we only show the user the most recent notification per cp_id
        const groupedNotifications = {};
        data$.forEach(b => {
          const currentID = b.meta.id;
          if (Object.keys(groupedNotifications).includes(currentID)) {
            groupedNotifications[currentID].push(b);
          } else if (!isNull(currentID)) {
            groupedNotifications[currentID] = [b];
          }
        });
        const groupedIds = Object.keys(groupedNotifications);
        groupedIds.forEach(id => {
          groupedNotifications[id].sort((a, b) =>
            new Date(b.date_updated) - new Date(a.date_updated));
          const currentNotification = groupedNotifications[id][0];
          if (get(currentNotification, 'meta.extended', false) || get(currentNotification, 'meta.accepted', false)) {
            dispatch(handshakeOffered(currentNotification.owner, currentNotification.message,
              { autoClose: false, draggable: false, closeOnClick: false }));
          } else {
            dispatch(handshakeRevoked(currentNotification.owner, currentNotification.message, 'hs-revoked-toast',
              { autoClose: false, draggable: false, closeOnClick: false }));
          }
        });
        dispatch(markNotifications({ ids, markAsRead: true }));
      });
  };
}
