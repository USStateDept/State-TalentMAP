import api from '../api';

export function syncsHasErrored(bool) {
  return {
    type: 'SYNCS_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function syncsIsLoading(bool) {
  return {
    type: 'SYNCS_IS_LOADING',
    isLoading: bool,
  };
}

export function syncsFetchDataSuccess(syncs) {
  return {
    type: 'SYNCS_FETCH_DATA_SUCCESS',
    syncs,
  };
}

export function syncsFetchData() {
  return (dispatch) => {
    dispatch(syncsIsLoading(true));
    dispatch(syncsHasErrored(false));
    api().get('/data_sync/')
      .then((response) => {
        dispatch(syncsFetchDataSuccess(response.data.data));
        dispatch(syncsHasErrored(false));
        dispatch(syncsIsLoading(false));
      })
      .catch(() => {
        dispatch(syncsHasErrored(true));
        dispatch(syncsIsLoading(false));
      });
  };
}
