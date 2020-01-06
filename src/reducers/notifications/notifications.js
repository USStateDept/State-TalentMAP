export function notificationsHasErrored(state = false, action) {
  switch (action.type) {
    case 'NOTIFICATIONS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function notificationsIsLoading(state = false, action) {
  switch (action.type) {
    case 'NOTIFICATIONS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function notifications(state = { results: [] }, action) {
  switch (action.type) {
    case 'NOTIFICATIONS_FETCH_DATA_SUCCESS':
      return action.notifications;
    default:
      return state;
  }
}

export function notificationsPopoverHasErrored(state = false, action) {
  switch (action.type) {
    case 'NOTIFICATIONS_POPOVER_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function notificationsPopoverIsLoading(state = true, action) {
  switch (action.type) {
    case 'NOTIFICATIONS_POPOVER_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function notificationsPopover(state = { results: [] }, action) {
  switch (action.type) {
    case 'NOTIFICATIONS_POPOVER_FETCH_DATA_SUCCESS':
      return action.notifications;
    default:
      return state;
  }
}

export function notificationsCountHasErrored(state = false, action) {
  switch (action.type) {
    case 'NOTIFICATIONS_COUNT_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function notificationsCountIsLoading(state = true, action) {
  switch (action.type) {
    case 'NOTIFICATIONS_COUNT_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function notificationsCount(state = 0, action) {
  switch (action.type) {
    case 'NOTIFICATIONS_COUNT_FETCH_DATA_SUCCESS':
      return action.count;
    default:
      return state;
  }
}

export function markNotificationHasErrored(state = false, action) {
  switch (action.type) {
    case 'MARK_NOTIFICATION_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function markNotificationIsLoading(state = false, action) {
  switch (action.type) {
    case 'MARK_NOTIFICATION_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function markNotificationSuccess(state = false, action) {
  switch (action.type) {
    case 'MARK_NOTIFICATION_SUCCESS':
      return action.response;
    default:
      return state;
  }
}

export function markNotificationsHasErrored(state = false, action) {
  switch (action.type) {
    case 'MARK_NOTIFICATIONS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function markNotificationsIsLoading(state = false, action) {
  switch (action.type) {
    case 'MARK_NOTIFICATIONS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function markNotificationsSuccess(state = false, action) {
  switch (action.type) {
    case 'MARK_NOTIFICATIONS_SUCCESS':
      return action.response;
    default:
      return state;
  }
}
