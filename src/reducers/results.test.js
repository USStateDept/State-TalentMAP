import { Reducer } from 'redux-testkit';
import * as reducers from './results';

describe('reducers', () => {

  beforeEach(() => {
  });

  it('can set reducer RESULTS_HAS_ERRORED', () => {
    expect(reducers.resultsHasErrored(false, { type: 'RESULTS_HAS_ERRORED', hasErrored: true} )).toBe(true);
  });

  it('can set reducer RESULTS_IS_LOADING', () => {
    expect(reducers.resultsIsLoading(false, { type: 'RESULTS_IS_LOADING', isLoading: true} )).toBe(true);
  });

  it('can set reducer RESULTS_FETCH_DATA_SUCCESS', () => {
    expect(reducers.results([], { type: 'RESULTS_FETCH_DATA_SUCCESS', results: true} )).toBe(true);
  });

});
