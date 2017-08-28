import React from 'react';
import PropTypes from 'prop-types';
import PillList from '../PillList/PillList';

const ResultsContainer = ({ items }) => (
  <div className="usa-grid-full">
    Your Selections:
    <PillList items={items} />
  </div>
);

ResultsContainer.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      code: PropTypes.oneOf(PropTypes.string, PropTypes.number),
    }),
  ).isRequired,
};

ResultsContainer.defaultProps = {
  items: [],
};

export default ResultsContainer;
