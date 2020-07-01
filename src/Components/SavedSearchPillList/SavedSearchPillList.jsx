import React from 'react';
import PropTypes from 'prop-types';
import { shortenString } from '../../utilities';

const withPV = (pills, isProjectedVacancy) => {
  if (isProjectedVacancy) {
    return ['Projected Vacancy', ...pills];
  }
  return pills;
};

const SavedSearchPillList = (props, context) => {
  const { pills, isProjectedVacancy, highlightedString } = props;
  const { isTandemSearch } = context;
  let isolatedPills;
  if (isProjectedVacancy) {
    isolatedPills = (<div className="saved-search-pill pill--projected-vacancy pill--highlight">
      Projected Vacancy</div>);
    if (isTandemSearch) {
      isolatedPills += (<div className="saved-search-pill pill--tandem-search">
        Tandem</div>);
    }
  } else {
    isolatedPills = (<div className="saved-search-pill">
      Available Position</div>);
    if (isTandemSearch) {
      isolatedPills += (<div className="saved-search-pill pill--tandem-search">
        Tandem</div>);
    }
  }
  return (
    pills.length ?
      <div>
        {
        // sort highlighted string to beginning
        // eslint-disable-next-line
        withPV(pills, isProjectedVacancy).sort((x, y) => x === highlightedString ? -1 : y === highlightedString ? 1 : 0).map(p => (
            <div
              className={`saved-search-pill ${isProjectedVacancy ? 'pill--projected-vacancy' : ''} ${p === highlightedString ? 'pill--highlight' : ''}`}
              key={p}
            >
              {shortenString(p, 21)}
            </div>
          ),
          )
        }
      </div>
      :
      <div>
        {isolatedPills}
      </div>
  );
};

SavedSearchPillList.contextTypes = {
  isTandemSearch: PropTypes.bool,
};

SavedSearchPillList.propTypes = {
  pills: PropTypes.arrayOf(PropTypes.string),
  isProjectedVacancy: PropTypes.bool,
  highlightedString: PropTypes.string,
};

SavedSearchPillList.defaultProps = {
  pills: [],
  isProjectedVacancy: false,
  highlightedString: 'Projected Vacancy',
};

export default SavedSearchPillList;
