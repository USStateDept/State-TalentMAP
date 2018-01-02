import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

const MailToButton = ({ email }) => (
  <span className="mail-to-button">
    <a href={`mailto:${email}`}>
      <FontAwesome name="envelope-o" />
    </a>
  </span>
);

// This is unrequired because we don't have emails for orgs/bureaus yet
MailToButton.propTypes = {
  email: PropTypes.string,
};

MailToButton.defaultProps = {
  email: '',
};

export default MailToButton;
