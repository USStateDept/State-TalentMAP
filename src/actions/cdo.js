import { batch } from 'react-redux';
import { get } from 'lodash';
import { toastSuccess, toastError } from './toast';
import { ADD_TO_INTERNAL_LIST_SUCCESS_TITLE, ADD_TO_INTERNAL_LIST_SUCCESS,
  REMOVE_FROM_INTERNAL_LIST_SUCCESS_TITLE, REMOVE_FROM_INTERNAL_LIST_SUCCESS,
  INTERNAL_LIST_ERROR_TITLE, ADD_TO_INTERNAL_LIST_ERROR,
  REMOVE_FROM_INTERNAL_LIST_ERROR,
  GENERIC_SUCCESS,
} from '../Constants/SystemMessages';
import api from '../api';

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
export function availableBiddersIds() {
  return (dispatch) => {
    batch(() => {
      dispatch(availableBiddersIdsLoading(true));
      dispatch(availableBiddersIdsErrored(false));
    });

    api().get('cdo/availablebidders/ids/')
      .then(({ data }) => {
        batch(() => {
          dispatch(availableBiddersIdsSuccess(data.map(Number)));
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

export function availableBiddersFetchData(limit = 15, page = 1, sortType) {
  return (dispatch) => {
    batch(() => {
      dispatch(availableBiddersFetchDataLoading(true));
      dispatch(availableBiddersFetchDataErrored(false));
    });

    api().get(`cdo/availablebidders/?limit=${limit}&page=${page}${sortType ? `&ordering=${sortType}` : ''}`)
      .then(({ data }) => {
        batch(() => {
          dispatch(availableBiddersFetchDataSuccess(data));
          dispatch(availableBiddersFetchDataErrored(false));
          dispatch(availableBiddersFetchDataLoading(false));
          dispatch(availableBiddersIds());
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
            dispatch(availableBiddersFetchDataSuccess([]));
            dispatch(availableBiddersFetchDataErrored(true));
            dispatch(availableBiddersFetchDataLoading(false));
          });
        }
      });
  };
}

export function availableBiddersToggleUser(id, remove) {
  return (dispatch) => {
    const config = {
      method: remove ? 'delete' : 'put',
      url: `cdo/${id}/availablebidders/`,
    };

    batch(() => {
      dispatch(availableBiddersToggleUserIsLoading(true));
      dispatch(availableBiddersToggleUserErrored(false));
    });

    api()(config)
      .then(() => {
        const toastTitle = remove ? REMOVE_FROM_INTERNAL_LIST_SUCCESS_TITLE
          : ADD_TO_INTERNAL_LIST_SUCCESS_TITLE;
        // TODO: update this path during integration of Available Bidders
        const toastMessage = remove ? REMOVE_FROM_INTERNAL_LIST_SUCCESS
          : GENERIC_SUCCESS(ADD_TO_INTERNAL_LIST_SUCCESS, { path: '/profile/notifications', text: 'Go To Available Bidders' });
        batch(() => {
          dispatch(toastSuccess(toastMessage, toastTitle));
          dispatch(availableBiddersToggleUserErrored(false));
          dispatch(availableBiddersToggleUserIsLoading(false));
          dispatch(availableBiddersIds());
        });
      })
      .catch(() => {
        const toastTitle = INTERNAL_LIST_ERROR_TITLE;
        const toastMessage = remove ? REMOVE_FROM_INTERNAL_LIST_ERROR
          : ADD_TO_INTERNAL_LIST_ERROR;
        dispatch(toastError(toastMessage, toastTitle));
        batch(() => {
          dispatch(availableBiddersToggleUserErrored(true));
          dispatch(availableBiddersToggleUserIsLoading(false));
        });
      });
  };
}
