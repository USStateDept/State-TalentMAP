import * as reducers from './bidderPortfolio';

describe('bidderPortfolio reducers', () => {
  it('can set reducer BIDDER_PORTFOLIO_HAS_ERRORED', () => {
    expect(reducers.bidderPortfolioHasErrored(false, { type: 'BIDDER_PORTFOLIO_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer BIDDER_PORTFOLIO_IS_LOADING', () => {
    expect(reducers.bidderPortfolioIsLoading(false, { type: 'BIDDER_PORTFOLIO_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer BIDDER_PORTFOLIO_FETCH_DATA_SUCCESS', () => {
    expect(reducers.bidderPortfolio(
      {}, { type: 'BIDDER_PORTFOLIO_FETCH_DATA_SUCCESS', results: [{}, {}] }).length).toBe(2);
  });
});

describe('bidderPortfolioCounts reducers', () => {
  it('can set reducer BIDDER_PORTFOLIO_COUNTS_HAS_ERRORED', () => {
    expect(reducers.bidderPortfolioCountsHasErrored(false, { type: 'BIDDER_PORTFOLIO_COUNTS_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer BIDDER_PORTFOLIO_COUNTS_IS_LOADING', () => {
    expect(reducers.bidderPortfolioCountsIsLoading(false, { type: 'BIDDER_PORTFOLIO_COUNTS_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer BIDDER_PORTFOLIO_COUNTS_FETCH_DATA_SUCCESS', () => {
    expect(reducers.bidderPortfolioCounts(
      {}, { type: 'BIDDER_PORTFOLIO_COUNTS_FETCH_DATA_SUCCESS', counts: {} })).toBeDefined();
  });
});
