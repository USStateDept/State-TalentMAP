import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

const BidderPortfolioGridListHeaderItem = ({ className, content }) => (
  <div className={`usa-grid-full portfolio-grid-list-header-item ${className}`}>
    {content} <FontAwesome name="sort" />
  </div>
);

BidderPortfolioGridListHeaderItem.propTypes = {
  className: PropTypes.string,
  content: PropTypes.node.isRequired,
};

BidderPortfolioGridListHeaderItem.defaultProps = {
  className: '',
};

export default BidderPortfolioGridListHeaderItem;
