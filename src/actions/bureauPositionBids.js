import querystring from 'query-string';
import api from '../api';

export function bureauPositionBidsHasErrored(bool) {
  return {
    type: 'BUREAU_POSITION_BIDS_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function bureauPositionBidsIsLoading(bool) {
  return {
    type: 'BUREAU_POSITION_BIDS_IS_LOADING',
    isLoading: bool,
  };
}
export function bureauPositionBidsFetchDataSuccess(bids) {
  return {
    type: 'BUREAU_POSITION_BIDS_FETCH_DATA_SUCCESS',
    bids,
  };
}

export function bureauBidsFetchData(id, query = {}) {
  const q = querystring.stringify(query);
  return (dispatch) => {
    dispatch(bureauPositionBidsIsLoading(true));
    dispatch(bureauPositionBidsHasErrored(false));
    api()
      .get(`/fsbid/bureau/positions/${id}/bids/?${q}`)
      .then(({ data }) => data || [])
      .then((bids) => {
        dispatch(bureauPositionBidsFetchDataSuccess(bids));
        dispatch(bureauPositionBidsHasErrored(false));
        dispatch(bureauPositionBidsIsLoading(false));
      })
      .catch(() => {
        dispatch(bureauPositionBidsHasErrored(true));
        dispatch(bureauPositionBidsIsLoading(false));
      });
  };
}
