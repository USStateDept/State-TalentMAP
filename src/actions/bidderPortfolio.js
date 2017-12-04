import axios from 'axios';
import api from '../api';
import { fetchUserToken } from '../utilities';

export function bidderPortfolioHasErrored(bool) {
  return {
    type: 'BIDDER_PORTFOLIO_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function bidderPortfolioIsLoading(bool) {
  return {
    type: 'BIDDER_PORTFOLIO_IS_LOADING',
    isLoading: bool,
  };
}
export function bidderPortfolioFetchDataSuccess(results) {
  return {
    type: 'BIDDER_PORTFOLIO_FETCH_DATA_SUCCESS',
    results,
  };
}

export function bidderPortfolioCountsHasErrored(bool) {
  return {
    type: 'BIDDER_PORTFOLIO_COUNTS_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function bidderPortfolioCountsIsLoading(bool) {
  return {
    type: 'BIDDER_PORTFOLIO_COUNTS_IS_LOADING',
    isLoading: bool,
  };
}
export function bidderPortfolioCountsFetchDataSuccess(counts) {
  return {
    type: 'BIDDER_PORTFOLIO_COUNTS_FETCH_DATA_SUCCESS',
    counts,
  };
}

export function bidderPortfolioCountsFetchData() {
  return (dispatch) => {
    dispatch(bidderPortfolioCountsIsLoading(true));
    dispatch(bidderPortfolioCountsHasErrored(false));
    axios.get(`${api}/client/statistics/`, { headers: { Authorization: fetchUserToken() } })
            .then(({ data }) => {
              dispatch(bidderPortfolioCountsHasErrored(false));
              dispatch(bidderPortfolioCountsIsLoading(false));
              dispatch(bidderPortfolioCountsFetchDataSuccess(data));
            })
            .catch(() => {
              dispatch(bidderPortfolioCountsHasErrored(true));
              dispatch(bidderPortfolioCountsIsLoading(false));
            });
  };
}

export function bidderPortfolioFetchData(query = '') {
  return (dispatch) => {
    dispatch(bidderPortfolioIsLoading(true));
    dispatch(bidderPortfolioHasErrored(false));
    axios.get(`${api}/client/?${query}`, { headers: { Authorization: fetchUserToken() } })
            .then(({ data }) => {
              dispatch(bidderPortfolioHasErrored(false));
              dispatch(bidderPortfolioIsLoading(false));
              dispatch(bidderPortfolioFetchDataSuccess(data));
            })
            .catch(() => {
              dispatch(bidderPortfolioHasErrored(true));
              dispatch(bidderPortfolioIsLoading(false));
            });
  };
}
