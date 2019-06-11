export function logsHasErrored(state = false, action) {
  switch (action.type) {
    case 'LOGS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function logsIsLoading(state = false, action) {
  switch (action.type) {
    case 'LOGS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function logsSuccess(state = '', action) {
  switch (action.type) {
    case 'LOGS_SUCCESS':
      return action.success;
    default:
      return state;
  }
}

export function logsListHasErrored(state = false, action) {
  switch (action.type) {
    case 'LOGS_LIST_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function logsListIsLoading(state = false, action) {
  switch (action.type) {
    case 'LOGS_LIST_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function logsListSuccess(state = [], action) {
  switch (action.type) {
    case 'LOGS_LIST_SUCCESS':
      return action.success;
    default:
      return state;
  }
}

export function logHasErrored(state = false, action) {
  switch (action.type) {
    case 'LOG_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function logIsLoading(state = false, action) {
  switch (action.type) {
    case 'LOG_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function logSuccess(state = [], action) {
  switch (action.type) {
    case 'LOG_SUCCESS':
      return action.success;
    default:
      return state;
  }
}

export function logToDownloadHasErrored(state = false, action) {
  switch (action.type) {
    case 'LOG_TO_DOWNLOAD_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function logToDownloadIsLoading(state = false, action) {
  switch (action.type) {
    case 'LOG_TO_DOWNLOAD_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function logToDownloadSuccess(state = '', action) {
  switch (action.type) {
    case 'LOG_TO_DOWNLOAD_SUCCESS':
      return action.success;
    default:
      return state;
  }
}
