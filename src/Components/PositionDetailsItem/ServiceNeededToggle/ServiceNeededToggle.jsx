import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';

import InteractiveElement from '../../InteractiveElement';

import {
  EMPTY_FUNCTION,
  POSITION_DETAILS,
  USER_PROFILE,
} from '../../../Constants/PropTypes';

export default class ServiceNeededToggle extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { position, onChange } = this.props;
    onChange(position.id, !this.checked);
  }

  get checked() {
    const { position } = this.props;
    return (position.is_highlighted || false);
  }

  get text() {
    return `${this.checked ? 'Unmark' : 'Mark'} as Service Need`;
  }

  get icon() {
    return this.checked ? 'check-square-o' : 'square-o';
  }

  render() {
    const user = this.props.userProfile;
    const wrapper = {
      className: 'service-needed-toggle',
    };

    const isSuperuser = user.is_superuser;
    const options = {
      className: ['usa-button', this.props.className],
      onClick: this.onClick,
    };

    options.className = options.className
      .join(' ')
      .trim();

    return isSuperuser ?
      (<div {...wrapper}>
        <InteractiveElement {...options}>
          {!this.props.loading ?
            (<FontAwesome name={this.icon} />) :
            (<div className="ds-c-spinner" />)
          } {this.text}
        </InteractiveElement>
      </div>) : (null);
  }
}

ServiceNeededToggle.propTypes = {
  className: PropTypes.string,
  position: POSITION_DETAILS,
  userProfile: USER_PROFILE,
  loading: PropTypes.bool,
  onChange: PropTypes.func,
};

ServiceNeededToggle.defaultProps = {
  className: '',
  position: {},
  userProfile: {},
  loading: false,
  onChange: EMPTY_FUNCTION,
};
