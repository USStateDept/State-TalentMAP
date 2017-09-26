import axios from 'axios';
import * as SystemMessages from '../Constants/SystemMessages';
import { fetchUserToken } from '../utilities';
import api from '../api';

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

export function savedSearchesFetchData() {
  return (dispatch) => {
    dispatch(savedSearchesIsLoading(true));
    dispatch(savedSearchesHasErrored(false));
    axios.get(`${api}/searches/`, { headers: { Authorization: fetchUserToken() } })
            .then(response => response.data)
            .then((results) => {
              dispatch(savedSearchesIsLoading(false));
              dispatch(savedSearchesHasErrored(false));
              dispatch(savedSearchesSuccess(results));
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
    dispatch(deleteSavedSearchHasErrored(false));
    axios.delete(`${api}/searches/${id}/`, { headers: { Authorization: fetchUserToken() } })
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

export function setCurrentSavedSearch(searchObject) {
  return (dispatch) => {
    dispatch(currentSavedSearch(searchObject));
  };
}

// save a new search OR pass an ID to patch an existing search
export function saveSearch(data, id) {
  return (dispatch) => {
    dispatch(newSavedSearchIsSaving(true));
    dispatch(newSavedSearchSuccess(false));
    dispatch(newSavedSearchHasErrored(false));
    // here we handle based on the "id" param to decide whether
    // to post or patch to the correct endpoint
    let action = 'post';
    let endpoint = `${api}/searches/`;
    if (id) {
      action = 'patch';
      endpoint = `${api}/searches/${id}/`;
    }
    axios[action](endpoint, data, { headers: { Authorization: fetchUserToken() } })
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
              dispatch(newSavedSearchHasErrored(JSON.stringify(err.response.data) || 'An error occurred trying to save this search.'));
              dispatch(newSavedSearchIsSaving(false));
              dispatch(newSavedSearchSuccess(false));
            });
  };
}
