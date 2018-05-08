import { find, merge } from 'lodash';

export function positionDetailsHasErrored(state = false, action) {
  switch (action.type) {
    case 'POSITION_DETAILS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function positionDetailsIsLoading(state = false, action) {
  switch (action.type) {
    case 'POSITION_DETAILS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function positionDetails(state = [], action) {
  switch (action.type) {
    case 'POSITION_DETAILS_FETCH_DATA_SUCCESS':
      return action.positionDetails;
    case 'POSITION_DETAILS_PATCH_STATE':
      // Patch state array so redux doesn't refresh for a simple update
      if (find(state, { id: action.positionDetails.id })) {
        // If position details exists already, then update just that item
        return state.map((item) => {
          if (item.id === action.positionDetails.id) {
            merge(item, action.positionDetails);
          }

          return item;
        });
      }
        // If position details doesn't exist, push it in
      state.push(action.positionDetails);
      return state;

    default:
      return state;
  }
}
