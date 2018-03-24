import api from '../api';
import * as SystemMessages from '../Constants/SystemMessages';
import { propOrDefault } from '../utilities';

export function newSavedSearchHasErrored(bool) {
  return {
    type: 'NEW_SAVED_SEARCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function newSavedSearchIsSaving(bool) {
  return {
    type: 'NEW_SAVED_SEARCH_IS_SAVING',
    isSaving: bool,
  };
}

export function deleteSavedSearchIsLoading(bool) {
  return {
    type: 'DELETE_SAVED_SEARCH_IS_LOADING',
    isLoading: bool,
  };
}

export function deleteSavedSearchHasErrored(bool) {
  return {
    type: 'DELETE_SAVED_SEARCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function deleteSavedSearchSuccess(bool) {
  return {
    type: 'DELETE_SAVED_SEARCH_SUCCESS',
    hasDeleted: bool,
  };
}

export function cloneSavedSearchIsLoading(bool) {
  return {
    type: 'CLONE_SAVED_SEARCH_IS_LOADING',
    isLoading: bool,
  };
}

export function cloneSavedSearchHasErrored(bool) {
  return {
    type: 'CLONE_SAVED_SEARCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function cloneSavedSearchSuccess(bool) {
  return {
    type: 'CLONE_SAVED_SEARCH_SUCCESS',
    hasCloned: bool,
  };
}

export function newSavedSearchSuccess(newSavedSearch) {
  return {
    type: 'NEW_SAVED_SEARCH_SUCCESS',
    newSavedSearch,
  };
}

export function currentSavedSearch(searchObject) {
  return {
    type: 'CURRENT_SAVED_SEARCH',
    searchObject,
  };
}

export function savedSearchesSuccess(savedSearches) {
  return {
    type: 'SAVED_SEARCHES_SUCCESS',
    savedSearches,
  };
}

export function savedSearchesIsLoading(bool) {
  return {
    type: 'SAVED_SEARCHES_IS_LOADING',
    isLoading: bool,
  };
}

export function savedSearchesHasErrored(bool) {
  return {
    type: 'SAVED_SEARCHES_HAS_ERRORED',
    hasErrored: bool,
  };
}

// When we want to reset alert messages after the user navigates away and comes back later,
// or when we want the user to be able to clear the current alert message.
export function routeChangeResetState() {
  return (dispatch) => {
    dispatch(deleteSavedSearchSuccess(false));
    dispatch(deleteSavedSearchHasErrored(false));
    dispatch(cloneSavedSearchSuccess(false));
    dispatch(cloneSavedSearchHasErrored(false));
    dispatch(newSavedSearchSuccess(false));
    dispatch(newSavedSearchHasErrored(false));
  };
}

export function routeChangeUnsetCurrentSearch() {
  return (dispatch) => {
    dispatch(currentSavedSearch({}));
  };
}

export function savedSearchesFetchData(sortType) {
  return (dispatch) => {
    dispatch(savedSearchesIsLoading(true));
    dispatch(savedSearchesHasErrored(false));
    let url = '/searches/';
    if (sortType) { url += `?ordering=${sortType}`; }
    api.get(url)
      .then(response => response.data)
      .then((results) => {
        dispatch(savedSearchesSuccess(results));
        dispatch(savedSearchesIsLoading(false));
        dispatch(savedSearchesHasErrored(false));
      })
      .catch(() => {
        dispatch(savedSearchesIsLoading(false));
        dispatch(savedSearchesHasErrored(true));
      });
  };
}

export function deleteSavedSearch(id) {
  return (dispatch) => {
    dispatch(deleteSavedSearchIsLoading(true));
    dispatch(routeChangeResetState());
    api.delete(`/searches/${id}/`)
      .then(() => {
        dispatch(deleteSavedSearchIsLoading(false));
        dispatch(deleteSavedSearchHasErrored(false));
        dispatch(deleteSavedSearchSuccess('Successfully deleted the selected search.'));
        dispatch(currentSavedSearch(false));
        dispatch(savedSearchesFetchData());
      })
      .catch((err) => {
        dispatch(deleteSavedSearchHasErrored(JSON.stringify(err.response.data) || 'An error occurred trying to delete this search.'));
        dispatch(deleteSavedSearchIsLoading(false));
        dispatch(deleteSavedSearchSuccess(false));
      });
  };
}

// clone a saved search
export function cloneSavedSearch(id) {
  return (dispatch) => {
    dispatch(cloneSavedSearchIsLoading(true));
    dispatch(routeChangeResetState());
    const onCatch = (err) => {
      dispatch(cloneSavedSearchHasErrored(JSON.stringify(err.response.data) || 'An error occurred trying to clone this search.'));
      dispatch(cloneSavedSearchIsLoading(false));
      dispatch(cloneSavedSearchSuccess(false));
    };
    // get the original saved search
    api.get(`/searches/${id}/`)
      .then((response) => {
        const responseObject = response.data;
        // copy the object, but only with the properties we need
        const clonedResponse = Object.assign({}, {
          name: responseObject.name,
          endpoint: responseObject.endpoint,
          filters: responseObject.filters,
        });

        // append a timestamp to the end of the name
        clonedResponse.name += ` - Copy - ${new Date()}`;
        api.post('/searches/', clonedResponse)
          .then((postResponse) => {
            dispatch(cloneSavedSearchIsLoading(false));
            dispatch(cloneSavedSearchHasErrored(false));
            dispatch(cloneSavedSearchSuccess(`Successfully cloned the selected search as "${postResponse.data.name}".`));
            dispatch(currentSavedSearch(false));
            dispatch(savedSearchesFetchData());
          })
          .catch(err => onCatch(err));
      })
      .catch(err => onCatch(err));
  };
}

export const setCurrentSavedSearch = searchObject =>
  dispatch => dispatch(currentSavedSearch(searchObject));

// save a new search OR pass an ID to patch an existing search
export function saveSearch(data, id) {
  return (dispatch) => {
    // here we handle based on the "id" param to decide whether
    // to post or patch to the correct endpoint
    const config = {
      method: id ? 'patch' : 'post',
      url: id ? `/searches/${id}/` : '/searches/',
      data,
    };

    dispatch(newSavedSearchIsSaving(true));
    dispatch(newSavedSearchSuccess(false));
    dispatch(newSavedSearchHasErrored(false));

    api(config)
      .then((response) => {
        dispatch(newSavedSearchIsSaving(false));
        dispatch(newSavedSearchHasErrored(false));
        dispatch(newSavedSearchSuccess(
          // if an ID was passed, we know to use the UPDATED message
          id ?
            SystemMessages.UPDATED_SAVED_SEARCH_SUCCESS(response.data.name) :
            SystemMessages.NEW_SAVED_SEARCH_SUCCESS(response.data.name),
        ));
        dispatch(setCurrentSavedSearch(response.data));
      })
      .catch((err) => {
        dispatch(newSavedSearchHasErrored(propOrDefault(err, 'response.data', 'An error occurred trying to save this search.')));
        dispatch(newSavedSearchIsSaving(false));
        dispatch(newSavedSearchSuccess(false));
      });
  };
}
