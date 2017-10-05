import axios from 'axios';
import api from '../api';
import { fetchUserToken } from '../utilities';

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

export function bidListFetchData() {
  return (dispatch) => {
    dispatch(bidListIsLoading(true));
    dispatch(bidListHasErrored(false));
    axios.get(`${api}/bidlist/`, { headers: { Authorization: fetchUserToken() } })
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

export function toggleBidPosition(id, remove) {
  const idString = id.toString();
  return (dispatch) => {
    dispatch(bidListToggleIsLoading(true));
    dispatch(bidListToggleHasErrored(false));
    let action = 'put';
    if (remove) {
      action = 'delete';
    }
    const auth = { headers: { Authorization: fetchUserToken() } };
    // Now we can patch our profile with the new favorites.
    // Axios is a little weird here in that for PUTs, it expects a body as the second argument,
    // whereas for DELETEs, it expects the headers object...
    // so we have to conditionally decide what position to put the headers object in.
    const firstArg = action === 'delete' ? auth : {};
    const secondArg = action === 'put' ? auth : null;
    axios[action](`${api}/bidlist/position/${idString}/`, firstArg, secondArg)
            .then(() => {
              dispatch(bidListToggleSuccess(true));
              dispatch(bidListToggleIsLoading(false));
              dispatch(bidListToggleHasErrored(false));
              dispatch(bidListFetchData());
            })
            .catch(() => {
              dispatch(bidListToggleHasErrored(true));
              dispatch(bidListToggleIsLoading(false));
            });
  };
}
