export function usersHasErrored(state = false, action) {
  switch (action.type) {
    case 'USERS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function usersIsLoading(state = false, action) {
  switch (action.type) {
    case 'USERS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function usersSuccess(state = [], action) {
  switch (action.type) {
    case 'USERS_SUCCESS':
      return action.success;
    default:
      return state;
  }
}
