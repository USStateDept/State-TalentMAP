import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BUREAU_POSITION_SORT, POSITION_MANAGER_PAGE_SIZES } from 'Constants/Sort';
import { FILTERS_PARENT, POSITION_SEARCH_RESULTS, BUREAU_PERMISSIONS, ORG_PERMISSIONS, BUREAU_USER_SELECTIONS } from 'Constants/PropTypes';
import Picky from 'react-picky';
import { get, sortBy, uniqBy, throttle } from 'lodash';
import { bureauPositionsFetchData, downloadBureauPositionsData, saveBureauUserSelections } from 'actions/bureauPositions';
import Spinner from 'Components/Spinner';
import ExportButton from 'Components/ExportButton';
import ProfileSectionTitle from 'Components/ProfileSectionTitle';
import TotalResults from 'Components/TotalResults';
import PaginationWrapper from 'Components/PaginationWrapper';
import Alert from 'Components/Alert';
import { scrollToTop } from 'utilities';
import { usePrevious } from 'hooks';
import ListItem from 'Components/BidderPortfolio/BidControls/BidCyclePicker/ListItem';
import SelectForm from 'Components/SelectForm';
import StaticDevContent from 'Components/StaticDevContent';
import PermissionsWrapper from 'Containers/PermissionsWrapper';
import { filtersFetchData } from 'actions/filters/filters';
import PositionManagerSearch from './PositionManagerSearch';
import BureauResultsCard from '../BureauResultsCard';


