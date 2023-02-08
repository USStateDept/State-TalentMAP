import { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'Components/ErrorBoundary';
import { isEmpty } from 'lodash';
import Sticky from 'react-sticky-el';
import { connect } from 'react-redux';
import { ACCORDION_SELECTION_OBJECT, BIDDER_OBJECT, FILTER_ITEMS_ARRAY,
  MISSION_DETAILS_ARRAY, POST_DETAILS_ARRAY } from '../../Constants/PropTypes';
import { ACCORDION_SELECTION } from '../../Constants/DefaultProps';
import SearchFiltersContainer from '../SearchFilters/SearchFiltersContainer';
import ResetFilters from '../ResetFilters/ResetFilters';
import MobileControls from './MobileControls';
import Spinner from '../Spinner';

export class ResultsFilterContainer extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props !== nextProps) {
      return true;
    }
    return false;
  }

  render() {
    const { filters, resetFilters, setAccordion, selectedAccordion, isLoading,
      fetchMissionAutocomplete, missionSearchResults, missionSearchIsLoading,
      missionSearchHasErrored, fetchPostAutocomplete, onQueryParamUpdate, onQueryParamToggle,
      postSearchResults, postSearchIsLoading, postSearchHasErrored, showClear,
      client } = this.props;
    return (
      <div className={`filter-container ${isLoading ? 'is-loading' : ''}`}>
        {isLoading && <Spinner type="results-filter" size="small" />}
        <ErrorBoundary>
          <MobileControls />
        </ErrorBoundary>
        <div className="filter-container-bottom">
          <div className="usa-grid-full filter-control-container">
            <div className="filter-control-left">Select Filter:</div>
            <div className="filter-control-right">
              { showClear && <ResetFilters resetFilters={resetFilters} /> }
            </div>
          </div>
          <div className="usa-grid-full search-filters-container">
            <Sticky
              topOffset={0}
              hideOnBoundaryHit={false}
              stickyClassName={`${isEmpty(client) ? 'sticky' : 'filter-sticky-client-view'}`}
              // bottomOffset={500}
              // scrollElement=".search-filters-container"
            >
              <ErrorBoundary>
                <SearchFiltersContainer
                  filters={filters}
                  queryParamUpdate={onQueryParamUpdate}
                  queryParamToggle={onQueryParamToggle}
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
                />
              </ErrorBoundary>
            </Sticky>
          </div>
        </div>
      </div>
    );
  }
}

ResultsFilterContainer.propTypes = {
  filters: FILTER_ITEMS_ARRAY.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onQueryParamUpdate: PropTypes.func.isRequired,
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
  showClear: PropTypes.bool,
  client: BIDDER_OBJECT,
};

ResultsFilterContainer.defaultProps = {
  selectedAccordion: ACCORDION_SELECTION,
  showClear: false,
  client: {},
};

const mapStateToProps = ({
  clientView: { client },
}) => ({
  client,
});

export default connect(mapStateToProps, null)(ResultsFilterContainer);
