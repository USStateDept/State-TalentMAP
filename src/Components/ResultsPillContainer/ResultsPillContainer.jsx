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
        <div className={`clients-filters-list ${showFilters ? 'clients-filters-list-expanded' : ''}`}>
          <div className={`clients-filters-title ${showFilters ? 'clients-filters-title-expanded' : ''}`}>
            Click to Show Filter Selections
          </div>
          <div className={`clients-filters-container ${showFilters ? 'showFilters' : 'hideFilters'}`}>
            <div className="label">Your Selections:</div>
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
