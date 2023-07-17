import { batch } from 'react-redux';
import { get } from 'lodash';
import { CancelToken } from 'axios';
import { convertQueryToString } from 'utilities';
import api from '../api';

let cancelGSALocations;

export function gsaLocationsFetchDataErrored(bool) {
  return {
    type: 'GSA_LOCATIONS_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function gsaLocationsFetchDataLoading(bool) {
  return {
    type: 'GSA_LOCATIONS_FETCH_IS_LOADING',
    isLoading: bool,
  };
}

export function gsaLocationsFetchDataSuccess(results) {
  return {
    type: 'GSA_LOCATIONS_FETCH_SUCCESS',
    results,
  };
}

export function gsaLocationsFetchData(query = {}) {
  return (dispatch) => {
    if (cancelGSALocations) { cancelGSALocations('cancel'); }
    batch(() => {
      dispatch(gsaLocationsFetchDataLoading(true));
      dispatch(gsaLocationsFetchDataErrored(false));
    });
    const q = convertQueryToString(query);
    const endpoint = '/fsbid/reference/gsalocations/';
    const ep = `${endpoint}?${q}`;
    api().get(ep, {
      cancelToken: new CancelToken((c) => {
        cancelGSALocations = c;
      }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(gsaLocationsFetchDataSuccess(data));
          dispatch(gsaLocationsFetchDataErrored(false));
          dispatch(gsaLocationsFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (get(err, 'message') === 'cancel') {
          batch(() => {
            dispatch(gsaLocationsFetchDataErrored(false));
            dispatch(gsaLocationsFetchDataLoading(true));
          });
        } else {
          batch(() => {
            dispatch(gsaLocationsFetchDataSuccess({}));
            dispatch(gsaLocationsFetchDataErrored(true));
            dispatch(gsaLocationsFetchDataLoading(false));
          });
        }
      });
  };
}

