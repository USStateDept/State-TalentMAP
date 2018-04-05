import React from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';

const exceptions = [
  'as',
  'children',
  'fluid',
  'columns',
];

const Base = (props) => {
  const Element = props.as;
  const options = omit(props, exceptions);

  options.className = props.className.trim();

  return (
    <Element {...options}>
      {props.children}
    </Element>
  );
};

Base.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  as: PropTypes.string.isRequired,
};

Base.defaultProps = {
  as: 'div',
  className: '',
  children: null,
};

export default Base;
