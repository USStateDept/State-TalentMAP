import { findLastIndex } from 'lodash';

export default function routerLocations(state = [], action) {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE': {
      // only write to the history if this was a new navigation change
      // i.e. not a browser back/forward
      const index = findLastIndex(state, a => a.key === action.payload.key);
      if (index >= 0) {
        return [...state].splice(0, index + 1);
      }
      return [...state, action.payload];
    }
    default:
      return state;
  }
}
