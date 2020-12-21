export function shortListLock(state = false, action) {
  switch (action.type) {
    case 'SHORT_LIST_LOCK_SUCCESS':
      return action.isLocked;
    default:
      return state;
  }
}

export function shortListLockIsLoading(state = false, action) {
  switch (action.type) {
    case 'SHORT_LIST_LOCK_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function shortListLockHasErrored(state = '', action) {
  switch (action.type) {
    case 'SHORT_LIST_LOCK_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

export function shortListLockUpdateIsLoading(state = false, action) {
  switch (action.type) {
    case 'SHORT_LIST_LOCK_UPDATE_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function shortListLockUpdateHasErrored(state = '', action) {
  switch (action.type) {
    case 'SHORT_LIST_LOCK_UPDATE_HAS_ERRORED':
      return action.hasErrored || '';
    default:
      return state;
  }
}
