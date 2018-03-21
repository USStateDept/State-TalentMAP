import api from '../api';

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
    dispatch(comparisonsIsLoading(true));
    api.get(`/position/?position_number__in=${query}`)
      .then((response) => {
        dispatch(comparisonsIsLoading(false));
        return response.data.results;
      })
      .then(comparisons => dispatch(comparisonsFetchDataSuccess(comparisons)))
      .catch(() => dispatch(comparisonsHasErrored(true)));
  };
}
