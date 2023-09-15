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


export function bidSeasonsSelections(state = {}, action) {
  switch (action.type) {
    case 'BID_SEASONS_SELECTIONS_SAVE_SUCCESS':
      return action.result;
    default:
      return state;
  }
}

export function bidSeasonsSearchSelections(state = {}, action) {
  switch (action.type) {
    case 'BID_SEASONS_POSITION_SEARCH_SELECTIONS_SAVE_SUCCESS':
      return action.result;
    default:
      return state;
  }
}


export function bidSeasonsCreateHasErrored(state = false, action) {
  switch (action.type) {
    case 'BID_SEASONS_POSITION_REMOVE_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bidSeasonsCreateIsLoading(state = false, action) {
  switch (action.type) {
    case 'BID_SEASONS_POSITION_REMOVE_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function bidSeasonsCreateSuccess(state = [], action) {
  switch (action.type) {
    case 'BID_SEASONS_POSITION_REMOVE_SUCCESS':
      return action.data;
    default:
      return state;
  }
}

export function bidSeasonsEditHasErrored(state = false, action) {
  switch (action.type) {
    case 'BID_SEASONS_POSITION_EDIT_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bidSeasonsEditIsLoading(state = false, action) {
  switch (action.type) {
    case 'BID_SEASONS_POSITION_EDIT_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function bidSeasonsEditSuccess(state = [], action) {
  switch (action.type) {
    case 'BID_SEASONS_POSITION_EDIT_SUCCESS':
      return action.data;
    default:
      return state;
  }
}
