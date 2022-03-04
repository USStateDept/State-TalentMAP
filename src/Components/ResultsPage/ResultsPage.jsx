import { Component } from 'react';
import PropTypes from 'prop-types';
import { get, isEqual } from 'lodash';
import { connect } from 'react-redux';
import Joyride, { STATUS } from 'react-joyride';
import FA from 'react-fontawesome';
import InteractiveElement from 'Components/InteractiveElement';
import { ACCORDION_SELECTION_OBJECT, BID_RESULTS, EMPTY_FUNCTION,
  FILTER_ITEMS_ARRAY, MISSION_DETAILS_ARRAY, PILL_ITEM_ARRAY, POSITION_SEARCH_RESULTS,
  POST_DETAILS_ARRAY, SORT_BY_PARENT_OBJECT, USER_PROFILE } from '../../Constants/PropTypes';
import { filterPVSorts, filterTandemSorts } from '../../Constants/Sort';
import { ACCORDION_SELECTION } from '../../Constants/DefaultProps';
import ResultsContainer from '../ResultsContainer/ResultsContainer';
import ResultsSearchHeader from '../ResultsSearchHeader/ResultsSearchHeader';
import ResultsFilterContainer from '../ResultsFilterContainer/ResultsFilterContainer';
import MediaQuery from '../MediaQuery';
import Steps from './tutorialSteps';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: { value: 0 },
      run: false,
      steps: Steps,
    };
  }

  getChildContext() {
    return {
      isProjectedVacancy: this.props.isProjectedVacancy,
      isClient: this.props.isClient,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
  }

  getKeywordValue() {
    return this.keywordRef ? this.keywordRef.getValue() : null;
  }

  handleJoyrideCallback = data => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      this.setState({ run: false });
    }
  };

  handleTutorialButtonClick = () => {
    const { isLoading, results } = this.props;
    if (!isLoading && get(results, 'results', []).length) {
      this.setState({ run: !this.state.run });
    }
  }

  render() {
    const { results, isLoading, hasErrored, sortBy, defaultKeyword, defaultLocation, resetFilters,
      pillFilters, defaultSort, pageSizes, defaultPageSize, onQueryParamToggle,
      defaultPageNumber, onQueryParamUpdate, filters, userProfile,
      selectedAccordion, setAccordion, scrollToTop,
      fetchMissionAutocomplete, missionSearchResults, missionSearchIsLoading,
      missionSearchHasErrored, fetchPostAutocomplete,
      postSearchResults, postSearchIsLoading, postSearchHasErrored, shouldShowSearchBar,
      bidList, isProjectedVacancy, filtersIsLoading, showClear, shouldShowMobileFilter }
      = this.props;
    const { isTandemSearch } = this.context;
    const hasLoaded = !isLoading && results.results && !!results.results.length;
    const { steps } = this.state;

    let sortBy$ = isProjectedVacancy ? filterPVSorts(sortBy) : sortBy;
    sortBy$ = isTandemSearch ? filterTandemSorts(sortBy$) : sortBy$;

    const filterContainer = (
      <ResultsFilterContainer
        filters={filters}
        isLoading={filtersIsLoading}
        onQueryParamUpdate={onQueryParamUpdate}
        onChildToggle={this.onChildToggle}
        onQueryParamToggle={onQueryParamToggle}
        resetFilters={resetFilters}
        setAccordion={setAccordion}
        selectedAccordion={selectedAccordion}
        fetchMissionAutocomplete={fetchMissionAutocomplete}
        missionSearchResults={missionSearchResults}
        missionSearchIsLoading={missionSearchIsLoading}
        missionSearchHasErrored={missionSearchHasErrored}
        fetchPostAutocomplete={fetchPostAutocomplete}
        postSearchResults={postSearchResults}
        postSearchIsLoading={postSearchIsLoading}
        postSearchHasErrored={postSearchHasErrored}
        showClear={showClear}
      />
    );
    return (
      <div className="results content-container">
        <h2 className="sr-only">Search results</h2>
        {
          shouldShowSearchBar &&
          <ResultsSearchHeader
            ref={(ref) => { this.keywordRef = ref; }}
            onUpdate={onQueryParamUpdate}
            defaultKeyword={defaultKeyword}
            defaultLocation={defaultLocation}
          />
        }
        <div className="usa-grid-full results-section-container">
          <MediaQuery breakpoint="screenMdMin" widthType="min">
            {matches => matches ?
              <>
                {filterContainer}
                <InteractiveElement
                  onClick={this.handleTutorialButtonClick}
                  className="tutorial-button"
                  title="Display tutorial"
                >
                  <FA name="question-circle" />
                </InteractiveElement>
                <Joyride
                  steps={steps}
                  continuous
                  scrollToFirstStep
                  showProgress
                  showSkipButton
                  run={this.state.run}
                  disableOverlayClose
                  disableCloseOnEsc
                  hideCloseButton
                  scrollOffset={300}
                  callback={this.handleJoyrideCallback}
                  styles={{
                    options: {
                      primaryColor: '#0071BC',
                      zIndex: 1000,
                    },
                  }}
                  locale={{ skip: 'Exit', last: 'Exit' }}
                /></> : <>{shouldShowMobileFilter && filterContainer}</>
            }
          </MediaQuery>
          <ResultsContainer
            results={results}
            isLoading={isLoading}
            hasErrored={hasErrored}
            sortBy={sortBy$}
            pageSize={defaultPageSize}
            totalResults={results.count}
            hasLoaded={hasLoaded || false}
            defaultSort={defaultSort}
            pageSizes={pageSizes}
            defaultPageSize={defaultPageSize}
            defaultPageNumber={defaultPageNumber}
            queryParamUpdate={onQueryParamUpdate}
            refreshKey={this.state.key}
            pillFilters={pillFilters}
            onQueryParamToggle={onQueryParamToggle}
            scrollToTop={scrollToTop}
            userProfile={userProfile}
            bidList={bidList}
          />
        </div>
      </div>
    );
  }
}

