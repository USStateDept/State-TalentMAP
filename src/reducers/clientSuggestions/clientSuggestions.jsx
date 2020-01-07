export const INITIAL_STATE = {
  id: '',
  suggestions: {},
  isLoading: false,
  hasErrored: false,
};

export default function clientSuggestions(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_CLIENT_SUGGESTIONS':
      return { ...state, ...action.data };
    case 'UNSET_CLIENT_SUGGESTIONS':
      return INITIAL_STATE;
    default:
      return state;
  }
}
