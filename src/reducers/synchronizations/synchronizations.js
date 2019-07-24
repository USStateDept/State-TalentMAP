export function syncsHasErrored(state = false, action) {
  switch (action.type) {
    case 'SYNCS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

export function syncsIsLoading(state = false, action) {
  switch (action.type) {
    case 'SYNCS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function syncs(state = [], action) {
  switch (action.type) {
    case 'SYNCS_FETCH_DATA_SUCCESS':
      return action.syncs;
    default:
      return state;
  }
}

export function putAllSyncsHasErrored(state = false, action) {
  switch (action.type) {
    case 'PUT_ALL_SYNCS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

export function putAllSyncsIsLoading(state = false, action) {
  switch (action.type) {
    case 'PUT_ALL_SYNCS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function putAllSyncsSuccess(state = false, action) {
  switch (action.type) {
    case 'PUT_ALL_SYNCS_SUCCESS':
      return action.success;
    default:
      return state;
  }
}

export function patchSyncIsLoading(state = false, action) {
  switch (action.type) {
    case 'PATCH_SYNC_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function patchSyncHasErrored(state = false, action) {
  switch (action.type) {
    case 'PATCH_SYNC_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
