import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

const format = n => numeral(n).format('0,0');

const TotalResults = ({ total, pageNumber, pageSize, suffix }) => {
  let beginning = ((pageNumber - 1) * pageSize) + 1;
  let through = Math.min((pageSize * (pageNumber)), total);

  beginning = format(beginning);
  through = format(through);
  const total$ = format(total);
  return (
    <span id="total-results">
      Viewing <strong>{beginning}-{through}</strong> of <strong>{total$}</strong> {suffix}
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
