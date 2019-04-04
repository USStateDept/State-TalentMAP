export default function toast(state = { type: 'success', message: '', title: '' }, action) {
  switch (action.type) {
    case 'TOAST_NOTIFICATION_SUCCESS':
      return { type: 'success', message: action.toast, title: action.title };
    case 'TOAST_NOTIFICATION_ERROR':
      return { type: 'error', message: action.toast, title: action.title };
    default:
      return state;
  }
}
