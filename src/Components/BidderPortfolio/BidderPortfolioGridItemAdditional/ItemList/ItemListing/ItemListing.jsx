import React from 'react';
import PropTypes from 'prop-types';
import Item from '../Item';

const ItemListing = ({ items }) => (
  <div className="usa-grid-full item-listing-container">
    {
      items.map(item =>
        <Item item={item} />,
      )
    }
  </div>
);

ItemListing.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ItemListing;
