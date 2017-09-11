import React from 'react';
import PropTypes from 'prop-types';

const PositionsSectionTitleHeader = ({ title }) => (
  <div className="positions-section-title-header">
    <span>
      {title}
    </span>
  </div>
);

PositionsSectionTitleHeader.propTypes = {
  title: PropTypes.node.isRequired,
};

export default PositionsSectionTitleHeader;
