import api from '../api';
import { checkFlag } from '../flags';

const getUseAP = () => checkFlag('flags.available_positions');

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
    const useAP = getUseAP();
    const prefix = useAP ? '/fsbid/available_positions' : '/cycleposition';
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
