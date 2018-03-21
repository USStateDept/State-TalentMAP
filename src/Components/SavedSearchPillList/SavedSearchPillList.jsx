import React from 'react';
import PropTypes from 'prop-types';
import { shortenString } from '../../utilities';

const SavedSearchPillList = ({ pills }) => (
  pills.length ?
    <div>
      {pills.map(p => (<div className="saved-search-pill" key={p}>{shortenString(p, 21)}</div>))}
    </div>
    : null
);

SavedSearchPillList.propTypes = {
  pills: PropTypes.arrayOf(PropTypes.string),
};

SavedSearchPillList.defaultProps = {
  pills: [],
};

export default SavedSearchPillList;
