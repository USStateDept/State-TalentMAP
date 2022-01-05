import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BUREAU_POSITION_SORT, POSITION_MANAGER_PAGE_SIZES } from 'Constants/Sort';
import { BUREAU_PERMISSIONS, BUREAU_USER_SELECTIONS, FILTERS_PARENT, ORG_PERMISSIONS, POSITION_SEARCH_RESULTS } from 'Constants/PropTypes';
import Picky from 'react-picky';
import { flatten, get, has, isEmpty, sortBy, throttle, uniqBy } from 'lodash';
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
import PermissionsWrapper from 'Containers/PermissionsWrapper';
import { filtersFetchData } from 'actions/filters/filters';
import FA from 'react-fontawesome';
import PositionManagerSearch from './PositionManagerSearch';
import BureauResultsCard from '../BureauResultsCard';

// eslint-disable-next-line complexity
const PositionManager = props => {
  // Props
  const {
    bureauPermissions,
    bureauFilters,
    bureauPositions,
    bureauFiltersIsLoading,
    bureauPositionsIsLoading,
    bureauPositionsHasErrored,
    userSelections,
    orgPermissions,
    fromBureauMenu,
    fromPostMenu,
  } = props;

  const initialBureaus = (fromBureauMenu && get(bureauPermissions, '[0]')) ? [get(bureauPermissions, '[0]')] : [];
  const initialOrgs = (fromPostMenu && get(props, 'orgPermissions[0]')) ? [get(props, 'orgPermissions[0]')] : [];

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
  const [selectedPostIndicators, setSelectedPostIndicators] =
    useState(userSelections.selectedPostIndicators || []);
  const [selectedBureaus, setSelectedBureaus] =
    useState(fromBureauMenu ? (userSelections.selectedBureaus || initialBureaus) : []);
  const [selectedOrgs, setSelectedOrgs] =
    useState(fromPostMenu ? (userSelections.selectedOrgs || initialOrgs) : []);
  const [selectedHandshakeStatus, setSelectedHandshakeStatus] =
    useState(userSelections.selectedHandshakeStatus || []);
  const [selectedTmHandshakeStatus, setSelectedTmHandshakeStatus] =
    useState(userSelections.selectedTmHandshakeStatus || []);
  const [selectedHardToFill, setSelectedHardToFill] =
    useState(userSelections.selectedHardToFill || []);

  const [isLoading, setIsLoading] = useState(userSelections.isLoading || false);
  const [textSearch, setTextSearch] = useState(userSelections.textSearch || '');
  const [textInput, setTextInput] = useState(userSelections.textInput || '');
  const [clearFilters, setClearFilters] = useState(false);

  // Pagination
  const prevPage = usePrevious(page);
  const pageSizes = POSITION_MANAGER_PAGE_SIZES;

  // Relevant filter objects from mega filter state: bureauFilters.filters
  const bureauFilters$ = bureauFilters.filters;
  const tods = bureauFilters$.find(f => f.item.description === 'tod');
  const todOptions = uniqBy(tods.data, 'code');
  const grades = bureauFilters$.find(f => f.item.description === 'grade');
  const gradeOptions = uniqBy(grades.data, 'code');
  const skills = bureauFilters$.find(f => f.item.description === 'skill');
  const skillOptions = uniqBy(sortBy(skills.data, [(s) => s.description]), 'code');
  const bureaus = bureauFilters$.find(f => f.item.description === 'region');
  const bureauOptions = sortBy(bureauPermissions, [(b) => b.long_description]);
  const orgs = bureauFilters$.find(f => f.item.description === 'organization');
  const organizationOptions = sortBy(orgPermissions, [(o) => o.long_description]);
  const posts = bureauFilters$.find(f => f.item.description === 'post');
  const postOptions = uniqBy(sortBy(posts.data, [(p) => p.city]), 'code');
  const cycles = bureauFilters$.find(f => f.item.description === 'bidCycle');
  const cycleOptions = uniqBy(sortBy(cycles.data, [(c) => c.custom_description]), 'custom_description');
  const languages = bureauFilters$.find(f => f.item.description === 'language');
  const languageOptions = uniqBy(sortBy(languages.data, [(c) => c.custom_description]), 'custom_description');
  const postIndicators = bureauFilters$.find(f => f.item.description === 'postIndicators');
  const postIndicatorsOptions = sortBy(postIndicators.data, [(c) => c.description]);
  const fsbidHandshakeStatus = bureauFilters$.find(f => f.item.description === 'handshake');
  const fsbidHandshakeStatusOptions = uniqBy(fsbidHandshakeStatus.data, 'code');
  const tmHandshakeStatus = bureauFilters$.find(f => f.item.description === 'tmHandshake');
  const tmHandshakeStatusOptions = uniqBy(tmHandshakeStatus.data, 'code');
  const hardToFill = bureauFilters$.find(f => f.item.description === 'hardToFill');
  const hardToFillOptions = uniqBy(hardToFill.data, 'code');
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
    selectedPostIndicators,
    selectedHandshakeStatus,
    selectedTmHandshakeStatus,
    selectedHardToFill,
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
    [orgs.item.selectionRef]: selectedOrgs.map(orgObject => (get(orgObject, 'code'))),
    [cycles.item.selectionRef]: selectedCycles.map(cycleObject => (get(cycleObject, 'id'))),
    [languages.item.selectionRef]: selectedLanguages.map(langObject => (get(langObject, 'code'))),
    [postIndicators.item.selectionRef]: selectedPostIndicators.map(postIndObject => (get(postIndObject, 'code'))),
    [fsbidHandshakeStatus.item.selectionRef]: selectedHandshakeStatus.map(fsbidHSStatusObject => (get(fsbidHSStatusObject, 'code'))),
    [tmHandshakeStatus.item.selectionRef]: selectedTmHandshakeStatus.map(tmHSStatusObject => (get(tmHSStatusObject, 'code'))),
    [hardToFill.item.selectionRef]: selectedHardToFill.map(htfObject => (get(htfObject, 'code'))),
    ordering,
    page,
    limit,
    q: textInput || textSearch,
  };

  const noBureausSelected = selectedBureaus.filter(f => f).length < 1;
  const noOrgsSelected = selectedOrgs.filter(f => f).length < 1;
  const childRef = useRef();

  // Initial render
  useEffect(() => {
    props.fetchFilters(bureauFilters, {});
    props.fetchBureauPositions(query, fromBureauMenu);
    props.saveSelections(currentInputs);
  }, []);

  // Rerender and action on user selections
  useEffect(() => {
    if (prevPage) {
      if ((fromBureauMenu && !noBureausSelected) || (fromPostMenu && !noOrgsSelected)) {
        props.fetchBureauPositions(query, fromBureauMenu);
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
    selectedPostIndicators,
    selectedHandshakeStatus,
    selectedTmHandshakeStatus,
    selectedHardToFill,
    ordering,
    limit,
    textSearch,
  ]);

  // Isolated effect watching only page value to differentiate
  // between default page for new query and paginating in current query
  useEffect(() => {
    scrollToTop({ delay: 0, duration: 400 });
    if (prevPage) {
      props.fetchBureauPositions(query, fromBureauMenu);
      props.saveSelections(currentInputs);
    }
  }, [page]);


  function renderSelectionList({ items, selected, ...rest }) {
    let codeOrID = 'code';
    // only Cycle needs to use 'id'
    if (!has(items[0], 'code')) {
      codeOrID = 'id';
    }
    const getSelected = item => !!selected.find(f => f[codeOrID] === item[codeOrID]);
    let queryProp = 'description';
    if (get(items, '[0].custom_description', false)) queryProp = 'custom_description';
    else if (get(items, '[0].long_description', false)) queryProp = 'long_description';
    return items.map(item =>
      (<ListItem
        key={item[codeOrID]}
        item={item}
        {...rest}
        queryProp={queryProp}
        getIsSelected={getSelected}
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
    let overlay;
    if (bureauPositionsIsLoading) {
      overlay = <Spinner type="bureau-results" class="homepage-position-results" size="big" />;
    } else if (noBureausSelected && fromBureauMenu) {
      overlay = <Alert type="error" title="No bureau selected" messages={[{ body: 'Please select at least one bureau filter.' }]} />;
    } else if (noOrgsSelected && fromPostMenu) {
      overlay = <Alert type="error" title="No organization selected" messages={[{ body: 'Please select at least one organization filter.' }]} />;
    } else if (bureauPositionsHasErrored) {
      overlay = <Alert type="error" title="Error loading results" messages={[{ body: 'Please try again.' }]} />;
    } else if (noResults) {
      overlay = <Alert type="info" title="No results found" messages={[{ body: 'Please broaden your search criteria and try again.' }]} />;
    } else {
      return false;
    }
    return overlay;
  };

  // Resetting the filters
  const resetFilters = () => {
    childRef.current.clearText();
    setSelectedSkills([]);
    setSelectedGrades([]);
    setSelectedPosts([]);
    setSelectedTODs([]);
    setSelectedOrgs([props.orgPermissions[0]]);
    setSelectedBureaus([bureauPermissions[0]].filter(f => f));
    setSelectedCycles([]);
    setSelectedLanguages([]);
    setSelectedPostIndicators([]);
    setTextSearch('');
    setSelectedHandshakeStatus([]);
    setSelectedTmHandshakeStatus([]);
    setSelectedHardToFill([]);
    setClearFilters(false);
  };

  useEffect(() => {
    const defaultOrgCode = get(props, 'orgPermissions[0].code');
    const defaultBureauCode = get(bureauPermissions, '[0].code');
    const filters = [
      selectedGrades,
      selectedSkills,
      selectedPosts,
      selectedTODs,
      selectedCycles,
      selectedLanguages,
      selectedPostIndicators,
      selectedOrgs.filter(f => get(f, 'code') !== defaultOrgCode),
      selectedHandshakeStatus,
      selectedTmHandshakeStatus,
      selectedBureaus.filter(f => get(f, 'code') !== defaultBureauCode),
      selectedHardToFill,
    ];
    if (isEmpty(flatten(filters)) && isEmpty(textSearch)) {
      setClearFilters(false);
    } else {
      setClearFilters(true);
    }
  }, [
    selectedGrades,
    selectedSkills,
    selectedPosts,
    selectedTODs,
    selectedCycles,
    selectedLanguages,
    selectedPostIndicators,
    selectedHandshakeStatus,
    selectedTmHandshakeStatus,
    selectedHardToFill,
    textSearch,
    selectedOrgs,
    selectedBureaus,
  ]);

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
                  ref={childRef}
                  textSearch={textSearch}
                  label="Search for a position"
                />
                <div className="filterby-container">
                  <div className="filterby-label">Filter by:</div>
                  <div className="filterby-clear">
                    {clearFilters &&
                        <button className="unstyled-button" onClick={resetFilters}>
                          <FA name="times" />
                              Clear Filters
                        </button>
                    }
                  </div>
                </div>
                <div className="usa-width-one-whole position-manager-filters results-dropdown">
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
                      renderList={renderSelectionList}
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
                  {
                    fromBureauMenu &&
                    <PermissionsWrapper permissions={['bureau_user']}>
                      <div className="filter-div">
                        <div className="label">Bureau:</div>
                        <Picky
                          placeholder="Select Bureau(s)"
                          value={selectedBureaus.filter(f => f)}
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
                  }
                  {
                    fromPostMenu &&
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
                  }
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
                  <div className="filter-div">
                    <div className="label">Post Indicators:</div>
                    <Picky
                      placeholder="Select Post Indicator(s)"
                      value={selectedPostIndicators}
                      options={postIndicatorsOptions}
                      onChange={setSelectedPostIndicators}
                      numberDisplayed={2}
                      multiple
                      includeFilter
                      dropdownHeight={255}
                      renderList={renderSelectionList}
                      valueKey="code"
                      labelKey="description"
                      includeSelectAll
                    />
                  </div>
                  <div className="filter-div handshake-filter-div">
                    <div className="label">Handshake Registered:</div>
                    <Picky
                      placeholder="Select Handshake Register Status"
                      value={selectedHandshakeStatus}
                      options={fsbidHandshakeStatusOptions}
                      onChange={setSelectedHandshakeStatus}
                      numberDisplayed={2}
                      multiple
                      includeFilter
                      dropdownHeight={255}
                      renderList={renderSelectionList}
                      valueKey="code"
                      labelKey="description"
                      includeSelectAll
                    />
                  </div>
                  <div className="filter-div handshake-filter-div">
                    <div className="label">Handshake Offer:</div>
                    <Picky
                      placeholder="Select Handshake Offer Status"
                      value={selectedTmHandshakeStatus}
                      options={tmHandshakeStatusOptions}
                      onChange={setSelectedTmHandshakeStatus}
                      numberDisplayed={2}
                      multiple
                      includeFilter
                      dropdownHeight={255}
                      renderList={renderSelectionList}
                      valueKey="code"
                      labelKey="description"
                      includeSelectAll
                    />
                  </div>
                  <div className="filter-div">
                    <div className="label">Hard to Fill:</div>
                    <Picky
                      placeholder="Select Hard to Fill"
                      value={selectedHardToFill}
                      options={hardToFillOptions}
                      onChange={setSelectedHardToFill}
                      numberDisplayed={2}
                      multiple
                      dropdownHeight={255}
                      renderList={renderSelectionList}
                      valueKey="code"
                      labelKey="description"
                    />
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
                        disabled={(fromBureauMenu && noBureausSelected) ||
                        (fromPostMenu && noOrgsSelected)}
                      />
                    </div>
                  </div>
                </div>
                <div className="usa-width-one-whole position-manager-lower-section results-dropdown">
                  <div className="usa-grid-full position-list">
                    {bureauPositions.results.map((result) => (
                      <BureauResultsCard
                        result={result}
                        key={result.id}
                        fromPostMenu={fromPostMenu}
                      />
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
  fromBureauMenu: PropTypes.bool,
  fromPostMenu: PropTypes.bool,
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
  showClear: false,
  fromBureauMenu: false,
  fromPostMenu: false,
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
  fetchBureauPositions: (query, bureauMenu) =>
    dispatch(bureauPositionsFetchData(query, bureauMenu)),
  fetchFilters: (items, queryParams, savedFilters) =>
    dispatch(filtersFetchData(items, queryParams, savedFilters)),
  saveSelections: (selections) => dispatch(saveBureauUserSelections(selections)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PositionManager);
