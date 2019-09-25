import api from '../api';
import { checkFlag } from '../flags';

const getUseAP = () => checkFlag('flags.available_positions');

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

export function positionDetailsFetchData(id, isPV = false) {
  return (dispatch) => {
    dispatch(positionDetailsIsLoading(true));
    const useAP = getUseAP();
    let prefix = useAP ? '/fsbid/available_positions' : '/cycleposition';
    if (isPV) { prefix = '/fsbid/projected_vacancies'; }
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
