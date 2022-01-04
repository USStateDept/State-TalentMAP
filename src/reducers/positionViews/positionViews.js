export function positionViewsHasErrored(state = false, action) {
  switch (action.type) {
    case 'POSITION_VIEWS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function positionViewsIsLoading(state = false, action) {
  switch (action.type) {
    case 'POSITION_VIEWS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function positionViews(state = [], action) {
  switch (action.type) {
    case 'POSITION_VIEWS_SUCCESS':
      return action.count;
    default:
      return state;
  }
}
