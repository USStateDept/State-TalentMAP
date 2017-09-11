import React from 'react';
import PropTypes from 'prop-types';

const PositionsSectionTitleHeader = ({ title }) => (
  <div className="condensed-card-title-header">
    <span>
      {title}
    </span>
  </div>
);

PositionsSectionTitleHeader.propTypes = {
  title: PropTypes.node.isRequired,
};

export default PositionsSectionTitleHeader;
