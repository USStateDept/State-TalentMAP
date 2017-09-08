import React from 'react';
import ResultsCondensedCard from '../ResultsCondensedCard';

const PopularPositionsCardList = ({ positions }) => { // eslint-disable-line
  const positionList = positions.slice().map(p => (
    <div className="usa-grid-one-third">
      <ResultsCondensedCard result={p} />
    </div>
  ));
  return (
    <div className="usa-grid-full">
      {positionList}
    </div>
  );
};

export default PopularPositionsCardList;
