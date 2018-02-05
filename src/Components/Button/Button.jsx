import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';

class Button extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    const { onClick, ...rest } = this.props;
    // if type === submit, do not call preventDefault()
    const isSubmit = rest.type === 'submit';
    // preventDefault to avoid USWDS adding query params to url
    if (e && e.preventDefault && !isSubmit) { e.preventDefault(); }
    onClick(e);
  }

  render() {
    const { children, ...rest } = this.props;
    return (
      <button {...rest} onClick={this.onClick}>
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.node.isRequired, // should be valid button children
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: EMPTY_FUNCTION,
};

export default Button;
