import * as reducers from './results';

describe('reducers', () => {
  it('can set reducer RESULTS_HAS_ERRORED', () => {
    expect(reducers.resultsHasErrored(false, { type: 'RESULTS_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer RESULTS_IS_LOADING', () => {
    expect(reducers.resultsIsLoading(false, { type: 'RESULTS_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer RESULTS_FETCH_DATA_SUCCESS', () => {
    expect(reducers.results([], { type: 'RESULTS_FETCH_DATA_SUCCESS', results: true })).toBe(true);
  });

  it('can set reducer RESULTS_SIMILAR_POSITIONS_HAS_ERRORED', () => {
    expect(reducers.similarPositionsHasErrored(false, { type: 'RESULTS_SIMILAR_POSITIONS_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer RESULTS_SIMILAR_POSITIONS_IS_LOADING', () => {
    expect(reducers.similarPositionsIsLoading(false, { type: 'RESULTS_SIMILAR_POSITIONS_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer RESULTS_SIMILAR_POSITIONS_FETCH_DATA_SUCCESS', () => {
    expect(reducers.similarPositions([], { type: 'RESULTS_SIMILAR_POSITIONS_FETCH_DATA_SUCCESS', results: true })).toBe(true);
  });
});
