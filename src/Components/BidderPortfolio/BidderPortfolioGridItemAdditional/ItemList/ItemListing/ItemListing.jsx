import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Item from '../Item';

const ItemListing = ({ items }) => (
  <div className="usa-grid-full item-listing-container">
    {
      items.map(item =>
        <Item key={shortid.generate()} item={item} />,
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
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ItemListing;
