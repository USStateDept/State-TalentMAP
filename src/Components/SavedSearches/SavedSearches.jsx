import React from 'react';
import PropTypes from 'prop-types';
import { SAVED_SEARCH_PARENT_OBJECT, DELETE_SAVED_SEARCH_HAS_ERRORED, DELETE_SAVED_SEARCH_SUCCESS,
CLONE_SAVED_SEARCH_HAS_ERRORED, CLONE_SAVED_SEARCH_SUCCESS, MAPPED_PARAM_ARRAY } from '../../Constants/PropTypes';
import Spinner from '../Spinner';
import SavedSearchesList from './SavedSearchesList';
import Alert from '../Alert/Alert';
import ProfileSectionTitle from '../ProfileSectionTitle';

const SavedSearches = ({ savedSearches, savedSearchesIsLoading,
  goToSavedSearch, deleteSearch,
  deleteSavedSearchIsLoading, deleteSavedSearchHasErrored, deleteSavedSearchSuccess,
  cloneSavedSearch, cloneSavedSearchIsLoading, cloneSavedSearchHasErrored,
  cloneSavedSearchSuccess, mappedParams, filtersIsLoading }) => {
  const isLoading = filtersIsLoading || savedSearchesIsLoading;
  return (
    <div
      className={`usa-grid-full profile-content-inner-container saved-searches-container saved-searches-page
      ${(savedSearchesIsLoading || cloneSavedSearchIsLoading) ? 'results-loading' : ''}`}
    >
      <ProfileSectionTitle title="Saved Searches" />
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
        isLoading &&
          <Spinner type="homepage-position-results" size="big" />
      }
      {
        !isLoading &&
        <SavedSearchesList
          savedSearches={savedSearches}
          goToSavedSearch={goToSavedSearch}
          deleteSearch={deleteSearch}
          cloneSavedSearch={cloneSavedSearch}
          mappedParams={mappedParams}
        />
      }
    </div>
  );
};

SavedSearches.propTypes = {
  savedSearches: SAVED_SEARCH_PARENT_OBJECT.isRequired,
  savedSearchesIsLoading: PropTypes.bool.isRequired,
  goToSavedSearch: PropTypes.func.isRequired,
  deleteSearch: PropTypes.func.isRequired,
  deleteSavedSearchIsLoading: PropTypes.bool.isRequired,
  deleteSavedSearchHasErrored: DELETE_SAVED_SEARCH_HAS_ERRORED.isRequired,
  deleteSavedSearchSuccess: DELETE_SAVED_SEARCH_SUCCESS.isRequired,
  cloneSavedSearch: PropTypes.func.isRequired,
  cloneSavedSearchIsLoading: PropTypes.bool.isRequired,
  cloneSavedSearchHasErrored: CLONE_SAVED_SEARCH_HAS_ERRORED.isRequired,
  cloneSavedSearchSuccess: CLONE_SAVED_SEARCH_SUCCESS.isRequired,
  mappedParams: MAPPED_PARAM_ARRAY,
  filtersIsLoading: PropTypes.bool.isRequired,
};

SavedSearches.defaultProps = {
  mappedParams: [],
};

export default SavedSearches;
