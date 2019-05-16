import React from 'react';
import PropTypes from 'prop-types';
import ProfileSectionTitle from '../ProfileSectionTitle';
import SelectForm from '../SelectForm';
import Spinner from '../Spinner';
import SavedSearchesList from './SavedSearchesList';
import {
  SAVED_SEARCH_PARENT_OBJECT,
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
    mappedParams,
    filtersIsLoading,
  } = props;

  const isLoading = (filtersIsLoading || savedSearchesIsLoading);

  return (
    <div
      className={`usa-grid-full profile-content-inner-container saved-searches-container saved-searches-page
      ${(isLoading) ? 'results-loading' : ''}`}
    >
      <div className="usa-grid-full searches-top-section">
        <div className="searches-title-container">
          <ProfileSectionTitle title="Saved Searches" icon="clock-o" />
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
        isLoading &&
          <Spinner type="homepage-position-results" size="big" />
      }
      {
        !isLoading &&
        <SavedSearchesList
          savedSearches={savedSearches}
          goToSavedSearch={goToSavedSearch}
          deleteSearch={deleteSearch}
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
  mappedParams: MAPPED_PARAM_ARRAY,
  filtersIsLoading: PropTypes.bool.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

SavedSearches.defaultProps = {
  mappedParams: [],
};

export default SavedSearches;
