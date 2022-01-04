import { DEFAULT_USER_PROFILE } from '../../Constants/DefaultProps';

export function userProfilePublicHasErrored(state = false, action) {
  switch (action.type) {
    case 'USER_PROFILE_PUBLIC_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function userProfilePublicIsLoading(state = false, action) {
  switch (action.type) {
    case 'USER_PROFILE_PUBLIC_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function userProfilePublic(state = DEFAULT_USER_PROFILE, action) {
  switch (action.type) {
    case 'USER_PROFILE_PUBLIC_FETCH_DATA_SUCCESS':
      return action.userProfile;
    default:
      return state;
  }
}
