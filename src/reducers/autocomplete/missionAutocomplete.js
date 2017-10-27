export function missionSearchHasErrored(state = false, action) {
  switch (action.type) {
    case 'MISSION_SEARCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function missionSearchIsLoading(state = false, action) {
  switch (action.type) {
    case 'MISSION_SEARCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function missionSearchSuccess(state = [], action) {
  switch (action.type) {
    case 'MISSION_SEARCH_FETCH_DATA_SUCCESS':
      return action.missions;
    default:
      return state;
  }
}
