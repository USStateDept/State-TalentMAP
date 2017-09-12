import React from 'react';
import FontAwesome from 'react-fontawesome';
import PositionsSectionTitle from '../PositionsSectionTitle';
import NewPositionsCardList from '../NewPositionsCardList';
import { POSITION_DETAILS_ARRAY } from '../../Constants/PropTypes';

const NewPositionsSection = ({ positions }) => (
  <div className="usa-grid-full positions-section positions-section-new">
    <PositionsSectionTitle
      title={
        <span className="positions-section-title"><FontAwesome name="flag" />New Positions</span>
      }
      viewMoreLink="/results?ordering=create_date"
    />
    <NewPositionsCardList positions={positions} />
  </div>
);

NewPositionsSection.propTypes = {
  positions: POSITION_DETAILS_ARRAY.isRequired,
};

export default NewPositionsSection;
