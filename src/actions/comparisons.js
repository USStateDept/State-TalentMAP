import { CancelToken } from 'axios';
import { toNumber } from 'lodash';
import api from '../api';
import { localStorageToggleValue } from '../utilities';

let cancel;

export function comparisonsHasErrored(bool) {
  return {
    type: 'COMPARISONS_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function comparisonsIsLoading(bool) {
  return {
    type: 'COMPARISONS_IS_LOADING',
    isLoading: bool,
  };
}

export function comparisonsFetchDataSuccess(comparisons) {
  return {
    type: 'COMPARISONS_FETCH_DATA_SUCCESS',
    comparisons,
  };
}

export function comparisonsFetchData(query) {
  const idArr = query.split(',');
  return (dispatch) => {
    if (cancel) { cancel(); }

    const url = `/fsbid/available_positions/?id=${query}`;

    dispatch(comparisonsIsLoading(true));
    if (!query) {
      dispatch(comparisonsFetchDataSuccess([]));
      dispatch(comparisonsIsLoading(false));
    } else {
      api().get(url, {
        cancelToken: new CancelToken((c) => { cancel = c; }),
      })
        .then((response) => {
          dispatch(comparisonsIsLoading(false));
          // Try removing any compare IDs that no longer exist
          try {
            const responseIds = response.data.results.map(m => `${m.id}`);
            const noMatches = idArr.filter(f => responseIds.indexOf(f) <= -1);
            noMatches.forEach((f) => {
              localStorageToggleValue('compare', toNumber(f), true, true);
            });
          } catch (e) {} // eslint-disable-line no-empty
          return response.data.results;
        })
        .then(comparisons => dispatch(comparisonsFetchDataSuccess(comparisons)))
        .catch(() => dispatch(comparisonsHasErrored(true)));
    }
  };
}
