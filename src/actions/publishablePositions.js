import { batch } from 'react-redux';
import {
  UPDATE_PUBLISHABLE_POSITION_ERROR,
  UPDATE_PUBLISHABLE_POSITION_ERROR_TITLE,
  UPDATE_PUBLISHABLE_POSITION_SUCCESS,
  UPDATE_PUBLISHABLE_POSITION_SUCCESS_TITLE,
} from 'Constants/SystemMessages';
import { toastError, toastSuccess } from './toast';
import api from '../api';

export function publishablePositionsFetchDataErrored(bool) {
  return {
    type: 'PUBLISHABLE_POSITIONS_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function publishablePositionsFetchDataLoading(bool) {
  return {
    type: 'PUBLISHABLE_POSITIONS_FETCH_IS_LOADING',
    isLoading: bool,
  };
}

export function publishablePositionsFetchDataSuccess(results) {
  return {
    type: 'PUBLISHABLE_POSITIONS_FETCH_SUCCESS',
    results,
  };
}

export function publishablePositionsFetchData(query = {}) {
  /* eslint-disable no-console */
  console.log('🐙🐙🐙🐙🐙🐙🐙🐙🐙🐙');
  console.log('🐙 current: query:', query);
  console.log('🐙🐙🐙🐙🐙🐙🐙🐙🐙🐙');

  return (dispatch) => {
    batch(() => {
      dispatch(publishablePositionsFetchDataLoading(true));
      dispatch(publishablePositionsFetchDataErrored(false));
    });
    api().get('publishable_positions/')
      .then(({ data }) => {
        batch(() => {
          dispatch(publishablePositionsFetchDataSuccess(data));
          dispatch(publishablePositionsFetchDataErrored(false));
          dispatch(publishablePositionsFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(publishablePositionsFetchDataLoading(true));
            dispatch(publishablePositionsFetchDataErrored(false));
          });
        } else {
          batch(() => {
            dispatch(publishablePositionsFetchDataSuccess([]));
            dispatch(publishablePositionsFetchDataErrored(true));
            dispatch(publishablePositionsFetchDataLoading(false));
          });
        }
      });
  };
}


export function publishablePositionEditErrored(bool) {
  return {
    type: 'PUBLISHABLE_POSITION_EDIT_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function publishablePositionEditLoading(bool) {
  return {
    type: 'PUBLISHABLE_POSITION_EDIT_IS_LOADING',
    isLoading: bool,
  };
}

export function publishablePositionEditSuccess(success) {
  return {
    type: 'PUBLISHABLE_POSITION_EDIT_SUCCESS',
    success,
  };
}

export function publishablePositionEdit(id, data) {
  return (dispatch) => {
    batch(() => {
      dispatch(publishablePositionEditLoading(true));
      dispatch(publishablePositionEditErrored(false));
    });

    api().patch(`ao/${id}/publishablePosition/`, data)
      .then(() => {
        const toastTitle = UPDATE_PUBLISHABLE_POSITION_SUCCESS_TITLE;
        const toastMessage = UPDATE_PUBLISHABLE_POSITION_SUCCESS;
        batch(() => {
          dispatch(publishablePositionEditErrored(false));
          dispatch(publishablePositionEditSuccess(true));
          dispatch(toastSuccess(toastMessage, toastTitle));
          dispatch(publishablePositionsFetchData());
          dispatch(publishablePositionEditLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(publishablePositionEditLoading(true));
            dispatch(publishablePositionEditErrored(false));
          });
        } else {
          const toastTitle = UPDATE_PUBLISHABLE_POSITION_ERROR_TITLE;
          const toastMessage = UPDATE_PUBLISHABLE_POSITION_ERROR;
          dispatch(toastError(toastMessage, toastTitle));
          batch(() => {
            dispatch(publishablePositionEditErrored(true));
            dispatch(publishablePositionEditLoading(false));
          });
        }
      });
  };
}


export function publishablePositionsSelectionsSuccess(result) {
  return {
    type: 'PUBLISHABLE_POSITIONS_SELECTIONS_SUCCESS',
    result,
  };
}

export function savePublishablePositionsSelections(queryObject) {
  return (dispatch) => dispatch(publishablePositionsSelectionsSuccess(queryObject));
}

export function publishablePositionsFiltersFetchDataErrored(bool) {
  return {
    type: 'PUBLISHABLE_POSITIONS_FILTERS_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function publishablePositionsFiltersFetchDataLoading(bool) {
  return {
    type: 'PUBLISHABLE_POSITIONS_FILTERS_FETCH_IS_LOADING',
    isLoading: bool,
  };
}

export function publishablePositionsFiltersFetchDataSuccess(results) {
  return {
    type: 'PUBLISHABLE_POSITIONS_FILTERS_FETCH_SUCCESS',
    results,
  };
}

export function publishablePositionsFiltersFetchData() {
  return (dispatch) => {
    batch(() => {
      dispatch(publishablePositionsFiltersFetchDataSuccess({}));
      dispatch(publishablePositionsFiltersFetchDataLoading(false));
    });
  };
}
