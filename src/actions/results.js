import axios from 'axios';
import api from '../api';
import { fetchUserToken } from '../utilities';

const CancelToken = axios.CancelToken;
let cancel;

export function resultsHasErrored(bool) {
  return {
    type: 'RESULTS_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function resultsIsLoading(bool) {
  return {
    type: 'RESULTS_IS_LOADING',
    isLoading: bool,
  };
}
export function resultsFetchDataSuccess(results) {
  return {
    type: 'RESULTS_FETCH_DATA_SUCCESS',
    results,
  };
}

export function resultsFetchData(query) {
  return (dispatch) => {
    if (cancel) { cancel(); }
    dispatch(resultsIsLoading(true));
    axios.get(`${api}/position/?${query}`, {
      headers: { Authorization: fetchUserToken() },
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
    },
    )
      .then(response => response.data)
      .then((results) => {
        dispatch(resultsFetchDataSuccess(results));
        dispatch(resultsIsLoading(false));
        dispatch(resultsHasErrored(false));
      })
      .catch(() => {
        dispatch(resultsIsLoading(false));
        dispatch(resultsHasErrored(true));
      });
  };
}
