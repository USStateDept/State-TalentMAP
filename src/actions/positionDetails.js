import axios from 'axios';
import api from '../api';

export function positionDetailsHasErrored(bool) {
  return {
    type: 'POSITION_DETAILS_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function positionDetailsIsLoading(bool) {
  return {
    type: 'POSITION_DETAILS_IS_LOADING',
    isLoading: bool,
  };
}
export function positionDetailsFetchDataSuccess(positionDetails) {
  return {
    type: 'POSITION_DETAILS_FETCH_DATA_SUCCESS',
    positionDetails,
  };
}

export function positionDetailsFetchData(query) {
  return (dispatch) => {
    dispatch(positionDetailsIsLoading(true));
    axios.get(`${api}/position/?position_number=${query}`)
            .then((response) => {
              dispatch(positionDetailsIsLoading(false));
              return response.data.results;
            })
            .then(positionDetails => dispatch(positionDetailsFetchDataSuccess(positionDetails)))
            .catch(() => dispatch(positionDetailsHasErrored(true)));
  };
}
