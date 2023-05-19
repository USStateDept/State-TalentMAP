export function aiCreateHasErrored(state = false, action) {
  switch (action.type) {
    case 'AI_CREATE_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function aiCreateIsLoading(state = false, action) {
  switch (action.type) {
    case 'AI_CREATE_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function ai(state = [], action) {
  switch (action.type) {
    case 'AI_CREATE_SUCCESS':
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

