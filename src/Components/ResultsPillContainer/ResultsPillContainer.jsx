import React from 'react';
import PropTypes from 'prop-types';
import { PILL_ITEM_ARRAY } from '../../Constants/PropTypes';
import PillList from '../PillList/PillList';

const ResultsPillContainer = ({ items, onPillClick }) => (
  <div className="usa-grid-full">
    <div className="selections-container">Your Selections:</div>
    <PillList
      items={items}
      onPillClick={(param, value, remove) => onPillClick(param, value, remove)}
    />
  </div>
);

ResultsPillContainer.propTypes = {
  items: PILL_ITEM_ARRAY.isRequired,
  onPillClick: PropTypes.func.isRequired,
};

ResultsPillContainer.defaultProps = {
  items: [],
};

export default ResultsPillContainer;
