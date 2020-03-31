export default function toast(state = { type: 'success', message: '', title: '' }, action) {
  const { toast: message, title, id, isUpdate } = action;
  switch (action.type) {
    case 'TOAST_NOTIFICATION_SUCCESS':
      return { type: 'success', message, title, id, isUpdate };
    case 'TOAST_NOTIFICATION_ERROR':
      return { type: 'error', message, title, id, isUpdate };
    case 'TOAST_NOTIFICATION_WARNING':
      return { type: 'warning', message, title, id, isUpdate };
    case 'TOAST_NOTIFICATION_INFO':
      return { type: 'info', message, title, id, isUpdate };
    default:
      return state;
  }
}
