import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';

const shortid = require('shortid');

class Alert extends Component {
  // prevent unneeded rerenders, which can cause accessibility issues
  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps);
  }
  render() {
    const { type, title, messages, isAriaLive, isDivided } = this.props;
    // 'type' is injected into the class name
    // type 'error' requires an ARIA role
    let ariaLiveProps = {};
    if (isAriaLive) {
      ariaLiveProps = {
        'aria-live': 'polite',
        'aria-atomic': 'true',
      };
    }
    const h3 = <h3 className="usa-alert-heading">{title}</h3>;
    const body = messages.map(message =>
      (<p className="usa-alert-text" key={shortid.generate()}>
        {message.body}
      </p>),
    );
    return (
      <div className={`usa-alert usa-alert-${type}`} role={(type === 'error') ? 'alert' : null} {...ariaLiveProps}>
        {
          isDivided ?
            <div>
              <div className="usa-alert-body">
                {h3}
              </div>
              <div className="divider" />
              <div className="usa-alert-body">
                {body}
              </div>
            </div>
            :
            <div className="usa-alert-body">
              {h3}
              {body}
            </div>
        }
      </div>
    );
  }
}

Alert.propTypes = {
  type: PropTypes.oneOf(['info', 'warning', 'error', 'success']),
  title: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      body: PropTypes.node,
    })),
  isAriaLive: PropTypes.bool,
  isDivided: PropTypes.bool,
};

Alert.defaultProps = {
  type: 'info', // should be one of the USWDS alert types - https://standards.usa.gov/components/alerts/
  messages: [{ body: '' }],
  isAriaLive: false,
  isDivided: false,
};

export default Alert;
