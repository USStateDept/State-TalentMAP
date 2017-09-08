import React from 'react';
import PositionsSectionTitle from '../PositionsSectionTitle';
import PopularPositionsCardList from '../PopularPositionsCardList';

const PopularPositionsSection = () => (
  <div className="usa-grid-full">
    <PositionsSectionTitle title="Popular Positions" />
    <PopularPositionsCardList />
  </div>
);

export default PopularPositionsSection;
