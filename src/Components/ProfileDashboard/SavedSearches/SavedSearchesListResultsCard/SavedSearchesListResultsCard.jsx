import React from 'react';
import PropTypes from 'prop-types';
import { POSITION_DETAILS, MAPPED_PARAM_ARRAY } from '../../../../Constants/PropTypes';
import { mapSavedSearchToDescriptions } from '../../../../utilities';
import SavedSearchPillList from './SavedSearchPillList';

const SavedSearchListResultsCard = ({ savedSearch, goToSavedSearch, mappedParams }) => {
  const pills = mapSavedSearchToDescriptions(savedSearch.filters, mappedParams).slice(0, 2);
  return (
    <div className="usa-grid-full saved-search-card profile-section-container" key={savedSearch.id}>
      <div className="usa-grid-full">
        <div className="usa-width-one-half favorites-card-section">
          <div>{savedSearch.name}</div>
          <SavedSearchPillList pills={pills} />
        </div>
        <div className="usa-width-one-half favorites-card-section">
          <button className="tm-button-transparent" onClick={() => goToSavedSearch(savedSearch)} >View</button>
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
