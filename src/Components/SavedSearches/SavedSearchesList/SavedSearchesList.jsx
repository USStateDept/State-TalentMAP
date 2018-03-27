import React from 'react';
import PropTypes from 'prop-types';
import SavedSearchesListResultsCard from '../SavedSearchesListResultsCard';
import { SAVED_SEARCH_PARENT_OBJECT, MAPPED_PARAM_ARRAY } from '../../../Constants/PropTypes';
import NoSavedSearches from '../../EmptyListAlert/NoSavedSearches';

const SavedSearchesList = ({ savedSearches, goToSavedSearch, deleteSearch, cloneSavedSearch,
mappedParams }) => {
  const savedSearchArray = [];
  savedSearches.results.slice().forEach(savedSearch => (
    savedSearchArray.push(
      <SavedSearchesListResultsCard
        savedSearch={savedSearch}
        goToSavedSearch={goToSavedSearch}
        deleteSearch={deleteSearch}
        key={savedSearch.id}
        cloneSavedSearch={cloneSavedSearch}
        mappedParams={mappedParams}
        /* pass a parentClassName that we can use from the BorderedList component */
        parentClassName="parent-list-container list-transparent"
      />,
    )
  ));
  let emptyListClass = 'saved-searches-list-empty';
  if (savedSearchArray.length) { emptyListClass = ''; }
  return (
    <div className="usa-grid-full">
      {
        <div className={`usa-grid-full saved-searches-list ${emptyListClass}`}>
          {savedSearchArray.map(s => s)}
        </div>
      }
      {
        !savedSearchArray.length && <NoSavedSearches />
      }
    </div>
  );
};

SavedSearchesList.propTypes = {
  savedSearches: SAVED_SEARCH_PARENT_OBJECT.isRequired,
  goToSavedSearch: PropTypes.func.isRequired,
  deleteSearch: PropTypes.func.isRequired,
  cloneSavedSearch: PropTypes.func.isRequired,
  mappedParams: MAPPED_PARAM_ARRAY.isRequired,
};

SavedSearchesList.defaultProps = {
  mappedParams: [],
};

export default SavedSearchesList;
