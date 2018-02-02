import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';

class Form extends Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(e) {
    const { onFormSubmit } = this.props;
    // preventDefault to avoid USWDS adding query params to url
    if (e && e.preventDefault) { e.preventDefault(); }
    onFormSubmit(e);
  }

  render() {
    const { children, className } = this.props;
    return (
      <form className={className} onSubmit={this.onFormSubmit}>
        {children}
      </form>
    );
  }
}

Form.propTypes = {
  children: PropTypes.node.isRequired, // should be valid form children
  className: PropTypes.string,
  onFormSubmit: PropTypes.func,
};

Form.defaultProps = {
  className: '',
  onFormSubmit: EMPTY_FUNCTION,
};

export default Form;
