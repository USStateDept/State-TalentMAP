import React from 'react';
import PropTypes from 'prop-types';

const TotalResults = ({ totalResults }) => (
  <span>
    {totalResults.total} results match your search criteria
  </span>
);

TotalResults.propTypes = {
  totalResults: PropTypes.shape({
    count: PropTypes.number, // current page size, if we wanted to show that here
    total: PropTypes.number, // total number of results
  }).isRequired,
};

export default TotalResults;
