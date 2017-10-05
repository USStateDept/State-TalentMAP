import React from 'react';
import PropTypes from 'prop-types';

const ResultsCardDataItem = ({ description, text }) => (
  <div>
    <strong>{description}</strong> {text}
  </div>
);

ResultsCardDataItem.propTypes = {
  description: PropTypes.string.isRequired,
  text: PropTypes.node.isRequired,
};

export default ResultsCardDataItem;
