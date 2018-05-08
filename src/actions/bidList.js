import api from '../api';
import * as SystemMessages from '../Constants/SystemMessages';

export function bidListHasErrored(bool) {
  return {
    type: 'BID_LIST_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function bidListIsLoading(bool) {
  return {
    type: 'BID_LIST_IS_LOADING',
    isLoading: bool,
  };
}

export function bidListFetchDataSuccess(results) {
  return {
    type: 'BID_LIST_FETCH_DATA_SUCCESS',
    results,
  };
}

export function bidListToggleHasErrored(bool) {
  return {
    type: 'BID_LIST_TOGGLE_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function bidListToggleIsLoading(bool) {
  return {
    type: 'BID_LIST_TOGGLE_IS_LOADING',
    isLoading: bool,
  };
}

export function bidListToggleSuccess(response) {
  return {
    type: 'BID_LIST_TOGGLE_SUCCESS',
    response,
  };
}

export function submitBidHasErrored(bool) {
  return {
    type: 'SUBMIT_BID_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function submitBidIsLoading(bool) {
  return {
    type: 'SUBMIT_BID_IS_LOADING',
    isLoading: bool,
  };
}

export function submitBidSuccess(response) {
  return {
    type: 'SUBMIT_BID_SUCCESS',
    response,
  };
}

export function acceptBidHasErrored(bool) {
  return {
    type: 'ACCEPT_BID_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function acceptBidIsLoading(bool) {
  return {
    type: 'ACCEPT_BID_IS_LOADING',
    isLoading: bool,
  };
}

export function acceptBidSuccess(response) {
  return {
    type: 'ACCEPT_BID_SUCCESS',
    response,
  };
}

export function declineBidHasErrored(bool) {
  return {
    type: 'DECLINE_BID_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function declineBidIsLoading(bool) {
  return {
    type: 'DECLINE_BID_IS_LOADING',
    isLoading: bool,
  };
}

export function declineBidSuccess(response) {
  return {
    type: 'DECLINE_BID_SUCCESS',
    response,
  };
}

// to reset state
export function routeChangeResetState() {
  return (dispatch) => {
    dispatch(bidListToggleSuccess(false));
    dispatch(bidListToggleHasErrored(false));
    dispatch(bidListToggleSuccess(false));
    dispatch(submitBidSuccess(false));
    dispatch(submitBidHasErrored(false));
    dispatch(submitBidSuccess(false));
    dispatch(acceptBidSuccess(false));
    dispatch(acceptBidHasErrored(false));
    dispatch(acceptBidSuccess(false));
    dispatch(declineBidSuccess(false));
    dispatch(declineBidHasErrored(false));
    dispatch(declineBidSuccess(false));
  };
}

export function bidListFetchData(ordering = 'draft_date') {
  return (dispatch) => {
    dispatch(bidListIsLoading(true));
    dispatch(bidListHasErrored(false));
    api.get(`/bidlist/?ordering=${ordering}`)
      .then(response => response.data)
      .then((results) => {
        dispatch(bidListHasErrored(false));
        dispatch(bidListIsLoading(false));
        dispatch(bidListFetchDataSuccess(results));
      })
      .catch(() => {
        dispatch(bidListHasErrored(true));
        dispatch(bidListIsLoading(false));
      });
  };
}

export function submitBid(id) {
  return (dispatch) => {
    const idString = id.toString();
    // reset the states to ensure only one message can be shown
    dispatch(routeChangeResetState());
    dispatch(submitBidIsLoading(true));
    dispatch(submitBidHasErrored(false));
    api.get(`/bid/${idString}/submit/`)
      .then(response => response.data)
      .then(() => {
        dispatch(submitBidHasErrored(false));
        dispatch(submitBidIsLoading(false));
        dispatch(submitBidSuccess(SystemMessages.SUBMIT_BID_SUCCESS));
        dispatch(bidListFetchData());
      })
      .catch(() => {
        dispatch(submitBidHasErrored(SystemMessages.SUBMIT_BID_ERROR));
        dispatch(submitBidIsLoading(false));
      });
  };
}

export function acceptBid(id) {
  return (dispatch) => {
    const idString = id.toString();
    // reset the states to ensure only one message can be shown
    dispatch(routeChangeResetState());
    dispatch(acceptBidIsLoading(true));
    dispatch(acceptBidHasErrored(false));
    api.get(`/bid/${idString}/accept_handshake/`)
      .then(response => response.data)
      .then(() => {
        dispatch(acceptBidHasErrored(false));
        dispatch(acceptBidIsLoading(false));
        dispatch(acceptBidSuccess(SystemMessages.ACCEPT_BID_SUCCESS));
        dispatch(bidListFetchData());
      })
      .catch(() => {
        dispatch(acceptBidHasErrored(SystemMessages.ACCEPT_BID_ERROR));
        dispatch(acceptBidIsLoading(false));
      });
  };
}

export function declineBid(id) {
  return (dispatch) => {
    const idString = id.toString();
    // reset the states to ensure only one message can be shown
    dispatch(routeChangeResetState());
    dispatch(declineBidIsLoading(true));
    dispatch(declineBidHasErrored(false));
    api.get(`/bid/${idString}/decline_handshake/`)
      .then(response => response.data)
      .then(() => {
        dispatch(declineBidHasErrored(false));
        dispatch(declineBidIsLoading(false));
        dispatch(declineBidSuccess(SystemMessages.DECLINE_BID_SUCCESS));
        dispatch(bidListFetchData());
      })
      .catch(() => {
        dispatch(declineBidHasErrored(SystemMessages.DECLINE_BID_ERROR));
        dispatch(declineBidIsLoading(false));
      });
  };
}

export function toggleBidPosition(id, remove) {
  const idString = id.toString();
  return (dispatch) => {
    // reset the states to ensure only one message can be shown
    dispatch(routeChangeResetState());
    dispatch(bidListToggleIsLoading(true));
    dispatch(bidListToggleSuccess(false));
    dispatch(bidListToggleHasErrored(false));

    const config = {
      method: remove ? 'delete' : 'put',
      url: `/bidlist/position/${idString}/`,
    };

    api(config)
      .then(() => {
        dispatch(bidListToggleSuccess(
          remove ?
            SystemMessages.DELETE_BID_ITEM_SUCCESS : SystemMessages.ADD_BID_ITEM_SUCCESS,
        ));
        dispatch(bidListToggleIsLoading(false));
        dispatch(bidListToggleHasErrored(false));
        dispatch(bidListFetchData());
      })
      .catch(() => {
        dispatch(bidListToggleHasErrored(
          remove ?
            SystemMessages.DELETE_BID_ITEM_ERROR : SystemMessages.ADD_BID_ITEM_ERROR,
        ));
        dispatch(bidListToggleIsLoading(false));
      });
  };
}
