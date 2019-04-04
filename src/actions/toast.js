export function toastSuccess(toast, title) {
  return {
    type: 'TOAST_NOTIFICATION_SUCCESS',
    toast,
    title,
  };
}

export function toastError(toast, title) {
  return {
    type: 'TOAST_NOTIFICATION_ERROR',
    toast,
    title,
  };
}
