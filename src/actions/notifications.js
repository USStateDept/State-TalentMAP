import axios from 'axios';
import { fetchUserToken } from '../utilities';
import api from '../api';

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

export function unsetNotificationsCount() {
  return (dispatch) => {
    dispatch(notificationsCountFetchDataSuccess(0));
  };
}

export function notificationsCountFetchData() {
  return (dispatch) => {
    axios.get(`${api}/notification/?limit=1&is_read=false`, { headers: { Authorization: fetchUserToken() } })
            .then(({ data }) => {
              dispatch(notificationsCountFetchDataSuccess(data.count));
              dispatch(notificationsCountIsLoading(false));
              dispatch(notificationsCountHasErrored(false));
            })
            .catch(() => {
              dispatch(notificationsCountHasErrored(true));
              dispatch(notificationsCountIsLoading(false));
            });
  };
}

export function notificationsFetchData(limit = 3, ordering = '-date_updated') {
  return (dispatch) => {
    axios.get(`${api}/notification/?limit=${limit}&ordering=${ordering}`, { headers: { Authorization: fetchUserToken() } })
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
