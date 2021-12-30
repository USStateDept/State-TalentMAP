export function aihHasErrored(state = false, action) {
  switch (action.type) {
    case 'AIH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function aihIsLoading(state = false, action) {
  switch (action.type) {
    case 'AIH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function aih(state = [], action) {
  switch (action.type) {
    case 'AIH_FETCH_DATA_SUCCESS':
      return action.data;
    default:
      return state;
  }
}

