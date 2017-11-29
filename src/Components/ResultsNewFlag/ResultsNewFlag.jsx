import React from 'react';
import PropTypes from 'prop-types';

const ResultsNewFlag = ({ text }) => (
  <div className="new-flag">
    {text}
  </div>
);

ResultsNewFlag.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ResultsNewFlag;
