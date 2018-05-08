import { first, get, isArray, merge } from 'lodash';
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

export function glossaryPatchHasErrored(bool = false, id = null, message = null) {
  return {
    type: 'GLOSSARY_PATCH_HAS_ERRORED',
    value: { id, message, hasErrored: bool },
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

export function glossaryPostHasErrored(bool = false, message = null) {
  return {
    type: 'GLOSSARY_POST_HAS_ERRORED',
    value: { id: null, message, hasErrored: bool },
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
    dispatch(glossaryHasErrored(false));

    if (!bypassLoading) {
      dispatch(glossaryIsLoading(true));
    }

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
  };
}

export function glossaryEditorFetchData(bypassLoading = false) {
  return (dispatch) => {
    dispatch(glossaryEditorHasErrored(false));

    if (!bypassLoading) {
      dispatch(glossaryEditorIsLoading(true));
    }

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
  };
}

export function glossaryPatch(term = {}, onSuccess = EMPTY_FUNCTION) {
  return (dispatch) => {
    dispatch(glossaryPatchSuccess(false));
    dispatch(glossaryPatchIsLoading(true));
    dispatch(glossaryPatchHasErrored(false));

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
  return (dispatch) => {
    dispatch(glossaryPostSuccess(false));
    dispatch(glossaryPostIsLoading(true));
    dispatch(glossaryPostHasErrored(false));

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
  };
}
