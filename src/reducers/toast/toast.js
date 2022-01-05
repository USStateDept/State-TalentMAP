export default function toast(state = { type: 'success', message: '', title: '', customClassName: '', options: {} }, action) {
  const { toast: message, title, id, isUpdate, customClassName, options } = action;
  switch (action.type) {
    case 'TOAST_NOTIFICATION_SUCCESS':
      return { type: 'success', message, title, id, isUpdate, options };
    case 'TOAST_NOTIFICATION_ERROR':
      return { type: 'error', message, title, id, isUpdate, options };
    case 'TOAST_NOTIFICATION_WARNING':
      return { type: 'warning', message, title, id, isUpdate, options };
    case 'TOAST_NOTIFICATION_INFO':
      return { type: 'info', message, title, id, isUpdate, options };
    case 'TOAST_NOTIFICATION_HANDSHAKE':
      return { type: 'dark', message, title, options };
    case 'TOAST_NOTIFICATION_REVOKE_HANDSHAKE':
      return { type: 'error', message, title, customClassName, options };
    default:
      return state;
  }
}
