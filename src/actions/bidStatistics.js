import axios from 'axios';
import { fetchUserToken } from '../utilities';
import api from '../api';

export function bidStatisticsHasErrored(bool) {
  return {
    type: 'BID_STATISTICS_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function bidStatisticsIsLoading(bool) {
  return {
    type: 'BID_STATISTICS_IS_LOADING',
    isLoading: bool,
  };
}
export function bidStatisticsFetchDataSuccess(bidStatistics) {
  return {
    type: 'BID_STATISTICS_FETCH_DATA_SUCCESS',
    bidStatistics,
  };
}

export function bidStatisticsFetchData(queryString = '?ordering=-cycle_start_date&limit=1') {
  return (dispatch) => {
    dispatch(bidStatisticsIsLoading(true));
    dispatch(bidStatisticsHasErrored(false));
    axios.get(`${api}/bidcycle/statistics/${queryString}`, { headers: { Authorization: fetchUserToken() } })
        .then(({ data }) => {
          if (data.results.length) {
            dispatch(bidStatisticsFetchDataSuccess(data.results[0]));
            dispatch(bidStatisticsIsLoading(false));
            dispatch(bidStatisticsHasErrored(false));
          } else {
            dispatch(bidStatisticsIsLoading(false));
            dispatch(bidStatisticsHasErrored(true));
          }
        })
        .catch(() => {
          dispatch(bidStatisticsIsLoading(false));
          dispatch(bidStatisticsHasErrored(true));
        });
  };
}
