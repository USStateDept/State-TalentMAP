import Q from 'q';
import api from '../api';
import { toastSuccess, toastError, toastWarning } from './toast';

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

export function putAllSyncsHasErrored(bool) {
  return {
    type: 'PUT_ALL_SYNCS_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function putAllSyncsIsLoading(bool) {
  return {
    type: 'PUT_ALL_SYNCS_IS_LOADING',
    isLoading: bool,
  };
}

export function putAllSyncsSuccess(bool) {
  return {
    type: 'PUT_ALL_SYNCS_SUCCESS',
    success: bool,
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

export function putAllSyncs() {
  return (dispatch) => {
    dispatch(putAllSyncsIsLoading(true));
    dispatch(putAllSyncsHasErrored(false));
    api().get('/data_sync/')
      .then((response) => {
        // create promise array to PUT each job
        const queryProms = response.data.data.map(sync =>
          api().put(`/data_sync/run/${sync.id}/`)
            .then(() => true)
            .catch(() => false),
          );
        // execute queries
        Q.allSettled(queryProms)
        .then((results) => {
          const successCount = results.filter(r => r.state === 'fulfilled' && r.value).length || 0;
          const queryPromsLen = queryProms.length || 0;
          const countDiff = queryPromsLen - successCount;
          if (successCount === 0) {
            dispatch(toastError('There was an error scheduling synchronization jobs. Please try again.', 'Error'));
          } else if (countDiff === 0) {
            dispatch(toastSuccess('Synchronization jobs have been scheduled to run now', 'Success'));
          } else if (countDiff > 0) {
            dispatch(toastWarning(`All but ${countDiff} jobs have been scheduled to run now`, 'Warning'));
          }
          dispatch(putAllSyncsSuccess(true));
          dispatch(putAllSyncsHasErrored(false));
          dispatch(putAllSyncsIsLoading(false));
        });
      })
      .catch(() => {
        dispatch(putAllSyncsHasErrored(true));
        dispatch(putAllSyncsIsLoading(false));
      });
  };
}
