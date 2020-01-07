export function positionDetailsHasErrored(state = false, action) {
  switch (action.type) {
    case 'POSITION_DETAILS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function positionDetailsIsLoading(state = false, action) {
  switch (action.type) {
    case 'POSITION_DETAILS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function positionDetails(state = {}, action) {
  switch (action.type) {
    case 'POSITION_DETAILS_FETCH_DATA_SUCCESS':
      return action.positionDetails;
    case 'POSITION_DETAILS_PATCH_STATE': {
      // Patch state array so redux doesn't refresh for a simple update.
      // Pushes specifically to the "position" substate since this is
      // only currently being used for updating highlighted status.
      const state$ = { ...state };
      const objectToCheck = state.id;
      if (objectToCheck === action.positionDetails.id) {
        state$.position = { ...state$.position, ...action.positionDetails };
      }
      return state$;
    }
    default:
      return state;
  }
}
