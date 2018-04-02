import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

const PositionInformation = ({ title, icon, small, className }) => (
  <div className={`dashboard-section-title ${className} ${small ? 'dashboard-section-title-small' : ''}`}>
    { !!icon.length && <FontAwesome name={icon} /> } <h2>{title}</h2>
  </div>
);

PositionInformation.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  small: PropTypes.bool,
  className: PropTypes.string,
};

PositionInformation.defaultProps = {
  icon: '',
  small: false, // add class "dashboard-section-title-small"
  className: '',
};

export default PositionInformation;
