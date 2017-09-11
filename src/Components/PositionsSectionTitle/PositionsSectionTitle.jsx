import React from 'react';
import PropTypes from 'prop-types';
import PositionsSectionTitleHeader from '../PositionsSectionTitleHeader';
import PositionsSectionTitleViewMore from '../PositionsSectionTitleViewMore';

const PositionsSectionTitle = ({ title, viewMoreLink }) => (
  <div className="usa-grid-full positions-section-container">
    <div className="usa-width-one-half positions-section-container-left">
      <PositionsSectionTitleHeader title={title} />
    </div>
    <div className="usa-width-one-half positions-section-container-right">
      <PositionsSectionTitleViewMore viewMoreLink={viewMoreLink} />
    </div>
  </div>
);

PositionsSectionTitle.propTypes = {
  title: PropTypes.node.isRequired,
  viewMoreLink: PropTypes.string.isRequired,
};

export default PositionsSectionTitle;
