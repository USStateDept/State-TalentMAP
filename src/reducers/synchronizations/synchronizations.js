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
