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

// change to insertClassifications
// updateClass on if/else (empty array)
// insert(data), delete(data)
export function saveClassifications(insertData, deleteData, id) {
  console.log('inside save classifications action');
  console.log('inserted classification(s)', insertData);
  console.log('delete classification(s)', deleteData);
  console.log('id', id);

  return (dispatch) => {
    batch(() => {
      dispatch(saveClassificationsIsLoading(true));
      dispatch(saveClassificationsHasErrored(false));
    });

    // need to update url for BE
    const url = `/fsbid/cdo/client/${id}/classifications/`;

    api().put(url, insertData)
      .then(response => response.data)
      .then(() => {
        const message = SystemMessages.UPDATE_CLASSIFICATIONS_SUCCESS;
        batch(() => {
          dispatch(toastSuccess(message));
          dispatch(saveClassificationsHasErrored(false));
          dispatch(saveClassificationsIsLoading(false));
        });
        dispatch(userProfilePublicFetchData(id));
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

// add upate and delete
