import React from 'react';
import PropTypes from 'prop-types';

const SavedSearchesList = ({ savedSearch, goToSavedSearch, deleteSearch }) => (
  <div className="usa-grid-full saved-search-card" key={savedSearch.id}>
    <div className="usa-grid-full">
      <div className="usa-width-one-whole saved-search-card-name">
        Name: {savedSearch.name}
      </div>
    </div>
    <div className="usa-width-one-whole">
      <button onClick={() => goToSavedSearch(savedSearch)}>View Results</button>
      <button onClick={() => deleteSearch(savedSearch.id)}>Delete</button>
    </div>
  </div>
);

SavedSearchesList.propTypes = {
  savedSearch: PropTypes.shape({}).isRequired,
  goToSavedSearch: PropTypes.func.isRequired,
  deleteSearch: PropTypes.func.isRequired,
};

export default SavedSearchesList;
