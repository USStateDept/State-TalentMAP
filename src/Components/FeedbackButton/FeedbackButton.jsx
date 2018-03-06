import React from 'react';
import PropTypes from 'prop-types';
import { FEEDBACK_OPEN_ICON_ID } from '../../Constants/HtmlAttributes';

const FeedbackButton = ({ toggleVisibility }) => (
  <button id={FEEDBACK_OPEN_ICON_ID} className="tm-feedback-button" onClick={toggleVisibility}>
    Feedback
  </button>
);

FeedbackButton.propTypes = {
  toggleVisibility: PropTypes.func.isRequired,
};

export default FeedbackButton;
