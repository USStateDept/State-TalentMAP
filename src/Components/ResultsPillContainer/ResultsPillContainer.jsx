import PropTypes from 'prop-types';
import { useState } from 'react';
import InteractiveElement from 'Components/InteractiveElement';
import { PILL_ITEM_ARRAY } from '../../Constants/PropTypes';
import PillList from '../PillList/PillList';

const ResultsPillContainer = ({ items, onPillClick }) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className={`collapsible-container ${showFilters ? 'collapsible-container-expanded' : ''}`}>
      <InteractiveElement title="Show Filters" onClick={() => setShowFilters(!showFilters)}>
        <div className={`collapsible-title ${showFilters ? 'collapsible-title-expanded' : ''}`}>
          Click to Show Filter Selections
        </div>
      </InteractiveElement>
      <div className={`collapsible-section ${showFilters ? 'showCollapse' : 'hideCollapse'}`}>
        <div className="label">Your Selections:</div>
        <PillList
          items={items}
          onPillClick={(param, value, remove) => onPillClick(param, value, remove)}
        />
      </div>
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
