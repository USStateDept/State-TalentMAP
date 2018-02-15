import React from 'react';
import PropTypes from 'prop-types';

const CondensedCardDataPoint = ({ title, content, hasFixedTitleWidth }) => {
  const titleClass = `condensed-card-data-title ${hasFixedTitleWidth ? 'title-fixed-width' : ''}`;
  return (
    <div className="usa-grid-full condensed-card-data-point">
      <div className={titleClass}>{title}: </div>
      <div className="condensed-card-data-content">{content}</div>
    </div>
  );
};

CondensedCardDataPoint.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  hasFixedTitleWidth: PropTypes.bool,
};

CondensedCardDataPoint.defaultProps = {
  hasFixedTitleWidth: false,
};

export default CondensedCardDataPoint;
