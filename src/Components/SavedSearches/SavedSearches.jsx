import React from 'react';
import PropTypes from 'prop-types';
import { SAVED_SEARCH_PARENT_OBJECT } from '../../Constants/PropTypes';
import Spinner from '../Spinner';
import SavedSearchesList from '../SavedSearchesList';

const SavedSearches = ({ savedSearches, savedSearchesIsLoading,
  savedSearchesHasErrored, goToSavedSearch, deleteSearch }) => (
    <div className={`usa-grid-full saved-searches-container ${savedSearchesIsLoading ? 'results-loading' : null}`} style={{ position: 'relative' }}>
    Your Saved Searches:
      {
        savedSearchesIsLoading && !savedSearchesHasErrored &&
          <Spinner type="homepage-position-results" size="big" />
      }
      <SavedSearchesList
        savedSearches={savedSearches}
        goToSavedSearch={goToSavedSearch}
        deleteSearch={deleteSearch}
      />
    </div>
);

SavedSearches.propTypes = {
  savedSearches: SAVED_SEARCH_PARENT_OBJECT.isRequired,
  savedSearchesIsLoading: PropTypes.bool.isRequired,
  savedSearchesHasErrored: PropTypes.bool.isRequired,
  goToSavedSearch: PropTypes.func.isRequired,
  deleteSearch: PropTypes.func.isRequired,
};

export default SavedSearches;
