<<<<<<< HEAD
import axios from 'axios';
import { fetchUserToken } from '../utilities';
=======
import { first, get, isArray, merge } from 'lodash';
>>>>>>> f2d763fe... Stale Token API Interceptors
import api from '../api';
import { EMPTY_FUNCTION } from '../Constants/PropTypes';

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

export function glossaryEditorHasErrored(bool) {
  return {
    type: 'GLOSSARY_EDITOR_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function glossaryEditorIsLoading(bool) {
  return {
    type: 'GLOSSARY_EDITOR_IS_LOADING',
    isLoading: bool,
  };
}
export function glossaryEditorFetchDataSuccess(glossary) {
  return {
    type: 'GLOSSARY_EDITOR_FETCH_DATA_SUCCESS',
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
<<<<<<< HEAD
    dispatch(glossaryHasErrored(false));
    axios.get(`${api}/glossary/?is_archived=false`, { headers: { Authorization: fetchUserToken() } })
        .then(({ data }) => {
          dispatch(glossaryFetchDataSuccess(data));
          dispatch(glossaryIsLoading(false));
          dispatch(glossaryHasErrored(false));
        })
        .catch(() => {
          dispatch(glossaryIsLoading(false));
          dispatch(glossaryHasErrored(true));
        });
=======

    api
      .get('/glossary/?is_archived=false')
      .then(({ data }) => {
        dispatch(glossaryFetchDataSuccess(data));
        dispatch(glossaryIsLoading(false));
        dispatch(glossaryHasErrored(false));
      })
      .catch(() => {
        dispatch(glossaryIsLoading(false));
        dispatch(glossaryHasErrored(true));
      });
>>>>>>> f2d763fe... Stale Token API Interceptors
  };
}

export function glossaryEditorFetchData(bypassLoading = false) {
  return (dispatch) => {
    if (!bypassLoading) {
      dispatch(glossaryEditorIsLoading(true));
    }
<<<<<<< HEAD
    dispatch(glossaryEditorHasErrored(false));
    axios.get(`${api}/glossary/`, { headers: { Authorization: fetchUserToken() } })
        .then(({ data }) => {
          dispatch(glossaryEditorFetchDataSuccess(data));
          dispatch(glossaryEditorIsLoading(false));
          dispatch(glossaryEditorHasErrored(false));
        })
        .catch(() => {
          dispatch(glossaryEditorIsLoading(false));
          dispatch(glossaryEditorHasErrored(true));
        });
=======

    api
      .get('/glossary/')
      .then(({ data }) => {
        dispatch(glossaryEditorFetchDataSuccess(data));
        dispatch(glossaryEditorIsLoading(false));
        dispatch(glossaryEditorHasErrored(false));
      })
      .catch(() => {
        dispatch(glossaryEditorIsLoading(false));
        dispatch(glossaryEditorHasErrored(true));
      });
>>>>>>> f2d763fe... Stale Token API Interceptors
  };
}

export function glossaryPatch(term = {}) {
  return (dispatch) => {
    dispatch(glossaryPatchSuccess(false));
    dispatch(glossaryPatchIsLoading(true));
    dispatch(glossaryPatchHasErrored(false));
<<<<<<< HEAD
    axios.patch(`${api}/glossary/${term.id}/`, term, { headers: { Authorization: fetchUserToken() } })
        .then(({ data }) => {
          dispatch(glossaryFetchData());
          dispatch(glossaryEditorFetchData(true));
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
=======

    api
      .patch(`/glossary/${term.id}/`, term)
      .then(({ data }) => {
        dispatch(glossaryFetchData());
        dispatch(glossaryEditorFetchData(true));
        dispatch(glossaryPatchSuccess(true, data.id));
        dispatch(glossaryPatchIsLoading(false));
        dispatch(glossaryPatchHasErrored(false, data.id));

        onSuccess(term.id);
      })
      .catch((error) => {
        const data = merge({ title: null }, get(error, 'response.data'));
        const message = (
          (isArray(data.title) ? first(data.title) : data.title) ||
          'An error occurred trying to save the new glossary term. Please try again.'
        );

        dispatch(glossaryPatchSuccess(false));
        dispatch(glossaryPatchIsLoading(false));
        dispatch(glossaryPatchHasErrored(true, term.id, message));
      });
  };
}

export function glossaryPost(term = {}, onSuccess = EMPTY_FUNCTION) {
>>>>>>> f2d763fe... Stale Token API Interceptors
  return (dispatch) => {
    dispatch(glossaryPostSuccess(false));
    dispatch(glossaryPostIsLoading(true));
    dispatch(glossaryPostHasErrored(false));
<<<<<<< HEAD
    axios.post(`${api}/glossary/`, term, { headers: { Authorization: fetchUserToken() } })
        .then(({ data }) => {
          dispatch(glossaryFetchData());
          dispatch(glossaryEditorFetchData());
          dispatch(glossaryPostSuccess(true, data.id));
          dispatch(glossaryPostIsLoading(false));
          dispatch(glossaryPostHasErrored(false));
        })
        .catch(() => {
          dispatch(glossaryPostSuccess(false));
          dispatch(glossaryPostIsLoading(false));
          dispatch(glossaryPostHasErrored(true));
        });
=======

    api
      .post('/glossary/', term)
      .then(({ data }) => {
        dispatch(glossaryFetchData());
        dispatch(glossaryEditorFetchData());
        dispatch(glossaryPostSuccess(true, data.id));
        dispatch(glossaryPostIsLoading(false));
        dispatch(glossaryPostHasErrored(false));

        onSuccess();
      })
      .catch((error) => {
        const data = merge({ title: null }, get(error, 'response.data'));
        const message = (
          (isArray(data.title) ? first(data.title) : data.title) ||
          'An error occurred trying to save the new glossary term. Please try again.'
        );

        dispatch(glossaryPostSuccess(false));
        dispatch(glossaryPostIsLoading(false));
        dispatch(glossaryPostHasErrored(true, message));
      });
  };
}

export function glossaryEditorCancel(id = null) {
  return (dispatch) => {
    dispatch(glossaryPatchHasErrored(false, id));
    dispatch(glossaryPostHasErrored(false));
>>>>>>> f2d763fe... Stale Token API Interceptors
  };
}
