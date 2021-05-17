import { focusById } from '../utilities';
import { GLOSSARY_OPEN_ICON_ID, GLOSSARY_SEARCH_ID } from '../Constants/HtmlAttributes';

export function shouldShowGlossary(shouldShow) {
  return {
    type: 'SHOULD_SHOW_GLOSSARY',
    shouldShow,
  };
}

export function toggleGlossary(show = true) {
  return (dispatch) => {
    dispatch(shouldShowGlossary(show));
    // focus search on glossary open
    if (show) { focusById(GLOSSARY_SEARCH_ID); }
    if (!show) { focusById(GLOSSARY_OPEN_ICON_ID); }
  };
}
