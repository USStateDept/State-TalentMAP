export function shouldShowGlossary(shouldShow) {
  return {
    type: 'SHOULD_SHOW_GLOSSARY',
    shouldShow,
  };
}

export function toggleGlossary(show = true) {
  return (dispatch) => {
    dispatch(shouldShowGlossary(show));
  };
}
