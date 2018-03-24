import React from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';

const Row = (props) => {
  const Element = props.as;
  const options = omit(props, ['fluid', 'as', 'children']);
  options.className = `${props.fluid ? 'usa-grid-full' : 'usa-grid'} ${props.className}`.trim();
  return (
    <Element {...options}>
      {props.children}
    </Element>
  );
};

Row.propTypes = {
  className: PropTypes.string,
  fluid: PropTypes.bool,
  children: PropTypes.node,
  as: PropTypes.string.isRequired,
};

Row.defaultProps = {
  as: 'div',
  className: '',
  fluid: false,
  children: null,
};

export default Row;
