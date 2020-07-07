import React from 'react';
import PropTypes from 'prop-types';
import { forEach as forEach$ } from 'lodash';
import { shortenString } from '../../utilities';

const addColorClass = (pills, isProjectedVacancy, isTandemSearch) => {
  const pills$ = [];
  forEach$(pills, (value) => {
    // add colors for Tandem pills
    if (isTandemSearch) {
      if (value.isTandem) {
        // if isTandem: pill--tandem2
        pills$.push({ ...value, colorClass: 'pill--tandem2' });
      } else if (!value.isTandem && !value.isCommon) {
        // if !isTandem and !isCommon: pill--tandem-search
        pills$.push({ ...value, colorClass: 'pill--tandem-search' });
      } else if (value.isCommon) {
        if (isProjectedVacancy) {
          // if isCommon && isProjectedVacancy: pill--projected-vacancy
          pills$.push({ ...value, colorClass: 'pill--projected-vacancy' });
        } else {
          pills$.push({ ...value, colorClass: '' });
        }
      }
    } else if (isProjectedVacancy && !isTandemSearch) {
      // if isCommon && isProjectedVacancy: pill--projected-vacancy
      pills$.push({ ...value, colorClass: 'pill--projected-vacancy' });
    } else {
      pills$.push({ ...value, colorClass: '' });
    }
  });
  return pills$;
};

const SavedSearchPillList = (props) => {
  const { pills, isProjectedVacancy, highlightedString, isTandemSearch } = props;
  let isolatedPills;

  if (isProjectedVacancy) {
    isolatedPills = (<div className="saved-search-pill pill--projected-vacancy pill--highlight">
      Projected Vacancy</div>);
  } else {
    isolatedPills = (<div className="saved-search-pill">
      Available Position</div>);
  }

  return (
    pills.length ?
      <div>
        {
        // sort highlighted string to beginning
        // eslint-disable-next-line
          addColorClass(pills, isProjectedVacancy, isTandemSearch).sort((x, y) => x === highlightedString ? -1 : y === highlightedString ? 1 : 0).map(p => (
            <div
              className={`saved-search-pill ${p.colorClass}`}
              key={p.description}
            >
              {shortenString(p.description, 21)}
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

SavedSearchPillList.propTypes = {
  pills: PropTypes.arrayOf(PropTypes.shape({})),
  isProjectedVacancy: PropTypes.bool,
  isTandemSearch: PropTypes.bool,
  highlightedString: PropTypes.string,
};

SavedSearchPillList.defaultProps = {
  pills: [],
  isProjectedVacancy: false,
  isTandemSearch: false,
  highlightedString: 'Projected Vacancy',
};

export default SavedSearchPillList;
