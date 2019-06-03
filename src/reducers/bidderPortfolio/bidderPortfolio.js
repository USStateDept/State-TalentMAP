import queryString from 'query-string';

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

export function bidderPortfolioLastQuery(state = '/client/', action) {
  switch (action.type) {
    case 'SET_BIDDER_PORTFOLIO_LAST_QUERY': {
      const base = '/client/';
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
