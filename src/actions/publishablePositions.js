/* eslint-disable */
import { batch } from 'react-redux';
import {
  UPDATE_PUBLISHABLE_POSITION_ERROR,
  UPDATE_PUBLISHABLE_POSITION_ERROR_TITLE,
  UPDATE_PUBLISHABLE_POSITION_SUCCESS,
  UPDATE_PUBLISHABLE_POSITION_SUCCESS_TITLE,
} from 'Constants/SystemMessages';
import { toastError, toastSuccess } from './toast';
import api from '../api';

export function publishablePositionsErrored(bool) {
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
  /* eslint-disable no-console */
  console.log('🐙🐙🐙🐙🐙🐙🐙🐙🐙🐙');
  console.log('🐙 current: query:', query);
  console.log('🐙🐙🐙🐙🐙🐙🐙🐙🐙🐙');

  return (dispatch) => {
    batch(() => {
      dispatch(publishablePositionsLoading(true));
      dispatch(publishablePositionsErrored(false));
    });
    api().get('publishable_positions/')
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


export function publishablePositionsEdit(id, data) {
  return (dispatch) => {
    batch(() => {
      // here we are just recalling the read after
      // dispatching a toast for error or success for Edit
      dispatch(publishablePositionsEditLoading(true));
      dispatch(publishablePositionsEditErrored(false));
    });

    api().patch(`ao/${id}/publishablePosition/`, data)
      .then(() => {
        const toastTitle = UPDATE_PUBLISHABLE_POSITION_SUCCESS_TITLE;
        const toastMessage = UPDATE_PUBLISHABLE_POSITION_SUCCESS;
        batch(() => {
          dispatch(publishablePositionsEditErrored(false));
          dispatch(publishablePositionsEditSuccess(true));
          dispatch(toastSuccess(toastMessage, toastTitle));
          dispatch(publishablePositionsFetchData());
          dispatch(publishablePositionsEditLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(publishablePositionsEditLoading(true));
            dispatch(publishablePositionsEditErrored(false));
          });
        } else {
          const toastTitle = UPDATE_PUBLISHABLE_POSITION_ERROR_TITLE;
          const toastMessage = UPDATE_PUBLISHABLE_POSITION_ERROR;
          dispatch(toastError(toastMessage, toastTitle));
          batch(() => {
            dispatch(publishablePositionsEditErrored(true));
            dispatch(publishablePositionsEditLoading(false));
          });
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
  console.log('👾👾👾👾👾👾👾👾👾👾👾👾');
  console.log('👾 current: in publishablePositionsFiltersFetchData:');
  console.log('👾👾👾👾👾👾👾👾👾👾👾👾');


  return (dispatch) => {
    batch(() => {
      dispatch(publishablePositionsFiltersLoading(true));
      dispatch(publishablePositionsFiltersErrored(false));
    });
    api().get('/fsbid/publishable_positions/filters/')
      .then(({ data }) => {
        /* eslint-disable no-console */
        console.log('👾👾👾👾👾👾👾👾👾👾👾👾');
        console.log('👾 current: filter data:', data);
        console.log('👾👾👾👾👾👾👾👾👾👾👾👾');

        batch(() => {
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

