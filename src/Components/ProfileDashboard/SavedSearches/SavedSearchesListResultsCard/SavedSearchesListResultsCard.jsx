import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { MAPPED_PARAM_ARRAY, POSITION_DETAILS } from 'Constants/PropTypes';
import { mapSavedSearchToDescriptions } from 'utilities';
import SavedSearchPillList from '../../../SavedSearchPillList';
import InteractiveElement from '../../../InteractiveElement';

const SavedSearchListResultsCard = ({ savedSearch, goToSavedSearch,
  mappedParams, isProjectedVacancy, isTandemSearch }) => {
  const pills = mapSavedSearchToDescriptions(savedSearch.filters, mappedParams).slice(0, 4);
  return (
    <div className="usa-grid-full saved-search-card profile-section-container" key={savedSearch.id}>
      <div className="usa-grid-full">
        <div className="usa-width-one-whole favorites-card-section">
          <InteractiveElement
            onClick={() => goToSavedSearch(savedSearch)}
            className="search-title"
          >
            {savedSearch.name}
            <FontAwesome name="angle-right" />
          </InteractiveElement>
          <SavedSearchPillList
            pills={pills}
            isProjectedVacancy={isProjectedVacancy}
            isTandemSearch={isTandemSearch}
          />
        </div>
      </div>
    </div>
  );
};

SavedSearchListResultsCard.propTypes = {
  savedSearch: POSITION_DETAILS.isRequired,
  goToSavedSearch: PropTypes.func.isRequired,
  mappedParams: MAPPED_PARAM_ARRAY.isRequired,
  isProjectedVacancy: PropTypes.bool,
  isTandemSearch: PropTypes.bool,
};

SavedSearchListResultsCard.defaultProps = {
  isProjectedVacancy: false,
  isTandemSearch: false,
};

export default SavedSearchListResultsCard;
