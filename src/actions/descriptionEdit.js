import axios from 'axios';
import { fetchUserToken } from '../utilities';
import api from '../api';

export function descriptionEditHasErrored(bool) {
  return {
    type: 'DESCRIPTION_EDIT_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function descriptionEditIsSending(bool) {
  return {
    type: 'DESCRIPTION_EDIT_IS_SENDING',
    isLoading: bool,
  };
}
export function descriptionEditSuccess(bool) {
  return {
    type: 'DESCRIPTION_EDIT_SUCCESS',
    success: bool,
  };
}

export function resetMessages() {
  return (dispatch) => {
    dispatch(descriptionEditHasErrored(false));
    dispatch(descriptionEditIsSending(false));
    dispatch(descriptionEditSuccess(false));
  };
}

export function editDescription(id, content, pointOfContact, website) {
  return (dispatch) => {
    dispatch(descriptionEditIsSending(true));
    dispatch(descriptionEditSuccess(false));
    dispatch(descriptionEditHasErrored(false));
    const patchObject = Object.assign({});
    if (content) {
      patchObject.content = content;
    }
    if (pointOfContact) {
      patchObject.point_of_contact = pointOfContact;
    }
    if (website) {
      patchObject.website = website;
    }
    axios.patch(`${api}/capsule_description/${id}/`, patchObject, { headers: { Authorization: fetchUserToken() } })
            .then((response) => {
              dispatch(descriptionEditIsSending(false));
              dispatch(descriptionEditHasErrored(false));
              return response;
            })
            .then(() => dispatch(descriptionEditSuccess(true)))
            .catch((err) => {
              dispatch(descriptionEditHasErrored('An error occurred trying to save this data. Click "edit" and try to save again.'));
              dispatch(descriptionEditIsSending(false));
              dispatch(descriptionEditSuccess(false));
              if (err && err.response) {
                return err.response.data.message;
              }
              return false;
            });
  };
}

export function editDescriptionContent(id, content) {
  return (dispatch) => {
    dispatch(editDescription(id, content));
  };
}

export function editPocContent(id, content) {
  return (dispatch) => {
    dispatch(editDescription(id, null, content));
  };
}

export function editWebsiteContent(id, content) {
  return (dispatch) => {
    dispatch(editDescription(id, null, null, content));
  };
}
