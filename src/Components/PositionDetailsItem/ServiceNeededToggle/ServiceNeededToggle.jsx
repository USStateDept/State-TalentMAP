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
    this.state = {
      loading: props.loading || false,
    };
  }

  shouldComponentUpdate(props) {
    let isUpdate = true;

    // If update changes state, don't update the component
    if (this.state.loading !== props.loading) {
      isUpdate = false;
      this.setState({
        loading: props.loading,
      });
    }

    return isUpdate;
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
    const props = this.props;
    const state = this.state;
    const user = props.userProfile;
    const wrapper = {
      className: ['service-needed-toggle'],
    };

    const isSuperuser = user.is_superuser;
    const options = {
      className: ['usa-button', props.className],
      onClick: this.onClick,
    };

    if (state.checked) {
      options.className.push('usa-button-active');
    }

    options.className = options.className
      .join(' ')
      .trim();

    if (state.loading) {
      wrapper.className.push('ds-c-spinner');
    }

    wrapper.className = wrapper.className
      .join(' ')
      .trim();

    return isSuperuser ?
      (<div {...wrapper}>
        <InteractiveElement {...options}>
          <FontAwesome name={this.icon} /> {this.text}
        </InteractiveElement>
      </div>) : (null);
  }
}

ServiceNeededToggle.propTypes = {
  as: PropTypes.string.isRequired,
  className: PropTypes.string,
  position: POSITION_DETAILS,
  userProfile: USER_PROFILE,
  loading: PropTypes.bool,
  onChange: PropTypes.func,
};

ServiceNeededToggle.defaultProps = {
  as: 'div',
  className: '',
  position: {},
  userProfile: {},
  loading: false,
  onChange: EMPTY_FUNCTION,
};
