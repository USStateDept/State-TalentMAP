import { batch } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { get } from 'lodash';
// import { toastSuccess, toastError } from './toast';
import api from '../api';

/* export function aboutContentHasErrored(bool) {
  return {
    type: 'ABOUT_CONTENT_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function aboutContentIsLoading(bool) {
  return {
    type: 'ABOUT_CONTENT_IS_LOADING',
    isLoading: bool,
  };
} */

export function fetchFeatureFlagsDataSuccess(data) {
  return {
    type: 'FEATURE_FLAGS_DATA_SUCCESS',
    data,
  };
}
/*

export function aboutContentPatchHasErrored(bool) {
  return {
    type: 'ABOUT_CONTENT_PATCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function aboutContentPatchIsLoading(bool) {
  return {
    type: 'ABOUT_CONTENT_PATCH_IS_LOADING',
    isLoading: bool,
  };
}

export function aboutContentPatchSuccess(success) {
  return {
    type: 'ABOUT_CONTENT_PATCH_SUCCESS',
    success,
  };
}
*/

export function fetchFeatureFlagsData() {
  // eslint-disable-next-line no-console
  console.log('current: in getFeatureFlagsData');
  return (dispatch) => {
    api().get('/featureflags/')
      .then((response) => {
        // eslint-disable-next-line no-unused-vars
        const text = get(response, 'data.content', '');
        batch(() => {
          dispatch(fetchFeatureFlagsDataSuccess('Hey im a patch!'));
        });
      });
  };
}

export function patchFeatureFlagsData(data) {
  return (dispatch) => {
    api().patch('/featureflags/', { content: data || 'No content' })
      .then(() => {
        batch(() => {
          // dispatch(aboutContentPatchHasErrored(false));
          // dispatch(aboutContentPatchIsLoading(false));
          // dispatch(aboutContentPatchSuccess(true));
          dispatch(fetchFeatureFlagsDataSuccess('Hey im a patch!'));
          // eslint-disable-next-line max-len
          // dispatch(toastSuccess('You may now press the cancel button or leave this page.', 'Update successful'));
        });
      })
      .catch(() => {
        batch(() => {
          // dispatch(aboutContentPatchHasErrored(true));
          // dispatch(aboutContentPatchIsLoading(false));
          // dispatch(aboutContentPatchSuccess(false));
          // dispatch(toastError('Update unsuccessful. Please try again.', 'Error updating'));
        });
      });
  };
}
