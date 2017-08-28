import React from 'react';
import PillList from '../PillList/PillList';
// import PropTypes from 'prop-types';

const ResultsContainer = () => (
  <div className="usa-grid-full">
    Your Selections:
    <PillList />
  </div>
);

ResultsContainer.propTypes = {
};

ResultsContainer.defaultProps = {
};

export default ResultsContainer;
