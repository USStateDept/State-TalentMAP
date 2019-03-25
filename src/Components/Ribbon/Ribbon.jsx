import React from 'react';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';

const Ribbon = ({ type, className, icon, text, cutSide, containerProps }) => (
  <div className={`ribbon-outer-container ribbon-outer-container-cut-${cutSide} ${className}`} {...containerProps}>
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
  type: PropTypes.oneOf(['primary', 'secondary']),
  cutSide: PropTypes.oneOf(['left', 'right']),
};

Ribbon.defaultProps = {
  className: '',
  icon: 'handshake',
  text: '',
  containerProps: {},
  type: 'primary',
  cutSide: 'left',
};

export default Ribbon;
