export function notificationsHasErrored(state = false, action) {
  switch (action.type) {
    case 'NOTIFICATIONS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function notificationsIsLoading(state = true, action) {
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
export function markNotificationIsLoading(state = true, action) {
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