const PositionManager = props => {
  // Props
  const {
    bureauPermissions,
    bureauFilters,
    bureauPositions,
    bureauFiltersIsLoading,
    bureauPositionsIsLoading,
    bureauPositionsHasErrored,
    orgPermissions,
    userSelections,
  } = props;

  // Local state populating with defaults from previous user selections stored in redux
  const [page, setPage] = useState(userSelections.page || 1);
  const [limit, setLimit] = useState(userSelections.limit || 10);
  const [ordering, setOrdering] =
    useState(userSelections.ordering || BUREAU_POSITION_SORT.options[0].value);
  const [selectedGrades, setSelectedGrades] = useState(userSelections.selectedGrades || []);
  const [selectedSkills, setSelectedSkills] = useState(userSelections.selectedSkills || []);
  const [selectedPosts, setSelectedPosts] = useState(userSelections.selectedPosts || []);
  const [selectedTODs, setSelectedTODs] = useState(userSelections.selectedTODs || []);
  const [selectedCycles, setSelectedCycles] = useState(userSelections.selectedCycles || []);
  const [selectedLanguages, setSelectedLanguages] =
    useState(userSelections.selectedLanguages || []);
  const [selectedBureaus, setSelectedBureaus] =
    useState(userSelections.selectedBureaus || [props.bureauPermissions[0]]);
  const [selectedOrgs, setSelectedOrgs] =
    useState(userSelections.selectedOrgs || [props.orgPermissions[0]]);
  const [isLoading, setIsLoading] = useState(userSelections.isLoading || false);
  const [textSearch, setTextSearch] = useState(userSelections.textSearch || '');
  const [textInput, setTextInput] = useState(userSelections.textInput || '');

  // Pagination
  const prevPage = usePrevious(page);
  const pageSizes = POSITION_MANAGER_PAGE_SIZES;

  // Relevant filter objects from mega filter state
  const bureauFilters$ = bureauFilters.filters;
  const tods = bureauFilters$.find(f => f.item.description === 'tod');
  const todOptions = uniqBy(tods.data, 'code');
  const grades = bureauFilters$.find(f => f.item.description === 'grade');
  const gradeOptions = uniqBy(grades.data, 'code');
  const skills = bureauFilters$.find(f => f.item.description === 'skill');
  const skillOptions = uniqBy(sortBy(skills.data, [(s) => s.description]), 'code');
  const bureaus = bureauFilters$.find(f => f.item.description === 'region');
  const bureauOptions = sortBy(bureauPermissions, [(b) => b.long_description]);
  const organizations = orgPermissions;
  const organizationOptions = sortBy(organizations, [(o) => o.long_description]);
  const posts = bureauFilters$.find(f => f.item.description === 'post');
  const postOptions = uniqBy(sortBy(posts.data, [(p) => p.city]), 'code');
  const cycles = bureauFilters$.find(f => f.item.description === 'bidCycle');
  const cycleOptions = uniqBy(sortBy(cycles.data, [(c) => c.custom_description]), 'custom_description');
  const languages = bureauFilters$.find(f => f.item.description === 'language');
  const languageOptions = uniqBy(sortBy(languages.data, [(c) => c.custom_description]), 'custom_description');
  const sorts = BUREAU_POSITION_SORT;

  // Local state inputs to push to redux state
  const currentInputs = {
    page,
    limit,
    ordering,
    selectedGrades,
    selectedSkills,
    selectedPosts,
    selectedTODs,
    selectedBureaus,
    selectedOrgs,
    selectedCycles,
    selectedLanguages,
    textSearch,
    textInput,
  };

  // Query is passed to action which stringifies
  // key and values into sensible request url
  const query = {
    [grades.item.selectionRef]: selectedGrades.map(gradeObject => (get(gradeObject, 'code'))),
    [skills.item.selectionRef]: selectedSkills.map(skillObject => (get(skillObject, 'code'))),
    [posts.item.selectionRef]: selectedPosts.map(postObject => (get(postObject, 'code'))),
    [tods.item.selectionRef]: selectedTODs.map(tedObject => (get(tedObject, 'code'))),
    [bureaus.item.selectionRef]: selectedBureaus.map(bureauObject => (get(bureauObject, 'code'))),
    org_code: selectedOrgs.map(orgObject => (get(orgObject, 'code'))),
    [cycles.item.selectionRef]: selectedCycles.map(cycleObject => (get(cycleObject, 'id'))),
    [languages.item.selectionRef]: selectedLanguages.map(langObject => (get(langObject, 'code'))),
    ordering,
    page,
    limit,
    q: textInput || textSearch,
  };

  const noBureausSelected = selectedBureaus.filter(f => f).length < 1;
  const noOrgsSelected = selectedOrgs.filter(f => f).length < 1;

  // Initial render
  useEffect(() => {
    props.fetchFilters(bureauFilters, {});
    props.fetchBureauPositions(query);
    props.saveSelections(currentInputs);
  }, []);

  // Rerender and action on user selections
  useEffect(() => {
    if (prevPage) {
      if (!noBureausSelected || !noOrgsSelected) {
        props.fetchBureauPositions(query);
      }
      props.saveSelections(currentInputs);
      setPage(1);
    }
  }, [
    selectedGrades,
    selectedSkills,
    selectedPosts,
    selectedTODs,
    selectedBureaus,
    selectedOrgs,
    selectedCycles,
    selectedLanguages,
    ordering,
    limit,
    textSearch,
  ]);

  // Isolated effect watching only page value to differentiate
  // between default page for new query and paginating in current query
  useEffect(() => {
    scrollToTop({ delay: 0, duration: 400 });
    if (prevPage) {
      props.fetchBureauPositions(query);
      props.saveSelections(currentInputs);
    }
  }, [page]);


  function renderSelectionList({ items, selected, ...rest }) {
    const getCodeSelected = item => !!selected.find(f => f.code === item.code);
    const queryProp = get(items, '[0].custom_description', false) ? 'custom_description' : 'long_description';
    return items.map(item =>
      (<ListItem
        key={item.code}
        item={item}
        {...rest}
        queryProp={queryProp}
        getIsSelected={getCodeSelected}
      />),
    );
  }

  function renderSelectionListById({ items, selected, ...rest }) {
    const getIDSelected = item => !!selected.find(f => f.id === item.id);
    const queryProp = get(items[0], 'custom_description', false) ? 'custom_description' : 'long_description';
    return items.map(item =>
      (<ListItem
        key={item.id}
        item={item}
        {...rest}
        queryProp={queryProp}
        getIsSelected={getIDSelected}
      />),
    );
  }

  // Free Text Search
  function submitSearch(text) {
    setTextSearch(text);
  }

  const throttledTextInput = () =>
    throttle(q => setTextInput(q), 300, { leading: false, trailing: true });

  const setTextInputThrottled = (q) => {
    throttledTextInput(q);
  };

  // Export
  const exportPositions = () => {
    if (!isLoading) {
      setIsLoading(true);
      downloadBureauPositionsData(query)
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  };

  // Overlay for error, info, and positionLoading state
  const noResults = !get(bureauPositions, 'results.length');
  const getOverlay = () => {
    if (bureauPositionsIsLoading) {
      return (<Spinner type="bureau-results" class="homepage-position-results" size="big" />);
    } else if (noBureausSelected && noOrgsSelected) {
      return (<Alert type="error" title="No bureau/organization selected" messages={[{ body: 'Please select at least one bureau/organization filter.' }]} />);
    } else if (bureauPositionsHasErrored) {
      return (<Alert type="error" title="Error loading results" messages={[{ body: 'Please try again.' }]} />);
    } else if (noResults) {
      return (<Alert type="info" title="No results found" messages={[{ body: 'Please broaden your search criteria and try again.' }]} />);
    }
    return false;
  };

  return (
    bureauFiltersIsLoading ?
      <Spinner type="bureau-filters" size="small" /> :
      <>
        <div className="bureau-page">
          <div className="usa-grid-full position-manager-upper-section">
            <div className="results-search-bar padded-main-content results-single-search homepage-offset">
              <div className="usa-grid-full results-search-bar-container">
                <ProfileSectionTitle title="Position Manager" icon="map" />
                <PositionManagerSearch
                  submitSearch={submitSearch}
                  onChange={setTextInputThrottled}
                />
                <div className="filterby-label">Filter by:</div>
                <div className="usa-width-one-whole position-manager-filters results-dropdown">
                  <div className="small-screen-stack position-manager-filters-inner">
                    <div className="filter-div">
                      <div className="label">Cycle:</div>
                      <Picky
                        placeholder="Select cycle(s)"
                        value={selectedCycles}
                        options={cycleOptions}
                        onChange={setSelectedCycles}
                        numberDisplayed={2}
                        multiple
                        includeFilter
                        dropdownHeight={255}
                        renderList={renderSelectionListById}
                        valueKey="id"
                        labelKey="custom_description"
                        includeSelectAll
                      />
                    </div>
                    <div className="filter-div">
                      <div className="label">TOD:</div>
                      <Picky
                        placeholder="Select TOD(s)"
                        value={selectedTODs}
                        options={todOptions}
                        onChange={setSelectedTODs}
                        numberDisplayed={2}
                        multiple
                        includeFilter
                        dropdownHeight={255}
                        renderList={renderSelectionList}
                        valueKey="code"
                        labelKey="long_description"
                        includeSelectAll
                      />
                    </div>
                    <div className="filter-div">
                      <div className="label">Location:</div>
                      <Picky
                        placeholder="Select Location(s)"
                        value={selectedPosts}
                        options={postOptions}
                        onChange={setSelectedPosts}
                        numberDisplayed={2}
                        multiple
                        includeFilter
                        dropdownHeight={255}
                        renderList={renderSelectionList}
                        valueKey="code"
                        labelKey="custom_description"
                      />
                    </div>
                    <PermissionsWrapper permissions={['bureau_user']}>
                      <div className="filter-div">
                        <div className="label">Bureau:</div>
                        <Picky
                          placeholder="Select Bureau(s)"
                          value={selectedBureaus}
                          options={bureauOptions}
                          onChange={setSelectedBureaus}
                          numberDisplayed={2}
                          multiple
                          includeFilter
                          dropdownHeight={255}
                          renderList={renderSelectionList}
                          valueKey="code"
                          labelKey="long_description"
                          includeSelectAll
                        />
                      </div>
                    </PermissionsWrapper>
                    <StaticDevContent useWrapper={false}>
                      <PermissionsWrapper permissions={['post_user']}>
                        <div className="filter-div">
                          <div className="label">Organization:</div>
                          <Picky
                            placeholder="Select Organization(s)"
                            value={selectedOrgs}
                            options={organizationOptions}
                            onChange={setSelectedOrgs}
                            numberDisplayed={2}
                            multiple
                            includeFilter
                            dropdownHeight={255}
                            renderList={renderSelectionList}
                            valueKey="code"
                            labelKey="long_description"
                            includeSelectAll
                          />
                        </div>
                      </PermissionsWrapper>
                    </StaticDevContent>
                    <div className="filter-div">
                      <div className="label">Skill:</div>
                      <Picky
                        placeholder="Select Skill(s)"
                        value={selectedSkills}
                        options={skillOptions}
                        onChange={setSelectedSkills}
                        numberDisplayed={2}
                        multiple
                        includeFilter
                        dropdownHeight={255}
                        renderList={renderSelectionList}
                        valueKey="code"
                        labelKey="custom_description"
                        includeSelectAll
                      />
                    </div>
                    <div className="filter-div">
                      <div className="label">Grade:</div>
                      <Picky
                        placeholder="Select Grade(s)"
                        value={selectedGrades}
                        options={gradeOptions}
                        onChange={setSelectedGrades}
                        numberDisplayed={2}
                        multiple
                        includeFilter
                        dropdownHeight={255}
                        renderList={renderSelectionList}
                        valueKey="code"
                        labelKey="custom_description"
                        includeSelectAll
                      />
                    </div>
                    <div className="filter-div">
                      <div className="label">Language:</div>
                      <Picky
                        placeholder="Select Language(s)"
                        value={selectedLanguages}
                        options={languageOptions}
                        onChange={setSelectedLanguages}
                        numberDisplayed={2}
                        multiple
                        includeFilter
                        dropdownHeight={255}
                        renderList={renderSelectionList}
                        valueKey="code"
                        labelKey="custom_description"
                        includeSelectAll
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {
            getOverlay() ||
              <>
                <div className="usa-width-one-whole results-dropdown bureau-controls-container">
                  <TotalResults
                    total={bureauPositions.count}
                    pageNumber={page}
                    pageSize={limit}
                    suffix="Results"
                    isHidden={bureauPositionsIsLoading}
                  />
                  <div className="bureau-controls-right">
                    <div className="bureau-results-controls">
                      <SelectForm
                        id="position-manager-num-results"
                        options={sorts.options}
                        label="Sort by:"
                        defaultSort={ordering}
                        onSelectOption={value => setOrdering(value.target.value)}
                        disabled={bureauPositionsIsLoading}
                      />
                      <SelectForm
                        id="position-manager-num-results"
                        options={pageSizes.options}
                        label="Results:"
                        defaultSort={limit}
                        onSelectOption={value => setLimit(value.target.value)}
                        disabled={bureauPositionsIsLoading}
                      />
                    </div>
                    <div className="export-button-container">
                      <ExportButton
                        onClick={exportPositions}
                        isLoading={isLoading}
                        disabled={noBureausSelected && noOrgsSelected}
                      />
                    </div>
                  </div>
                </div>
                <div className="usa-width-one-whole position-manager-lower-section results-dropdown">
                  <div className="usa-grid-full position-list">
                    {bureauPositions.results.map((result) => (
                      <BureauResultsCard result={result} key={result.id} />
                    ))}
                  </div>
                </div>
                <div className="usa-grid-full react-paginate bureau-pagination-controls">
                  <PaginationWrapper
                    pageSize={limit}
                    onPageChange={p => setPage(p.page)}
                    forcePage={page}
                    totalResults={bureauPositions.count}
                  />
                </div>
              </>
          }
        </div>
      </>
  );
};

PositionManager.propTypes = {
  fetchBureauPositions: PropTypes.func.isRequired,
  fetchFilters: PropTypes.func.isRequired,
  saveSelections: PropTypes.func.isRequired,
  bureauFilters: FILTERS_PARENT,
  bureauPositions: POSITION_SEARCH_RESULTS,
  bureauFiltersIsLoading: PropTypes.bool,
  bureauPositionsIsLoading: PropTypes.bool,
  bureauPositionsHasErrored: PropTypes.bool,
  bureauPermissions: BUREAU_PERMISSIONS,
  orgPermissions: ORG_PERMISSIONS,
  userSelections: BUREAU_USER_SELECTIONS,
};

PositionManager.defaultProps = {
  bureauFilters: { filters: [] },
  bureauPositions: { results: [] },
  bureauFiltersIsLoading: false,
  bureauPositionsIsLoading: false,
  bureauPositionsHasErrored: false,
  bureauPermissions: [],
  orgPermissions: [],
  userSelections: {},
};

const mapStateToProps = state => ({
  bureauPositions: state.bureauPositions,
  bureauPositionsIsLoading: state.bureauPositionsIsLoading,
  bureauPositionsHasErrored: state.bureauPositionsHasErrored,
  bureauFilters: state.filters,
  bureauFiltersHasErrored: state.filtersHasErrored,
  bureauFiltersIsLoading: state.filtersIsLoading,
  bureauPermissions: state.userProfile.bureau_permissions,
  orgPermissions: state.userProfile.org_permissions,
  userSelections: state.bureauUserSelections,
});

export const mapDispatchToProps = dispatch => ({
  fetchBureauPositions: query => dispatch(bureauPositionsFetchData(query)),
  fetchFilters: (items, queryParams, savedFilters) =>
    dispatch(filtersFetchData(items, queryParams, savedFilters)),
  saveSelections: (selections) => dispatch(saveBureauUserSelections(selections)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PositionManager);
