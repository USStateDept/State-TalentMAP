import React from 'react';
import { merge } from 'lodash';
import Base from '../Base';

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
