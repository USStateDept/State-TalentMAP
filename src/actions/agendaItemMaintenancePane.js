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

export function aiCreate(panel, legs, personId, ef) {
  return (dispatch) => {
    if (cancel) { cancel('cancel'); }
    dispatch(aiCreateLoading(true));
    dispatch(aiCreateErrored(false));
    api()
      .post('/fsbid/agenda/agenda_item/', {
        ...ef,
        personId,
        ...panel,
        agendaLegs: legs,
      }, {
        cancelToken: new CancelToken((c) => {
          cancel = c;
        }),
      })
      .then(({ data }) => {
        batch(() => {
          dispatch(aiCreateErrored(false));
          dispatch(aiCreateSuccess(data || []));
          dispatch(toastSuccess(UPDATE_AGENDA_ITEM_SUCCESS, UPDATE_AGENDA_ITEM_SUCCESS_TITLE));
          dispatch(aiCreateLoading(false));
        });
      })
      .catch((err) => {
        if (get(err, 'message') === 'cancel') {
          dispatch(aiCreateErrored(false));
          dispatch(aiCreateLoading(false));
        } else {
          dispatch(toastError(UPDATE_AGENDA_ITEM_ERROR, UPDATE_AGENDA_ITEM_ERROR_TITLE));
          dispatch(aiCreateErrored(true));
          dispatch(aiCreateLoading(false));
        }
      });
  };
}
