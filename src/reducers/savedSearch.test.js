import * as reducers from './savedSearch';

describe('savedSearch reducers', () => {
  it('can set reducer NEW_SAVED_SEARCH_HAS_ERRORED', () => {
    expect(reducers.newSavedSearchHasErrored(false, { type: 'NEW_SAVED_SEARCH_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer NEW_SAVED_SEARCH_IS_SAVING', () => {
    expect(reducers.newSavedSearchIsSaving(false, { type: 'NEW_SAVED_SEARCH_IS_SAVING', isSaving: true })).toBe(true);
  });

  it('can set reducer NEW_SAVED_SEARCH_SUCCESS', () => {
    expect(reducers.newSavedSearchSuccess(false, { type: 'NEW_SAVED_SEARCH_SUCCESS', newSavedSearch: true })).toBe(true);
  });
});
