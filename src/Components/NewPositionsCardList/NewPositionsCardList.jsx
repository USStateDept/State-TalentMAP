import React from 'react';
import ResultsCondensedCard from '../ResultsCondensedCard';
import { POSITION_DETAILS_ARRAY } from '../../Constants/PropTypes';

const NewPositionsCardList = ({ positions }) => {
  const positionList = [];

  positions.slice().forEach((p) => {
    positionList.push(
      <div className="usa-width-one-whole condensed-card">
        <ResultsCondensedCard position={p} />
      </div>,
    );
  });

  return (
    <div className="usa-grid-full">
      <div className="usa-width-one-third condensed-card-first-big">
        {positionList[0]}
      </div>
      <div className="usa-width-one-third condensed-card-second">
        {positionList[1]}
        {positionList[2]}
      </div>
      <div className="usa-width-one-third condensed-card-third">
        {positionList[3]}
        {positionList[4]}
      </div>
    </div>
  );
};

NewPositionsCardList.propTypes = {
  positions: POSITION_DETAILS_ARRAY.isRequired,
};

NewPositionsCardList.defaultProps = {
  positions: [],
};

export default NewPositionsCardList;
