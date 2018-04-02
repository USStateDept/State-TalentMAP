import React from 'react';
import PropTypes from 'prop-types';
import { POSITION_DETAILS, MAPPED_PARAM_ARRAY } from '../../../Constants/PropTypes';
import { NO_UPDATE_DATE } from '../../../Constants/SystemMessages';
import { mapSavedSearchToDescriptions, formatDate } from '../../../utilities';
import SavedSearchPillList from '../../SavedSearchPillList';

const SavedSearchListResultsCard = ({ savedSearch, goToSavedSearch, mappedParams,
deleteSearch }) => {
  const pills = mapSavedSearchToDescriptions(savedSearch.filters, mappedParams);
  const dateCreated = savedSearch.date_created ?
    formatDate(savedSearch.date_created) : NO_UPDATE_DATE;
  return (
    <div className="usa-grid-full saved-search-card profile-section-container" key={savedSearch.id}>
      <div className="usa-grid-full">
        <div className="usa-width-one-fourth">
          <div><span className="title">Name: </span><h3>{savedSearch.name}</h3></div>
          <div><span className="title">Created: </span><span>{dateCreated}</span></div>
        </div>
        <div className="usa-width-one-half">
          <div className="usa-grid-full">
            <div className="usa-width-one-fourth title">Your selections:</div>
            <div className="usa-width-three-fourths"><SavedSearchPillList pills={pills} /></div>
          </div>
        </div>
        <div className="usa-width-one-fourth">
          <div className="button-container">
            <button className="usa-button-secondary" onClick={() => deleteSearch(savedSearch.id)} >Delete</button>
            <button className="usa-button" onClick={() => goToSavedSearch(savedSearch)} >View</button>
          </div>
        </div>
      </div>
    </div>
  );
};

SavedSearchListResultsCard.propTypes = {
  savedSearch: POSITION_DETAILS.isRequired,
  goToSavedSearch: PropTypes.func.isRequired,
  mappedParams: MAPPED_PARAM_ARRAY.isRequired,
  deleteSearch: PropTypes.func.isRequired,
};

export default SavedSearchListResultsCard;
