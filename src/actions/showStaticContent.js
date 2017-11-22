export function shouldShowStaticContent(shouldShow) {
  return {
    type: 'SHOULD_SHOW_STATIC_CONTENT',
    shouldShow,
  };
}

export function toggleStaticContent(show = true) {
  return (dispatch) => {
    dispatch(shouldShowStaticContent(show));
  };
}
