import React from 'react';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import PositionsSectionTitle from '../PositionsSectionTitle';
import NewPositionsCardList from '../NewPositionsCardList';

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
  positions: PropTypes.arrayOf({}).isRequired,
};

export default NewPositionsSection;
