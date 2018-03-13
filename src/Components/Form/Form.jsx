import React from 'react';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';

const Form = ({ children, className, onFormSubmit }) => (
  <form className={className} onSubmit={onFormSubmit}>
    {children}
  </form>
);

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
