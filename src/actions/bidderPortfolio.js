import { stringify } from 'query-string';
import { get } from 'lodash';
import api from '../api';

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

export function lastBidderPortfolioHasErrored(bool) {
  return {
    type: 'LAST_BIDDER_PORTFOLIO_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function lastBidderPortfolioIsLoading(bool) {
  return {
    type: 'LAST_BIDDER_PORTFOLIO_IS_LOADING',
    isLoading: bool,
  };
}
export function lastBidderPortfolioFetchDataSuccess(results) {
  return {
    type: 'LAST_BIDDER_PORTFOLIO_FETCH_DATA_SUCCESS',
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

export function bidderPortfolioCDOsHasErrored(bool) {
  return {
    type: 'BIDDER_PORTFOLIO_CDOS_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function bidderPortfolioCDOsIsLoading(bool) {
  return {
    type: 'BIDDER_PORTFOLIO_CDOS_IS_LOADING',
    isLoading: bool,
  };
}
export function bidderPortfolioCDOsFetchDataSuccess(data) {
  return {
    type: 'BIDDER_PORTFOLIO_CDOS_FETCH_DATA_SUCCESS',
    data,
  };
}

export function bidderPortfolioSelectCDO(data) {
  return {
    type: 'BIDDER_PORTFOLIO_SELECTED_CDO',
    data,
  };
}

export function bidderPortfolioLastQuery(query, count) {
  return {
    type: 'SET_BIDDER_PORTFOLIO_LAST_QUERY',
    query,
    count,
  };
}

export function bidderPortfolioCDOsFetchData() {
  return (dispatch, getState) => {
    const cdos = get(getState(), 'bidderPortfolioCDOs', []);
    if (!cdos.length) {
      dispatch(bidderPortfolioCDOsIsLoading(true));
      dispatch(bidderPortfolioCDOsHasErrored(false));
      api().get('/client/statistics/')
        .then(() => {
          const data = [
            { first_name: 'Bob', last_name: 'Smith', id: 1 },
            { first_name: 'Mike', last_name: 'Jones', id: 2 },
            { first_name: 'John', last_name: 'Daniels', id: 3 },
            { first_name: 'Mary', last_name: 'Brown', id: 4 },
            { first_name: 'Elizabeth', last_name: 'Walters', id: 5 },
            { first_name: 'Maria', last_name: 'Smith', id: 6 },
            { first_name: 'Daniel', last_name: 'Garcia', id: 7 },
            { first_name: 'Marcus', last_name: 'Johnson', id: 8 },
            { first_name: 'Jennifer', last_name: 'McAndrew', id: 9 },
            { first_name: 'Madeline', last_name: 'Lee', id: 10 },
            { first_name: 'Leah', last_name: 'Shadtrach', id: 11, isCurrentUser: true },
          ];
          dispatch(bidderPortfolioCDOsFetchDataSuccess(data));
          if (!getState().bidderPortfolioSelectedCDO.id) {
            dispatch(bidderPortfolioSelectCDO(data.find(f => f.isCurrentUser)) || {});
          }
          dispatch(bidderPortfolioCDOsHasErrored(false));
          dispatch(bidderPortfolioCDOsIsLoading(false));
        })
        .catch(() => {
          dispatch(bidderPortfolioCDOsHasErrored(true));
          dispatch(bidderPortfolioCDOsIsLoading(false));
        });
    }
  };
}

export function bidderPortfolioCountsFetchData() {
  return (dispatch, getState) => {
    const state = getState();
    const id = get(state, 'bidderPortfolioSelectedCDO.id');
    const isCurrentUser = get(state, 'bidderPortfolioSelectedCDO.isCurrentUser');
    const endpoint = isCurrentUser || !id ? '/client/statistics/' : `/client/${id}/statistics/`;

    dispatch(bidderPortfolioCountsIsLoading(true));
    dispatch(bidderPortfolioCountsHasErrored(false));
    api().get(endpoint)
      .then(({ data }) => {
        dispatch(bidderPortfolioCountsHasErrored(false));
        dispatch(bidderPortfolioCountsIsLoading(false));
        dispatch(bidderPortfolioCountsFetchDataSuccess(data));
      })
      .catch(() => {
        dispatch(bidderPortfolioCountsFetchDataSuccess({}));
        dispatch(bidderPortfolioCountsHasErrored(true));
        dispatch(bidderPortfolioCountsIsLoading(false));
      });
  };
}

export function bidderPortfolioFetchData(query = {}) {
  return (dispatch, getState) => {
    const state = getState();
    const id = get(state, 'bidderPortfolioSelectedCDO.id');
    const isCurrentUser = get(state, 'bidderPortfolioSelectedCDO.isCurrentUser');
    const query$ = { ...query };
    const query$$ = stringify(query$);
    const endpoint = isCurrentUser || !id ? '/client/' : `/client/${id}/`;
    const q = `${endpoint}?${query$$}`;
    dispatch(bidderPortfolioIsLoading(true));
    dispatch(bidderPortfolioHasErrored(false));
    api().get(q)
      .then(({ data }) => {
        dispatch(bidderPortfolioLastQuery(query$$, data.count, endpoint));
        dispatch(bidderPortfolioHasErrored(false));
        dispatch(bidderPortfolioIsLoading(false));
        dispatch(bidderPortfolioFetchDataSuccess(data));
      })
      .catch(() => {
        dispatch(bidderPortfolioFetchDataSuccess({ results: [] }));
        dispatch(bidderPortfolioHasErrored(true));
        dispatch(bidderPortfolioIsLoading(false));
      });
  };
}

export function bidderPortfolioFetchDataFromLastQuery() {
  return (dispatch, getState) => {
    dispatch(lastBidderPortfolioIsLoading(true));
    dispatch(lastBidderPortfolioHasErrored(false));
    const q = getState().bidderPortfolioLastQuery;
    api().get(q)
      .then(({ data }) => {
        dispatch(lastBidderPortfolioFetchDataSuccess(data));
        dispatch(lastBidderPortfolioHasErrored(false));
        dispatch(lastBidderPortfolioIsLoading(false));
      })
      .catch(() => {
        dispatch(lastBidderPortfolioHasErrored(true));
        dispatch(lastBidderPortfolioIsLoading(false));
      });
  };
}
