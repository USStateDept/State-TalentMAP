import React from 'react';
import PropTypes from 'prop-types';

const CondensedCardDataPoint = ({ title, content, hasFixedTitleWidth, ariaLabel }) => {
  const titleClass = `condensed-card-data-title ${hasFixedTitleWidth ? 'title-fixed-width' : ''}`;
  return (
    <div className="usa-grid-full condensed-card-data-point">
      <div className={titleClass}>{title}: </div>
      <div aria-label={ariaLabel} className="condensed-card-data-content">{content}</div>
    </div>
  );
};

CondensedCardDataPoint.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  hasFixedTitleWidth: PropTypes.bool,
  ariaLabel: PropTypes.string,
};

CondensedCardDataPoint.defaultProps = {
  hasFixedTitleWidth: false,
  ariaLabel: undefined,
};

export default CondensedCardDataPoint;
