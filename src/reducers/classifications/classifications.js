export function classificationsHasErrored(state = false, action) {
  switch (action.type) {
    case 'CLASSIFICATIONS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

export function classificationsIsLoading(state = false, action) {
  switch (action.type) {
    case 'CLASSIFICATIONS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function classifications(state = [], action) {
  switch (action.type) {
    case 'CLASSIFICATIONS_FETCH_DATA_SUCCESS':
      return action.classifications;
    default:
      return state;
  }
}
