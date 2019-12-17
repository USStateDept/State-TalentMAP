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

describe('lastBidderPortfolio reducers', () => {
  it('can set reducer LAST_BIDDER_PORTFOLIO_HAS_ERRORED', () => {
    expect(reducers.lastBidderPortfolioHasErrored(false, { type: 'LAST_BIDDER_PORTFOLIO_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer LAST_BIDDER_PORTFOLIO_IS_LOADING', () => {
    expect(reducers.lastBidderPortfolioIsLoading(false, { type: 'LAST_BIDDER_PORTFOLIO_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer LAST_BIDDER_PORTFOLIO_FETCH_DATA_SUCCESS', () => {
    expect(reducers.lastBidderPortfolio(
      {}, { type: 'LAST_BIDDER_PORTFOLIO_FETCH_DATA_SUCCESS', results: {} })).toBeDefined();
  });

  it('can set reducer SET_BIDDER_PORTFOLIO_LAST_QUERY', () => {
    expect(reducers.bidderPortfolioLastQuery(
      {}, { type: 'SET_BIDDER_PORTFOLIO_LAST_QUERY', query: '&ordering=id', count: 5 })).toBe('/fsbid/client/?limit=5&ordering=id&page=1');
  });
});