Results.propTypes = {
  hasErrored: PropTypes.bool.isRequired,
  filtersIsLoading: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  results: POSITION_SEARCH_RESULTS,
  onQueryParamUpdate: PropTypes.func.isRequired,
  onQueryParamToggle: PropTypes.func.isRequired,
  sortBy: SORT_BY_PARENT_OBJECT.isRequired,
  defaultSort: PropTypes.node,
  pageSizes: SORT_BY_PARENT_OBJECT.isRequired,
  defaultPageSize: PropTypes.number,
  defaultPageNumber: PropTypes.number,
  defaultKeyword: PropTypes.string,
  defaultLocation: PropTypes.string,
  resetFilters: PropTypes.func.isRequired,
  pillFilters: PILL_ITEM_ARRAY,
  selectedAccordion: ACCORDION_SELECTION_OBJECT,
  setAccordion: PropTypes.func.isRequired,
  filters: FILTER_ITEMS_ARRAY,
  scrollToTop: PropTypes.func,
  userProfile: USER_PROFILE,
  fetchMissionAutocomplete: PropTypes.func.isRequired,
  missionSearchResults: MISSION_DETAILS_ARRAY.isRequired,
  missionSearchIsLoading: PropTypes.bool.isRequired,
  missionSearchHasErrored: PropTypes.bool.isRequired,
  fetchPostAutocomplete: PropTypes.func.isRequired,
  postSearchResults: POST_DETAILS_ARRAY.isRequired,
  postSearchIsLoading: PropTypes.bool.isRequired,
  postSearchHasErrored: PropTypes.bool.isRequired,
  shouldShowSearchBar: PropTypes.bool.isRequired,
  bidList: BID_RESULTS.isRequired,
  isProjectedVacancy: PropTypes.bool,
  showClear: PropTypes.bool,
  shouldShowMobileFilter: PropTypes.bool,
  isClient: PropTypes.bool,
};

Results.defaultProps = {
  results: { results: [] },
  hasErrored: false,
  isLoading: true,
  onQueryParamUpdate: EMPTY_FUNCTION,
  defaultSort: '',
  defaultPageSize: 10,
  defaultPageNumber: 0,
  defaultKeyword: '',
  defaultLocation: '',
  pillFilters: [],
  selectedAccordion: ACCORDION_SELECTION,
  filters: [],
  scrollToTop: EMPTY_FUNCTION,
  userProfile: {},
  currentSavedSearch: {},
  isProjectedVacancy: false,
  showClear: false,
  shouldShowMobileFilter: false,
  isClient: false,
};

Results.contextTypes = {
  router: PropTypes.object,
  isTandemSearch: PropTypes.bool,
};

Results.childContextTypes = {
  isProjectedVacancy: PropTypes.bool,
  isClient: PropTypes.bool,
};

export const mapStateToProps = state => ({
  shouldShowMobileFilter: state.shouldShowMobileFilter,
});

export default connect(mapStateToProps, null, null, { forwardRef: true })(Results);
