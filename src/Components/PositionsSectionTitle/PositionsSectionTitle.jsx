import React from 'react';
import PropTypes from 'prop-types';
import PositionsSectionTitleHeader from '../PositionsSectionTitleHeader';
import PositionsSectionTitleViewMore from '../PositionsSectionTitleViewMore';

const PositionsSectionTitle = ({ title, viewMoreLink }) => (
  <div className="usa-grid-full positions-section-container">
    <div className="usa-width-one-whole positions-section-container-left">
      <PositionsSectionTitleHeader title={title} />
    </div>
    <div className="usa-width-one-half positions-section-container-right">
      { !!viewMoreLink.length && <PositionsSectionTitleViewMore viewMoreLink={viewMoreLink} /> }
    </div>
  </div>
);

PositionsSectionTitle.propTypes = {
  title: PropTypes.node.isRequired,
  viewMoreLink: PropTypes.node,
};

// Pass an empty string to hide the link
PositionsSectionTitle.defaultProps = {
  viewMoreLink: '',
};

export default PositionsSectionTitle;
