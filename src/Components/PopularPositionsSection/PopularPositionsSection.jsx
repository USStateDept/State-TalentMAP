import React from 'react';
import FontAwesome from 'react-fontawesome';
import PositionsSectionTitle from '../PositionsSectionTitle';
import PopularPositionsCardList from '../PopularPositionsCardList';
import { POSITION_DETAILS_ARRAY } from '../../Constants/PropTypes';

const PopularPositionsSection = ({ positions }) => (
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
    <PopularPositionsCardList positions={positions} />
  </div>
);

PopularPositionsSection.propTypes = {
  positions: POSITION_DETAILS_ARRAY.isRequired,
};

export default PopularPositionsSection;
