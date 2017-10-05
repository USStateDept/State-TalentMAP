import React from 'react';
import PropTypes from 'prop-types';

const Form = ({ children, className, onFormSubmit }) => (
  <form className={className} onSubmit={onFormSubmit}>
    {children}
  </form>
  );

Form.propTypes = {
  children: PropTypes.node.isRequired, // should be valid form children
  className: PropTypes.string,
  onFormSubmit: PropTypes.func.isRequired,
};

Form.defaultProps = {
  className: '',
};

export default Form;
