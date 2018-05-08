import React from 'react';
import PropTypes from 'prop-types';
import { POSITION_DETAILS, MAPPED_PARAM_ARRAY } from '../../../../Constants/PropTypes';
import { mapSavedSearchToDescriptions } from '../../../../utilities';
import SavedSearchPillList from '../../../SavedSearchPillList';

const SavedSearchListResultsCard = ({ savedSearch, goToSavedSearch, mappedParams }) => {
  const pills = mapSavedSearchToDescriptions(savedSearch.filters, mappedParams).slice(0, 4);
  return (
    <div className="usa-grid-full saved-search-card profile-section-container" key={savedSearch.id}>
      <div className="usa-grid-full">
        <div className="usa-width-one-half favorites-card-section">
          <div>{savedSearch.name}</div>
          <SavedSearchPillList pills={pills} />
        </div>
        <div className="usa-width-one-fourth favorites-card-section">
          <button onClick={() => goToSavedSearch(savedSearch)} >View Search</button>
        </div>
      </div>
    </div>
  );
};

SavedSearchListResultsCard.propTypes = {
  savedSearch: POSITION_DETAILS.isRequired,
  goToSavedSearch: PropTypes.func.isRequired,
  mappedParams: MAPPED_PARAM_ARRAY.isRequired,
};

export default SavedSearchListResultsCard;
