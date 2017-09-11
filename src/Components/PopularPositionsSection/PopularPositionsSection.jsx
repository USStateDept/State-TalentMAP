import React from 'react';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import PositionsSectionTitle from '../PositionsSectionTitle';
import PopularPositionsCardList from '../PopularPositionsCardList';

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
  positions: PropTypes.arrayOf({}).isRequired,
};

export default PopularPositionsSection;
