export function orgStatsFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'ORG_STATS_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function orgStatsFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'ORG_STATS_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function orgStats(state = {}, action) {
  switch (action.type) {
    case 'ORG_STATS_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

export function orgStatsSelections(state = {}, action) {
  switch (action.type) {
    case 'ORG_STATS_SELECTIONS_SAVE_SUCCESS':
      return action.result;
    default:
      return state;
  }
}

export function orgStatsFiltersHasErrored(state = false, action) {
  switch (action.type) {
    case 'ORG_STATS_FILTERS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function orgStatsFiltersIsLoading(state = false, action) {
  switch (action.type) {
    case 'ORG_STATS_FILTERS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function orgStatsFilters(state = {}, action) {
  switch (action.type) {
    case 'ORG_STATS_FILTERS_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
