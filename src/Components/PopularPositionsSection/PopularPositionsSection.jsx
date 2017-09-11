import React from 'react';
import FontAwesome from 'react-fontawesome';
import PositionsSectionTitle from '../PositionsSectionTitle';
import PopularPositionsCardList from '../PopularPositionsCardList';

const PopularPositionsSection = () => (
  <div className="usa-grid-full positions-section positions-section-popular">
    <PositionsSectionTitle
      title={
        <span className="positions-section-title">
          <FontAwesome name="gratipay" />
          Popular Positions
        </span>
      }
      viewMoreLink="/results"
    />
    <PopularPositionsCardList />
  </div>
);

export default PopularPositionsSection;
