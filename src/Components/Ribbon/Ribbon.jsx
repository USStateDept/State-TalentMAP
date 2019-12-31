import React from 'react';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';

const Ribbon = ({ type, className, icon, text, cutSide, containerProps, isWide }) => (
  <div
    className={`ribbon-outer-container ribbon-outer-container-cut-${cutSide} ${isWide ? 'ribbon-wide' : ''} ${className}`}
    {...containerProps}
  >
    <div className={`ribbon ribbon-${type} ribbon-cut-${cutSide}`}>
      <FA name={icon} /><span className="text">{text}</span>
    </div>
  </div>
);


Ribbon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  text: PropTypes.string,
  containerProps: PropTypes.shape({}),
  type: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'success']),
  cutSide: PropTypes.oneOf(['left', 'right', 'both']),
  isWide: PropTypes.bool,
};

Ribbon.defaultProps = {
  className: '',
  icon: 'handshake',
  text: '',
  containerProps: {},
  type: 'primary',
  cutSide: 'left',
  isWide: false,
};

export default Ribbon;
