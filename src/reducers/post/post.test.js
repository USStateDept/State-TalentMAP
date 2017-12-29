import * as reducers from './post';

describe('reducers', () => {
  it('can set reducer POST_HAS_ERRORED', () => {
    expect(reducers.postHasErrored(false, { type: 'POST_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer POST_IS_LOADING', () => {
    expect(reducers.postIsLoading(false, { type: 'POST_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer POST_FETCH_DATA_SUCCESS', () => {
    expect(reducers.post([], { type: 'POST_FETCH_DATA_SUCCESS', post: true })).toBe(true);
  });
});
