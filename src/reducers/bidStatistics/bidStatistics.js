export function bidStatisticsHasErrored(state = false, action) {
  switch (action.type) {
    case 'BID_STATISTICS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bidStatisticsIsLoading(state = false, action) {
  switch (action.type) {
    case 'BID_STATISTICS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function bidStatistics(state = {}, action) {
  switch (action.type) {
    case 'BID_STATISTICS_FETCH_DATA_SUCCESS':
      return action.bidStatistics;
    default:
      return state;
  }
}
