import { batch } from 'react-redux';
import { CancelToken } from 'axios';
import queryString from 'query-string';
import { get } from 'lodash';
import { downloadFromResponse } from 'utilities';
import api from '../api';

let cancel;
let cancelSimilar;

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
    if (cancelSimilar) { cancelSimilar(); }
    const prefix = '/fsbid/available_positions';

    dispatch(resultsSimilarPositionsIsLoading(true));
    api().get(`${prefix}/${id}/similar/?limit=3`, {
      cancelToken: new CancelToken((c) => {
        cancelSimilar = c;
      }),
    })
      .then(response => response.data)
      .then((results) => {
        batch(() => {
          dispatch(resultsSimilarPositionsFetchDataSuccess(results));
          dispatch(resultsSimilarPositionsHasErrored(false));
          dispatch(resultsSimilarPositionsIsLoading(false));
        });
      })
      .catch(() => {
        batch(() => {
          dispatch(resultsSimilarPositionsFetchDataSuccess({}));
          dispatch(resultsSimilarPositionsHasErrored(true));
          dispatch(resultsSimilarPositionsIsLoading(false));
        });
      });
  };
}

export function downloadPositionData(query, isPV) {
  const prefix = `/fsbid${isPV ? '/projected_vacancies' : '/available_positions'}/export/`;
  return api()
    .get(`${prefix}?${query}`, {
      cancelToken: new CancelToken((c) => { cancel = c; }),
      responseType: 'stream',
    })
    .then((response) => {
      downloadFromResponse(response, 'TalentMap_search_export');
    });
}

export function fetchResultData(query) {
  let prefix = '/fsbid/available_positions';
  const parsed = queryString.parse(query);
  const isPV = parsed.projectedVacancy;

  if (isPV) {
    prefix = '/fsbid/projected_vacancies';
    delete parsed.projectedVacancy;
  }

  const query$ = queryString.stringify(parsed);

  return api()
    .get(`${prefix}/?${query$}`, {
      cancelToken: new CancelToken((c) => { cancel = c; }),
    })
    .then((response) => {
      if (isPV) {
        return {
          ...response.data,
          isProjectedVacancy: true,
        };
      }
      return response.data;
    });
}

export function resultsFetchData(query) {
  return (dispatch) => {
    if (cancel) { cancel('cancel'); dispatch(resultsIsLoading(true)); }
    dispatch(resultsIsLoading(true));
    dispatch(resultsHasErrored(false));
    fetchResultData(query)
      .then((results) => {
        batch(() => {
          dispatch(resultsFetchDataSuccess(results));
          dispatch(resultsHasErrored(false));
          dispatch(resultsIsLoading(false));
        });
      })
      .catch((err) => {
        if (get(err, 'message') === 'cancel') {
          batch(() => {
            dispatch(resultsHasErrored(false));
            dispatch(resultsIsLoading(true));
          });
        } else {
          batch(() => {
            dispatch(resultsFetchDataSuccess({ results: [] }));
            dispatch(resultsHasErrored(true));
            dispatch(resultsIsLoading(false));
          });
        }
      });
  };
}
