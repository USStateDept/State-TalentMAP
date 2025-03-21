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

export function functionalBureausPositionsErrored(bool) {
  return {
    type: 'FUNCTIONAL_BUREAUS_POSITIONS_ERRORED',
    hasErrored: bool,
  };
}

export function functionalBureausPositionsLoading(bool) {
  return {
    type: 'FUNCTIONAL_BUREAUS_POSITIONS_LOADING',
    isLoading: bool,
  };
}

export function functionalBureausPositionsSuccess(results) {
  return {
    type: 'FUNCTIONAL_BUREAUS_POSITIONS_SUCCESS',
    results,
  };
}

let cancelFunctionalBureaus;
export function functionalBureausPositions(query = {}) {
  return (dispatch) => {
    if (cancelFunctionalBureaus) { cancelFunctionalBureaus('cancel'); }
    batch(() => {
      dispatch(functionalBureausPositionsLoading(true));
      dispatch(functionalBureausPositionsErrored(false));
    });
    const q = convertQueryToString(query);
    const endpoint = '/fsbid/functional_bureaus/';
    const ep = `${endpoint}?${q}`;
    api().get(ep, {
      cancelToken: new CancelToken((c) => { cancelFunctionalBureaus = c; }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(functionalBureausPositionsSuccess(data));
          dispatch(functionalBureausPositionsErrored(false));
          dispatch(functionalBureausPositionsLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(functionalBureausPositionsLoading(true));
            dispatch(functionalBureausPositionsErrored(false));
          });
        } else {
          batch(() => {
            dispatch(functionalBureausPositionsSuccess({ results: [] }));
            dispatch(functionalBureausPositionsErrored(false));
            dispatch(functionalBureausPositionsLoading(false));
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

export function functionalBureausEdit(data, onSuccess) {
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
