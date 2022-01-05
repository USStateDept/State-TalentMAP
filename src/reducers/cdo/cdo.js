export function availableBiddersFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'AVAILABLE_BIDDERS_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function availableBiddersFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'AVAILABLE_BIDDERS_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function availableBiddersFetchDataSuccess(state = {}, action) {
  switch (action.type) {
    case 'AVAILABLE_BIDDERS_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
export function availableBiddersIdsErrored(state = false, action) {
  switch (action.type) {
    case 'AVAILABLE_BIDDERS_IDS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function availableBiddersIdsLoading(state = false, action) {
  switch (action.type) {
    case 'AVAILABLE_BIDDERS_IDS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function availableBiddersIdsSuccess(state = [], action) {
  switch (action.type) {
    case 'AVAILABLE_BIDDERS_IDS_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
export function availableBiddersToggleUserErrored(state = false, action) {
  switch (action.type) {
    case 'TOGGLE_AVAILABLE_BIDDERS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function availableBiddersToggleUserIsLoading(state = false, action) {
  switch (action.type) {
    case 'TOGGLE_AVAILABLE_BIDDERS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function availableBidderEditDataErrored(state = false, action) {
  switch (action.type) {
    case 'AVAILABLE_BIDDER_EDIT_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function availableBidderEditDataLoading(state = false, action) {
  switch (action.type) {
    case 'AVAILABLE_BIDDER_EDIT_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function availableBidderEditDataSuccess(state = {}, action) {
  switch (action.type) {
    case 'AVAILABLE_BIDDER_EDIT_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

