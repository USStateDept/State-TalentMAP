export function aihAddLegErrored(state = false, action) {
  switch (action.type) {
    case 'AIH_ADD_LEG_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function aihAddLegLoading(state = false, action) {
  switch (action.type) {
    case 'AIH_ADD_LEG_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function aihAddLegSuccess(state = [], action) {
  switch (action.type) {
    case 'AIH_ADD_LEG_SUCCESS':
      return action.data;
    default:
      return state;
  }
}

