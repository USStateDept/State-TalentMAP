import axios from 'axios';
import { fetchUserToken } from '../utilities';
import api from '../api';

export function glossaryHasErrored(bool) {
  return {
    type: 'GLOSSARY_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function glossaryIsLoading(bool) {
  return {
    type: 'GLOSSARY_IS_LOADING',
    isLoading: bool,
  };
}
export function glossaryFetchDataSuccess(glossary) {
  return {
    type: 'GLOSSARY_FETCH_DATA_SUCCESS',
    glossary,
  };
}

export function glossaryPatchHasErrored(bool = false, id = null) {
  return {
    type: 'GLOSSARY_PATCH_HAS_ERRORED',
    hasErrored: { id, hasErrored: bool },
  };
}
export function glossaryPatchIsLoading(bool) {
  return {
    type: 'GLOSSARY_PATCH_IS_LOADING',
    isLoading: bool,
  };
}
export function glossaryPatchSuccess(bool = false, id = null) {
  return {
    type: 'GLOSSARY_PATCH_SUCCESS',
    success: { id, success: bool },
  };
}

export function glossaryPostHasErrored(bool = false) {
  return {
    type: 'GLOSSARY_POST_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function glossaryPostIsLoading(bool) {
  return {
    type: 'GLOSSARY_POST_IS_LOADING',
    isLoading: bool,
  };
}
export function glossaryPostSuccess(bool = false, id = null) {
  return {
    type: 'GLOSSARY_POST_SUCCESS',
    success: { id, success: bool },
  };
}

export function glossaryFetchData(bypassLoading = false) {
  return (dispatch) => {
    if (!bypassLoading) {
      dispatch(glossaryIsLoading(true));
    }
    dispatch(glossaryHasErrored(false));
    axios.get(`${api}/glossary/`, { headers: { Authorization: fetchUserToken() } })
        .then(({ data }) => {
          dispatch(glossaryFetchDataSuccess(data));
          dispatch(glossaryIsLoading(false));
          dispatch(glossaryHasErrored(false));
        })
        .catch(() => {
          dispatch(glossaryIsLoading(false));
          dispatch(glossaryHasErrored(true));
        });
  };
}

export function glossaryPatch(term = {}) {
  return (dispatch) => {
    dispatch(glossaryPatchSuccess(false));
    dispatch(glossaryPatchIsLoading(true));
    dispatch(glossaryPatchHasErrored(false));
    axios.patch(`${api}/glossary/${term.id}/`, term, { headers: { Authorization: fetchUserToken() } })
        .then(({ data }) => {
          dispatch(glossaryFetchData(true));
          dispatch(glossaryPatchSuccess(true, data.id));
          dispatch(glossaryPatchIsLoading(false));
          dispatch(glossaryPatchHasErrored(false, data.id));
        })
        .catch(() => {
          dispatch(glossaryPatchSuccess(false));
          dispatch(glossaryPatchIsLoading(false));
          dispatch(glossaryPatchHasErrored(true, term.id));
        });
  };
}

export function glossaryPost(term = {}) {
  return (dispatch) => {
    dispatch(glossaryPostSuccess(false));
    dispatch(glossaryPostIsLoading(true));
    dispatch(glossaryPostHasErrored(false));
    axios.post(`${api}/glossary/`, term, { headers: { Authorization: fetchUserToken() } })
        .then(({ data }) => {
          dispatch(glossaryFetchData());
          dispatch(glossaryPostSuccess(true, data.id));
          dispatch(glossaryPostIsLoading(false));
          dispatch(glossaryPostHasErrored(false));
        })
        .catch(() => {
          dispatch(glossaryPostSuccess(false));
          dispatch(glossaryPostIsLoading(false));
          dispatch(glossaryPostHasErrored(true));
        });
  };
}
