export function aiModifyHasErrored(state = false, action) {
  switch (action.type) {
    case 'AI_MODIFY_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function aiModifyIsLoading(state = false, action) {
  switch (action.type) {
    case 'AI_MODIFY_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function ai(state = false, action) {
  switch (action.type) {
    case 'AI_MODIFY_SUCCESS':
      return action.data;
    default:
      return state;
  }
}

export function fetchAIHasErrored(state = false, action) {
  switch (action.type) {
    case 'FETCH_AI_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function fetchAIIsLoading(state = false, action) {
  switch (action.type) {
    case 'FETCH_AI_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function fetchAISuccess(state = {}, action) {
  switch (action.type) {
    case 'FETCH_AI_SUCCESS':
      return action.data;
    default:
      return state;
  }
}
export function validateAIHasErrored(state = false, action) {
  switch (action.type) {
    case 'VALIDATE_AI_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function validateAIIsLoading(state = false, action) {
  switch (action.type) {
    case 'VALIDATE_AI_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function aiValidation(state = {}, action) {
  switch (action.type) {
    case 'VALIDATE_AI_SUCCESS':
      return action.data;
    default:
      return state;
  }
}

