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
  description: PropTypes.node.isRequired,
};

export default PositionDetailsDataPoint;
