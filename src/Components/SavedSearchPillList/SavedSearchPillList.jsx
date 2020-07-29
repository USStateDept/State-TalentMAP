import React from 'react';
import PropTypes from 'prop-types';
import { forEach } from 'lodash';
import { shortenString } from '../../utilities';

const addColorClass = (pills, isProjectedVacancy, isTandemSearch) => {
  const pills$ = [];
  const projectedOp = {
    true: { colorClass: 'pill--projected-vacancy' },
    false: { colorClass: '' },
  };
  forEach(pills, (value) => {
    // add colors for Tandem pills
    if (isTandemSearch) {
      if (value.isTandem && !value.isCommon) {
        // isTandem tells us tandem2
        pills$.push({ ...value, colorClass: 'pill--tandem2' });
      } else if (!value.isCommon) {
        // !isTandem and !isCommon tells us tandem1
        pills$.push({ ...value, colorClass: 'pill--tandem-search' });
      } else {
        // isCommon
        pills$.push({ ...value, ...projectedOp[isProjectedVacancy] });
      }
    } else {
      pills$.push({ ...value, ...projectedOp[isProjectedVacancy] });
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
