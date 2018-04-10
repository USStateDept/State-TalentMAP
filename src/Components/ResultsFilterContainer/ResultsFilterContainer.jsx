import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FILTER_ITEMS_ARRAY, ACCORDION_SELECTION_OBJECT,
  MISSION_DETAILS_ARRAY, POST_DETAILS_ARRAY, USER_PROFILE } from '../../Constants/PropTypes';
import { ACCORDION_SELECTION } from '../../Constants/DefaultProps';
import SearchFiltersContainer from '../SearchFilters/SearchFiltersContainer/SearchFiltersContainer';
import ResetFilters from '../ResetFilters/ResetFilters';

class ResultsFilterContainer extends Component {
  constructor(props) {
    super(props);
    this.onQueryParamUpdate = this.onQueryParamUpdate.bind(this);
    this.onQueryParamToggle = this.onQueryParamToggle.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    if (this.props !== nextProps) {
      return true;
    }
    return false;
  }

  onQueryParamUpdate(e) {
    this.props.onQueryParamUpdate(e);
    this.props.onChildToggle();
  }

  onQueryParamToggle(param, value, remove) {
    this.props.onQueryParamToggle(param, value, remove);
    this.props.onChildToggle();
  }

  render() {
    const { filters, resetFilters, setAccordion, selectedAccordion,
      fetchMissionAutocomplete, missionSearchResults, missionSearchIsLoading,
      missionSearchHasErrored, fetchPostAutocomplete, userProfile,
      postSearchResults, postSearchIsLoading, postSearchHasErrored } = this.props;
    return (
      <div className="filter-container">
        <div className="filter-container-bottom">
          <div className="usa-grid-full filter-control-container">
            <div className="filter-control-left">Select Filter:</div>
            <div className="filter-control-right">
              <ResetFilters resetFilters={resetFilters} />
            </div>
          </div>
          <div className="usa-grid-full search-filters-container">
            <SearchFiltersContainer
              filters={filters}
              queryParamUpdate={this.onQueryParamUpdate}
              queryParamToggle={this.onQueryParamToggle}
              selectedAccordion={selectedAccordion}
              setAccordion={setAccordion}
              fetchMissionAutocomplete={fetchMissionAutocomplete}
              missionSearchResults={missionSearchResults}
              missionSearchIsLoading={missionSearchIsLoading}
              missionSearchHasErrored={missionSearchHasErrored}
              fetchPostAutocomplete={fetchPostAutocomplete}
              postSearchResults={postSearchResults}
              postSearchIsLoading={postSearchIsLoading}
              postSearchHasErrored={postSearchHasErrored}
              isCDO={userProfile.is_cdo || false}
            />
          </div>
        </div>
      </div>
    );
  }
}

ResultsFilterContainer.propTypes = {
  filters: FILTER_ITEMS_ARRAY.isRequired,
  onQueryParamUpdate: PropTypes.func.isRequired,
  onChildToggle: PropTypes.func.isRequired,
  onQueryParamToggle: PropTypes.func.isRequired,
  resetFilters: PropTypes.func.isRequired,
  setAccordion: PropTypes.func.isRequired,
  selectedAccordion: ACCORDION_SELECTION_OBJECT,
  fetchMissionAutocomplete: PropTypes.func.isRequired,
  missionSearchResults: MISSION_DETAILS_ARRAY.isRequired,
  missionSearchIsLoading: PropTypes.bool.isRequired,
  missionSearchHasErrored: PropTypes.bool.isRequired,
  fetchPostAutocomplete: PropTypes.func.isRequired,
  postSearchResults: POST_DETAILS_ARRAY.isRequired,
  postSearchIsLoading: PropTypes.bool.isRequired,
  postSearchHasErrored: PropTypes.bool.isRequired,
  userProfile: USER_PROFILE.isRequired,
};

ResultsFilterContainer.defaultProps = {
  selectedAccordion: ACCORDION_SELECTION,
};

export default ResultsFilterContainer;
