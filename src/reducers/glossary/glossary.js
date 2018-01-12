export function glossaryHasErrored(state = false, action) {
  switch (action.type) {
    case 'GLOSSARY_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function glossaryIsLoading(state = false, action) {
  switch (action.type) {
    case 'GLOSSARY_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function glossary(state = { results: [] }, action) {
  switch (action.type) {
    case 'GLOSSARY_FETCH_DATA_SUCCESS':
      return action.glossary;
    default:
      return state;
  }
}
