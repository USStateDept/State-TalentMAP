import { RECEIVE_BID_CYCLES } from '../../actions/bidCycles';

export const initialState = [];

export default function bidCyclesReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_BID_CYCLES:
      return action.data;
    default:
      return state;
  }
}
