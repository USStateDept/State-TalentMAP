import React from 'react';
import PropTypes from 'prop-types';

const Item = ({ item }) => (
  <div className="item-listing-item">{item}</div>
);

Item.propTypes = {
  item: PropTypes.string.isRequired,
};

export default Item;
