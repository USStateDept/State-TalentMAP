import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';

export default class Avatar extends Component {
  static propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    firstName: '',
    lastName: '',
    className: '',
    onClick: EMPTY_FUNCTION,
  };

  get caption() {
    const value = [
      this.props.firstName,
      this.props.lastName,
    ];

    return this.toText(value);
  }

  get value() {
    const value = [
      this.getInitial(this.props.firstName),
      this.getInitial(this.props.lastName),
    ];

    return this.toText(value, '');
  }

  getInitial = value => (value || '').charAt(0);
  toText = (text, delimiter = ' ') => text.join(delimiter).trim();

  render() {
    const alt = this.caption;
    const text = this.value;
    const props = {
      className: this.props.className,
      onClick: this.props.onClick,
      role: 'img',
      'aria-label': alt,
    };

    return (
      <span {...props}>
        <div className="tm-avatar">{text}</div>
      </span>
    );
  }
}
