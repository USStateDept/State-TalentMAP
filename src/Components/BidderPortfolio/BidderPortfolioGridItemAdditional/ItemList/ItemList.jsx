import React from 'react';
import PropTypes from 'prop-types';
import ItemListing from './ItemListing';

const BidderPortfolioGridItemAdditional = ({ title, items }) => (
  <div className="usa-grid-full item-list-container">
    <div className="item-list-title">{title}</div>
    <ItemListing items={items} />
  </div>
);

BidderPortfolioGridItemAdditional.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BidderPortfolioGridItemAdditional;
