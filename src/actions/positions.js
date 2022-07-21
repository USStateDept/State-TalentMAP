import api from '../api';

export function positionsHasErrored(bool) {
  return {
    type: 'POSITIONS_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function positionsIsLoading(bool) {
  return {
    type: 'POSITIONS_IS_LOADING',
    isLoading: bool,
  };
}

export function positionsFetchDataSuccess(count) {
  return {
    type: 'POSITIONS_SUCCESS',
    count,
  };
}

export function positionsFetchData(query) {
  return (dispatch) => {
    dispatch(positionsIsLoading(true));
    dispatch(positionsHasErrored(false));
    const prefix = '/fsbid/positions';
    api().get(`${prefix}/?${query}`)
      .then((response) => {
        const { count } = response.data;
        dispatch(positionsHasErrored(false));
        dispatch(positionsIsLoading(false));
        dispatch(positionsFetchDataSuccess(count));
      })
      .catch(() => {
        // TODO update
        dispatch(positionsHasErrored(true));
        dispatch(positionsIsLoading(false));
      });
  };
}
