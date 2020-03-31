export function toastSuccess(toast, title, id, isUpdate) {
  return {
    type: 'TOAST_NOTIFICATION_SUCCESS',
    toast,
    title,
    id,
    isUpdate,
  };
}

export function toastError(toast, title, id, isUpdate) {
  return {
    type: 'TOAST_NOTIFICATION_ERROR',
    toast,
    title,
    id,
    isUpdate,
  };
}

export function toastWarning(toast, title, id, isUpdate) {
  return {
    type: 'TOAST_NOTIFICATION_WARNING',
    toast,
    title,
    id,
    isUpdate,
  };
}

export function toastInfo(toast, title, id, isUpdate) {
  return {
    type: 'TOAST_NOTIFICATION_INFO',
    toast,
    title,
    id,
    isUpdate,
  };
}
