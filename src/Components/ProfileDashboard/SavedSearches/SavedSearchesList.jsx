import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SAVED_SEARCH_PARENT_OBJECT, MAPPED_PARAM_ARRAY } from '../../../Constants/PropTypes';
import SectionTitle from '../SectionTitle';
import BorderedList from '../../BorderedList';
import SavedSearchesListResultsCard from './SavedSearchesListResultsCard';
import Spinner from '../../Spinner';
import NoSavedSearches from '../../EmptyListAlert/NoSavedSearches';

const SavedSearchesList = ({ savedSearches, goToSavedSearch, mappedParams, filtersIsLoading }) => {
  const savedSearchArray = [];
  savedSearches.results.slice(0, 3).forEach(savedSearch => (
    savedSearchArray.push(
      <SavedSearchesListResultsCard
        savedSearch={savedSearch}
        goToSavedSearch={goToSavedSearch}
        mappedParams={mappedParams}
        /* pass a parentClassName that we can use from the BorderedList component */
        parentClassName="parent-list-container list-transparent"
      />,
    )
  ));
  return (
    <div className="usa-grid-full saved-searches-list-profile-container">
      {filtersIsLoading ?
        <Spinner type="homepage-position-results" size="big" />
        :
        <div className="usa-grid-full">
          <div className="usa-grid-full section-padded-inner-container">
            <div className="usa-width-one-whole">
              <SectionTitle title="Saved Searches" icon="clock-o" />
            </div>
          </div>
          <div className="saved-search-list-container">
            {
              savedSearchArray.length === 0 ?
                <div className="usa-grid-full section-padded-inner-container">
                  <NoSavedSearches />
                </div>
              :
                <BorderedList contentArray={savedSearchArray} />
            }
          </div>
          <div className="section-padded-inner-container small-link-container view-more-link-centered">
            <Link to="/profile/searches/">View More</Link>
          </div>
        </div>
      }
    </div>
  );
};

SavedSearchesList.propTypes = {
  savedSearches: SAVED_SEARCH_PARENT_OBJECT.isRequired,
  goToSavedSearch: PropTypes.func.isRequired,
  mappedParams: MAPPED_PARAM_ARRAY,
  filtersIsLoading: PropTypes.bool,
};

SavedSearchesList.defaultProps = {
  savedSearches: [],
  mappedParams: [],
  filtersIsLoading: false,
};

export default SavedSearchesList;
