import api from '../api';

export function positionCountHasErrored(bool) {
  return {
    type: 'POSITION_COUNT_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function positionCountIsLoading(bool) {
  return {
    type: 'POSITION_COUNT_IS_LOADING',
    isLoading: bool,
  };
}

export function positionCountFetchDataSuccess(count) {
  return {
    type: 'POSITION_COUNT_SUCCESS',
    count,
  };
}

export function positionCountFetchData() {
  return (dispatch) => {
    dispatch(positionCountIsLoading(true));
    dispatch(positionCountHasErrored(false));
    const prefix = '/fsbid/available_positions';
    api().get(`${prefix}/?limit=1`)
      .then((response) => {
        const { count } = response.data;
        dispatch(positionCountHasErrored(false));
        dispatch(positionCountIsLoading(false));
        dispatch(positionCountFetchDataSuccess(count));
      })
      .catch(() => {
        // TODO update
        dispatch(positionCountHasErrored(true));
        dispatch(positionCountIsLoading(false));
      });
  };
}
