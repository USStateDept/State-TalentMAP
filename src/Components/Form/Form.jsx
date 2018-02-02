import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';

class Form extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    const { onSubmit } = this.props;
    // preventDefault to avoid USWDS adding query params to url
    if (e && e.preventDefault) { e.preventDefault(); }
    onSubmit(e);
  }

  render() {
    const { children, className } = this.props;
    return (
      <form className={className} onSubmit={this.onSubmit}>
        {children}
      </form>
    );
  }
}

Form.propTypes = {
  children: PropTypes.node.isRequired, // should be valid form children
  className: PropTypes.string,
  onSubmit: PropTypes.func,
};

Form.defaultProps = {
  className: '',
  onSubmit: EMPTY_FUNCTION,
};

export default Form;
