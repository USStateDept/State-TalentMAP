import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { isEqual } from 'lodash';

class AlertAlt extends Component {
  // prevent unneeded rerenders, which can cause accessibility issues
  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps);
  }
  render() {
    const { type, title, message, isAriaLive } = this.props;
    let icon;
    switch (type) {
      case 'warning':
        icon = 'exclamation-triangle';
        break;
      case 'error':
        icon = 'exclamation-triangle';
        break;
      case 'success':
        icon = 'check-circle';
        break;
    // default to info
      default:
        icon = 'info-circle';
        break;
    }
    let ariaLiveProps = {};
    if (isAriaLive) {
      ariaLiveProps = {
        'aria-live': 'polite',
        'aria-atomic': 'true',
      };
    }
    return (
    // 'type' is injected into the class name
    // type 'error' requires an ARIA role
      <div className={`tm-alert tm-alert-${type}`} role={(type === 'error') ? 'alert' : null} {...ariaLiveProps}>
        <div className="usa-grid-full tm-alert-body">
          <div className="usa-grid-full tm-alert-icon">
            <FontAwesome size="lg" name={icon} />
          </div>
          <div className="usa-grid-full tm-alert-text">
            <div className="tm-alert-heading">{title}</div>
            <div className="tm-alert-message">{message}</div>
          </div>
        </div>
      </div>
    );
  }
}

AlertAlt.propTypes = {
  type: PropTypes.oneOf(['info', 'warning', 'error', 'success']),
  title: PropTypes.string.isRequired,
  message: PropTypes.node,
  isAriaLive: PropTypes.bool,
};

AlertAlt.defaultProps = {
  type: 'info',
  message: '',
  isAriaLive: false,
};

export default AlertAlt;
