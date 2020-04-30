// forked from https://github.com/lachlanjc/react-box-shadow
import React from 'react';
import PropTypes from 'prop-types';
import cssShadow from './BoxShadowUtility';

const BoxShadow = ({ is, inset, offsetX, offsetY, blurRadius, spreadRadius, color, style,
  ...props }) => {
  const Component = is;
  const sx = {
    ...style,
    boxShadow: cssShadow.stringify([
      {
        inset,
        offsetX,
        offsetY,
        blurRadius,
        spreadRadius,
        color,
      },
    ]),
  };
  return <Component style={sx} {...props} />;
};

BoxShadow.propTypes = {
  is: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  inset: PropTypes.bool,
  offsetX: PropTypes.number,
  offsetY: PropTypes.number,
  blurRadius: PropTypes.number,
  spreadRadius: PropTypes.number,
  color: PropTypes.string,
  style: PropTypes.shape({}),
};

BoxShadow.defaultProps = {
  is: 'div',
  inset: false,
  offsetX: 3,
  offsetY: 2,
  blurRadius: 10,
  spreadRadius: 1,
  color: 'rgba(0,0,0,.15)',
  style: {},
};

export default BoxShadow;
