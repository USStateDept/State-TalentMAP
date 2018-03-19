import axios from 'axios';
import api from '../api';
import { fetchUserToken } from '../utilities';

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
    axios.get(`${api}/position/?position_number=${query}`, { headers: { Authorization: fetchUserToken() } })
            .then(response => response.data.results)
            .then((positionDetails) => {
              dispatch(positionDetailsFetchDataSuccess(positionDetails));
              dispatch(positionDetailsIsLoading(false));
              dispatch(positionDetailsHasErrored(false));
            })
            .catch(() => {
              dispatch(positionDetailsHasErrored(true));
              dispatch(positionDetailsIsLoading(false));
            });
  };
}
