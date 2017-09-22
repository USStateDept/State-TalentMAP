import axios from 'axios';
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
export function newSavedSearchSuccess(newSavedSearch) {
  return {
    type: 'NEW_SAVED_SEARCH_SUCCESS',
    newSavedSearch,
  };
}

export function saveSearch(data) {
  return (dispatch) => {
    dispatch(newSavedSearchIsSaving(true));
    dispatch(newSavedSearchSuccess(false));
    dispatch(newSavedSearchHasErrored(false));
    axios.post(`${api}/searches/`, data, { headers: { Authorization: fetchUserToken() } })
            .then((response) => {
              dispatch(newSavedSearchIsSaving(false));
              dispatch(newSavedSearchHasErrored(false));
              dispatch(newSavedSearchSuccess(`Saved search with the name "${response.data.name}" has been saved! You can go to your profile to view all of your saved searches.`));
            })
            .catch((err) => {
              dispatch(newSavedSearchHasErrored(JSON.stringify(err.response.data) || 'An error occurred trying to save this search.'));
              dispatch(newSavedSearchIsSaving(false));
              dispatch(newSavedSearchSuccess(false));
            });
  };
}
