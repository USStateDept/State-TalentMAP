export function bureauPositionBidsHasErrored(state = false, action) {
  switch (action.type) {
    case 'BUREAU_POSITION_BIDS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bureauPositionBidsIsLoading(state = false, action) {
  switch (action.type) {
    case 'BUREAU_POSITION_BIDS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function bureauPositionBids(state = [], action) {
  switch (action.type) {
    case 'BUREAU_POSITION_BIDS_FETCH_DATA_SUCCESS':
      return action.bids;
    default:
      return state;
  }
}

export function bureauPositionBidsAllHasErrored(state = false, action) {
  switch (action.type) {
    case 'BUREAU_POSITION_BIDS_ALL_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bureauPositionBidsAllIsLoading(state = false, action) {
  switch (action.type) {
    case 'BUREAU_POSITION_BIDS_ALL_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function bureauPositionBidsAll(state = [], action) {
  switch (action.type) {
    case 'BUREAU_POSITION_BIDS_ALL_FETCH_DATA_SUCCESS':
      return action.bids;
    default:
      return state;
  }
}

export function bureauPositionBidsRankingHasErrored(state = false, action) {
  switch (action.type) {
    case 'BUREAU_POSITION_BIDS_RANKING_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bureauPositionBidsRankingIsLoading(state = false, action) {
  switch (action.type) {
    case 'BUREAU_POSITION_BIDS_RANKING_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function bureauPositionBidsRanking(state = [], action) {
  switch (action.type) {
    case 'BUREAU_POSITION_BIDS_RANKING_FETCH_DATA_SUCCESS':
      return action.bids;
    default:
      return state;
  }
}

export function bureauPositionBidsSetRankingHasErrored(state = false, action) {
  switch (action.type) {
    case 'BUREAU_POSITION_BIDS_SET_RANKING_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bureauPositionBidsSetRankingIsLoading(state = false, action) {
  switch (action.type) {
    case 'BUREAU_POSITION_BIDS_SET_RANKING_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function bureauPositionBidsSetRanking(state = false, action) {
  switch (action.type) {
    case 'BUREAU_POSITION_BIDS_SET_RANKING_FETCH_DATA_SUCCESS':
      return action.success;
    default:
      return state;
  }
}

export function bidderRankingsHasErrored(state = new Set(), action) {
  const newSet = new Set(state);
  switch (action.type) {
    case 'BIDDER_RANKINGS_HAS_ERRORED':
      if (action.hasErrored.bool) {
        newSet.add(action.hasErrored.id);
        return newSet;
      }
      newSet.delete(action.hasErrored.id);
      return newSet;
    default:
      return state;
  }
}
export function bidderRankingsIsLoading(state = new Set(), action) {
  const newSet = new Set(state);
  switch (action.type) {
    case 'BIDDER_RANKINGS_IS_LOADING':
      if (action.isLoading.bool) {
        newSet.add(action.isLoading.id);
        return newSet;
      }
      newSet.delete(action.isLoading.id);
      return newSet;
    default:
      return state;
  }
}
export function bidderRankingFetchDataSuccess(state = {}, action) {
  switch (action.type) {
    case 'BIDDER_RANKING_FETCH_DATA_SUCCESS':
      if (action.results.clearAll) {
        return {};
      }
      return { ...state, [action.results.id]: action.results.data };
    default:
      return state;
  }
}
