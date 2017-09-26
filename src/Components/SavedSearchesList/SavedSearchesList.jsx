import React from 'react';
import PropTypes from 'prop-types';
import SavedSearchesCard from '../SavedSearchesCard';

const SavedSearchesList = ({ savedSearches, goToSavedSearch, deleteSearch }) => {
  const searchList = savedSearches.results.slice().map(savedSearch => (
    <SavedSearchesCard
      savedSearch={savedSearch}
      goToSavedSearch={goToSavedSearch}
      deleteSearch={deleteSearch}
    />
  ));
  return (
    <div className="usa-grid-full positions-section positions-section-new">
      {searchList}
    </div>
  );
};

SavedSearchesList.propTypes = {
  savedSearches: PropTypes.shape({}).isRequired,
  goToSavedSearch: PropTypes.func.isRequired,
  deleteSearch: PropTypes.func.isRequired,
};

export default SavedSearchesList;
