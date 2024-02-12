export function bidSeasonsFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'BID_SEASONS_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

export function bidSeasonsFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'BID_SEASONS_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function bidSeasons(state = [], action) {
  switch (action.type) {
    case 'BID_SEASONS_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

export function bidSeasonsCreateSuccess(state = false, action) {
  switch (action.type) {
    case 'BID_SEASONS_POSITION_CREATE_SUCCESS':
      return action.success;
    default:
      return state;
  }
}

export function bidSeasonsEditSuccess(state = false, action) {
  switch (action.type) {
    case 'BID_SEASONS_POSITION_EDIT_SUCCESS':
      return action.success;
    default:
      return state;
  }
}
