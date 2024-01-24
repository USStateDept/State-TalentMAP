import PropTypes from 'prop-types';
import { useState } from 'react';
import InteractiveElement from 'Components/InteractiveElement';
import { PILL_ITEM_ARRAY } from '../../Constants/PropTypes';
import PillList from '../PillList/PillList';

const ResultsPillContainer = ({ items, onPillClick }) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="usa-grid-full">
      <InteractiveElement title="Test" onClick={() => setShowFilters(!showFilters)}>
        <div className={`pma-pm-info ${showFilters ? 'pma-pm-info-expanded' : ''}`}>
          <div>
            <div className={`pma-pm-info-title ${showFilters ? 'pma-pm-info-title-expanded' : ''}`}>
              Click to Expand Filter Selections
            </div>
          </div>
          <div className={`tracker-container ${showFilters ? 'showTracker' : 'hideTracker'}`}>
            <div className="selections-container">Your Selections:</div>
            <PillList
              items={items}
              onPillClick={(param, value, remove) => onPillClick(param, value, remove)}
            />
          </div>
        </div>
      </InteractiveElement>
    </div>
  );
};

ResultsPillContainer.propTypes = {
  items: PILL_ITEM_ARRAY.isRequired,
  onPillClick: PropTypes.func.isRequired,
};

ResultsPillContainer.defaultProps = {
  items: [],
};

export default ResultsPillContainer;
