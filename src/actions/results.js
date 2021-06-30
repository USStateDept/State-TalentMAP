import { batch } from 'react-redux';
import { CancelToken } from 'axios';
import queryString from 'query-string';
import { get, isEmpty } from 'lodash';
import numeral from 'numeral';
import shortid from 'shortid';
import { downloadFromResponse } from 'utilities';
import { store } from '../store';
import { toastError, toastInfo, toastSuccess } from './toast';
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
export function resultsFetchSimilarPositions(id, favorites, bidList) {
  return (dispatch) => {
    if (cancelSimilar) { cancelSimilar(); }
    const prefix = '/fsbid/available_positions';
    // Logic:
    // 1: remove favorites and bidList
    // 2: fallback to original results when filtered data === 0

    dispatch(resultsSimilarPositionsIsLoading(true));
    // limit is set to 50 in the BE
    api().get(`${prefix}/${id}/similar/`, {
      cancelToken: new CancelToken((c) => {
        cancelSimilar = c;
      }),
    })
      .then(response => response.data)
      .then((results) => {
        const originalResults = results.results;
        const filteredPositions = [];
        const favoritesBidListArray = [];
        favorites.forEach(favorite => favoritesBidListArray.push(Number(favorite.id)));
        bidList.forEach(bid => favoritesBidListArray.push(Number(bid.position_info.id)));
        originalResults.forEach(position => {
          if (filteredPositions.length < 3 && !favoritesBidListArray.includes(position.id)) {
            filteredPositions.push(position);
          }
        });
        const returnResults = isEmpty(filteredPositions) ?
          { results: originalResults.slice(0, 3) } : { results: filteredPositions };
        batch(() => {
          dispatch(resultsSimilarPositionsFetchDataSuccess(returnResults));
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

export function downloadPositionData(query, isPV, isTandem) {
  const tandem = isTandem ? '/tandem' : '';
  const prefix = `/fsbid${isPV ? `/projected_vacancies${tandem}` : `/available_positions${tandem}`}/export/`;
  // generate a unique ID to track the notification
  const id = shortid.generate();
  store.dispatch(toastInfo('Please wait while we process your position export.', 'Loading...', id));
  return api()
    .get(`${prefix}?${query}`, {
      cancelToken: new CancelToken((c) => { cancel = c; }),
      responseType: 'stream',
    })
    .then((response) => {
      downloadFromResponse(response, 'TalentMap_search_export');
      // display the position limit, if any, to the user
      let limit = response.headers['position-limit'];
      // format the number to include commas
      if (limit) { limit = numeral(limit).format('0,0'); }
      const text = `Your position export is complete.${limit ? ` Results have been limited to the first ${limit}.` : ''}`;
      store.dispatch(toastSuccess(text, 'Success', id, true));
    })
    .catch(() => {
      const text = 'Sorry, an error has occurred while processing your position export. Please try again.';
      store.dispatch(toastError(text, 'Error', id, true));
    });
}

export function fetchResultData(query) {
  let url = '/fsbid/available_positions';
  const parsed = queryString.parse(query);
  const isPV = parsed.projectedVacancy;
  const isTandem = parsed.tandem;

  if (isPV) {
    url = '/fsbid/projected_vacancies';
    delete parsed.projectedVacancy;
  }

  if (isTandem) {
    url = `${url}/tandem`;
    delete parsed.tandem;
  }

  const query$ = queryString.stringify(parsed);

  return api()
    .get(`${url}/?${query$}`, {
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
