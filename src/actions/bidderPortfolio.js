import { batch } from 'react-redux';
import { stringify } from 'query-string';
import { find, get, isArray, join, omit, replace } from 'lodash';
import { CancelToken } from 'axios';
import { toastSuccess } from 'actions/toast';
import { downloadFromResponse } from 'utilities';
import { BID_PORTFOLIO_SORTS } from 'Constants/Sort';
import { BIDDER_PORTFOLIO_UPDATE_ERROR, BIDDER_PORTFOLIO_UPDATE_SUCCESS } from '../Constants/SystemMessages';
import api from '../api';
import { toastError } from './toast';

let cancelCDOs;
let cancelPortfolio;
let cancelUnnassignedBidders;
let cancelSave;

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

export function unassignedbidderTypeSuccess(results) {
  return {
    type: 'UNASSIGNED_BIDDER_TYPE_SUCCESS',
    results,
  };
}

export function bidderPortfolioSelectedUnassigned(arr = []) {
  return {
    type: 'BIDDER_PORTFOLIO_SELECTED_UNASSIGNED',
    data: arr,
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
export function bidderPortfolioExtraDetailsFetchDataSuccess(results) {
  return {
    type: 'BIDDER_PORTFOLIO_EXTRA_DETAILS_FETCH_DATA_SUCCESS',
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
export function bidderPortfolioPaginationHasErrored(bool) {
  return {
    type: 'BIDDER_PORTFOLIO_PAGINATION_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function bidderPortfolioPaginationIsLoading(bool) {
  return {
    type: 'BIDDER_PORTFOLIO_PAGINATION_IS_LOADING',
    isLoading: bool,
  };
}
export function bidderPortfolioPaginationFetchDataSuccess(data) {
  return {
    type: 'BIDDER_PORTFOLIO_PAGINATION_FETCH_DATA_SUCCESS',
    data,
  };
}
export function panelClientFetchDataLoading(bool) {
  return {
    type: 'PANEL_CLIENT_FETCH_DATA_LOADING',
    isLoading: bool,
  };
}
export function panelClientFetchDataErrored(bool) {
  return {
    type: 'PANEL_CLIENT_FETCH_DATA_ERRORED',
    hasErrored: bool,
  };
}
export function panelClientFetchDataSuccess(data) {
  return {
    type: 'PANEL_CLIENT_FETCH_DATA_SUCCESS',
    data,
  };
}
export function saveBidderPortfolioPagination(paginationObject) {
  return (dispatch) => {
    dispatch(bidderPortfolioPaginationFetchDataSuccess(paginationObject));
  };
}

export function bidderPortfolioSetSeasons(seasons = []) {
  return (dispatch) => {
    dispatch(bidderPortfolioSelectedSeasons(seasons));
  };
}

export function bidderPortfolioSetUnassigned(UA = []) {
  return (dispatch) => {
    dispatch(bidderPortfolioSelectedUnassigned(UA));
  };
}

export function setIsCDOD30(bool) {
  return {
    type: 'BIDDER_CDO_IS_CDOD30',
    isCDOD30: bool,
  };
}

export function setPanelDateID(id) {
  return {
    type: 'BIDDER_PORTFOLIO_PANEL_DATE',
    panelDateID: id,
  };
}

export function setEditClassification(bool) {
  return {
    type: 'BIDDER_PORTFOLIO_EDIT_CLASSIFICATION',
    editClassification: bool,
  };
}

export function bidderPortfolioSeasonsFetchData() {
  return (dispatch) => {
    batch(() => {
      dispatch(bidderPortfolioSeasonsIsLoading(true));
      dispatch(bidderPortfolioSeasonsHasErrored(false));
    });
    const endpoint = '/fsbid/bid_seasons/';
    api().get(endpoint)
      .then(({ data }) => {
        batch(() => {
          dispatch(bidderPortfolioSeasonsSuccess(data));
          dispatch(bidderPortfolioSeasonsHasErrored(false));
          dispatch(bidderPortfolioSeasonsIsLoading(false));
        });
      })
      .catch(() => {
        batch(() => {
          dispatch(bidderPortfolioSeasonsSuccess([]));
          dispatch(bidderPortfolioSeasonsHasErrored(true));
          dispatch(bidderPortfolioSeasonsIsLoading(false));
        });
      });
  };
}

export function bidderPortfolioExtraDetailsFetchData(query = {}) {
  return (dispatch, getState) => {
    const state = getState();
    const cdos = get(state, 'bidderPortfolioSelectedCDOsToSearchBy', []);
    const ids = cdos.map(m => m.hru_id).filter(f => f);
    const seasons = get(state, 'bidderPortfolioSelectedSeasons', []);

    let query$ = { ...query };
    if (ids.length) {
      query$.hru_id__in = ids.join();
    }
    if (seasons.length) {
      query$.bid_seasons = seasons.join(',');
    }
    if (!query$.bid_seasons) {
      query$ = omit(query$, ['hasHandshake', 'handshake']);
    }

    const queryString = stringify(query$);
    const endpoint = '/fsbid/client/extra_client_data/';
    const q = `${endpoint}?${queryString}`;
    api().post(q, {
      cancelToken: new CancelToken((c) => {
        cancelPortfolio = c;
      }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(bidderPortfolioExtraDetailsFetchDataSuccess(data));
          dispatch(bidderPortfolioHasErrored(false));
          dispatch(bidderPortfolioIsLoading(false));
        });
      })
      .catch(() => {
        batch(() => {
          dispatch(bidderPortfolioFetchDataSuccess([]));
          dispatch(bidderPortfolioHasErrored(true));
          dispatch(bidderPortfolioIsLoading(false));
        });
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
export function bidderPortfolioSaveSeasonsHasErrored(bool) {
  return {
    type: 'BIDDER_PORTFOLIO_SAVE_SEASONS_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function bidderPortfolioSaveSeasonsIsLoading(bool) {
  return {
    type: 'BIDDER_PORTFOLIO_SAVE_SEASONS_IS_LOADING',
    isLoading: bool,
  };
}
export function bidderPortfolioSaveSeasonsSuccess(results) {
  return {
    type: 'BIDDER_PORTFOLIO_SAVE_SEASONS_SUCCESS',
    results,
  };
}

const handleError = (error, dispatch) => {
  if (get(error, 'message') === 'cancel') {
    batch(() => {
      dispatch(bidderPortfolioHasErrored(false));
      dispatch(bidderPortfolioIsLoading(true));
    });
  } else {
    batch(() => {
      dispatch(bidderPortfolioHasErrored(true));
      dispatch(bidderPortfolioIsLoading(false));
    });
  }
};

export function getClientDatePerdets(query = {}) {
  return async (dispatch, getState) => {
    try {
      dispatch(bidderPortfolioIsLoading(true));
      dispatch(bidderPortfolioHasErrored(false));

      const state = getState();
      const cdos = get(state, 'bidderPortfolioSelectedCDOsToSearchBy', []);
      const ids = cdos.map(m => m.hru_id).filter(Boolean);
      const seasons = get(state, 'bidderPortfolioSelectedSeasons', []);

      let query$ = { ...query };

      if (ids.length) {
        query$.hru_id__in = ids.join();
      }

      if (seasons.length) {
        query$.bid_seasons = seasons.join(',');
      }
      if (!query$.bid_seasons) {
        query$ = omit(query$, ['hasHandshake', 'handshake']);
      }

      const queryString = stringify(query$);
      const endpoint = '/fsbid/client/panel_update/';
      const url = `${endpoint}?${queryString}`;

      if (cancelUnnassignedBidders) {
        cancelUnnassignedBidders('cancel');
      }

      const cancelToken = new CancelToken(c => { cancelUnnassignedBidders = c; });

      if (ids.length) {
        const response = await api().post(url, query$, { cancelToken });
        const { data } = response;
        const newQuery = { ...query$, perdet_seq_num: data.map(String) };
        const secondQueryString = stringify(newQuery);
        const secondEndpoint = '/fsbid/client/';
        const secondUrl = `${secondEndpoint}?${secondQueryString}`;

        if (data.length === 0) {
          dispatch(bidderPortfolioLastQuery(secondQueryString, 0, secondEndpoint));
          dispatch(bidderPortfolioFetchDataSuccess({ results: [], count: '0' }));
          dispatch(bidderPortfolioHasErrored(false));
          dispatch(bidderPortfolioIsLoading(false));
          return;
        }

        try {
          const secondResponse = await api().get(secondUrl, { cancelToken });
          const { data: secondData } = secondResponse;

          batch(() => {
            dispatch(bidderPortfolioLastQuery(secondQueryString, secondData.count, secondEndpoint));
            dispatch(bidderPortfolioFetchDataSuccess(secondData));
            dispatch(bidderPortfolioHasErrored(false));
            dispatch(bidderPortfolioIsLoading(false));
          });
        } catch (error) {
          handleError(error, dispatch);
        }
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
}

export function getClientPerdets(query = {}) {
  return async (dispatch, getState) => {
    try {
      dispatch(bidderPortfolioIsLoading(true));
      dispatch(bidderPortfolioHasErrored(false));

      const state = getState();
      const cdos = get(state, 'bidderPortfolioSelectedCDOsToSearchBy', []);
      const ids = cdos.map(m => m.hru_id).filter(Boolean);
      const seasons = get(state, 'bidderPortfolioSelectedSeasons', []);
      const unassigned = get(state, 'bidderPortfolioSelectedUnassigned', []);

      let query$ = { ...query };

      if (ids.length) {
        query$.hru_id__in = ids.join();
      }
      if (seasons.length) {
        query$.bid_seasons = seasons.join(',');
      }
      if (!query$.bid_seasons) {
        query$ = omit(query$, ['hasHandshake', 'handshake']);
      }

      if (get(query, 'hasHandshake') === 'unassigned_filters') {
        query$ = omit(query$, ['hasHandshake']);
        const UAvalues = unassigned.map(a => a.value);
        if (UAvalues.includes('noPanel')) query$.noPanel = true;
        if (UAvalues.includes('noBids')) query$.noBids = true;
      }

      const filters = ['handshake', 'eligible_bidders', 'cusp_bidders', 'separations', 'languages'];
      filters.forEach(filter => {
        if (get(query, 'hasHandshake') === filter) {
          query$[filter] = true;
        }
      });

      const queryString = stringify(query$);
      const endpoint = '/fsbid/client/client_perdets/';
      const url = `${endpoint}?${queryString}`;

      if (cancelUnnassignedBidders) {
        cancelUnnassignedBidders('cancel');
      }

      const cancelToken = new CancelToken(c => { cancelUnnassignedBidders = c; });

      if (ids.length) {
        const response = await api().post(url, { cancelToken });
        const { data } = response;
        const newQuery = { ...query$, perdet_seq_num: data.map(String) };
        const secondQueryString = stringify(newQuery);
        const secondEndpoint = '/fsbid/client/';
        const secondUrl = `${secondEndpoint}?${secondQueryString}`;

        if (data.length === 0) {
          dispatch(bidderPortfolioLastQuery(secondQueryString, 0, secondEndpoint));
          dispatch(bidderPortfolioFetchDataSuccess({ results: [], count: '0' }));
          dispatch(bidderPortfolioHasErrored(false));
          dispatch(bidderPortfolioIsLoading(false));
          return;
        }

        try {
          const secondResponse = await api().get(secondUrl, { cancelToken });
          const { data: secondData } = secondResponse;

          batch(() => {
            dispatch(bidderPortfolioLastQuery(secondQueryString, secondData.count, secondEndpoint));
            dispatch(bidderPortfolioFetchDataSuccess(secondData));
          });
        } catch (error) {
          handleError(error, dispatch);
        }
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
}


export function bidderPortfolioFetchData(query = {}, isCDO = false) {
  return (dispatch, getState) => {
    if (cancelPortfolio) { cancelPortfolio('cancel'); }
    dispatch(bidderPortfolioIsLoading(true));
    dispatch(bidderPortfolioHasErrored(false));
    const state = getState();
    const cdos = get(state, 'bidderPortfolioSelectedCDOsToSearchBy', []);
    const ids = cdos.map(m => m.hru_id).filter(f => f);
    const seasons = get(state, 'bidderPortfolioSelectedSeasons', []);
    let query$ = { ...query };
    if (ids.length) {
      query$.hru_id__in = ids.join();
    }
    if (isArray(seasons) && seasons.length) {
      query$.bid_seasons = join(seasons, ',');
    }
    if (!query$.bid_seasons || !query$.bid_seasons.length) {
      query$ = omit(query$, ['hasHandshake', 'handshake']); // hasHandshake requires at least one bid season
    }

    if (!query$.ordering) {
      query$.ordering = BID_PORTFOLIO_SORTS.defaultSort;
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
          batch(() => {
            dispatch(bidderPortfolioLastQuery(query$$, data.count, endpoint));
            dispatch(bidderPortfolioFetchDataSuccess(data));
            if (!isCDO) {
              dispatch(bidderPortfolioHasErrored(false));
              dispatch(bidderPortfolioIsLoading(false));
            }
          });
        })
        .catch((m) => {
          if (get(m, 'message') === 'cancel') {
            batch(() => {
              dispatch(bidderPortfolioHasErrored(false));
              dispatch(bidderPortfolioIsLoading(true));
            });
          } else {
            batch(() => {
              dispatch(bidderPortfolioHasErrored(true));
              dispatch(bidderPortfolioIsLoading(false));
            });
          }
        });
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
              batch(() => {
                dispatch(bidderPortfolioSelectCDOsToSearchBy([currentUser]));
                dispatch(bidderPortfolioSelectCDO(currentUser));
              });
            }
          }
          batch(() => {
            dispatch(bidderPortfolioCDOsHasErrored(false));
            dispatch(bidderPortfolioCDOsIsLoading(false));
          });
        })
        .catch(() => {
          batch(() => {
            dispatch(bidderPortfolioCDOsHasErrored(true));
            dispatch(bidderPortfolioCDOsIsLoading(false));
          });
        });
    }
  };
}

export function panelClientFetchData() {
  return (dispatch) => {
    batch(() => {
      dispatch(panelClientFetchDataLoading(true));
      dispatch(panelClientFetchDataErrored(false));
    });
    api().get('fsbid/client/panel/')
      .then(({ data }) => {
        batch(() => {
          dispatch(panelClientFetchDataSuccess(data));
          dispatch(panelClientFetchDataErrored(false));
          dispatch(panelClientFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(panelClientFetchDataLoading(true));
            dispatch(panelClientFetchDataErrored(false));
          });
        } else {
          batch(() => {
            dispatch(panelClientFetchDataSuccess([]));
            dispatch(panelClientFetchDataErrored(false));
            dispatch(panelClientFetchDataLoading(false));
          });
        }
      });
  };
}

export function bidderPortfolioFetchDataFromLastQuery() {
  return (dispatch, getState) => {
    batch(() => {
      dispatch(lastBidderPortfolioIsLoading(true));
      dispatch(lastBidderPortfolioHasErrored(false));
    });
    const q = getState().bidderPortfolioLastQuery;
    api().get(q)
      .then(({ data }) => {
        const data$ = isArray(data) ? data : [];
        const data$$ = {
          results: data$,
          count: data$.length,
        };
        batch(() => {
          dispatch(bidderPortfolioFetchDataSuccess(data$$));
          dispatch(lastBidderPortfolioHasErrored(false));
          dispatch(lastBidderPortfolioIsLoading(false));
        });
      })
      .catch(() => {
        batch(() => {
          dispatch(lastBidderPortfolioHasErrored(true));
          dispatch(lastBidderPortfolioIsLoading(false));
        });
      });
  };
}

export function bidderPortfolioSelectionsSaveSuccess(result) {
  return {
    type: 'BIDDER_PORTFOLIO_SELECTIONS_SAVE_SUCCESS',
    result,
  };
}

export function bidderPortfolioSelections(queryObject) {
  return (dispatch) => dispatch(bidderPortfolioSelectionsSaveSuccess(queryObject));
}

export function saveBidderPortfolioSelections(data = {}) {
  return (dispatch) => {
    if (cancelSave) { cancelSave('cancel'); }
    dispatch(bidderPortfolioSaveSeasonsIsLoading(true));
    dispatch(bidderPortfolioSeasonsHasErrored(false));

    const endpoint = '/fsbid/client/update/';
    api().post(endpoint, data, {
      cancelToken: new CancelToken((c) => { cancelSave = c; }),
    })
      .then(({ res }) => {
        batch(() => {
          dispatch(bidderPortfolioSaveSeasonsHasErrored(false));
          dispatch(bidderPortfolioSaveSeasonsSuccess(res));
          dispatch(toastSuccess(BIDDER_PORTFOLIO_UPDATE_SUCCESS));
          dispatch(bidderPortfolioSaveSeasonsIsLoading(false));
        });
      })
      .catch(() => {
        dispatch(toastError(BIDDER_PORTFOLIO_UPDATE_ERROR));
        dispatch(bidderPortfolioSaveSeasonsHasErrored(true));
        dispatch(bidderPortfolioSaveSeasonsIsLoading(false));
      });
  };
}
