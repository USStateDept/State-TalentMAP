import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { FEEDBACK_OPEN_ICON_ID } from '../../Constants/HtmlAttributes';

const FeedbackButton = ({ toggleVisibility }) => (
  <button id={FEEDBACK_OPEN_ICON_ID} className="tm-feedback-button" onClick={toggleVisibility}>
    Provide Feedback <FontAwesome name="angle-up" />
  </button>
);

FeedbackButton.propTypes = {
  toggleVisibility: PropTypes.func.isRequired,
};

export default FeedbackButton;
