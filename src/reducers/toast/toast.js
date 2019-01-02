export default function toast(state = { type: 'success', message: '' }, action) {
  switch (action.type) {
    case 'TOAST_NOTIFICATION_SUCCESS':
      return { type: 'success', message: action.toast };
    case 'TOAST_NOTIFICATION_ERROR':
      return { type: 'error', message: action.toast };
    default:
      return state;
  }
}
