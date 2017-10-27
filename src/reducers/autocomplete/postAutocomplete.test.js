import * as reducers from './postAutocomplete';

describe('reducers', () => {
  it('can set reducer POST_SEARCH_HAS_ERRORED', () => {
    expect(reducers.postSearchHasErrored(false, { type: 'POST_SEARCH_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer POST_SEARCH_IS_LOADING', () => {
    expect(reducers.postSearchIsLoading(false, { type: 'POST_SEARCH_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer POST_SEARCH_FETCH_DATA_SUCCESS', () => {
    expect(reducers.postSearchSuccess([], { type: 'POST_SEARCH_FETCH_DATA_SUCCESS', posts: ['test'] })[0]).toBe('test');
  });
});
