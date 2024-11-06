import queryString from 'query-string';

export function bidderPortfolioSelectedSeasons(state = [], action) {
  switch (action.type) {
    case 'BIDDER_PORTFOLIO_SELECTED_SEASONS':
      return action.data;
    default:
      return state;
  }
}
export function bidderPortfolioSeasonsHasErrored(state = false, action) {
  switch (action.type) {
    case 'BIDDER_PORTFOLIO_SEASONS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bidderPortfolioSeasonsIsLoading(state = false, action) {
  switch (action.type) {
    case 'BIDDER_PORTFOLIO_SEASONS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function isCDOD30(state = false, action) {
  switch (action.type) {
    case 'BIDDER_CDO_IS_CDOD30':
      return action.isCDOD30;
    default:
      return state;
  }
}

export function panelDateID(state = '', action) {
  switch (action.type) {
    case 'BIDDER_PORTFOLIO_PANEL_DATE':
      return action.panelDateID;
    default:
      return state;
  }
}

export function setEditClassification(state = false, action) {
  switch (action.type) {
    case 'BIDDER_PORTFOLIO_EDIT_CLASSIFICATION':
      return action.editClassification;
    default:
      return state;
  }
}

export function bidderPortfolioSeasons(state = [], action) {
  switch (action.type) {
    case 'BIDDER_PORTFOLIO_SEASONS_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
export function unassignedbidderType(state = [], action) {
  switch (action.type) {
    case 'UNASSIGNED_BIDDER_TYPE_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
export function bidderPortfolioSelectedUnassigned(state = [], action) {
  switch (action.type) {
    case 'BIDDER_PORTFOLIO_SELECTED_UNASSIGNED':
      return action.data;
    default:
      return state;
  }
}
export function bidderPortfolioHasErrored(state = false, action) {
  switch (action.type) {
    case 'BIDDER_PORTFOLIO_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bidderPortfolioIsLoading(state = false, action) {
  switch (action.type) {
    case 'BIDDER_PORTFOLIO_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function bidderPortfolio(state = { results: [] }, action) {
  switch (action.type) {
    case 'BIDDER_PORTFOLIO_FETCH_DATA_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
export function bidderPortfolioExtraData(state = { results: [] }, action) {
  switch (action.type) {
    case 'BIDDER_PORTFOLIO_EXTRA_DETAILS_FETCH_DATA_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
export function lastBidderPortfolioHasErrored(state = false, action) {
  switch (action.type) {
    case 'LAST_BIDDER_PORTFOLIO_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function lastBidderPortfolioIsLoading(state = false, action) {
  switch (action.type) {
    case 'LAST_BIDDER_PORTFOLIO_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function lastBidderPortfolio(state = { results: [] }, action) {
  switch (action.type) {
    case 'LAST_BIDDER_PORTFOLIO_FETCH_DATA_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

export function bidderPortfolioCountsHasErrored(state = false, action) {
  switch (action.type) {
    case 'BIDDER_PORTFOLIO_COUNTS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bidderPortfolioCountsIsLoading(state = false, action) {
  switch (action.type) {
    case 'BIDDER_PORTFOLIO_COUNTS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function bidderPortfolioCounts(state = {}, action) {
  switch (action.type) {
    case 'BIDDER_PORTFOLIO_COUNTS_FETCH_DATA_SUCCESS':
      return action.counts;
    default:
      return state;
  }
}

export function bidderPortfolioCDOsHasErrored(state = false, action) {
  switch (action.type) {
    case 'BIDDER_PORTFOLIO_CDOS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bidderPortfolioCDOsIsLoading(state = false, action) {
  switch (action.type) {
    case 'BIDDER_PORTFOLIO_CDOS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function bidderPortfolioCDOs(state = [], action) {
  switch (action.type) {
    case 'BIDDER_PORTFOLIO_CDOS_FETCH_DATA_SUCCESS':
      return action.data;
    default:
      return state;
  }
}
export function bidderPortfolioPaginationHasErrored(state = false, action) {
  switch (action.type) {
    case 'BIDDER_PORTFOLIO_PAGINATION_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bidderPortfolioPaginationIsLoading(state = false, action) {
  switch (action.type) {
    case 'BIDDER_PORTFOLIO_PAGINATION_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function bidderPortfolioPagination(state = {}, action) {
  switch (action.type) {
    case 'BIDDER_PORTFOLIO_PAGINATION_FETCH_DATA_SUCCESS':
      return action.data;
    default:
      return state;
  }
}

export function bidderPortfolioSelectedCDO(state = {}, action) {
  switch (action.type) {
    case 'BIDDER_PORTFOLIO_SELECTED_CDO':
      return action.data;
    default:
      return state;
  }
}

export function bidderPortfolioSelectedCDOsToSearchBy(state = [], action) {
  switch (action.type) {
    case 'BIDDER_PORTFOLIO_SELECTED_CDOS_TO_SEARCH_BY':
      return action.data;
    default:
      return state;
  }
}

export function panelClientFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'PANEL_CLIENT_FETCH_DATA_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function panelClientFetchDataHasErrored(state = false, action) {
  switch (action.type) {
    case 'PANEL_CLIENT_FETCH_DATA_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

export function panelClientFetchData(state = [], action) {
  switch (action.type) {
    case 'PANEL_CLIENT_FETCH_DATA_SUCCESS':
      return action.data;
    default:
      return state;
  }
}


export function bidderPortfolioLastQuery(state = '/fsbid/client/', action, endpoint = '/fsbid/client/') {
  switch (action.type) {
    case 'SET_BIDDER_PORTFOLIO_LAST_QUERY': {
      const base = endpoint;
      const q = queryString.parse(action.query);
      q.limit = action.count;
      q.page = 1;
      const stringified = queryString.stringify(q);
      const newState = `${base}?${stringified}`;
      return newState;
    }
    default:
      return state;
  }
}

export function bidderPortfolioSelections(state = {}, action) {
  switch (action.type) {
    case 'BIDDER_PORTFOLIO_SELECTIONS_SAVE_SUCCESS':
      return action.result;
    default:
      return state;
  }
}
