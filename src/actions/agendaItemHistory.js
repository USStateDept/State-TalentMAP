import api from '../api';

export function aihHasErrored(bool) {
  return {
    type: 'AIH_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function aihIsLoading(bool) {
  return {
    type: 'AIH_IS_LOADING',
    isLoading: bool,
  };
}
export function aihFetchDataSuccess(data) {
  return {
    type: 'AIH_FETCH_DATA_SUCCESS',
    data,
  };
}

export function aihFetchData(perdet = '', ordering = '') {
  return (dispatch) => {
    if (!perdet) {
      dispatch(aihHasErrored(true));
      dispatch(aihIsLoading(false));
    } else {
      dispatch(aihHasErrored(false));
      dispatch(aihIsLoading(true));
      api()
        .get(`/fsbid/agenda/agenda_items/?perdet=${perdet}&ordering=${ordering}`)
        .then(({ data }) => data.results || [])
        .then((data$) => {
          dispatch(aihFetchDataSuccess(data$));
          dispatch(aihHasErrored(false));
          dispatch(aihIsLoading(false));
        })
        .catch(() => {
          dispatch(aihHasErrored(true));
          dispatch(aihIsLoading(false));
        });
    }
  };
}
