export function descriptionEditHasErrored(state = false, action) {
  switch (action.type) {
    case 'DESCRIPTION_EDIT_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function descriptionEditIsLoading(state = false, action) {
  switch (action.type) {
    case 'DESCRIPTION_EDIT_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function descriptionEditSuccess(state = false, action) {
  switch (action.type) {
    case 'DESCRIPTION_EDIT_SUCCESS':
      return action.success;
    default:
      return state;
  }
}
