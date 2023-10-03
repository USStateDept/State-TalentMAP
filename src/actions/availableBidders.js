import { batch } from 'react-redux';
import { get } from 'lodash';
import { ADD_TO_INTERNAL_LIST_ERROR, ADD_TO_INTERNAL_LIST_SUCCESS,
  ADD_TO_INTERNAL_LIST_SUCCESS_TITLE, GENERIC_SUCCESS,
  INTERNAL_LIST_ERROR_TITLE, REMOVE_FROM_INTERNAL_LIST_ERROR,
  REMOVE_FROM_INTERNAL_LIST_SUCCESS,
  REMOVE_FROM_INTERNAL_LIST_SUCCESS_TITLE, UPDATE_AVAILABLE_BIDDER_ERROR,
  UPDATE_AVAILABLE_BIDDER_ERROR_TITLE, UPDATE_AVAILABLE_BIDDER_SUCCESS,
  UPDATE_AVAILABLE_BIDDER_SUCCESS_TITLE,
} from 'Constants/SystemMessages';
import { downloadFromResponse, formatDate } from 'utilities';
import { toastError, toastSuccess } from './toast';
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

export function availableBidderEditDataErrored(bool) {
  return {
    type: 'AVAILABLE_BIDDER_EDIT_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function availableBidderEditDataLoading(bool) {
  return {
    type: 'AVAILABLE_BIDDER_EDIT_IS_LOADING',
    isLoading: bool,
  };
}

export function availableBidderEditDataSuccess(success) {
  return {
    type: 'AVAILABLE_BIDDER_EDIT_SUCCESS',
    success,
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
            dispatch(availableBiddersIdsSuccess([]));
            dispatch(availableBiddersIdsErrored(true));
            dispatch(availableBiddersIdsLoading(false));
          });
        }
      });
  };
}

export function availableBiddersFetchData(isCDO, sortType = 'Name') {
  return (dispatch) => {
    batch(() => {
      dispatch(availableBiddersFetchDataLoading(true));
      dispatch(availableBiddersFetchDataErrored(false));
    });
    api().get(`${isCDO ? 'cdo' : 'bureau'}/availablebidders/?ordering=${sortType}`)
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

export function availableBiddersToggleUser(id, remove, refresh = false, sortType = 'Name') {
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
        const toastMessage = remove ? REMOVE_FROM_INTERNAL_LIST_SUCCESS
          : GENERIC_SUCCESS(ADD_TO_INTERNAL_LIST_SUCCESS, { path: '/profile/cdo/availablebidders', text: 'Go To Available Bidders' });
        batch(() => {
          dispatch(toastSuccess(toastMessage, toastTitle));
          dispatch(availableBiddersToggleUserErrored(false));
          dispatch(availableBiddersToggleUserIsLoading(false));
          dispatch(availableBiddersIds());
          if (refresh) {
            dispatch(availableBiddersFetchData(true, sortType));
          }
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

export function availableBidderEditData(id, data, sortType = 'Name') {
  return (dispatch) => {
    batch(() => {
      dispatch(availableBidderEditDataLoading(true));
      dispatch(availableBidderEditDataErrored(false));
    });

    api().patch(`cdo/${id}/availablebidders/`, data)
      .then(() => {
        const toastTitle = UPDATE_AVAILABLE_BIDDER_SUCCESS_TITLE;
        const toastMessage = UPDATE_AVAILABLE_BIDDER_SUCCESS;
        batch(() => {
          dispatch(availableBidderEditDataErrored(false));
          dispatch(availableBidderEditDataLoading(false));
          dispatch(availableBidderEditDataSuccess(true));
          dispatch(toastSuccess(toastMessage, toastTitle));
          dispatch(availableBiddersFetchData(true, sortType));
        });
      })
      .catch((err) => {
        if (get(err, 'message') === 'cancel') {
          batch(() => {
            dispatch(availableBidderEditDataErrored(false));
            dispatch(availableBidderEditDataLoading(true));
          });
        } else {
          const toastTitle = UPDATE_AVAILABLE_BIDDER_ERROR_TITLE;
          const toastMessage = UPDATE_AVAILABLE_BIDDER_ERROR;
          dispatch(toastError(toastMessage, toastTitle));
          batch(() => {
            dispatch(availableBidderEditDataErrored(true));
            dispatch(availableBidderEditDataLoading(false));
          });
        }
      });
  };
}

export function availableBidderExport(isInternalCDAView, isSort = 'Name') {
  return api()
    .get(`${isInternalCDAView ? '/cdo' : '/bureau'}/availablebidders/export/?ordering=${isSort}`)
    .then((response) => {
      downloadFromResponse(response, `Available_Bidders_${formatDate(new Date().getTime(), 'YYYY_M_D_Hms')}`);
    });
}
