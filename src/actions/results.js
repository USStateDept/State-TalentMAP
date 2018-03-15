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

export function resultsSimilarPositionsHasErrored(bool) {
  return {
    type: 'RESULTS_SIMILAR_POSITIONS_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function resultsSimilarPositionsIsLoading(bool) {
  return {
    type: 'RESULTS_SIMILAR_POSITIONS_IS_LOADING',
    isLoading: bool,
  };
}
export function resultsSimilarPositionsFetchDataSuccess(results) {
  return {
    type: 'RESULTS_SIMILAR_POSITIONS_FETCH_DATA_SUCCESS',
    results,
  };
}

export function resultsFetchSimilarPositions(id) {
  return (dispatch) => {
    if (cancel) { cancel(); }
    dispatch(resultsSimilarPositionsIsLoading(true));
    // axios.get(`${api}/position/${id}/similar/?limit=3`, {
    console.log(id);
    axios.get(`${api}/position/`, {
      headers: { Authorization: fetchUserToken() },
    },
    )
      .then(response => response.data)
      .then((results) => {
        dispatch(resultsSimilarPositionsFetchDataSuccess(results));
        dispatch(resultsSimilarPositionsIsLoading(false));
        dispatch(resultsSimilarPositionsHasErrored(false));
      })
      .catch(() => {
        dispatch(resultsSimilarPositionsIsLoading(false));
        dispatch(resultsSimilarPositionsHasErrored(true));
      });
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
