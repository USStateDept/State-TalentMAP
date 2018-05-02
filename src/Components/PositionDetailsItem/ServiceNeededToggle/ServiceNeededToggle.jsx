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
      loading: props.loading,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
    console.log(nextProps.loading);
  }

  shouldComponentUpdate(props) {
    console.log('shouldComponentUpdate');
    console.log([this.state.loading, props.loading]);
    if (this.state.loading !== props.loading) {
      this.setState({ loading: props.loading });
      // this
    }

    return true;
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
    const { loading } = this.props;
    const props = this.props;
    const user = props.userProfile;
    const wrapper = {
      className: 'service-needed-toggle',
    };

    const isSuperuser = user.is_superuser;
    const options = {
      className: ['usa-button', props.className],
      onClick: this.onClick,
    };

    if (this.checked) {
      options.className.push('usa-button-active');
    }

    options.className = options.className
      .join(' ')
      .trim();
    console.log(loading);
    console.log(!props.loading ?
      (<FontAwesome name={this.icon} />) :
      (<div className="ds-c-spinner" />),
    );
    return isSuperuser ?
      (<div {...wrapper}>
        <InteractiveElement {...options}>
          {!props.loading ?
            (<FontAwesome name={this.icon} />) :
            (<div className="ds-c-spinner" />)
          } {this.text}
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
  loading: null,
  onChange: EMPTY_FUNCTION,
};
