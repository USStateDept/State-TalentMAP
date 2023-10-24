import { batch } from 'react-redux';
import { CancelToken } from 'axios';
import api from '../api';
import {
  UPDATE_POST_PANEL_PROCESSING_ERROR, UPDATE_POST_PANEL_PROCESSING_ERROR_TITLE,
  UPDATE_POST_PANEL_PROCESSING_SUCCESS, UPDATE_POST_PANEL_PROCESSING_SUCCESS_TITLE,
} from '../Constants/SystemMessages';
import { toastError, toastSuccess } from './toast';

let cancelPostPanel;
let cancelEditPostPanel;

// =============== FETCH DATA ===============

export function postPanelProcessingFetchDataErrored(bool) {
  return {
    type: 'POST_PANEL_PROCESSING_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function postPanelProcessingFetchDataLoading(bool) {
  return {
    type: 'POST_PANEL_PROCESSING_FETCH_IS_LOADING',
    isLoading: bool,
  };
}

export function postPanelProcessingFetchDataSuccess(results) {
  return {
    type: 'POST_PANEL_PROCESSING_FETCH_SUCCESS',
    results,
  };
}

export function postPanelProcessingFetchData(id) {
  return (dispatch) => {
    if (cancelPostPanel) {
      cancelPostPanel('cancel');
      dispatch(postPanelProcessingFetchDataLoading(true));
    }
    batch(() => {
      dispatch(postPanelProcessingFetchDataLoading(true));
      dispatch(postPanelProcessingFetchDataErrored(false));
    });
    const ep = `/fsbid/admin/panel/post_panel/${id}/`;
    api().get(ep, {
      cancelToken: new CancelToken((c) => { cancelPostPanel = c; }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(postPanelProcessingFetchDataSuccess(data));
          dispatch(postPanelProcessingFetchDataErrored(false));
          dispatch(postPanelProcessingFetchDataLoading(false));
        });
      })
      .catch(() => {
        batch(() => {
          dispatch(postPanelProcessingFetchDataErrored(true));
          dispatch(postPanelProcessingFetchDataLoading(false));
        });
      });
  };
}

// =============== EDIT DATA ===============

export function editPostPanelProcessingHasErrored(bool) {
  return {
    type: 'EDIT_POST_PANEL_PROCESSING_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function editPostPanelProcessingIsLoading(bool) {
  return {
    type: 'EDIT_POST_PANEL_PROCESSING_IS_LOADING',
    isLoading: bool,
  };
}
export function editPostPanelProcessingSuccess(data) {
  return {
    type: 'EDIT_POST_PANEL_PROCESSING_SUCCESS',
    data,
  };
}

// eslint-disable-next-line no-unused-vars
export function editPostPanelProcessing(props) {
  return (dispatch) => {
    if (cancelEditPostPanel) {
      cancelEditPostPanel('cancel');
      dispatch(editPostPanelProcessingIsLoading(true));
    }
    batch(() => {
      dispatch(editPostPanelProcessingSuccess([]));
      dispatch(editPostPanelProcessingIsLoading(true));
      dispatch(editPostPanelProcessingHasErrored(false));
    });
    const ep = '/fsbid/admin/panel/post_panel/edit/';
    api().put(ep, props, {
      cancelToken: new CancelToken((c) => { cancelEditPostPanel = c; }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(editPostPanelProcessingHasErrored(false));
          dispatch(editPostPanelProcessingSuccess(data || []));
          dispatch(toastSuccess(
            UPDATE_POST_PANEL_PROCESSING_SUCCESS,
            UPDATE_POST_PANEL_PROCESSING_SUCCESS_TITLE,
          ));
          dispatch(editPostPanelProcessingIsLoading(false));
        });
      }).catch((err) => {
        dispatch(toastError(
          `${UPDATE_POST_PANEL_PROCESSING_ERROR} ${err?.error_message ?? ''}`,
          UPDATE_POST_PANEL_PROCESSING_ERROR_TITLE,
        ));
        dispatch(editPostPanelProcessingHasErrored(true));
        dispatch(editPostPanelProcessingIsLoading(false));
      });
  };
}
