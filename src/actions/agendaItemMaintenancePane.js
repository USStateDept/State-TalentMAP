import { get } from 'lodash';
import { CancelToken } from 'axios';
import { batch } from 'react-redux';
import { UPDATE_AGENDA_ITEM_ERROR,
  UPDATE_AGENDA_ITEM_ERROR_TITLE, UPDATE_AGENDA_ITEM_SUCCESS,
  UPDATE_AGENDA_ITEM_SUCCESS_TITLE,
} from 'Constants/SystemMessages';
import { toastError, toastSuccess } from './toast';
import api from '../api';

let cancelFetchAI;
let cancelModifyAI;
let cancelValidateAI;

export function aiModifyHasErrored(bool) {
  return {
    type: 'AI_MODIFY_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function aiModifyIsLoading(bool) {
  return {
    type: 'AI_MODIFY_IS_LOADING',
    isLoading: bool,
  };
}
export function aiModifySuccess(data) {
  return {
    type: 'AI_MODIFY_SUCCESS',
    data,
  };
}
export function resetAICreate() {
  return {
    type: 'AI_MODIFY_SUCCESS',
    data: false,
  };
}
export function fetchAIHasErrored(bool) {
  return {
    type: 'FETCH_AI_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function fetchAIIsLoading(bool) {
  return {
    type: 'FETCH_AI_IS_LOADING',
    isLoading: bool,
  };
}
export function fetchAISuccess(data) {
  return {
    type: 'FETCH_AI_SUCCESS',
    data,
  };
}

export function fetchAI(id) {
  return (dispatch) => {
    if (cancelFetchAI) { cancelFetchAI('cancel'); }
    dispatch(fetchAIIsLoading(true));
    dispatch(fetchAISuccess({}));
    dispatch(fetchAIHasErrored(false));
    api()
      .get(`/fsbid/agenda/agenda_items/${id}/`,
        {
          cancelToken: new CancelToken((c) => {
            cancelFetchAI = c;
          }),
        },
      )
      .then(({ data }) => {
        batch(() => {
          dispatch(fetchAIHasErrored(false));
          dispatch(fetchAISuccess(data));
          dispatch(fetchAIIsLoading(false));
        });
      })
      .catch((err) => {
        if (get(err, 'message') === 'cancel') {
          dispatch(fetchAIHasErrored(false));
          dispatch(fetchAIIsLoading(false));
        } else {
          dispatch(fetchAIHasErrored(true));
          dispatch(fetchAIIsLoading(false));
        }
      });
  };
}

export function resetCreateAI() {
  return (dispatch) => dispatch(resetAICreate());
}

// Used for editing and creating agenda
export function modifyAgenda(panel, legs, personId, ef, refData) {
  return (dispatch) => {
    if (cancelModifyAI) { cancelModifyAI('cancel'); }
    dispatch(aiModifyIsLoading(true));
    dispatch(aiModifySuccess(false));
    dispatch(aiModifyHasErrored(false));
    api()
      .post('/fsbid/agenda/agenda_item/', {
        ...ef,
        personId,
        ...panel,
        agendaLegs: legs,
        refData,
      }, {
        cancelToken: new CancelToken((c) => {
          cancelModifyAI = c;
        }),
      })
      .then(({ data }) => {
        batch(() => {
          dispatch(aiModifyHasErrored(false));
          dispatch(aiModifySuccess(data));
          dispatch(toastSuccess(UPDATE_AGENDA_ITEM_SUCCESS, UPDATE_AGENDA_ITEM_SUCCESS_TITLE));
          dispatch(aiModifyIsLoading(false));
          dispatch(fetchAI(data));
        });
      })
      .catch((err) => {
        if (get(err, 'message') === 'cancel') {
          dispatch(aiModifyHasErrored(false));
          dispatch(aiModifyIsLoading(false));
        } else {
          dispatch(toastError(UPDATE_AGENDA_ITEM_ERROR, UPDATE_AGENDA_ITEM_ERROR_TITLE));
          dispatch(aiModifyHasErrored(true));
          dispatch(aiModifyIsLoading(false));
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
    if (cancelValidateAI) { cancelValidateAI('cancel'); }
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
          cancelValidateAI = c;
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

export function resetAIValidation() {
  // an alternative would be to do ' || readMode' at each line where we do the
  // validation check, this is cleaner
  const forcedAllValid = {
    status: {
      valid: true,
      errorMessage: '',
    },
    reportCategory: {
      valid: true,
      errorMessage: '',
    },
    panelDate: {
      valid: true,
      errorMessage: '',
    },
    allValid: true,
  };
  return (dispatch) => {
    dispatch(validateAISuccess(forcedAllValid));
  };
}

