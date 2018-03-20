import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import Form from '../Form';
import FieldSet from '../FieldSet/FieldSet';
import TextEditor from '../TextEditor';
import CheckBox from '../CheckBox';
import { FEEDBACK_INPUT_ID } from '../../Constants/HtmlAttributes';

const getSendingMessage = (feedbackIsSending, feedbackHasErrored) => {
  if (feedbackIsSending && !feedbackHasErrored) {
    return (<span className="submission-status-text">Sending...</span>);
  }

  return null;
};

const getErrorMessage = (feedbackIsSending, feedbackHasErrored) => {
  if (!feedbackIsSending && feedbackHasErrored.hasErrored) {
    return (<span className="usa-input-error-message" role="alert">{feedbackHasErrored.message}</span>);
  }

  return null;
};

const getSuccessMessage = (feedbackSuccess, feedbackHasErrored, feedbackIsSending) => {
  if (feedbackSuccess && !feedbackHasErrored && !feedbackIsSending) {
    return (<span className="submission-status-text">Submitted!</span>);
  }

  return null;
};

const FeedbackFormComponent = ({ visible, toggleVisibility, feedbackIsSending,
  feedbackHasErrored, submitFeedback,
  onChangeText, feedbackText, additionalFeedbackCheck,
  feedbackSuccess, onCheckBoxClick }) =>
  (
    <div className="tm-feedback">
      <div
        id="feedback"
        className={`feedback ${visible ? 'feedback-visible' : 'feedback-hidden'}`}
        aria-describedby="feedback-title"
        aria-hidden={!visible}
      >
        <button
          id={FEEDBACK_INPUT_ID}
          title="Close feedback"
          className="feedback-close"
          onClick={toggleVisibility}
        >
          <FontAwesome name="times" />
          <span className="usa-sr-only">Close Feedback</span>
        </button>
        <div className="feedback-content-container">
          <h3 id="feedback-title">Feedback</h3>
          <Form onFormSubmit={submitFeedback}>
            <FieldSet legend="General feedback">
              <TextEditor
                hideButtons
                onChangeText={onChangeText}
                initialText={feedbackText}
              />
            </FieldSet>
            <FieldSet legend="Additional feedback" legendSrOnly>
              <CheckBox
                id="additional-feedback-checkbox"
                value={additionalFeedbackCheck}
                label="Can we contact you about providing additional feedback for TalentMAP?"
                onCheckBoxClick={onCheckBoxClick}
              />
            </FieldSet>
            <button className="usa-button feedback-submit-button" onClick={submitFeedback}>Submit</button>
          </Form>
          <div className="feedback-submission-messages">
            {getSendingMessage(feedbackIsSending, feedbackHasErrored.hasErrored)}
            {getErrorMessage(feedbackIsSending, feedbackHasErrored)}
            {getSuccessMessage(feedbackSuccess,
              feedbackHasErrored.hasErrored, feedbackIsSending)}
          </div>
        </div>
      </div>
    </div>
  );

FeedbackFormComponent.propTypes = {
  visible: PropTypes.bool,
  toggleVisibility: PropTypes.func.isRequired,
  feedbackIsSending: PropTypes.bool,
  feedbackHasErrored: PropTypes.shape({ hasErrored: PropTypes.bool, message: PropTypes.string }),
  feedbackSuccess: PropTypes.bool,
  submitFeedback: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  feedbackText: PropTypes.string,
  additionalFeedbackCheck: PropTypes.bool,
  onCheckBoxClick: PropTypes.func.isRequired,
};

FeedbackFormComponent.defaultProps = {
  visible: false,
  feedbackIsSending: false,
  feedbackHasErrored: {},
  feedbackSuccess: false,
  feedbackText: '',
  additionalFeedbackCheck: false,
};

export default FeedbackFormComponent;
