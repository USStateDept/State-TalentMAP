import { get } from 'lodash';
import api from '../api';
import { toastSuccess, toastError } from './toast';
import { userProfilePublicFetchData } from './userProfilePublic';
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

export function clientBidListHasErrored(bool) {
  return {
    type: 'CLIENT_BID_LIST_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function clientBidListIsLoading(bool) {
  return {
    type: 'CLIENT_BID_LIST_IS_LOADING',
    isLoading: bool,
  };
}

export function clientBidListFetchDataSuccess(results) {
  return {
    type: 'CLIENT_BID_LIST_FETCH_DATA_SUCCESS',
    results,
  };
}

export function bidListToggleHasErrored(bool) {
  return {
    type: 'BID_LIST_TOGGLE_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function bidListToggleIsLoading(bool, id) {
  return {
    type: 'BID_LIST_TOGGLE_IS_LOADING',
    isLoading: { bool, id },
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

export function shouldUseClient(getState = () => {}) {
  return !!get(getState(), 'clientView.client.id');
}

export function bidListFetchData(ordering = 'draft_date') {
  return (dispatch) => {
    dispatch(bidListIsLoading(true));
    dispatch(bidListHasErrored(false));

    const endpoint = `/fsbid/bidlist/?ordering=${ordering}`;

    api().get(endpoint)
      .then(response => response.data.results)
      .then((results) => {
        dispatch(bidListFetchDataSuccess({ results }));
        dispatch(bidListHasErrored(false));
        dispatch(bidListIsLoading(false));
      })
      .catch(() => {
        dispatch(bidListHasErrored(true));
        dispatch(bidListIsLoading(false));
      });
  };
}

export function clientBidListFetchData(ordering = 'draft_date') {
  return (dispatch, getState) => {
    if (shouldUseClient(getState)) {
      const { perdet_seq_number: id } = getState().clientView.client;
      const endpoint = `/fsbid/cdo/client/${id}/?ordering=${ordering}`;

      dispatch(clientBidListIsLoading(true));
      dispatch(clientBidListHasErrored(false));

      api().get(endpoint)
        .then(response => response.data.results)
        .then((results) => {
          dispatch(clientBidListFetchDataSuccess({ results }));
          dispatch(clientBidListHasErrored(false));
          dispatch(clientBidListIsLoading(false));
        })
        .catch(() => {
          dispatch(clientBidListHasErrored(true));
          dispatch(clientBidListIsLoading(false));
        });
    }
  };
}

export function submitBid(id, clientId) {
  return (dispatch) => {
    const idString = id.toString();
    // reset the states to ensure only one message can be shown
    dispatch(routeChangeResetState());
    dispatch(submitBidIsLoading(true));
    dispatch(submitBidHasErrored(false));

    let url = `/fsbid/bidlist/position/${idString}/submit/`;

    if (clientId) {
      url = `/fsbid/cdo/position/${idString}/client/${clientId}/submit/`;
    }

    api().put(url)
      .then(response => response.data)
      .then(() => {
        dispatch(submitBidHasErrored(false));
        dispatch(submitBidIsLoading(false));
        dispatch(submitBidSuccess(SystemMessages.SUBMIT_BID_SUCCESS));
        if (clientId) {
          dispatch(userProfilePublicFetchData(clientId));
        } else {
          dispatch(bidListFetchData());
        }
      })
      .catch(() => {
        dispatch(submitBidHasErrored(SystemMessages.SUBMIT_BID_ERROR));
        dispatch(submitBidIsLoading(false));
      });
  };
}

export function acceptBid(id, clientId) {
  return (dispatch) => {
    const idString = id.toString();
    // reset the states to ensure only one message can be shown
    dispatch(routeChangeResetState());
    dispatch(acceptBidIsLoading(true));
    dispatch(acceptBidHasErrored(false));

    let url = `/bid/${idString}/accept_handshake/`;

    if (clientId) {
      url = `/fsbid/bidlist/position/${clientId}/${idString}/accept_handshake/`; /* TODO - use bid as client endpoint */
    }

    api().get(url)
      .then(response => response.data)
      .then(() => {
        dispatch(acceptBidHasErrored(false));
        dispatch(acceptBidIsLoading(false));
        dispatch(acceptBidSuccess(SystemMessages.ACCEPT_BID_SUCCESS));
        if (clientId) {
          dispatch(userProfilePublicFetchData(clientId));
        } else {
          dispatch(bidListFetchData());
        }
      })
      .catch(() => {
        dispatch(acceptBidHasErrored(SystemMessages.ACCEPT_BID_ERROR));
        dispatch(acceptBidIsLoading(false));
      });
  };
}

export function declineBid(id, clientId) {
  return (dispatch) => {
    const idString = id.toString();
    // reset the states to ensure only one message can be shown
    dispatch(routeChangeResetState());
    dispatch(declineBidIsLoading(true));
    dispatch(declineBidHasErrored(false));

    let url = `/bid/${idString}/decline_handshake/`;

    if (clientId) {
      url = `/fsbid/bidlist/position/${clientId}/${idString}/decline_handshake/`; /* TODO - use bid as client endpoint */
    }

    api().get(url)
      .then(response => response.data)
      .then(() => {
        dispatch(declineBidHasErrored(false));
        dispatch(declineBidIsLoading(false));
        dispatch(declineBidSuccess(SystemMessages.DECLINE_BID_SUCCESS));
        if (clientId) {
          dispatch(userProfilePublicFetchData(clientId));
        } else {
          dispatch(bidListFetchData());
        }
      })
      .catch(() => {
        dispatch(declineBidHasErrored(SystemMessages.DECLINE_BID_ERROR));
        dispatch(declineBidIsLoading(false));
      });
  };
}

export function toggleBidPosition(id, remove, isClient, clientId, fromTracker) {
  const idString = id.toString();
  return (dispatch, getState) => {
    // reset the states to ensure only one message can be shown
    dispatch(routeChangeResetState());
    dispatch(bidListToggleIsLoading(true, id));
    dispatch(bidListToggleSuccess(false));
    dispatch(bidListToggleHasErrored(false));

    const config = {
      method: remove ? 'delete' : 'put',
      url: `/fsbid/bidlist/position/${idString}/`,
    };

    let client;

    // using the client context
    if (isClient) {
      const { client: client$ } = getState().clientView;
      client = client$;

      config.url = `/fsbid/cdo/position/${idString}/client/${client.perdet_seq_number}/`;
    }

    // explicitly using a clientId
    if (clientId) {
      config.url = `/fsbid/cdo/position/${idString}/client/${clientId}/`;
    }

    api()(config)
      .then(() => {
        const message = remove ?
          SystemMessages.DELETE_BID_ITEM_SUCCESS :
          SystemMessages.ADD_BID_ITEM_SUCCESS({ client, hideLink: !!fromTracker });
        dispatch(bidListToggleSuccess(message));
        dispatch(toastSuccess(message));
        dispatch(bidListToggleIsLoading(false, id));
        dispatch(bidListToggleHasErrored(false));
        if (isClient || clientId) { // could be optimized to reduce duplicate calls
          dispatch(clientBidListFetchData());
          dispatch(userProfilePublicFetchData(clientId));
        } else {
          dispatch(bidListFetchData());
        }
      })
      .catch(() => {
        const message = remove ?
          SystemMessages.DELETE_BID_ITEM_ERROR : SystemMessages.ADD_BID_ITEM_ERROR;
        dispatch(bidListToggleHasErrored(message));
        dispatch(toastError(message));
        dispatch(bidListToggleIsLoading(false, id));
        if (isClient) {
          dispatch(clientBidListFetchData());
        } else {
          dispatch(bidListFetchData());
        }
      });
  };
}

export function toggleClientBidPosition(id, remove) {
  return (dispatch) => {
    dispatch(toggleBidPosition(id, remove, true));
  };
}
