import axios from 'axios';
import api from '../api';
import { fetchUserToken } from '../utilities';

export function favoritePositionsHasErrored(bool) {
  return {
    type: 'FAVORITE_POSITIONS_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function favoritePositionsIsLoading(bool) {
  return {
    type: 'FAVORITE_POSITIONS_IS_LOADING',
    isLoading: bool,
  };
}
export function favoritePositionsFetchDataSuccess(results) {
  return {
    type: 'FAVORITE_POSITIONS_FETCH_DATA_SUCCESS',
    results,
  };
}

export function favoritePositionsFetchData() {
  return (dispatch) => {
    dispatch(favoritePositionsIsLoading(true));
    dispatch(favoritePositionsHasErrored(false));
    axios.get(`${api}/position/favorites/`, { headers: { Authorization: fetchUserToken() } })
            .then((response) => {
              dispatch(favoritePositionsHasErrored(false));
              dispatch(favoritePositionsIsLoading(false));
              return response.data.results;
            })
            .then(results => dispatch(favoritePositionsFetchDataSuccess(results)))
            .catch(() => dispatch(favoritePositionsHasErrored(true)));
  };
}
