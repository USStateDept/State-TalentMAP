export function toastSuccess(toast, title, id, isUpdate, options) {
  return {
    type: 'TOAST_NOTIFICATION_SUCCESS',
    toast,
    title,
    id,
    isUpdate,
    options,
  };
}

export function toastError(toast, title, id, isUpdate, options) {
  return {
    type: 'TOAST_NOTIFICATION_ERROR',
    toast,
    title,
    id,
    isUpdate,
    options,
  };
}

export function toastWarning(toast, title, id, isUpdate, options) {
  return {
    type: 'TOAST_NOTIFICATION_WARNING',
    toast,
    title,
    id,
    isUpdate,
    options,
  };
}

export function toastInfo(toast, title, id, isUpdate, options) {
  return {
    type: 'TOAST_NOTIFICATION_INFO',
    toast,
    title,
    id,
    isUpdate,
    options,
  };
}

export function toastHandshake(toast, title, options) {
  return {
    type: 'TOAST_NOTIFICATION_HANDSHAKE',
    toast,
    title,
    options,
  };
}

export function toastHandshakeRevoke(toast, title, customClassName, options) {
  return {
    type: 'TOAST_NOTIFICATION_REVOKE_HANDSHAKE',
    toast,
    title,
    customClassName,
    options,
  };
}
