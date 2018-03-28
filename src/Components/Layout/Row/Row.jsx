import React from 'react';
import PropTypes from 'prop-types';
import { merge } from 'lodash';
import Base from '../Base';

/* eslint-disable react/prop-types */
const Row = (props) => {
  const options = merge({}, props);
  options.className = `${props.fluid ? 'usa-grid-full' : 'usa-grid'} ${props.className}`.trim();
  return (
    <Base {...options}>
      {props.children}
    </Base>
  );
};
/* eslint-enable react/prop-types */

Row.propTypes = merge({}, Base.propTypes, {
  fluid: PropTypes.bool,
});

Row.defaultProps = merge({}, Base.defaultProps, {
  fluid: false,
});

export default Row;
