import { focusById } from '../utilities';
import { FEEDBACK_INPUT_ID, FEEDBACK_OPEN_ICON_ID } from '../Constants/HtmlAttributes';

export function shouldShowFeedback(shouldShow) {
  return {
    type: 'SHOULD_SHOW_FEEDBACK',
    shouldShow,
  };
}

export function toggleFeedback(show = true) {
  return (dispatch) => {
    dispatch(shouldShowFeedback(show));
    // focus search on glossary open
    if (show) { focusById(FEEDBACK_INPUT_ID); }
    if (!show) { focusById(FEEDBACK_OPEN_ICON_ID); }
  };
}
