import { CancelToken } from 'axios';
import api from '../api';
import { propOrDefault } from '../utilities';

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
    api.get(`/position/${id}/similar/?limit=3`)
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
    if (cancel) { cancel(); dispatch(resultsIsLoading(true)); }
    dispatch(resultsIsLoading(true));
    api
      .get(`/position/?${query}`, {
        cancelToken: new CancelToken((c) => { cancel = c; }),
      })
      .then(response => response.data)
      .then((results) => {
        dispatch(resultsFetchDataSuccess(results));
        dispatch(resultsIsLoading(false));
        dispatch(resultsHasErrored(false));
      })
      .catch((err) => {
        if (propOrDefault(err, 'constructor.name') === 'Cancel') {
          dispatch(resultsIsLoading(true));
          dispatch(resultsHasErrored(false));
        } else {
          dispatch(resultsIsLoading(false));
          dispatch(resultsHasErrored(true));
        }
      });
  };
}
