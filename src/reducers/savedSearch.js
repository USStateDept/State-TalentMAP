export function newSavedSearchHasErrored(state = false, action) {
  switch (action.type) {
    case 'NEW_SAVED_SEARCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function newSavedSearchIsSaving(state = false, action) {
  switch (action.type) {
    case 'NEW_SAVED_SEARCH_IS_SAVING':
      return action.isSaving;
    default:
      return state;
  }
}
export function newSavedSearchSuccess(state = false, action) {
  switch (action.type) {
    case 'NEW_SAVED_SEARCH_SUCCESS':
      return action.newSavedSearch;
    default:
      return state;
  }
}
export function currentSavedSearch(state = {}, action) {
  switch (action.type) {
    case 'CURRENT_SAVED_SEARCH':
      return action.searchObject;
    default:
      return state;
  }
}
