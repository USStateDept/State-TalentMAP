import PropTypes from 'prop-types';
import { orderBy } from 'lodash';
// import { useState } from 'react';
// import InteractiveElement from 'Components/InteractiveElement';
import { PILL_ITEM_ARRAY } from '../../Constants/PropTypes';
import Pill from '../Pill/Pill';

const PillList = ({ items, onPillClick }, { isTandemSearch }) => {
  const ordering = ['description', 'code'];
  const orders = [];

  // const [showFilters, setShowFilters] = useState();

  if (isTandemSearch) {
    ordering.splice(0, 0, 'isCommon', 'isTandem');
    orders.splice(0, 0, 'asc', 'desc');
  }
  return (
    <div className="pill-list-container">
      {
        // order items in their correct context
        (orderBy(items.slice(), ordering, orders))
          // do not display toggles as pills
          .filter(f => !f.isToggle)
          // display pills in their correct context
          .filter(f => !isTandemSearch ? !f.isTandem : true)
          // map items
          .map(item => (<Pill
            key={`${item.codeRef}-${item.description}-${item.isTandem}`}
            description={item.description}
            codeRef={item.codeRef}
            selectionRef={item.selectionRef}
            onPillClick={onPillClick}
            isTandem2={isTandemSearch && item.isTandem}
            isCommon={isTandemSearch && item.isCommon}
          />))
      }
    </div>
    // </InteractiveElement>
  );
};

PillList.contextTypes = {
  isTandemSearch: PropTypes.bool,
};

PillList.propTypes = {
  items: PILL_ITEM_ARRAY,
  onPillClick: PropTypes.func.isRequired,
};

PillList.defaultProps = {
  items: [],
};

export default PillList;
