import * as SystemMessages from 'Constants/SystemMessages';
import { userProfilePublicFetchData } from 'actions/userProfilePublic';
import { batch } from 'react-redux';
import { uniqBy } from 'lodash';
import { toastError, toastSuccess } from './toast';
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
        const data$ = uniqBy(data, 'code');
        batch(() => {
          dispatch(classificationsHasErrored(false));
          dispatch(classificationsIsLoading(false));
          dispatch(classificationsFetchDataSuccess(data$));
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
    type: 'UPDATE_CLASSIFICATIONS_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function updateClassificationsIsLoading(bool) {
  return {
    type: 'UPDATE_CLASSIFICATIONS_IS_LOADING',
    isLoading: bool,
  };
}

export function updateClassifications(data, id) {
  return (dispatch) => {
    batch(() => {
      dispatch(updateClassificationsIsLoading(true));
      dispatch(updateClassificationsHasErrored(false));
    });

    const url = `/fsbid/cdo/classifications/${id}/`;

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
