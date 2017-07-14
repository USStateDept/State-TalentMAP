import axios from 'axios';

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

export function positionDetailsFetchData(url) {
  return (dispatch) => {
    dispatch(positionDetailsIsLoading(true));
    axios.get(url)
            .then((response) => {
              if (response.statusText === 'OK' || response.status === 200) {
                dispatch(positionDetailsIsLoading(false));
                return response.data;
              }
              throw Error(response.statusText);
            })
            .then(positionDetails => dispatch(positionDetailsFetchDataSuccess(positionDetails)))
            .catch(() => dispatch(positionDetailsHasErrored(true)));
  };
}
