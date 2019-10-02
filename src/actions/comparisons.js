import { CancelToken } from 'axios';
import api from '../api';
import { checkFlag } from '../flags';

const getUseAP = () => checkFlag('flags.available_positions');

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
  return (dispatch) => {
    if (cancel) { cancel(); }

    const useAP = getUseAP();
    const url = useAP ? `/fsbid/available_positions/?id=${query}` : `/cycleposition/?has_id=${query}`;

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
          return response.data.results;
        })
        .then(comparisons => dispatch(comparisonsFetchDataSuccess(comparisons)))
        .catch(() => dispatch(comparisonsHasErrored(true)));
    }
  };
}
