export function toastSuccess(toast) {
  return {
    type: 'TOAST_NOTIFICATION_SUCCESS',
    toast,
  };
}

export function toastError(toast) {
  return {
    type: 'TOAST_NOTIFICATION_ERROR',
    toast,
  };
}
