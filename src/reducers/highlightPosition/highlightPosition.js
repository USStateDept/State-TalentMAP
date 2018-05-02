import { merge } from 'lodash';
import {
  HIGHLIGHT_POSITION_HAS_ERRORED,
  HIGHLIGHT_POSITION_IS_LOADING,
} from '../../actions/highlightPosition';

export const initialState = {
  loading: false,
  error: false,
  success: false,
};

export default function highlightPositionsReducer(state = initialState, action) {
  const newState = merge({}, state);

  switch (action.type) {
    case HIGHLIGHT_POSITION_HAS_ERRORED:
      newState.loading = false;
      newState.success = !action.error;
      newState.error = action.error;
      break;

    case HIGHLIGHT_POSITION_IS_LOADING:
      newState.loading = action.loading;
      newState.success = false;
      newState.error = false;
      break;

    default:
      break;
  }

  return newState;
}
