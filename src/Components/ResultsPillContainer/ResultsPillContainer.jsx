import React from 'react';
import PropTypes from 'prop-types';
import { PILL_ITEM_ARRAY } from '../../Constants/PropTypes';
import PillList from '../PillList/PillList';

const ResultsContainer = ({ items, onPillClick }) => (
  <div className="usa-grid-full">
    Your Selections:
    <PillList
      items={items}
      onPillClick={(p, v) => onPillClick(p, v)}
    />
  </div>
);

ResultsContainer.propTypes = {
  items: PILL_ITEM_ARRAY.isRequired,
  onPillClick: PropTypes.func.isRequired,
};

ResultsContainer.defaultProps = {
  items: [],
};

export default ResultsContainer;
