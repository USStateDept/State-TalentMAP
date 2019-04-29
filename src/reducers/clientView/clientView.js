export const INITIAL_STATE = {
  loadingId: '',
  client: {},
  isLoading: false,
  hasErrored: false,
};

export default function clientViewAs(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_CLIENT_VIEW_AS':
      return { ...state, ...action.config };
    case 'UNSET_CLIENT_VIEW':
      return INITIAL_STATE;
    default:
      return state;
  }
}
