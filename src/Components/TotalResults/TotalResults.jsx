import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

const format = n => numeral(n).format('0,0');

const TotalResults = ({ total, pageNumber, pageSize, suffix }) => {
  let beginning;
  let through;
  let isAll = false;
  if (pageSize !== 'all') {
    beginning = ((pageNumber - 1) * pageSize) + 1;
    through = Math.min((pageSize * (pageNumber)), total);
    beginning = format(beginning);
    through = format(through);
  } else isAll = true;

  const total$ = format(total);

  return (
    isAll ?
      <span id="total-results">
        Viewing <strong>{total$}</strong> {suffix}
      </span>
      :
      <span id="total-results">
        Viewing <strong>{beginning}-{through}</strong> of <strong>{total$}</strong> {suffix}
      </span>
  );
};

TotalResults.propTypes = {
  total: PropTypes.number.isRequired, // total number of results
  pageNumber: PropTypes.number.isRequired, // current page number
  pageSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  suffix: PropTypes.string,
};

TotalResults.defaultProps = {
  suffix: 'Results',
};

export default TotalResults;
