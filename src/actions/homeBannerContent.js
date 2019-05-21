import { toastSuccess, toastError } from './toast';
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
    api().get('/position/1/')
      .then(() => {
        dispatch(homeBannerContentHasErrored(false));
        dispatch(homeBannerContentIsLoading(false));
        dispatch(homeBannerContentFetchDataSuccess(CONTENT)); // eslint-disable-line
      })
      .catch(() => {
        // TODO update
        dispatch(homeBannerContentHasErrored(true));
        dispatch(homeBannerContentIsLoading(false));
      });
  };
}

export function homeBannerContentPatchData(data) {
  return (dispatch) => {
    dispatch(homeBannerContentPatchIsLoading(false));
    api().get('/position/1/', { data })
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

const CONTENT = 'Welcome to TalentMAP! Use this site to research positions and continue to bid using FSBid. New features are coming soon.';
