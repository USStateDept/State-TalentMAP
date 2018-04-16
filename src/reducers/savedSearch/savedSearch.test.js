import * as reducers from './savedSearch';

describe('savedSearch reducers', () => {
  it('can set reducer NEW_SAVED_SEARCH_HAS_ERRORED', () => {
    expect(reducers.newSavedSearchHasErrored(false, { type: 'NEW_SAVED_SEARCH_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer NEW_SAVED_SEARCH_IS_SAVING', () => {
    expect(reducers.newSavedSearchIsSaving(false, { type: 'NEW_SAVED_SEARCH_IS_SAVING', isSaving: true })).toBe(true);
  });

  it('can set reducer NEW_SAVED_SEARCH_SUCCESS', () => {
    expect(reducers.newSavedSearchSuccess(false, { type: 'NEW_SAVED_SEARCH_SUCCESS', newSavedSearch: true }).message).toBe(null);
  });

  it('can set reducer CURRENT_SAVED_SEARCH', () => {
    expect(reducers.currentSavedSearch(false, { type: 'CURRENT_SAVED_SEARCH', searchObject: true })).toBe(true);
  });

  it('can set reducer DELETE_SAVED_SEARCH_IS_LOADING', () => {
    expect(reducers.deleteSavedSearchIsLoading(false, { type: 'DELETE_SAVED_SEARCH_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer DELETE_SAVED_SEARCH_HAS_ERRORED', () => {
    expect(reducers.deleteSavedSearchHasErrored(false, { type: 'DELETE_SAVED_SEARCH_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer DELETE_SAVED_SEARCH_SUCCESS', () => {
    expect(reducers.deleteSavedSearchSuccess(false, { type: 'DELETE_SAVED_SEARCH_SUCCESS', hasDeleted: true })).toBe(true);
  });

  it('can set reducer CLONE_SAVED_SEARCH_IS_LOADING', () => {
    expect(reducers.cloneSavedSearchIsLoading(false, { type: 'CLONE_SAVED_SEARCH_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer CLONE_SAVED_SEARCH_HAS_ERRORED', () => {
    expect(reducers.cloneSavedSearchHasErrored(false, { type: 'CLONE_SAVED_SEARCH_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer CLONE_SAVED_SEARCH_SUCCESS', () => {
    expect(reducers.cloneSavedSearchSuccess(false, { type: 'CLONE_SAVED_SEARCH_SUCCESS', hasCloned: true })).toBe(true);
  });

  it('can set reducer SAVED_SEARCHES_SUCCESS', () => {
    expect(reducers.savedSearchesSuccess(null, { type: 'SAVED_SEARCHES_SUCCESS', savedSearches: { results: [1] } }).results[0]).toBe(1);
  });

  it('can set reducer SAVED_SEARCHES_IS_LOADING', () => {
    expect(reducers.savedSearchesIsLoading(false, { type: 'SAVED_SEARCHES_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer SAVED_SEARCHES_HAS_ERRORED', () => {
    expect(reducers.savedSearchesHasErrored(false, { type: 'SAVED_SEARCHES_HAS_ERRORED', hasErrored: true })).toBe(true);
  });
});
