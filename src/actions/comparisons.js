import axios from 'axios';

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

export function comparisonsFetchData(url) {
  return (dispatch) => {
    dispatch(comparisonsIsLoading(true));
    axios.get(url)
            .then((response) => {
              dispatch(comparisonsIsLoading(false));
              return response.data;
            })
            .then(comparisons => dispatch(comparisonsFetchDataSuccess(comparisons)))
            .catch(() => dispatch(comparisonsHasErrored(true)));
  };
}
