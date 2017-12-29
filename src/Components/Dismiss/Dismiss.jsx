import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

const Dismiss = ({ children, onDismiss, className, buttonClassName, buttonTitle }) => (
  <div className={`usa-grid-full dismiss-container ${className}`}>
    {children}
    <button className={buttonClassName} title={buttonTitle} onClick={onDismiss}>
      <FontAwesome name="close" />
      <span className="usa-sr-only">{buttonTitle}</span>
    </button>
  </div>
);

Dismiss.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string, // optional class to apply to the container
  buttonClassName: PropTypes.string, // optional class to apply to the dismiss button
  onDismiss: PropTypes.func.isRequired,
  buttonTitle: PropTypes.string,
};

Dismiss.defaultProps = {
  className: '',
  buttonClassName: 'dismiss-button',
  buttonTitle: 'Dismiss this alert',
};

export default Dismiss;
