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
export function notifications(state = [], action) {
  switch (action.type) {
    case 'NOTIFICATIONS_FETCH_DATA_SUCCESS':
      return action.notifications;
    default:
      return state;
  }
}
