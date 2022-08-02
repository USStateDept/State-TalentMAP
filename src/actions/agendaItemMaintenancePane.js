import { get } from 'lodash';
import { CancelToken } from 'axios';
import { batch } from 'react-redux';
import { UPDATE_AGENDA_ITEM_ERROR,
  UPDATE_AGENDA_ITEM_ERROR_TITLE, UPDATE_AGENDA_ITEM_SUCCESS,
  UPDATE_AGENDA_ITEM_SUCCESS_TITLE,
} from 'Constants/SystemMessages';
import { toastError, toastSuccess } from './toast';
import api from '../api';

let cancel;

export function aiCreateErrored(bool) {
  return {
    type: 'AI_CREATE_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function aiCreateLoading(bool) {
  return {
    type: 'AI_CREATE_IS_LOADING',
    isLoading: bool,
  };
}
export function aiCreateSuccess(data) {
  return {
    type: 'AI_CREATE_SUCCESS',
    data,
  };
}

// eslint-disable-next-line no-unused-vars
export function aiCreate(post_body) {
  return (dispatch) => {
    if (cancel) { cancel('cancel'); }
    dispatch(aiCreateErrored(false));
    dispatch(aiCreateLoading(true));
    api()
      // .post('/fsbid/agenda/agenda_items/&q=', { cancelToken: new CancelToken((c) => {
      //   cancel = c;
      // }) })
      .get('/fsbid/reference/cycles/', { cancelToken: new CancelToken((c) => {
        cancel = c;
      }) })
      .then(({ data }) => data || [])
      .then(() => {
        const toastTitle = UPDATE_AGENDA_ITEM_SUCCESS_TITLE;
        const toastMessage = UPDATE_AGENDA_ITEM_SUCCESS;
        batch(() => {
          dispatch(aiCreateErrored(false));
          dispatch(aiCreateSuccess(post_body));
          dispatch(toastSuccess(toastMessage, toastTitle));
          dispatch(aiCreateLoading(true));
        });
      })
      .catch((err) => {
        if (get(err, 'message') === 'cancel') {
          dispatch(aiCreateErrored(false));
          dispatch(aiCreateLoading(true));
        } else {
          const toastTitle = UPDATE_AGENDA_ITEM_ERROR_TITLE;
          const toastMessage = UPDATE_AGENDA_ITEM_ERROR;
          dispatch(toastError(toastMessage, toastTitle));
          dispatch(aiCreateErrored(true));
          dispatch(aiCreateLoading(false));
        }
      });
  };
}
