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

export function glossaryPatchHasErrored(state = { id: null, hasErrored: false }, action) {
  switch (action.type) {
    case 'GLOSSARY_PATCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function glossaryPatchIsLoading(state = false, action) {
  switch (action.type) {
    case 'GLOSSARY_PATCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function glossaryPatchSuccess(state = { id: null, success: false }, action) {
  switch (action.type) {
    case 'GLOSSARY_PATCH_SUCCESS':
      return action.success;
    default:
      return state;
  }
}

export function glossaryPostHasErrored(state = false, action) {
  switch (action.type) {
    case 'GLOSSARY_POST_HAS_ERRORED':
      return action.hasErrored;
    case '@@router/LOCATION_CHANGE':
      return false;
    default:
      return state;
  }
}
export function glossaryPostIsLoading(state = false, action) {
  switch (action.type) {
    case 'GLOSSARY_POST_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function glossaryPostSuccess(state = { id: null, success: false }, action) {
  switch (action.type) {
    case 'GLOSSARY_POST_SUCCESS':
      return action.success;
    case '@@router/LOCATION_CHANGE':
      return { id: null, success: false };
    default:
      return state;
  }
}
