import React from 'react';
import PropTypes from 'prop-types';
import ResultsCardDataPoint from '../ResultsCardDataPoint/ResultsCardDataPoint';

const shortid = require('shortid');

const ResultsCardDataItem = ({ title, items }) => (
  <div>
    <div className="section-title">{title}</div>
    <div className="section-data-points">
      {items.map(item =>
        (<ResultsCardDataPoint
          key={shortid.generate()}
          description={item.description}
          text={item.text}
        />),
      )}
    </div>
  </div>
);

ResultsCardDataItem.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      text: PropTypes.node,
    }),
  ).isRequired,
};

export default ResultsCardDataItem;
