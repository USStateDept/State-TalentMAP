/* eslint-disable */
import { batch } from 'react-redux';
import { get } from 'lodash';
import axios from 'axios';
import { toastSuccess, toastError } from './toast';
import { ADD_TO_INTERNAL_LIST_SUCCESS_TITLE, ADD_TO_INTERNAL_LIST_SUCCESS,
  REMOVE_FROM_INTERNAL_LIST_SUCCESS_TITLE, REMOVE_FROM_INTERNAL_LIST_SUCCESS,
  INTERNAL_LIST_ERROR_TITLE, ADD_TO_INTERNAL_LIST_ERROR,
  REMOVE_FROM_INTERNAL_LIST_ERROR,
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


export function availableBiddersFetchData(limit = 15, page = 1, sortType) {
  return (dispatch) => {
    batch(() => {
      dispatch(availableBiddersFetchDataLoading(true));
      dispatch(availableBiddersFetchDataErrored(false));
    });

    api().get(`cdo/availablebidders/?limit=${limit}&page=${page}&ordering=${sortType}`)
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
  console.log(
    '%c1',
    'color:red;font-family:system-ui;font-size:2rem;-webkit-text-stroke: 1px black;font-weight:bold',
  );
  return (dispatch) => {
    const config = {
      method: remove ? 'delete' : 'put',
      url: `cdo/${id}/availablebidders/`,
    };
    const getAction = () => api()(config);

    batch(() => {
      dispatch(availableBiddersToggleUserIsLoading(true));
      dispatch(availableBiddersToggleUserErrored(false));
    });

    axios.all([getAction()])
      .then(() => {
        const toastTitle = remove ? REMOVE_FROM_INTERNAL_LIST_SUCCESS_TITLE
          : ADD_TO_INTERNAL_LIST_SUCCESS_TITLE;
        const toastMessage = remove ? REMOVE_FROM_INTERNAL_LIST_SUCCESS
          : ADD_TO_INTERNAL_LIST_SUCCESS;
        batch(() => {
          dispatch(toastSuccess(toastMessage, toastTitle));
          dispatch(availableBiddersToggleUserErrored(false));
          dispatch(availableBiddersToggleUserIsLoading(false));
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
