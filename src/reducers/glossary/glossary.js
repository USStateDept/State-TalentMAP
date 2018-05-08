export const GLOSSARY_ERROR_OBJECT_DEFAULT = {
  id: null,
  message: null,
  hasErrored: false,
};

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

export function glossaryEditorHasErrored(state = false, action) {
  switch (action.type) {
    case 'GLOSSARY_EDITOR_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function glossaryEditorIsLoading(state = false, action) {
  switch (action.type) {
    case 'GLOSSARY_EDITOR_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function glossaryEditor(state = { results: [] }, action) {
  switch (action.type) {
    case 'GLOSSARY_EDITOR_FETCH_DATA_SUCCESS':
      return action.glossary;
    default:
      return state;
  }
}

export function glossaryPatchHasErrored(state = GLOSSARY_ERROR_OBJECT_DEFAULT, action) {
  switch (action.type) {
    case 'GLOSSARY_PATCH_HAS_ERRORED':
      return action.value;
    case '@@router/LOCATION_CHANGE':
      return GLOSSARY_ERROR_OBJECT_DEFAULT;
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

export function glossaryPostHasErrored(state = GLOSSARY_ERROR_OBJECT_DEFAULT, action) {
  switch (action.type) {
    case 'GLOSSARY_POST_HAS_ERRORED':
      return action.value;
    case '@@router/LOCATION_CHANGE':
      return GLOSSARY_ERROR_OBJECT_DEFAULT;
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
