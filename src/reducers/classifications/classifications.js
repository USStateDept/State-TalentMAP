export function classificationsHasErrored(state = false, action) {
  switch (action.type) {
    case 'CLASSIFICATIONS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

export function classificationsIsLoading(state = false, action) {
  switch (action.type) {
    case 'CLASSIFICATIONS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function classifications(state = [], action) {
  switch (action.type) {
    case 'CLASSIFICATIONS_FETCH_DATA_SUCCESS':
      return action.classifications;
    default:
      return state;
  }
}

export function updateClassificationsHasErrored(state = false, action) {
  switch (action.type) {
    case 'UPDATE_CLASSIFICATIONS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

export function updateClassificationsIsLoading(state = false, action) {
  switch (action.type) {
    case 'UPDATE_CLASSIFICATIONS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function userClassificationsHasErrored(state = false, action) {
  switch (action.type) {
    case 'USER_CLASSIFICATIONS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

export function userClassificationsIsLoading(state = false, action) {
  switch (action.type) {
    case 'USER_CLASSIFICATIONS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function userClassifications(state = [], action) {
  switch (action.type) {
    case 'USER_CLASSIFICATIONS_SUCCESS':
      return action.classifications;
    default:
      return state;
  }
}
