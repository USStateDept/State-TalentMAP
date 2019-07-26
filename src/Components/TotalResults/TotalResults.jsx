import React from 'react';
import PropTypes from 'prop-types';

const TotalResults = ({ total, pageNumber, pageSize, suffix }) => {
  const beginning = ((pageNumber - 1) * pageSize) + 1;
  const through = Math.min((pageSize * (pageNumber)), total);
  return (
    <span id="total-results">
      Viewing <strong>{beginning}-{through}</strong> of <strong>{total}</strong> {suffix}
    </span>
  );
};

TotalResults.propTypes = {
  total: PropTypes.number.isRequired, // total number of results
  pageNumber: PropTypes.number.isRequired, // current page number
  pageSize: PropTypes.number.isRequired, // paging size
  suffix: PropTypes.string,
};

TotalResults.defaultProps = {
  suffix: 'Results',
};

export default TotalResults;
