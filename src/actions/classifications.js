/* eslint-disable no-console */
import * as SystemMessages from 'Constants/SystemMessages';
import { userProfilePublicFetchData } from 'actions/userProfilePublic';
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
      .get('/fsbid/reference/classifications/')
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

export function updateClassificationsHasErrored(bool) {
  return {
    type: 'CLASSIFICATIONS_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function updateClassificationsIsLoading(bool) {
  return {
    type: 'CLASSIFICATIONS_IS_LOADING',
    isLoading: bool,
  };
}

// updateClass on if/else (empty array)
export function insertClassifications(data, id) {
  console.log('inside insert classifications action');
  console.log('inserted classification(s)', data);
  console.log('id', id);

  return (dispatch) => {
    batch(() => {
      dispatch(updateClassificationsIsLoading(true));
      dispatch(updateClassificationsHasErrored(false));
    });

    // need to update url for BE
    const url = `/fsbid/cdo/client/${id}/classifications/`;

    api().put(url, data)
      .then(response => response.data)
      .then(() => {
        const message = SystemMessages.UPDATE_CLASSIFICATIONS_SUCCESS;
        batch(() => {
          dispatch(toastSuccess(message));
          dispatch(updateClassificationsHasErrored(false));
          dispatch(updateClassificationsIsLoading(false));
        });
        dispatch(userProfilePublicFetchData(id));
      })
      .catch(() => {
        const message = SystemMessages.UPDATE_CLASSIFICATIONS_ERROR;
        batch(() => {
          dispatch(toastError(message));
          dispatch(updateClassificationsHasErrored(true));
          dispatch(updateClassificationsIsLoading(false));
        });
      });
  };
}

// add upate and delete
export function deleteClassifications(data, id) {
  console.log('inside delete classifications action');
  console.log('delete classification(s)', data);
  console.log('id', id);

  return (dispatch) => {
    batch(() => {
      dispatch(updateClassificationsIsLoading(true));
      dispatch(updateClassificationsHasErrored(false));
    });

    // need to setup url -> views -> services on BE
    const url = `/fsbid/cdo/client/${id}/classifications/`;
    // const url = `/fsbid/cdo/client/${id}/classifications/${data}`;

    // api().delete(url)
    api().put(url, data)
      .then(response => response.data)
      .then(() => {
        const message = SystemMessages.DELETE_CLASSIFICATIONS_SUCCESS;
        batch(() => {
          dispatch(toastSuccess(message));
          dispatch(updateClassificationsHasErrored(false));
          dispatch(updateClassificationsIsLoading(false));
        });
        dispatch(userProfilePublicFetchData(id));
      })
      .catch(() => {
        const message = SystemMessages.DELETE_CLASSIFICATIONS_ERROR;
        batch(() => {
          dispatch(toastError(message));
          dispatch(updateClassificationsHasErrored(true));
          dispatch(updateClassificationsIsLoading(false));
        });
      });
  };
}
