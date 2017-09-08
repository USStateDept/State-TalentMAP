import React from 'react';
import PositionsSectionTitle from '../PositionsSectionTitle';
import NewPositionsCardList from '../NewPositionsCardList';

const NewPositionsSection = () => (
  <div className="usa-grid-full">
    <PositionsSectionTitle title="New Positions" />
    <NewPositionsCardList />
  </div>
);

export default NewPositionsSection;
