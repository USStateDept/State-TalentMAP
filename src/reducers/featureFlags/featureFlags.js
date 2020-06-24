export function featureFlagsHasErrored(state = false, action) {
  switch (action.type) {
    case 'FEATURE_FLAGS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function featureFlagsIsLoading(state = false, action) {
  switch (action.type) {
    case 'FEATURE_FLAGS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function featureFlags(state = {}, action) {
  switch (action.type) {
    case 'FEATURE_FLAGS_DATA_SUCCESS':
      return action.data;
    default:
      return state;
  }
}

export function featureFlagsPostHasErrored(state = false, action) {
  switch (action.type) {
    case 'FEATURE_FLAGS_POST_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function featureFlagsPostIsLoading(state = false, action) {
  switch (action.type) {
    case 'FEATURE_FLAGS_POST_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function featureFlagsPostSuccess(state = { success: false }, action) {
  switch (action.type) {
    case 'FEATURE_FLAGS_POST_SUCCESS':
      return action.success;
    default:
      return state;
  }
}
