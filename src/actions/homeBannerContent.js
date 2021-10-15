import { get } from 'lodash';
import { toastError, toastSuccess } from './toast';
import api from '../api';

export function homeBannerContentHasErrored(bool) {
  return {
    type: 'HOME_BANNER_CONTENT_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function homeBannerContentIsLoading(bool) {
  return {
    type: 'HOME_BANNER_CONTENT_IS_LOADING',
    isLoading: bool,
  };
}

export function homeBannerContentFetchDataSuccess(data) {
  return {
    type: 'HOME_BANNER_CONTENT_SUCCESS',
    data,
  };
}

export function homeBannerContentPatchHasErrored(bool) {
  return {
    type: 'HOME_BANNER_CONTENT_PATCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function homeBannerContentPatchIsLoading(bool) {
  return {
    type: 'HOME_BANNER_CONTENT_PATCH_IS_LOADING',
    isLoading: bool,
  };
}

export function homeBannerContentPatchSuccess(success) {
  return {
    type: 'HOME_BANNER_CONTENT_PATCH_SUCCESS',
    success,
  };
}

export function homeBannerContentFetchData() {
  return (dispatch) => {
    dispatch(homeBannerContentIsLoading(true));
    api().get('/homepage/banner/')
      .then((response) => {
        let text = get(response, 'data.text', '');
        if (!get(response, 'data.is_visible')) { text = ''; }
        dispatch(homeBannerContentHasErrored(false));
        dispatch(homeBannerContentIsLoading(false));
        dispatch(homeBannerContentFetchDataSuccess(text));
      })
      .catch(() => {
        dispatch(homeBannerContentHasErrored(true));
        dispatch(homeBannerContentIsLoading(false));
      });
  };
}

export function homeBannerContentPatchData(data) {
  return (dispatch) => {
    dispatch(homeBannerContentPatchIsLoading(false));
    api().patch('/homepage/banner/', { text: data || 'No content', is_visible: !!data })
      .then(() => {
        dispatch(homeBannerContentPatchHasErrored(false));
        dispatch(homeBannerContentPatchIsLoading(false));
        dispatch(homeBannerContentPatchSuccess(true));
        dispatch(homeBannerContentFetchDataSuccess(data));
        dispatch(toastSuccess('Your changes are now live.', 'Update successful'));
      })
      .catch(() => {
        // TODO update
        dispatch(homeBannerContentPatchHasErrored(true));
        dispatch(homeBannerContentPatchIsLoading(false));
        dispatch(homeBannerContentPatchSuccess(false));
        dispatch(toastError('Update unsuccessful. Please try again.', 'Error updating'));
      });
  };
}
