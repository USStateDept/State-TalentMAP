import { stringify } from 'query-string';
import { find, get, isArray, join, replace } from 'lodash';
import { CancelToken } from 'axios';
import { downloadFromResponse } from 'utilities';
import api from '../api';

let cancelCDOs;
let cancelPortfolio;

export function bidderPortfolioSelectedSeasons(arr = []) {
  return {
    type: 'BIDDER_PORTFOLIO_SELECTED_SEASONS',
    data: arr,
  };
}
export function bidderPortfolioSeasonsHasErrored(bool) {
  return {
    type: 'BIDDER_PORTFOLIO_SEASONS_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function bidderPortfolioSeasonsIsLoading(bool) {
  return {
    type: 'BIDDER_PORTFOLIO_SEASONS_IS_LOADING',
    isLoading: bool,
  };
}
export function bidderPortfolioSeasonsSuccess(results) {
  return {
    type: 'BIDDER_PORTFOLIO_SEASONS_SUCCESS',
    results,
  };
}

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

export function bidderPortfolioSelectCDOsToSearchBy(data) {
  return {
    type: 'BIDDER_PORTFOLIO_SELECTED_CDOS_TO_SEARCH_BY',
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

export function bidderPortfolioSetSeasons(seasons = []) {
  return (dispatch) => {
    dispatch(bidderPortfolioSelectedSeasons(seasons));
  };
}

export function bidderPortfolioSeasonsFetchData() {
  return (dispatch) => {
    dispatch(bidderPortfolioSeasonsIsLoading(true));
    dispatch(bidderPortfolioSeasonsHasErrored(false));
    const endpoint = '/fsbid/bid_seasons/';
    api().get(endpoint)
      .then(({ data }) => {
        dispatch(bidderPortfolioSeasonsSuccess(data));
        dispatch(bidderPortfolioSeasonsHasErrored(false));
        dispatch(bidderPortfolioSeasonsIsLoading(false));
      })
      .catch(() => {
        dispatch(bidderPortfolioSeasonsSuccess([]));
        dispatch(bidderPortfolioSeasonsHasErrored(true));
        dispatch(bidderPortfolioSeasonsIsLoading(false));
      });
  };
}

export function lookupAndSetCDO(id) {
  return (dispatch, getState) => {
    const cdo = find(get(getState(), 'bidderPortfolioCDOs', []), f => f.hru_id === id);
    if (cdo) {
      dispatch(bidderPortfolioSelectCDO(cdo));
    }
  };
}

export function bidderPortfolioCountsFetchData() {
  return (dispatch, getState) => {
    dispatch(bidderPortfolioCountsIsLoading(true));
    dispatch(bidderPortfolioCountsHasErrored(false));
    const state = getState();
    const id = get(state, 'bidderPortfolioSelectedCDO.hru_id');
    const isCurrentUser = get(state, 'bidderPortfolioSelectedCDO.isCurrentUser');
    let endpoint = isCurrentUser || !id ? '/client/statistics/' : `/client/${id}/statistics/`;
    endpoint = '/client/statistics/'; // TODO update
    api().get(endpoint)
      .then(({ data }) => {
        dispatch(bidderPortfolioCountsFetchDataSuccess(data));
        dispatch(bidderPortfolioCountsHasErrored(false));
        dispatch(bidderPortfolioCountsIsLoading(false));
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
    if (cancelPortfolio) { cancelPortfolio('cancel'); }
    dispatch(bidderPortfolioIsLoading(true));
    dispatch(bidderPortfolioHasErrored(false));
    const state = getState();
    const cdos = get(state, 'bidderPortfolioSelectedCDOsToSearchBy', []);
    const ids = cdos.map(m => m.hru_id).filter(f => f);
    const seasons = get(state, 'bidderPortfolioSelectedSeasons', []);
    const query$ = { ...query };
    if (ids.length) {
      query$.hru_id__in = ids.join();
    }
    if (isArray(seasons) && seasons.length) {
      query$.bid_seasons = join(seasons, ',');
    }
    const query$$ = stringify(query$);
    const endpoint = '/fsbid/client/';
    const q = `${endpoint}?${query$$}`;

    if (ids.length) {
      api().get(q, {
        cancelToken: new CancelToken((c) => {
          cancelPortfolio = c;
        }),
      })
        .then(({ data }) => {
          const data$ = isArray(data) ? data : [];
          const data$$ = {
            results: data$,
            count: data$.length,
          };
          dispatch(bidderPortfolioLastQuery(query$$, data$$.count, endpoint));
          dispatch(bidderPortfolioFetchDataSuccess(data$$));
          dispatch(bidderPortfolioHasErrored(false));
          dispatch(bidderPortfolioIsLoading(false));
        })
        .catch((m) => {
          if (get(m, 'message') === 'cancel') {
            dispatch(bidderPortfolioIsLoading(true));
            dispatch(bidderPortfolioHasErrored(false));
          } else {
            dispatch(bidderPortfolioHasErrored(true));
            dispatch(bidderPortfolioIsLoading(false));
          }
        });
    } else {
      dispatch(bidderPortfolioIsLoading(false));
    }
  };
}

// pass in a normal client endpoint and add export path
export function downloadClientData(q = '') {
  const q$ = replace(q, '/client/', '/client/export/');
  return api()
    .get(q$)
    .then((response) => {
      downloadFromResponse(response, 'TalentMap_client_export');
    });
}

export function bidderPortfolioCDOsFetchData() {
  return (dispatch, getState) => {
    if (cancelCDOs) { cancelCDOs('cancel'); }
    const cdos = get(getState(), 'bidderPortfolioCDOs', []);
    if (!cdos.length) {
      dispatch(bidderPortfolioCDOsIsLoading(true));
      dispatch(bidderPortfolioCDOsHasErrored(false));
      api().get('/fsbid/cdo/', {
        cancelToken: new CancelToken((c) => {
          cancelCDOs = c;
        }),
      })
        .then((result) => {
          const data = get(result, 'data', []).map(m => ({
            ...m,
            hru_id: m.hru_id || m.id,
            first_name: m.name,
            last_name: '',
          }));
          dispatch(bidderPortfolioCDOsFetchDataSuccess(data));
          if (!getState().bidderPortfolioSelectedCDOsToSearchBy.length) {
            const currentUser = data.find(f => f.isCurrentUser);
            if (currentUser) {
              dispatch(bidderPortfolioSelectCDOsToSearchBy([currentUser]));
              dispatch(bidderPortfolioSelectCDO(currentUser));
            }
            dispatch(bidderPortfolioFetchData());
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

export function bidderPortfolioFetchDataFromLastQuery() {
  return (dispatch, getState) => {
    dispatch(lastBidderPortfolioIsLoading(true));
    dispatch(lastBidderPortfolioHasErrored(false));
    const q = getState().bidderPortfolioLastQuery;
    api().get(q)
      .then(({ data }) => {
        const data$ = isArray(data) ? data : [];
        const data$$ = {
          results: data$,
          count: data$.length,
        };
        dispatch(bidderPortfolioFetchDataSuccess(data$$));
        dispatch(lastBidderPortfolioHasErrored(false));
        dispatch(lastBidderPortfolioIsLoading(false));
      })
      .catch(() => {
        dispatch(lastBidderPortfolioHasErrored(true));
        dispatch(lastBidderPortfolioIsLoading(false));
      });
  };
}
