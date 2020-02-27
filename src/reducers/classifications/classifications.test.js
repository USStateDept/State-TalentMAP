import * as reducers from './classifications';

describe('reducers', () => {
  it('can set reducer CLASSIFICATIONS_HAS_ERRORED', () => {
    expect(reducers.classificationsHasErrored(false, { type: 'CLASSIFICATIONS_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer CLASSIFICATIONS_IS_LOADING', () => {
    expect(reducers.classificationsIsLoading(false, { type: 'CLASSIFICATIONS_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer CLASSIFICATIONS_FETCH_DATA_SUCCESS', () => {
    expect(reducers.classifications({ id: 2 }, { type: 'CLASSIFICATIONS_FETCH_DATA_SUCCESS', classifications: { id: 1 } }).id).toBe(1);
  });
});
