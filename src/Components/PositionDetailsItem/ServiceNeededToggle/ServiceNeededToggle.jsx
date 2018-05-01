import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import InteractiveElement from '../../InteractiveElement';

import { USER_PROFILE } from '../../../Constants/PropTypes';

export default class ServiceNeededToggle extends Component {
  render() {
    const props = this.props;
    const user = props.userProfile;
    const isSuperuser = user.is_superuser || true;

    const isChecked = false;
    const text = 'Mark as Service Need';
    const icon = isChecked ? 'check-square-o' : 'square-o';
    const options = {
      className: ['usa-button', props.className],
      onClick: this.onClick,
    };

    if (isChecked) {
      options.className.push('usa-button-active');
    }

    options.className = options.className
      .join(' ')
      .trim();

    return (isSuperuser ?
      <div className="service-needed-toggle">
        <InteractiveElement {...options}>
          <FontAwesome name={icon} /> {text}
        </InteractiveElement>
      </div> : null
    );
  }
}

ServiceNeededToggle.propTypes = {
  as: PropTypes.string.isRequired,
  className: PropTypes.string,
  userProfile: USER_PROFILE,
};

ServiceNeededToggle.defaultProps = {
  as: 'div',
  className: '',
  userProfile: {},
};
