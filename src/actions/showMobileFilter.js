export function shouldShowMobileFilter(shouldShow) {
  return {
    type: 'SHOULD_SHOW_MOBILE_FILTER',
    shouldShow,
  };
}

export function toggleMobileFilter(show = true) {
  return (dispatch) => {
    dispatch(shouldShowMobileFilter(show));
  };
}
