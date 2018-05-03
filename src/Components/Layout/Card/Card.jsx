import React from 'react';
import Base from '../Base';

const merge = require('lodash/merge');

/* eslint-disable react/prop-types */
const Card = (props) => {
  const options = merge({}, props);
  options.className = `card ${props.className}`.trim();
  return (
    <Base {...options}>
      {props.children}
    </Base>
  );
};
/* eslint-enable react/prop-types */

Card.propTypes = merge({}, Base.propTypes);
Card.defaultProps = merge({}, Base.defaultProps);

export default Card;
