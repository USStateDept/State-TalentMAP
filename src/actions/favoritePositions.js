import api from '../api';

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

export function favoritePositionsFetchData(sortType) {
  return (dispatch) => {
    dispatch(favoritePositionsIsLoading(true));
    dispatch(favoritePositionsHasErrored(false));
    let url = '/position/favorites/';
    if (sortType) { url += `?ordering=${sortType}`; }

    api.get(url)
      .then(response => response.data)
      .then((results) => {
        dispatch(favoritePositionsHasErrored(false));
        dispatch(favoritePositionsIsLoading(false));
        dispatch(favoritePositionsFetchDataSuccess(results));
      })
      .catch(() => {
        dispatch(favoritePositionsHasErrored(true));
        dispatch(favoritePositionsIsLoading(false));
      });
  };
}
