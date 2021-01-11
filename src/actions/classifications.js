import * as SystemMessages from 'Constants/SystemMessages';
// import { userProfilePublicFetchData } from 'actions/userProfilePublic';
import { batch } from 'react-redux';
import { toastSuccess, toastError } from './toast';
import api from '../api';

export function classificationsHasErrored(bool) {
  return {
    type: 'CLASSIFICATIONS_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function classificationsIsLoading(bool) {
  return {
    type: 'CLASSIFICATIONS_IS_LOADING',
    isLoading: bool,
  };
}

export function classificationsFetchDataSuccess(classifications) {
  return {
    type: 'CLASSIFICATIONS_FETCH_DATA_SUCCESS',
    classifications,
  };
}

export function fetchClassifications() {
  return (dispatch) => {
    batch(() => {
      dispatch(classificationsIsLoading(true));
      dispatch(classificationsHasErrored(false));
    });

    api()
      .get('/fsbid/reference/classification/')
      .then(({ data }) => {
        batch(() => {
          dispatch(classificationsHasErrored(false));
          dispatch(classificationsIsLoading(false));
          dispatch(classificationsFetchDataSuccess(data));
        });
      })
      .catch(() => {
        batch(() => {
          dispatch(classificationsHasErrored(true));
          dispatch(classificationsIsLoading(false));
        });
      });
  };
}

export function getClassifications() {
  return (dispatch) => {
    batch(() => {
      dispatch(classificationsIsLoading(true));
      dispatch(classificationsHasErrored(false));
    });

    const url = '/fsbid/reference/classifications/';
    // need specific classifications for user

    api().get(url);
  };
}

export function saveClassificationsHasErrored(bool) {
  return {
    type: 'CLASSIFICATIONS_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function saveClassificationsIsLoading(bool) {
  return {
    type: 'CLASSIFICATIONS_IS_LOADING',
    isLoading: bool,
  };
}

// need to add id back
// id = perdet_seq_number
export function saveClassifications(data) {
  console.log('inside save classification');
  console.log('classification', data);

  // return (dispatch, getState) => {
  return (dispatch) => {
    batch(() => {
      dispatch(saveClassificationsIsLoading(true));
      dispatch(saveClassificationsHasErrored(false));
    });

    // need a new url
    // const url = '/fsbid/reference/classifications/';
    const url = '/fsbid/reference/classification/';

    // from bidList.js action
    // const { perdet_seq_number: id } = getState().clientView.client;
    // const url = `/fsbid/classifications/client/${id}/`;

    // api().put(url, data)
    api().get(url)
      .then(response => response.data)
      .then(() => {
        // need to update for success message
        // const message = SystemMessages.REGISTER_HANDSHAKE_SUCCESS(undo);
        const message = SystemMessages.UPDATE_CLASSIFICATIONS_SUCCESS;
        batch(() => {
          dispatch(toastSuccess(message));
          dispatch(saveClassificationsHasErrored(false));
          dispatch(saveClassificationsIsLoading(false));
        });
        // dispatch(userProfilePublicFetchData(id));
      })
      .catch(() => {
        const message = SystemMessages.UPDATE_CLASSIFICATIONS_ERROR;
        batch(() => {
          dispatch(toastError(message));
          dispatch(saveClassificationsHasErrored(true));
          dispatch(saveClassificationsIsLoading(false));
        });
      });
  };
}
