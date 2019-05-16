export function aboutContentHasErrored(state = false, action) {
  switch (action.type) {
    case 'ABOUT_CONTENT_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function aboutContentIsLoading(state = false, action) {
  switch (action.type) {
    case 'ABOUT_CONTENT_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function aboutContent(state = '', action) {
  switch (action.type) {
    case 'ABOUT_CONTENT_SUCCESS':
      return action.data;
    default:
      return state;
  }
}

export function aboutContentPatchHasErrored(state = false, action) {
  switch (action.type) {
    case 'ABOUT_CONTENT_PATCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function aboutContentPatchIsLoading(state = false, action) {
  switch (action.type) {
    case 'ABOUT_CONTENT_PATCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function aboutContentPatchSuccess(state = { success: false }, action) {
  switch (action.type) {
    case 'ABOUT_CONTENT_PATCH_SUCCESS':
      return action.success;
    default:
      return state;
  }
}
