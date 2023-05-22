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

export function aiCreateHasErrored(bool) {
  return {
    type: 'AI_CREATE_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function aiCreateIsLoading(bool) {
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
    dispatch(aiCreateIsLoading(true));
    dispatch(aiCreateHasErrored(false));
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
          dispatch(aiCreateHasErrored(false));
          dispatch(aiCreateSuccess(data || []));
          dispatch(toastSuccess(UPDATE_AGENDA_ITEM_SUCCESS, UPDATE_AGENDA_ITEM_SUCCESS_TITLE));
          dispatch(aiCreateIsLoading(false));
        });
      })
      .catch((err) => {
        if (get(err, 'message') === 'cancel') {
          dispatch(aiCreateHasErrored(false));
          dispatch(aiCreateIsLoading(false));
        } else {
          dispatch(toastError(UPDATE_AGENDA_ITEM_ERROR, UPDATE_AGENDA_ITEM_ERROR_TITLE));
          dispatch(aiCreateHasErrored(true));
          dispatch(aiCreateIsLoading(false));
        }
      });
  };
}


export function validateAIHasErrored(bool) {
  return {
    type: 'VALIDATE_AI_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function validateAIIsLoading(bool) {
  return {
    type: 'VALIDATE_AI_IS_LOADING',
    isLoading: bool,
  };
}
export function validateAISuccess(data) {
  return {
    type: 'VALIDATE_AI_SUCCESS',
    data,
  };
}

export function validateAI(panel, legs, personId, ef) {
  return (dispatch) => {
    if (cancel) { cancel('cancel'); }
    dispatch(validateAIIsLoading(true));
    dispatch(validateAIHasErrored(false));
    api()
      .post('/fsbid/agenda/agenda_item/validate/', {
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
          dispatch(validateAISuccess(data || {}));
          dispatch(validateAIIsLoading(false));
        });
      })
      .catch((err) => {
        if (get(err, 'message') === 'cancel') {
          dispatch(validateAIIsLoading(false));
        } else {
          dispatch(validateAIHasErrored(true));
          dispatch(validateAIIsLoading(false));
        }
      });
  };
}
