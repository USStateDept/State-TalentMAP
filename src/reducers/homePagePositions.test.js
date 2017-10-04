import * as reducers from './homePagePositions';

describe('reducers', () => {
  it('can set reducer HOME_PAGE_POSITIONS_HAS_ERRORED', () => {
    expect(reducers.homePagePositionsHasErrored(false, { type: 'HOME_PAGE_POSITIONS_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer HOME_PAGE_POSITIONS_IS_LOADING', () => {
    expect(reducers.homePagePositionsIsLoading(false, { type: 'HOME_PAGE_POSITIONS_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer HOME_PAGE_POSITIONS_FETCH_DATA_SUCCESS', () => {
    expect(reducers.homePagePositions(
      {}, { type: 'HOME_PAGE_POSITIONS_FETCH_DATA_SUCCESS', results: { isHighlighted: ['test'], isNew: ['test'] } }).isHighlighted.length).toBe(1);
  });
});
