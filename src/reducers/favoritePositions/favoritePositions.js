import { get } from 'lodash';

export function favoritePositionsHasErrored(state = false, action) {
  switch (action.type) {
    case 'FAVORITE_POSITIONS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function favoritePositionsIsLoading(state = false, action) {
  switch (action.type) {
    case 'FAVORITE_POSITIONS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function favoritePositions(state = {
  favorites: [], favoritesPV: [], counts: {} }, action) {
  switch (action.type) {
    case 'FAVORITE_POSITIONS_FETCH_DATA_SUCCESS':
      return {
        ...state,
        ...action.results,
        counts: {
          ...state.counts,
          ...get(action, 'results.counts', {}),
        },
      };
    default:
      return state;
  }
}
