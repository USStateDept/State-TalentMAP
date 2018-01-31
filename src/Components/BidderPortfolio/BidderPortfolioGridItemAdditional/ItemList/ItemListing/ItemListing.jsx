import React from 'react';
import PropTypes from 'prop-types';
import Item from '../Item';

const ItemListing = ({ items }) => (
  <div className="usa-grid-full item-listing-container">
    {
      items.map(item =>
        <Item key={item} item={item} />,
      )
    }
    {
      !items.length &&
      <span>
        This list is empty.
      </span>
    }
  </div>
);

ItemListing.propTypes = {
  // items should be unique to provide unique React keys
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ItemListing;
