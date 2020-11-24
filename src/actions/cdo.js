import { batch } from 'react-redux';
import { get } from 'lodash';
import { CancelToken } from 'axios';
import { toastSuccess, toastError } from './toast';
import { ADD_TO_INTERNAL_LIST_SUCCESS_TITLE, ADD_TO_INTERNAL_LIST_SUCCESS,
  REMOVE_FROM_INTERNAL_LIST_SUCCESS_TITLE, REMOVE_FROM_INTERNAL_LIST_SUCCESS,
  INTERNAL_LIST_ERROR_TITLE, ADD_TO_INTERNAL_LIST_ERROR,
  REMOVE_FROM_INTERNAL_LIST_ERROR,
} from '../Constants/SystemMessages';
import api from '../api';

let cancel;

export function availableBiddersFetchDataErrored(bool) {
  return {
    type: 'AVAILABLE_BIDDERS_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function availableBiddersFetchDataLoading(bool) {
  return {
    type: 'AVAILABLE_BIDDERS_FETCH_IS_LOADING',
    isLoading: bool,
  };
}

export function availableBiddersFetchDataSuccess(results) {
  return {
    type: 'AVAILABLE_BIDDERS_FETCH_SUCCESS',
    results,
  };
}

export function availableBiddersIdsErrored(bool) {
  return {
    type: 'AVAILABLE_BIDDERS_IDS_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function availableBiddersIdsLoading(bool) {
  return {
    type: 'AVAILABLE_BIDDERS_IDS_IS_LOADING',
    isLoading: bool,
  };
}

export function availableBiddersIdsSuccess(results) {
  return {
    type: 'AVAILABLE_BIDDERS_IDS_SUCCESS',
    results,
  };
}

export function availableBiddersToggleUserErrored(bool) {
  return {
    type: 'TOGGLE_AVAILABLE_BIDDERS_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function availableBiddersToggleUserIsLoading(bool) {
  return {
    type: 'TOGGLE_AVAILABLE_BIDDERS_IS_LOADING',
    isLoading: bool,
  };
}

export function availableBiddersToggleUserSuccess(results) {
  return {
    type: 'TOGGLE_AVAILABLE_BIDDERS_SUCCESS',
    results,
  };
}

export function availableBiddersFetchData(limit = 15, page = 1) {
  return (dispatch) => {
    batch(() => {
      dispatch(availableBiddersFetchDataLoading(true));
      dispatch(availableBiddersFetchDataErrored(false));
    });

    api().get('cdo/availablebidders/')
      .then(({ data }) => {
        batch(() => {
          dispatch(availableBiddersFetchDataSuccess(data));
          dispatch(availableBiddersFetchDataErrored(false));
          dispatch(availableBiddersFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (get(err, 'message') === 'cancel') {
          batch(() => {
            dispatch(availableBiddersFetchDataErrored(false));
            dispatch(availableBiddersFetchDataLoading(true));
          });
        } else {
          batch(() => {
            dispatch(availableBiddersFetchDataSuccess({ results: [] }));
            dispatch(availableBiddersFetchDataErrored(true));
            dispatch(availableBiddersFetchDataLoading(false));
          });
        }
      });
  };
}

export function availableBiddersIds() {
  return (dispatch) => {
    batch(() => {
      dispatch(availableBiddersIdsLoading(true));
      dispatch(availableBiddersIdsErrored(false));
    });

    api().get('cdo/availablebidders/ids/')
      .then(({ data }) => {
        batch(() => {
          dispatch(availableBiddersIdsSuccess(data));
          dispatch(availableBiddersIdsErrored(false));
          dispatch(availableBiddersIdsLoading(false));
        });
      })
      .catch((err) => {
        if (get(err, 'message') === 'cancel') {
          batch(() => {
            dispatch(availableBiddersIdsErrored(false));
            dispatch(availableBiddersIdsLoading(true));
          });
        } else {
          batch(() => {
            dispatch(availableBiddersIdsSuccess({ results: [] }));
            dispatch(availableBiddersIdsErrored(true));
            dispatch(availableBiddersIdsLoading(false));
          });
        }
      });
  };
}

export function availableBiddersToggleUser(id, remove) {
  const config = {
    method: remove ? 'delete' : 'put',
    url: `cdo/${id}/availablebidders/`,
  };
  const getAction = () => api()(config);

  return (dispatch) => {
    if (cancel) { cancel('cancel'); dispatch(availableBiddersToggleUserIsLoading(true)); }
    batch(() => {
      dispatch(availableBiddersToggleUserIsLoading(true));
      dispatch(availableBiddersToggleUserErrored(false));
    });

    api().get(getAction(), {
      cancelToken: new CancelToken((c) => { cancel = c; }),
    })
      .then(({ data }) => {
        batch(() => {
          const toastTitle = remove ? REMOVE_FROM_INTERNAL_LIST_SUCCESS_TITLE
            : ADD_TO_INTERNAL_LIST_SUCCESS_TITLE;
          const toastMessage = remove ? REMOVE_FROM_INTERNAL_LIST_SUCCESS
            : ADD_TO_INTERNAL_LIST_SUCCESS;
          dispatch(toastSuccess(toastMessage, toastTitle));
          dispatch(availableBiddersToggleUserSuccess(data));
          dispatch(availableBiddersToggleUserErrored(false));
          dispatch(availableBiddersToggleUserIsLoading(false));
        });
      })
      .catch((err) => {
        const toastTitle = INTERNAL_LIST_ERROR_TITLE;
        const toastMessage = remove ? REMOVE_FROM_INTERNAL_LIST_ERROR
          : ADD_TO_INTERNAL_LIST_ERROR;
        dispatch(toastError(toastMessage, toastTitle));
        if (get(err, 'message') === 'cancel') {
          batch(() => {
            dispatch(availableBiddersToggleUserErrored(false));
            dispatch(availableBiddersToggleUserIsLoading(true));
          });
        } else {
          batch(() => {
            dispatch(availableBiddersToggleUserSuccess({ results: [] }));
            dispatch(availableBiddersToggleUserErrored(true));
            dispatch(availableBiddersToggleUserIsLoading(false));
          });
        }
      });
  };
}
