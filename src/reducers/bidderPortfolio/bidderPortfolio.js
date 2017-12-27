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
