import { DEFAULT_USER_PROFILE } from '../../Constants/DefaultProps';

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
export function userProfile(state = DEFAULT_USER_PROFILE, action) {
  switch (action.type) {
    case 'USER_PROFILE_FETCH_DATA_SUCCESS':
      return action.userProfile;
    default:
      return state;
  }
}
export function userProfileFavoritePositionHasErrored(state = false, action) {
  switch (action.type) {
    case 'USER_PROFILE_FAVORITE_POSITION_HAS_ERRORED':
      return action.userProfileFavoritePositionHasErrored;
    default:
      return state;
  }
}
export function userProfileFavoritePositionIsLoading(state = false, action) {
  switch (action.type) {
    case 'USER_PROFILE_FAVORITE_POSITION_IS_LOADING':
      return action.userProfileFavoritePositionIsLoading;
    default:
      return state;
  }
}
