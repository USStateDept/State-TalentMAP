import React from 'react';
import PropTypes from 'prop-types';
import * as PROP_TYPES from '../../Constants/PropTypes';
import Spinner from '../Spinner';
import SavedSearchesList from '../SavedSearchesList';
import Alert from '../Alert/Alert';
import ProfileSectionTitle from '../ProfileSectionTitle';

const SavedSearches = ({ savedSearches, savedSearchesIsLoading,
  savedSearchesHasErrored, goToSavedSearch, deleteSearch,
  deleteSavedSearchIsLoading, deleteSavedSearchHasErrored, deleteSavedSearchSuccess,
  cloneSavedSearch, cloneSavedSearchIsLoading, cloneSavedSearchHasErrored,
  cloneSavedSearchSuccess }) => (
    <div
      className={`usa-grid-full saved-searches-container
      ${(savedSearchesIsLoading || cloneSavedSearchIsLoading) ? 'results-loading' : ''}`}
    >
      <ProfileSectionTitle title="Your Saved Searches:" />
      {
        // Deleting a saved search has errored
        !deleteSavedSearchIsLoading && !deleteSavedSearchSuccess && deleteSavedSearchHasErrored &&
          <Alert
            type="error"
            title="Error"
            messages={[{ body: deleteSavedSearchHasErrored }]}
          />
      }
      {
        // Deleting a saved search was successful
        !deleteSavedSearchIsLoading && deleteSavedSearchSuccess && !deleteSavedSearchHasErrored &&
          <Alert
            type="success"
            title="Success"
            messages={[{ body: deleteSavedSearchSuccess }]}
          />
      }
      {
        // Cloning a saved search has errored
        !cloneSavedSearchIsLoading && !cloneSavedSearchSuccess && cloneSavedSearchHasErrored &&
          <Alert
            type="error"
            title="Error"
            messages={[{ body: cloneSavedSearchHasErrored }]}
          />
      }
      {
        // Cloning a saved search was successful
        !cloneSavedSearchIsLoading && cloneSavedSearchSuccess && !cloneSavedSearchHasErrored &&
          <Alert
            type="success"
            title="Success"
            messages={[{ body: cloneSavedSearchSuccess }]}
          />
      }
      {
        savedSearchesIsLoading && !savedSearchesHasErrored &&
          <Spinner type="homepage-position-results" size="big" />
      }
      <SavedSearchesList
        savedSearches={savedSearches}
        goToSavedSearch={goToSavedSearch}
        deleteSearch={deleteSearch}
        cloneSavedSearch={cloneSavedSearch}
      />
    </div>
);

SavedSearches.propTypes = {
  savedSearches: PROP_TYPES.SAVED_SEARCH_PARENT_OBJECT.isRequired,
  savedSearchesIsLoading: PropTypes.bool.isRequired,
  savedSearchesHasErrored: PropTypes.bool.isRequired,
  goToSavedSearch: PropTypes.func.isRequired,
  deleteSearch: PropTypes.func.isRequired,
  deleteSavedSearchIsLoading: PropTypes.bool.isRequired,
  deleteSavedSearchHasErrored: PROP_TYPES.DELETE_SAVED_SEARCH_HAS_ERRORED.isRequired,
  deleteSavedSearchSuccess: PROP_TYPES.DELETE_SAVED_SEARCH_SUCCESS.isRequired,
  cloneSavedSearch: PropTypes.func.isRequired,
  cloneSavedSearchIsLoading: PropTypes.bool.isRequired,
  cloneSavedSearchHasErrored: PROP_TYPES.CLONE_SAVED_SEARCH_HAS_ERRORED.isRequired,
  cloneSavedSearchSuccess: PROP_TYPES.CLONE_SAVED_SEARCH_SUCCESS.isRequired,
};

export default SavedSearches;
