import React from 'react';
import PropTypes from 'prop-types';

const PositionDetailsDataPoint = ({ title, description }) => (
  <div className="usa-width-one-fourth position-details-description-section">
    <div className="title">{title}</div>
    <div className="description">{description}</div>
  </div>
);

PositionDetailsDataPoint.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]).isRequired,
};

export default PositionDetailsDataPoint;
