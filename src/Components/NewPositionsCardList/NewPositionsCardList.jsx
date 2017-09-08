import React from 'react';
import PropTypes from 'prop-types';
import ResultsCondensedCard from '../ResultsCondensedCard';

const NewPositionsCardList = ({ positions }) => { // eslint-disable-line

  const positionList = [];

  positions.slice().forEach((p) => {
    positionList.push(
      <div className="usa-width-one-whole condensed-card">
        <ResultsCondensedCard result={p} />
      </div>,
    );
  });

  return (
    <div className="usa-grid-full">
      <div className="usa-width-one-third condensed-card-first-big" style={{ float: 'left' }}>
        {positionList[0]}
      </div>
      <div className="usa-width-one-third condensed-card-second" style={{ float: 'left' }}>
        {positionList[1]}
        {positionList[2]}
      </div>
      <div className="usa-width-one-third condensed-card-third" style={{ float: 'left' }}>
        {positionList[3]}
        {positionList[4]}
      </div>
    </div>
  );
};

NewPositionsCardList.propTypes = {
  positions: PropTypes.arrayOf() // eslint-disable-line
};

NewPositionsCardList.defaultProps = {
  positions: ['a', 'b', 'c', 'd', 'e'],
};

export default NewPositionsCardList;
