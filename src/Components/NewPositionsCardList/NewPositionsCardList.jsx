import React from 'react';
import PropTypes from 'prop-types';
import ResultsCondensedCard from '../ResultsCondensedCard';

const NewPositionsCardList = ({ positions }) => { // eslint-disable-line
  const positionList = positions.slice().map(p => (
    <div className="usa-width-one-third">
      <ResultsCondensedCard result={p} />
    </div>
  ));
  return (
    <div className="usa-grid-full">
      {positionList}
    </div>
  );
};

NewPositionsCardList.propTypes = {
  positions: PropTypes.arrayOf() // eslint-disable-line
};

NewPositionsCardList.defaultProps = {
  positions: ['a', 'b', 'c'],
};

export default NewPositionsCardList;
