export function userProfileHasErrored(state = false, action) {
  switch (action.type) {
    case 'USER_PROFILE_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function userProfileIsLoading(state = false, action) {
  switch (action.type) {
    case 'USER_PROFILE_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function userProfile(state = {}, action) {
  switch (action.type) {
    case 'USER_PROFILE_FETCH_DATA_SUCCESS':
      return action.userProfile;
    default:
      return state;
  }
}
