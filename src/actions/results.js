import axios from 'axios';

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

export function resultsFetchData(url) {
  return (dispatch) => {
    dispatch(resultsIsLoading(true));
    axios.get(url)
            .then((response) => {
              if (response.statusText !== 'OK') {
                throw Error(response.statusText);
              }
              dispatch(resultsIsLoading(false));
              return response.data;
            })
            .then(results => dispatch(resultsFetchDataSuccess(results)))
            .catch(() => dispatch(resultsHasErrored(true)));
  };
}
