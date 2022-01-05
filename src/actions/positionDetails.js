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

export function positionDetailsPatchState(positionDetails) {
  return {
    type: 'POSITION_DETAILS_PATCH_STATE',
    positionDetails,
  };
}

export function positionDetailsFetchData(id, isPV = false, isGeneric = false) {
  return (dispatch) => {
    dispatch(positionDetailsIsLoading(true));
    let prefix = '/fsbid/available_positions';
    if (isPV) { prefix = '/fsbid/projected_vacancies'; }
    if (isGeneric) { prefix = '/fsbid/positions'; }

    api().get(`${prefix}/${id}/`)
      .then(response => response.data)
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
