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

export function notificationsFetchData(limit = 3, ordering = '-date_updated') {
  return (dispatch) => {
    axios.get(`${api}/notification/?limit=${limit}&ordering=${ordering}`, { headers: { Authorization: fetchUserToken() } })
            .then(({ data }) => data.results)
            .then((notifications) => {
              dispatch(notificationsFetchDataSuccess(notifications));
              dispatch(notificationsIsLoading(false));
              dispatch(notificationsHasErrored(false));
            })
            .catch(() => {
              dispatch(notificationsHasErrored(true));
              dispatch(notificationsIsLoading(false));
            });
  };
}
