import React from 'react';
import PropTypes from 'prop-types';
import { shortenString } from '../../utilities';

const withPV = (pills, isProjectedVacancy) => {
  if (isProjectedVacancy) {
    return ['Projected Vacancy', ...pills];
  }
  return pills;
};

const SavedSearchPillList = ({ pills, isProjectedVacancy, highlightedString }) => (
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
      {
        <div
          className={`saved-search-pill ${isProjectedVacancy ? 'pill--projected-vacancy' : ''} ${isProjectedVacancy ? 'pill--highlight' : ''}`}
        >
          {isProjectedVacancy ? 'Projected Vacancy' : 'Available Position'}
        </div>
      }
    </div>
);

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
