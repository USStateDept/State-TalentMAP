export function homeBannerContentHasErrored(state = false, action) {
  switch (action.type) {
    case 'HOME_BANNER_CONTENT_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function homeBannerContentIsLoading(state = false, action) {
  switch (action.type) {
    case 'HOME_BANNER_CONTENT_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function homeBannerContent(state = '', action) {
  switch (action.type) {
    case 'HOME_BANNER_CONTENT_SUCCESS':
      return action.data;
    default:
      return state;
  }
}

export function homeBannerContentPatchHasErrored(state = false, action) {
  switch (action.type) {
    case 'HOME_BANNER_CONTENT_PATCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function homeBannerContentPatchIsLoading(state = false, action) {
  switch (action.type) {
    case 'HOME_BANNER_CONTENT_PATCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function homeBannerContentPatchSuccess(state = { success: false }, action) {
  switch (action.type) {
    case 'HOME_BANNER_CONTENT_PATCH_SUCCESS':
      return action.success;
    default:
      return state;
  }
}
