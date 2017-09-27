import React from 'react';
import PropTypes from 'prop-types';
import SavedSearchesCard from '../SavedSearchesCard';
import * as PROP_TYPES from '../../Constants/PropTypes';

const SavedSearchesList = ({ savedSearches, goToSavedSearch, deleteSearch, cloneSavedSearch }) => {
  const searchList = savedSearches.results.slice().map(savedSearch => (
    <SavedSearchesCard
      savedSearch={savedSearch}
      goToSavedSearch={goToSavedSearch}
      deleteSearch={deleteSearch}
      key={savedSearch.id}
      cloneSavedSearch={cloneSavedSearch}
    />
  ));
  return (
    <div className="usa-grid-full">
      {searchList}
    </div>
  );
};

SavedSearchesList.propTypes = {
  savedSearches: PROP_TYPES.SAVED_SEARCH_PARENT_OBJECT.isRequired,
  goToSavedSearch: PropTypes.func.isRequired,
  deleteSearch: PropTypes.func.isRequired,
  cloneSavedSearch: PropTypes.func.isRequired,
};

export default SavedSearchesList;
