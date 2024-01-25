import PropTypes from 'prop-types';
import { useState } from 'react';
import InteractiveElement from 'Components/InteractiveElement';
import { PILL_ITEM_ARRAY } from '../../Constants/PropTypes';
import PillList from '../PillList/PillList';

const ResultsPillContainer = ({ items, onPillClick }) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="usa-grid-full">
      <div className={`clients-filters-container ${showFilters ? 'clients-filters-container-expanded' : ''}`}>
        <div className={`clients-filters-title ${showFilters ? 'clients-filters-title-expanded' : ''}`}>
          <InteractiveElement title="Show Filters" onClick={() => setShowFilters(!showFilters)}>
              Click to Show Filter Selections
          </InteractiveElement>
        </div>
        <div className={`clients-filters-list ${showFilters ? 'showFilters' : 'hideFilters'}`}>
          <div className="label">Your Selections:</div>
          <PillList
            items={items}
            onPillClick={(param, value, remove) => onPillClick(param, value, remove)}
          />
        </div>
      </div>
      {/* </div> */}
      {/* </InteractiveElement> */}
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
