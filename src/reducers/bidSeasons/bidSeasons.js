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


// export function bidSeasonsPositionSearchFetchDataErrored(state = false, action) {
//   switch (action.type) {
//     case 'BID_SEASONS_POSITION_SEARCH_FETCH_HAS_ERRORED':
//       return action.hasErrored;
//     default:
//       return state;
//   }
// }
// export function bidSeasonsPositionSearchFetchDataLoading(state = false, action) {
//   switch (action.type) {
//     case 'BID_SEASONS_POSITION_SEARCH_FETCH_IS_LOADING':
//       return action.isLoading;
//     default:
//       return state;
//   }
// }
// export function bidSeasonsPositionSearch(state = [], action) {
//   switch (action.type) {
//     case 'BID_SEASONS_POSITION_SEARCH_FETCH_SUCCESS':
//       return action.results;
//     default:
//       return state;
//   }
// }

export function bidSeasonsPositionSearchSelections(state = {}, action) {
  switch (action.type) {
    case 'BID_SEASONS_POSITION_SEARCH_SELECTIONS_SAVE_SUCCESS':
      return action.result;
    default:
      return state;
  }
}


export function bidSeasonsPositionRemoveHasErrored(state = false, action) {
  switch (action.type) {
    case 'BID_SEASONS_POSITION_REMOVE_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bidSeasonsPositionRemoveIsLoading(state = false, action) {
  switch (action.type) {
    case 'BID_SEASONS_POSITION_REMOVE_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function bidSeasonsPositionRemoveSuccess(state = [], action) {
  switch (action.type) {
    case 'BID_SEASONS_POSITION_REMOVE_SUCCESS':
      return action.data;
    default:
      return state;
  }
}

export function bidSeasonsPositionEditHasErrored(state = false, action) {
  switch (action.type) {
    case 'BID_SEASONS_POSITION_EDIT_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bidSeasonsPositionEditIsLoading(state = false, action) {
  switch (action.type) {
    case 'BID_SEASONS_POSITION_EDIT_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function bidSeasonsPositionEditSuccess(state = [], action) {
  switch (action.type) {
    case 'BID_SEASONS_POSITION_EDIT_SUCCESS':
      return action.data;
    default:
      return state;
  }
}
