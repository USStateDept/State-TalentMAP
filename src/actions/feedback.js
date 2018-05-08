import api from '../api';
import { propOrDefault } from '../utilities';

export function feedbackHasErrored(message) {
  return {
    type: 'FEEDBACK_HAS_ERRORED',
    hasErrored: message,
  };
}

export function feedbackIsSending(bool) {
  return {
    type: 'FEEDBACK_IS_SENDING',
    isLoading: bool,
  };
}

export function feedbackSuccess(bool) {
  return {
    type: 'FEEDBACK_SUCCESS',
    isSuccess: bool,
  };
}

export function feedbackSubmitData(comments, isInterestedInHelping = false) {
  return (dispatch) => {
    dispatch(feedbackIsSending(true));
    dispatch(feedbackSuccess(false));
    dispatch(feedbackHasErrored(false));
    api.post('/feedback/', { comments, is_interested_in_helping: isInterestedInHelping })
      .then((response) => {
        dispatch(feedbackIsSending(false));
        dispatch(feedbackHasErrored(false));
        return response.data;
      })
      .then(() => dispatch(feedbackSuccess(true)))
      .catch((err) => {
        const errorMessage = propOrDefault(
          err,
          'response.data.comments[0]',
          'An error occurred trying to submit feedback. Please try again.',
        );

        dispatch(feedbackHasErrored(errorMessage));
        dispatch(feedbackIsSending(false));
        dispatch(feedbackSuccess(false));
      });
  };
}
