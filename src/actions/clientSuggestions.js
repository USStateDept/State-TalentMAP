import api from '../api';
import { INITIAL_STATE } from '../reducers/clientSuggestions/clientSuggestions';

export function clientSuggestionsSuccess(suggestions, id) {
  return {
    type: 'SET_CLIENT_SUGGESTIONS',
    data: { ...INITIAL_STATE, suggestions, id },
  };
}

export function clientSuggestionsIsLoading(id) {
  return {
    type: 'SET_CLIENT_SUGGESTIONS',
    data: { ...INITIAL_STATE, isLoading: true, id },
  };
}

export function clientSuggestionsError() {
  return {
    type: 'SET_CLIENT_SUGGESTIONS',
    data: { ...INITIAL_STATE, hasErrored: true },
  };
}

export function fetchClientSuggestions(id) {
  return (dispatch) => {
    dispatch(clientSuggestionsIsLoading(id));
    api()
      .get(`/fsbid/client/${id}/suggestions/`)
      .then(({ data }) => data)
      .then((suggestions) => {
        dispatch(clientSuggestionsSuccess(suggestions, id));
      })
      .catch(() => {
        dispatch(clientSuggestionsError());
      });
  };
}
