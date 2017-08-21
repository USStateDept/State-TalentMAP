import React from 'react';
import PropTypes from 'prop-types';

const TotalResults = ({ total, pageNumber, pageSize }) => {
  const beginning = (pageNumber * pageSize) + 1;
  const through = Math.min((pageSize * (pageNumber + 1)), total);
  return (
    <span id="total-results">
      Viewing {beginning} - {through} of {total} results
    </span>
  );
};

TotalResults.propTypes = {
  total: PropTypes.number.isRequired, // total number of results
  pageNumber: PropTypes.number.isRequired, // current page number
  pageSize: PropTypes.number.isRequired, // paging size
};

export default TotalResults;
