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

export function frequentPositionsIsLoading(bool) {
  return {
    type: 'FREQUENT_POSITIONS_IS_LOADING',
    isLoadingFP: bool,
  };
}

export function positionsFetchDataSuccess(data) {
  return {
    type: 'POSITIONS_SUCCESS',
    data,
  };
}

export function positionsFetchData(query, isFP = false) {
  return (dispatch) => {
    dispatch(positionsIsLoading(true));
    dispatch(frequentPositionsIsLoading(isFP));
    dispatch(positionsHasErrored(false));
    const prefix = '/fsbid/positions';
    api().get(`${prefix}/?${query}`)
      .then((response) => {
        dispatch(positionsHasErrored(false));
        dispatch(positionsIsLoading(false));
        dispatch(frequentPositionsIsLoading(false));
        dispatch(positionsFetchDataSuccess(response.data));
      })
      .catch(() => {
        dispatch(positionsHasErrored(true));
        dispatch(positionsIsLoading(false));
        dispatch(frequentPositionsIsLoading(false));
      });
  };
}
