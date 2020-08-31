import * as reducers from './homePagePositions';

describe('reducers', () => {
  it('can set reducer HOME_PAGE_FEATURED_POSITIONS_HAS_ERRORED', () => {
    expect(reducers.homePageFeaturedPositionsHasErrored(false, { type: 'HOME_PAGE_FEATURED_POSITIONS_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer HOME_PAGE_RECOMMENDED_POSITIONS_HAS_ERRORED', () => {
    expect(reducers.homePageRecommendedPositionsHasErrored(false, { type: 'HOME_PAGE_RECOMMENDED_POSITIONS_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer HOME_PAGE_FEATURED_POSITIONS_IS_LOADING', () => {
    expect(reducers.homePageFeaturedPositionsIsLoading(false, { type: 'HOME_PAGE_FEATURED_POSITIONS_IS_LOADING', isLoading: true })).toBe(true);
  });
  it('can set reducer HOME_PAGE_RECOMMENDED_POSITIONS_IS_LOADING', () => {
    expect(reducers.homePageRecommendedPositionsIsLoading(false, { type: 'HOME_PAGE_RECOMMENDED_POSITIONS_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer HOME_PAGE_FEATURED_POSITIONS_FETCH_DATA_SUCCESS', () => {
    expect(reducers.homePageFeaturedPositions(
      {}, { type: 'HOME_PAGE_FEATURED_POSITIONS_FETCH_DATA_SUCCESS', results: { isHighlighted: ['test'], isNew: ['test'] } }).isHighlighted.length).toBe(1);
  });
  it('can set reducer HOME_PAGE_RECOMMENDED_POSITIONS_FETCH_DATA_SUCCESS', () => {
    expect(reducers.homePageRecommendedPositions(
      {}, { type: 'HOME_PAGE_RECOMMENDED_POSITIONS_FETCH_DATA_SUCCESS', results: { isHighlighted: ['test'], isNew: ['test'] } }).isHighlighted.length).toBe(1);
  });
});
