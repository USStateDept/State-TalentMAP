import React from 'react';
import PropTypes from 'prop-types';
import { SAVED_SEARCH_PARENT_OBJECT } from '../../Constants/PropTypes';

const SavedSearchesList = ({ savedSearch, goToSavedSearch, deleteSearch, cloneSavedSearch }) => (
  <div className="usa-grid-full saved-search-card" key={savedSearch.id}>
    <div className="usa-grid-full">
      <div className="usa-width-one-whole saved-search-card-name">
        Name: {savedSearch.name}
      </div>
    </div>
    <div className="usa-width-one-whole">
      <button onClick={() => goToSavedSearch(savedSearch)}>View Results</button>
      <button onClick={() => cloneSavedSearch(savedSearch.id)}>Clone</button>
      <button
        className="usa-button-secondary"
        onClick={() => deleteSearch(savedSearch.id)}
      >
        Delete
      </button>
    </div>
  </div>
);

SavedSearchesList.propTypes = {
  savedSearch: SAVED_SEARCH_PARENT_OBJECT.isRequired,
  goToSavedSearch: PropTypes.func.isRequired,
  deleteSearch: PropTypes.func.isRequired,
  cloneSavedSearch: PropTypes.func.isRequired,
};

export default SavedSearchesList;
