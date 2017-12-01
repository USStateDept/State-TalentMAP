import React from 'react';
import PropTypes from 'prop-types';

const TotalResults = ({ numerator, denominator }) => (
  <div className="usa-grid-full portfolio-total-results">
    {numerator}/{denominator} Clients
  </div>
);

TotalResults.propTypes = {
  numerator: PropTypes.number.isRequired,
  denominator: PropTypes.number.isRequired,
};

export default TotalResults;
