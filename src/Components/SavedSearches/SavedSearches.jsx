import React from 'react';
import PropTypes from 'prop-types';
import Alert from '../Alert/Alert';
import ProfileSectionTitle from '../ProfileSectionTitle';
import SelectForm from '../SelectForm';
import Spinner from '../Spinner';
import SavedSearchesList from './SavedSearchesList';
import {
  SAVED_SEARCH_PARENT_OBJECT,
  DELETE_SAVED_SEARCH_HAS_ERRORED,
  DELETE_SAVED_SEARCH_SUCCESS,
  CLONE_SAVED_SEARCH_HAS_ERRORED,
  CLONE_SAVED_SEARCH_SUCCESS,
  MAPPED_PARAM_ARRAY,
} from '../../Constants/PropTypes';
import { SAVED_SEARCH_SORTS } from '../../Constants/Sort';

const SavedSearches = (props) => {
  const {
    savedSearches,
    savedSearchesIsLoading,
    goToSavedSearch,
    deleteSearch,
    onSortChange,
    deleteSavedSearchIsLoading,
    deleteSavedSearchHasErrored,
    deleteSavedSearchSuccess,
    cloneSavedSearch,
    cloneSavedSearchIsLoading,
    cloneSavedSearchHasErrored,
    cloneSavedSearchSuccess,
    mappedParams,
    filtersIsLoading,
  } = props;

  const isLoading = (
    filtersIsLoading || savedSearchesIsLoading ||
    cloneSavedSearchIsLoading || deleteSavedSearchIsLoading
  );

  return (
    <div
      className={`usa-grid-full profile-content-inner-container saved-searches-container saved-searches-page
      ${(isLoading) ? 'results-loading' : ''}`}
    >
      <div className="usa-grid-full searches-top-section">
        <div className="searches-title-container">
          <ProfileSectionTitle title="Saved Searches" />
        </div>
        <div className="results-dropdown results-dropdown-sort">
          <SelectForm
            id="sort"
            label="Sort by:"
            onSelectOption={onSortChange}
            options={SAVED_SEARCH_SORTS.options}
            disabled={savedSearchesIsLoading}
          />
        </div>
      </div>
      {
        // Deleting a saved search has errored
        !deleteSavedSearchIsLoading && !deleteSavedSearchSuccess && deleteSavedSearchHasErrored &&
          <Alert
            type="error"
            title="Error"
            messages={[{ body: deleteSavedSearchHasErrored }]}
            isAriaLive
          />
      }
      {
        // Deleting a saved search was successful
        !deleteSavedSearchIsLoading && deleteSavedSearchSuccess && !deleteSavedSearchHasErrored &&
          <Alert
            type="success"
            title="Success"
            messages={[{ body: deleteSavedSearchSuccess }]}
            isAriaLive
          />
      }
      {
        // Cloning a saved search has errored
        !cloneSavedSearchIsLoading && !cloneSavedSearchSuccess && cloneSavedSearchHasErrored &&
          <Alert
            type="error"
            title="Error"
            messages={[{ body: cloneSavedSearchHasErrored }]}
            isAriaLive
          />
      }
      {
        // Cloning a saved search was successful
        !cloneSavedSearchIsLoading && cloneSavedSearchSuccess && !cloneSavedSearchHasErrored &&
          <Alert
            type="success"
            title="Success"
            messages={[{ body: cloneSavedSearchSuccess }]}
            isAriaLive
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
  onSortChange: PropTypes.func.isRequired,
};

SavedSearches.defaultProps = {
  mappedParams: [],
};

export default SavedSearches;
