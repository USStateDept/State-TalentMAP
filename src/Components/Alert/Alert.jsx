import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ type, title, messages }) => (
  // 'type' is injected into the class name
  // type 'error' requires an ARIA role
  <div className={`usa-alert usa-alert-${type}`} role={(type === 'error') ? 'alert' : null}>
    <div className="usa-alert-body">
      <h3 className="usa-alert-heading">{title}</h3>
      {messages.map((message, index) =>
        (<p className="usa-alert-text" key={index}>{/* eslint-disable react/no-array-index-key */}
          {message.body}
        </p>),
      )}
    </div>
  </div>
);

Alert.propTypes = {
  type: PropTypes.oneOf(['info', 'warning', 'error', 'success']),
  title: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      body: PropTypes.string,
    })),
};

Alert.defaultProps = {
  type: 'info', // should be one of the USWDS alert types - https://standards.usa.gov/components/alerts/
  messages: [{ body: '' }],
};

export default Alert;
