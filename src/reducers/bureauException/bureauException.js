export function bureauExceptionErrored(state = false, action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTION_IS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bureauExceptionLoading(state = false, action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTION_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function bureauExceptionSuccess(state = [], action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTION_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

export function bureauExceptionListErrored(state = false, action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTION_LIST_IS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bureauExceptionListLoading(state = false, action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTION_LIST_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function bureauExceptionListSuccess(state = [], action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTION_LIST_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

export function bureauExceptionEditIsLoading(state = false, action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTION_EDIT_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function bureauExceptionEditIsErrored(state = false, action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTION_EDIT_IS_ERRORED':
      return action.isLoading;
    default:
      return state;
  }
}

export function bureauExceptionEditSuccess(state = [], action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTION_EDIT_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

export function bureauExceptionAddIsErrored(state = false, action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTION_ADD_IS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bureauExceptionAddIsLoading(state = false, action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTION_ADD_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function bureauExceptionAddSuccess(state = [], action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTION_ADD_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

export function bureauExceptionDeleteIsErrored(state = false, action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTION_DELETE_IS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bureauExceptionDeleteIsLoading(state = false, action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTION_DELETE_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function bureauExceptionDeleteSuccess(state = [], action) {
  switch (action.type) {
    case 'BUREAU_EXCEPTION_DELETE_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
