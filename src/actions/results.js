import axios from 'axios';
import api from '../api';

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
    dispatch(resultsIsLoading(true));
    axios.get(`${api}/position/?${query}`)
            .then((response) => {
              dispatch(resultsIsLoading(false));
              return response.data;
            })
            .then(results => dispatch(resultsFetchDataSuccess(results)))
            .catch(() => dispatch(resultsHasErrored(true)));
  };
}
