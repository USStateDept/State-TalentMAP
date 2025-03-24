import {
  UPDATE_FUNCTIONAL_BUREAUS_ERROR,
  UPDATE_FUNCTIONAL_BUREAUS_ERROR_TITLE,
  UPDATE_FUNCTIONAL_BUREAUS_SUCCESS,
  UPDATE_FUNCTIONAL_BUREAUS_SUCCESS_TITLE,
} from 'Constants/SystemMessages';
import { CancelToken } from 'axios';
import { batch } from 'react-redux';
import api from '../api';
import { toastError, toastSuccess } from './toast';
import { convertQueryToString } from '../utilities';


// ================ GET POSITIONS FOR FUNCTIONAL BUREAUS ================

export function functionalBureausErrored(bool) {
  return {
    type: 'FUNCTIONAL_BUREAUS_POSITIONS_ERRORED',
    hasErrored: bool,
  };
}

export function functionalBureausLoading(bool) {
  return {
    type: 'FUNCTIONAL_BUREAUS_POSITIONS_LOADING',
    isLoading: bool,
  };
}

export function functionalBureausSuccess(results) {
  return {
    type: 'FUNCTIONAL_BUREAUS_POSITIONS_SUCCESS',
    results,
  };
}

let cancelFunctionalBureaus;
export function functionalBureaus(query = {}) {
  return (dispatch) => {
    if (cancelFunctionalBureaus) { cancelFunctionalBureaus('cancel'); }
    batch(() => {
      dispatch(functionalBureausLoading(true));
      dispatch(functionalBureausErrored(false));
    });
    const q = convertQueryToString(query);
    const endpoint = '/fsbid/functional_bureaus/';
    const ep = `${endpoint}?${q}`;
    api().get(ep, {
      cancelToken: new CancelToken((c) => { cancelFunctionalBureaus = c; }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(functionalBureausSuccess(data));
          dispatch(functionalBureausErrored(false));
          dispatch(functionalBureausLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(functionalBureausLoading(true));
            dispatch(functionalBureausErrored(false));
          });
        } else {
          batch(() => {
            dispatch(functionalBureausSuccess({ results: [] }));
            dispatch(functionalBureausErrored(false));
            dispatch(functionalBureausLoading(false));
          });
        }
      });
  };
}

// ================ EDIT FUNCTIONAL BUREAUS FILTER SELECTIONS  ================

export function functionalBureausSelectionsSaveSuccess(result) {
  return {
    type: 'FUNCTIONAL_BUREAUS_SELECTIONS_SAVE_SUCCESS',
    result,
  };
}

export function saveFunctionalBureausSelections(queryObject) {
  return (dispatch) => dispatch(functionalBureausSelectionsSaveSuccess(queryObject));
}

// ================ EDIT FUNCTIONAL BUREAUS ================

let cancelFunctionalBureausEdit;

export function functionalBureausEdit(data, query, onSuccess) {
  return (dispatch) => {
    if (cancelFunctionalBureausEdit) {
      cancelFunctionalBureausEdit('cancel');
    }
    api()
      .put('/fsbid/functional_bureaus/edit/', data, {
        cancelToken: new CancelToken((c) => { cancelFunctionalBureausEdit = c; }),
      })
      .then(() => {
        dispatch(toastSuccess(
          UPDATE_FUNCTIONAL_BUREAUS_SUCCESS,
          UPDATE_FUNCTIONAL_BUREAUS_SUCCESS_TITLE,
        ));
        dispatch(functionalBureaus(query));
        if (onSuccess) onSuccess();
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          dispatch(toastError(
            UPDATE_FUNCTIONAL_BUREAUS_ERROR,
            UPDATE_FUNCTIONAL_BUREAUS_ERROR_TITLE,
          ));
        }
      });
  };
}
