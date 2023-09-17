/* eslint-disable */
import { batch } from 'react-redux';
import {
  UPDATE_PUBLISHABLE_POSITION_ERROR,
  UPDATE_PUBLISHABLE_POSITION_ERROR_TITLE,
  UPDATE_PUBLISHABLE_POSITION_SUCCESS,
  UPDATE_PUBLISHABLE_POSITION_SUCCESS_TITLE,
} from 'Constants/SystemMessages';
import { convertQueryToString } from 'utilities';
import { toastError, toastSuccess } from './toast';
import api from '../api';

export function publishablePositionsErrored(bool) {
  /* eslint-disable no-console */
  console.log('🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳');
  console.log('🥳 current: bool:', bool);
  console.log('🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳');

  return {
    type: 'PUBLISHABLE_POSITIONS_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function publishablePositionsLoading(bool) {
  return {
    type: 'PUBLISHABLE_POSITIONS_IS_LOADING',
    isLoading: bool,
  };
}
export function publishablePositionsSuccess(results) {
  return {
    type: 'PUBLISHABLE_POSITIONS_SUCCESS',
    results,
  };
}
export function publishablePositionsFetchData(query = {}) {
  return (dispatch) => {
    batch(() => {
      dispatch(publishablePositionsLoading(true));
      dispatch(publishablePositionsErrored(false));
    });
    const q = convertQueryToString(query);
    api().get(`/fsbid/publishable_positions/?${q}`)
      .then(({ data }) => {
        batch(() => {
          dispatch(publishablePositionsSuccess(data));
          dispatch(publishablePositionsErrored(false));
          dispatch(publishablePositionsLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(publishablePositionsLoading(true));
            dispatch(publishablePositionsErrored(false));
          });
        } else {
          batch(() => {
            dispatch(publishablePositionsSuccess([]));
            dispatch(publishablePositionsErrored(true));
            dispatch(publishablePositionsLoading(false));
          });
        }
      });
  };
}


export function publishablePositionsEdit(query, data) {
  return (dispatch) => {
    batch(() => {
      dispatch(publishablePositionsErrored(false));
    });

    api().post('/fsbid/publishable_positions/edit/', data)
      .then(() => {
        const toastTitle = UPDATE_PUBLISHABLE_POSITION_SUCCESS_TITLE;
        const toastMessage = UPDATE_PUBLISHABLE_POSITION_SUCCESS;
        batch(() => {
          dispatch(toastSuccess(toastMessage, toastTitle));
          dispatch(publishablePositionsFetchData(query));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(publishablePositionsLoading(true));
            dispatch(publishablePositionsErrored(false));
          });
        } else {
          const toastTitle = UPDATE_PUBLISHABLE_POSITION_ERROR_TITLE;
          const toastMessage = UPDATE_PUBLISHABLE_POSITION_ERROR;
          dispatch(toastError(toastMessage, toastTitle));
        }
      });
  };
}


export function publishablePositionsSelections(result) {
  return {
    type: 'PUBLISHABLE_POSITIONS_SELECTIONS_SUCCESS',
    result,
  };
}
export function savePublishablePositionsSelections(queryObject) {
  return (dispatch) => dispatch(publishablePositionsSelections(queryObject));
}


export function publishablePositionsFiltersErrored(bool) {
  return {
    type: 'PUBLISHABLE_POSITIONS_FILTERS_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function publishablePositionsFiltersLoading(bool) {
  return {
    type: 'PUBLISHABLE_POSITIONS_FILTERS_IS_LOADING',
    isLoading: bool,
  };
}
export function publishablePositionsFiltersSuccess(results) {
  return {
    type: 'PUBLISHABLE_POSITIONS_FILTERS_SUCCESS',
    results,
  };
}
export function publishablePositionsFiltersFetchData() {
  /* eslint-disable no-console */
  console.log('🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈');
  console.log('🐈 current: publishablePositionsFiltersFetchData:');
  console.log('🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈');


  return (dispatch) => {
    batch(() => {
      dispatch(publishablePositionsFiltersLoading(true));
      dispatch(publishablePositionsFiltersErrored(false));
    });
    api().get('/fsbid/publishable_positions/filters/')
      .then(({ data }) => {
        batch(() => {
          dispatch(publishablePositionsErrored(false));
          dispatch(publishablePositionsLoading(false));
          dispatch(publishablePositionsFiltersSuccess(data));
          dispatch(publishablePositionsFiltersErrored(false));
          dispatch(publishablePositionsFiltersLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(publishablePositionsFiltersLoading(true));
            dispatch(publishablePositionsFiltersErrored(false));
          });
        } else {
          batch(() => {
            dispatch(publishablePositionsFiltersSuccess({}));
            dispatch(publishablePositionsFiltersErrored(true));
            dispatch(publishablePositionsFiltersLoading(false));
          });
        }
      });
  };
}

