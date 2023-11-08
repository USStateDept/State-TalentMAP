import { batch } from 'react-redux';
import {
  UPDATE_POSITION_CLASSIFICATION_ERROR,
  UPDATE_POSITION_CLASSIFICATION_ERROR_TITLE,
  UPDATE_POSITION_CLASSIFICATION_SUCCESS,
  UPDATE_POSITION_CLASSIFICATION_SUCCESS_TITLE,
} from '../Constants/SystemMessages';
import api from '../api';
import { toastError, toastSuccess } from './toast';

export function positionClassificationsIsLoading(bool) {
  return {
    type: 'POSITION_CLASSIFICATIONS_IS_LOADING',
    isLoading: bool,
  };
}

export function positionClassificationsFetchDataSuccess(results) {
  return {
    type: 'POSITION_CLASSIFICATIONS_FETCH_DATA_SUCCESS',
    results,
  };
}

export function positionClassifications(id) {
  return (dispatch) => {
    batch(() => {
      dispatch(positionClassificationsIsLoading(true));
      dispatch(positionClassificationsHasErrored(false));
    });

    api().get(`/fsbid/position_classifications/${id}/`)
      .then(({ data }) => {
        batch(() => {
          dispatch(positionClassificationsHasErrored(false));
          dispatch(positionClassificationsIsLoading(false));
          dispatch(positionClassificationsFetchDataSuccess(data));
        });
      })
      .catch(() => {
        batch(() => {
          dispatch(positionClassificationsHasErrored(true));
          dispatch(positionClassificationsIsLoading(false));
        });
      });
  };
}

export function positionClassificationsEditErrored(bool) {
  return {
    type: 'POSITION_CLASSIFICATIONS_EDIT_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function positionClassificationsEditLoading(bool) {
  return {
    type: 'POSITION_CLASSIFICATIONS_EDIT_IS_LOADING',
    isLoading: bool,
  };
}
export function positionClassificationsEditSuccess(results) {
  return {
    type: 'POSITION_CLASSIFICATIONS_EDIT_SUCCESS',
    results,
  };
}
export function positionClassificationsEdit(data) {
  return (dispatch) => {
    batch(() => {
      dispatch(positionClassificationsEditLoading(true));
      dispatch(positionClassificationsEditErrored(false));
    });

    api().put('/fsbid/position_classifications/edit/', data)
      .then(() => {
        const toastTitle = UPDATE_POSITION_CLASSIFICATION_SUCCESS_TITLE;
        const toastMessage = UPDATE_POSITION_CLASSIFICATION_SUCCESS;
        batch(() => {
          dispatch(positionClassificationsEditErrored(false));
          dispatch(toastSuccess(toastMessage, toastTitle));
          dispatch(positionClassificationsEditSuccess(true));
          dispatch(positionClassificationsEditLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(positionClassificationsEditLoading(true));
            dispatch(positionClassificationsEditErrored(false));
          });
        } else {
          const toastTitle = UPDATE_POSITION_CLASSIFICATION_ERROR_TITLE;
          const toastMessage = UPDATE_POSITION_CLASSIFICATION_ERROR;
          batch(() => {
            dispatch(positionClassificationsEditErrored(true));
            dispatch(toastError(toastMessage, toastTitle));
            dispatch(positionClassificationsEditLoading(false));
          });
        }
      });
  };
}
