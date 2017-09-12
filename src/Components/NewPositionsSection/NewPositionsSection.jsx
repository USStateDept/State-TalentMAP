import React from 'react';
import FontAwesome from 'react-fontawesome';
import PositionsSectionTitle from '../PositionsSectionTitle';
import NewPositionsCardList from '../NewPositionsCardList';

const NewPositionsSection = () => (
  <div className="usa-grid-full positions-section positions-section-new">
    <PositionsSectionTitle
      title={
        <span className="positions-section-title"><FontAwesome name="flag" />New Positions</span>
      }
      viewMoreLink="/results?ordering=create_date"
    />
    <NewPositionsCardList />
  </div>
);

export default NewPositionsSection;
