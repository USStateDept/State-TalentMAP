import { batch } from 'react-redux';
import { get } from 'lodash';
import { CancelToken } from 'axios';
import { convertQueryToString } from 'utilities';
import api from '../api';

let cancelPostPanelProcessing;

export function postPanelProcessingErrored(bool) {
  return {
    type: 'POST_PANEL_PROCESSING_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function postPanelProcessingLoading(bool) {
  return {
    type: 'POST_PANEL_PROCESSING_FETCH_IS_LOADING',
    isLoading: bool,
  };
}

export function postPanelProcessingSuccess(results) {
  return {
    type: 'POST_PANEL_PROCESSING_FETCH_SUCCESS',
    results,
  };
}

export function postPanelProcessingFetchData(query = {}) {
  return (dispatch) => {
    if (cancelPostPanelProcessing) { cancelPostPanelProcessing('cancel'); }
    batch(() => {
      dispatch(postPanelProcessingLoading(true));
      dispatch(postPanelProcessingErrored(false));
    });
    const q = convertQueryToString(query);
    const endpoint = '/fsbid/panel/';
    const ep = `${endpoint}?${q}`;
    api().get(ep, {
      cancelToken: new CancelToken((c) => {
        cancelPostPanelProcessing = c;
      }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(postPanelProcessingSuccess(data));
          dispatch(postPanelProcessingErrored(false));
          dispatch(postPanelProcessingLoading(false));
        });
      })
      .catch((err) => {
        if (get(err, 'message') === 'cancel') {
          batch(() => {
            dispatch(postPanelProcessingErrored(false));
            dispatch(postPanelProcessingLoading(true));
          });
        } else {
          batch(() => {
            dispatch(postPanelProcessingErrored(true));
            dispatch(postPanelProcessingLoading(false));
          });
        }
      });
  };
}

export function postPanelProcessingSaveSuccess(result) {
  return {
    type: 'POST_PANEL_PROCESSING_SAVE_SUCCESS',
    result,
  };
}

export function savePostPanelProcessing(queryObject) {
  return (dispatch) => dispatch(postPanelProcessingSaveSuccess(queryObject));
}
