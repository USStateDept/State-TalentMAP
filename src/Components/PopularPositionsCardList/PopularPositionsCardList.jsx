import React from 'react';
import PropTypes from 'prop-types';
import ResultsCondensedCard from '../ResultsCondensedCard';

const PopularPositionsCardList = ({ positions }) => { // eslint-disable-line
  const positionList = positions.slice().map(p => (
    <div className="usa-width-one-third condensed-card">
      <ResultsCondensedCard type="popular" result={p} />
    </div>
  ));
  return (
    <div className="usa-grid-full condensed-card-popular">
      {positionList}
    </div>
  );
};

PopularPositionsCardList.propTypes = {
  positions: PropTypes.arrayOf() // eslint-disable-line
};

PopularPositionsCardList.defaultProps = {
  positions: ['a', 'b', 'c'],
};

export default PopularPositionsCardList;
