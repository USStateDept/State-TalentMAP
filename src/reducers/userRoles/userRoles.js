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
      return action.results;
    default:
      return state;
  }
}

export function modifyPermissionHasErrored(state = false, action) {
  switch (action.type) {
    case 'MODIFY_PERMISSION_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function modifyPermissionIsLoading(state = false, action) {
  switch (action.type) {
    case 'MODIFY_PERMISSION_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function modifyPermissionSuccess(state = [], action) {
  switch (action.type) {
    case 'MODIFY_PERMISSION_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
