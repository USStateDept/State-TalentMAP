import { batch } from 'react-redux';
import api from '../api';

export function bureauPositionDetailsHasErrored(bool) {
  return {
    type: 'BUREAU_POSITION_DETAILS_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function bureauPositionDetailsIsLoading(bool) {
  return {
    type: 'BUREAU_POSITION_DETAILS_IS_LOADING',
    isLoading: bool,
  };
}

export function bureauPositionDetailsFetchDataSuccess(bureauPositionDetails) {
  return {
    type: 'BUREAU_POSITION_DETAILS_FETCH_DATA_SUCCESS',
    bureauPositionDetails,
  };
}

export function bureauPositionDetailsFetchData(id) {
  return (dispatch) => {
    batch(() => {
      dispatch(bureauPositionDetailsIsLoading(true));
      dispatch(bureauPositionDetailsHasErrored(false));
    });
    const prefix = '/fsbid/bureau/positions';
    api().get(`${prefix}/${id}/`)
      .then(({ data }) => {
        batch(() => {
          dispatch(bureauPositionDetailsFetchDataSuccess(data));
          dispatch(bureauPositionDetailsHasErrored(false));
          dispatch(bureauPositionDetailsIsLoading(false));
        });
      })
      .catch(() => {
        batch(() => {
          dispatch(bureauPositionDetailsHasErrored(true));
          dispatch(bureauPositionDetailsIsLoading(false));
        });
      });
  };
}

