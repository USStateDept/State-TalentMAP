import api from '../api';

export const BIDDER_CLASSIFICATIONS_HAS_ERRORED = 'BIDDER_CLASSIFICATION_HAS_ERRORED';
export const BIDDER_CLASSIFICATIONS_IS_LOADING = 'BIDDER_CLASSIFICATIONS_IS_LOADING';
export const BIDDER_CLASSIFICATIONS_FETCH_DATA_SUCCESS = 'BIDDER_CLASSIFICATIONS_FETCH_DATA_SUCCESS';

export function bidderClassificationsHasErrored(bool) {
  return {
    type: BIDDER_CLASSIFICATIONS_HAS_ERRORED,
    hasErrored: bool,
  };
}

export function bidderClassificationsIsLoading(bool) {
  return {
    type: BIDDER_CLASSIFICATIONS_IS_LOADING,
    isLoading: bool,
  };
}

export function bidderClassificationsFetchDataSuccess(classifications) {
  return {
    type: BIDDER_CLASSIFICATIONS_FETCH_DATA_SUCCESS,
    classifications,
  };
}

export function fetchBidderClassifications(id) {
  return (dispatch) => {
    dispatch(bidderClassificationsIsLoading(true));
    dispatch(bidderClassificationsHasErrored(false));

    api()
      .get(`/fsbid/bidderTrackingPrograms/${id}`)
      .then(({ data }) => {
        dispatch(bidderClassificationsHasErrored(false));
        dispatch(bidderClassificationsIsLoading(false));
        dispatch(bidderClassificationsFetchDataSuccess(data));
      })
      .catch(() => {
        dispatch(bidderClassificationsHasErrored(true));
        dispatch(bidderClassificationsIsLoading(false));
      });
  };
}

