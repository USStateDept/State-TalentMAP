import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Picky } from 'react-picky';
import PropTypes from 'prop-types';
import { usePrevious } from 'hooks';
import { AgGridReact } from 'ag-grid-react';
import { flatten, get, has, isEmpty, sortBy, throttle, uniqBy } from 'lodash';
import FA from 'react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { scrollToTop } from 'utilities';
import { filtersFetchData } from 'actions/filters/filters';
import { functionalBureaus, functionalBureausEdit, saveFunctionalBureausSelections } from 'actions/functionalBureaus';
import { FUNCTIONAL_BUREAU_POSITION_SORT, POSITION_MANAGER_PAGE_SIZES } from 'Constants/Sort';
import { BUREAU_PERMISSIONS, BUREAU_USER_SELECTIONS, FILTERS_PARENT, ORG_PERMISSIONS, POSITION_SEARCH_RESULTS } from 'Constants/PropTypes';
import Alert from 'Components/Alert';
import Spinner from 'Components/Spinner';
import TabbedCard from 'Components/TabbedCard';
import SelectForm from 'Components/SelectForm';
import TotalResults from 'Components/TotalResults';
import PaginationWrapper from 'Components/PaginationWrapper';
import SelectRenderer from 'Components/AgGrid/SelectRenderer';
import InteractiveElement from 'Components/InteractiveElement';
import ProfileSectionTitle from 'Components/ProfileSectionTitle';
import ListItem from 'Components/BidderPortfolio/BidControls/BidCyclePicker/ListItem';
import PositionManagerSearch from 'Components/BureauPage/PositionManager/PositionManagerSearch';

const FunctionalBureaus = props => {
  const {
    bureauPermissions,
    bureauFilters,
    bureauPositions,
    bureauFiltersIsLoading,
    bureauPositionsIsLoading,
    bureauPositionsHasErrored,
    userSelections,
    orgPermissions,
  } = props;

  const gridRef = useRef(null);

  // Local state populating with defaults from previous user selections stored in redux
  const [page, setPage] = useState(userSelections.page || 1);
  const [limit, setLimit] = useState(userSelections.limit || 10);
  const [ordering, setOrdering] = useState(userSelections.ordering || FUNCTIONAL_BUREAU_POSITION_SORT.options[0].value);
  const [selectedGrades, setSelectedGrades] = useState(userSelections.selectedGrades || []);
  const [selectedSkills, setSelectedSkills] = useState(userSelections.selectedSkills || []);
  const [selectedLanguages, setSelectedLanguages] = useState(userSelections.selectedLanguages || []);
  const [selectedBureaus, setSelectedBureaus] = useState(userSelections.selectedBureaus || []);
  const [selectedFunctionalBureaus, setSelectedFunctionalBureaus] = useState(userSelections.selectedFunctionalBureaus || []);
  const [selectedOrgs, setSelectedOrgs] = useState(userSelections.selectedOrgs || []);
  const [selectedPosts, setSelectedPosts] = useState(userSelections.selectedPosts || []);

  const [exportIsLoading, setExportIsLoading] = useState(false);
  const [textSearch, setTextSearch] = useState(userSelections.textSearch || '');
  const [textInput, setTextInput] = useState(userSelections.textInput || '');
  const [clearFilters, setClearFilters] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Pagination
  const prevPage = usePrevious(page);
  const pageSizes = POSITION_MANAGER_PAGE_SIZES;

  // Relevant filter objects from mega filter state: bureauFilters.filters
  const bureauFilters$ = bureauFilters.filters;
  const grades = bureauFilters$.find(f => get(f, 'item.description') === 'grade');
  const gradeOptions = uniqBy(get(grades, 'data'), 'code');
  const skills = bureauFilters$.find(f => get(f, 'item.description') === 'skill');
  const skillOptions = uniqBy(sortBy(get(skills, 'data'), [(s) => s.description]), 'code');
  const bureaus = bureauFilters$.find(f => get(f, 'item.description') === 'region');
  const functionalbureaus = bureauFilters$.find(f => get(f, 'item.description') === 'region');
  const bureauOptions = sortBy(bureauPermissions, [(b) => b.long_description]);
  const orgs = bureauFilters$.find(f => get(f, 'item.description') === 'organization');
  const organizationOptions = sortBy(orgPermissions, [(o) => o.long_description]);
  const posts = bureauFilters$.find(f => get(f, 'item.description') === 'post');
  const postOptions = uniqBy(sortBy(get(posts, 'data'), [(p) => p.city]), 'code');
  const languages = bureauFilters$.find(f => get(f, 'item.description') === 'language');
  const languageOptions = uniqBy(sortBy(get(languages, 'data'), [(c) => c.custom_description]), 'custom_description');
  const sorts = FUNCTIONAL_BUREAU_POSITION_SORT;

  // Local state inputs to push to redux state
  const currentInputs = {
    page,
    limit,
    ordering,
    selectedGrades,
    selectedSkills,
    selectedBureaus,
    selectedFunctionalBureaus,
    selectedOrgs,
    selectedPosts,
    selectedLanguages,
    textSearch,
    textInput,
  };

  // Query is passed to action which stringifies
  // key and values into sensible request url
  const query = {
    [get(grades, 'item.selectionRef')]: selectedGrades.map(gradeObject => (get(gradeObject, 'code'))),
    [get(skills, 'item.selectionRef')]: selectedSkills.map(skillObject => (get(skillObject, 'code'))),
    [get(bureaus, 'item.selectionRef')]: selectedBureaus.map(bureauObject => (get(bureauObject, 'code'))),
    [get(functionalbureaus, 'item.selectionRef')]: selectedFunctionalBureaus.map(bureauObject => (get(bureauObject, 'code'))),
    [get(orgs, 'item.selectionRef')]: selectedOrgs.map(orgObject => (get(orgObject, 'code'))),
    [get(languages, 'item.selectionRef')]: selectedLanguages.map(langObject => (get(langObject, 'code'))),
    [get(posts, 'item.selectionRef')]: selectedPosts.map(postObject => (get(postObject, 'code'))),
    ordering,
    page,
    limit,
    q: textInput || textSearch,
  };

  const childRef = useRef();

  // Initial render
  useEffect(() => {
    props.fetchFilters(bureauFilters, {});
    props.fetchBureauPositions(query);
    props.saveSelections(currentInputs);
  }, []);

  // Rerender and action on user selections
  useEffect(() => {
    if (prevPage) {
      props.fetchBureauPositions(query);
      props.saveSelections(currentInputs);
      setPage(1);
    }
  }, [
    selectedGrades,
    selectedSkills,
    selectedPosts,
    selectedBureaus,
    selectedFunctionalBureaus,
    selectedOrgs,
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

  // Free Text Search
  function submitSearch(text) {
    setTextSearch(text);
  }
  const throttledTextInput = () => throttle(q => setTextInput(q), 300, { leading: false, trailing: true });
  const setTextInputThrottled = (q) => throttledTextInput(q);

  // Resetting the filters
  const resetFilters = () => {
    childRef.current.clearText();
    setSelectedSkills([]);
    setSelectedGrades([]);
    setSelectedOrgs([]);
    setSelectedBureaus([]);
    setSelectedFunctionalBureaus([]);
    setSelectedLanguages([]);
    setSelectedPosts([]);
    setTextSearch('');
    setClearFilters(false);
  };

  useEffect(() => {
    const filters = [
      selectedGrades,
      selectedSkills,
      selectedPosts,
      selectedLanguages,
      selectedOrgs,
      selectedBureaus,
      selectedFunctionalBureaus,
    ];
    if (isEmpty(flatten(filters)) && isEmpty(textSearch)) {
      setClearFilters(false);
    } else {
      setClearFilters(true);
    }
  }, [
    selectedGrades,
    selectedSkills,
    selectedLanguages,
    textSearch,
    selectedOrgs,
    selectedBureaus,
    selectedFunctionalBureaus,
    selectedPosts,
  ]);

  const submitEdit = () => {
    props.editFunctionalBureauPositions({
      pabseqnum: '',
      posseqnum: '',
      pabbureauorgcode: '',
    });
  };

  const headersMapping = [
    {
      field: 'posfunctionalbureau',
      headerName: 'Functional Bureau',
      cellRenderer: (fbSelectProps) => {
        if (editMode) {
          return <SelectRenderer {...fbSelectProps} />;
        }
        return fbSelectProps?.data?.posfunctionalbureau;
      },
      cellRendererParams: {
        options: bureauOptions.map(b => ({ code: b.code, text: b.long_description })),
        className: 'select-dropdown',
        setData: () => { },
      },
      flex: 2,
      sortable: false,
    },
    { field: 'posbureau', headerName: 'Bureau', flex: 1, sortable: false },
    { field: 'bsaorgdesc', headerName: 'Skill Bureau', flex: 1, sortable: false },
    { field: 'posorg', headerName: 'Location (Org)', flex: 1, sortable: false },
    { field: 'posnumtext', headerName: 'Position Number', flex: 1, sortable: false },
    { field: 'posskill', headerName: 'Skill', flex: 1, sortable: false },
    { field: 'postitledesc', headerName: 'Position Title', flex: 1, sortable: false },
    { field: 'posgradecode', headerName: 'PP/Grade', flex: 0.75, sortable: false },
    { field: 'pospositionlangprofdesc', headerName: 'Language', flex: 1, sortable: false },
  ];

  const [headers, setHeaders] = useState([...headersMapping]);

  useEffect(() => {
    setHeaders([...headersMapping]);
  }, [editMode]);

  // Export
  const csvExportParams = {
    fileName: 'Functional_Bureaus_Export.csv',
  };
  const exportTable = () => {
    if (gridRef.current) {
      setExportIsLoading(true);
      gridRef.current.api.exportDataAsCsv();
      setExportIsLoading(false);
    }
  };

  // Picky dropdown list rendering
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
    return items.map(item => (
      <ListItem
        key={item[codeOrID]}
        item={item}
        {...rest}
        queryProp={queryProp}
        getIsSelected={getSelected}
      />
    ),
    );
  }
  // Picky dropdown props
  const pickyProps = {
    numberDisplayed: 2,
    multiple: true,
    includeFilter: true,
    dropdownHeight: 300,
    renderList: renderSelectionList,
    includeSelectAll: true,
    disabled: editMode,
  };

  const getOverlay = () => {
    const noResults = bureauPositions?.results?.length < 1;
    let overlay;
    if (bureauPositionsIsLoading) {
      overlay = <Spinner type="bureau-results" class="homepage-position-results" size="big" />;
    } else if (bureauPositionsHasErrored) {
      overlay = <Alert type="error" title="Error loading results" messages={[{ body: 'Please try again.' }]} />;
    } else if (noResults) {
      overlay = <Alert type="info" title="No results found" messages={[{ body: 'Please broaden your search criteria and try again.' }]} />;
    } else {
      return false;
    }
    return overlay;
  };

  return (bureauFiltersIsLoading ?
    <Spinner type="bureau-filters" size="small" /> :
    <div className="position-search manage-functional-bureau">
      <div className="usa-grid-full position-search--header">
        <div className="results-search-bar">
          <div className="usa-grid-full search-bar-container">
            <ProfileSectionTitle title="Manage Functional Bureaus" icon="map" />
            <PositionManagerSearch
              submitSearch={submitSearch}
              onChange={setTextInputThrottled}
              ref={childRef}
              textSearch={textSearch}
              label="Search for a position number"
              disableSearch={editMode}
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
            <div className="usa-width-one-whole position-search--filters--pos-man results-dropdown">
              <div className="filter-div">
                <div className="label">Bureau:</div>
                <Picky
                  placeholder="Select Bureau(s)"
                  value={selectedBureaus.filter(f => f)}
                  options={bureauOptions}
                  onChange={setSelectedBureaus}
                  valueKey="code"
                  labelKey="long_description"
                  {...pickyProps}
                />
              </div>
              <div className="filter-div">
                <div className="label">Functional Bureau:</div>
                <Picky
                  placeholder="Select Bureau(s)"
                  value={selectedFunctionalBureaus.filter(f => f)}
                  options={bureauOptions}
                  onChange={setSelectedFunctionalBureaus}
                  valueKey="code"
                  labelKey="long_description"
                  {...pickyProps}
                />
              </div>
              <div className="filter-div">
                <div className="label">Location:</div>
                <Picky
                  placeholder="Select Location(s)"
                  value={selectedPosts}
                  options={postOptions}
                  onChange={setSelectedPosts}
                  valueKey="code"
                  labelKey="custom_description"
                  {...pickyProps}
                />
              </div>
              <div className="filter-div">
                <div className="label">Organization:</div>
                <Picky
                  placeholder="Select Organization(s)"
                  value={selectedOrgs}
                  options={organizationOptions}
                  onChange={setSelectedOrgs}
                  valueKey="code"
                  labelKey="long_description"
                  {...pickyProps}
                />
              </div>
              <div className="filter-div">
                <div className="label">Language:</div>
                <Picky
                  placeholder="Select Language(s)"
                  value={selectedLanguages}
                  options={languageOptions}
                  onChange={setSelectedLanguages}
                  valueKey="code"
                  labelKey="custom_description"
                  {...pickyProps}
                />
              </div>
              <div className="filter-div">
                <div className="label">Grade:</div>
                <Picky
                  placeholder="Select Grade(s)"
                  value={selectedGrades}
                  options={gradeOptions}
                  onChange={setSelectedGrades}
                  valueKey="code"
                  labelKey="custom_description"
                  {...pickyProps}
                />
              </div>
              <div className="filter-div">
                <div className="label">Skill:</div>
                <Picky
                  placeholder="Select Skill(s)"
                  value={selectedSkills}
                  options={skillOptions}
                  onChange={setSelectedSkills}
                  valueKey="code"
                  labelKey="custom_description"
                  {...pickyProps}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {getOverlay() ||
        <div className="usa-grid-full content-container">
          <div className="actions">
            {editMode ?
              <div className="edit-mode">
                <Alert
                  type="warning"
                  title="Edit Mode"
                  customClassName="mb-10"
                  messages={[{
                    body: 'Discard or save your functional bureau edits before changing the search and pagination criteria.',
                  }]}
                />
                <div className="button-group">
                  <button className="usa-button-secondary" onClick={() => setEditMode(false)}>Cancel</button>
                  <button onClick={submitEdit}>Update Functional Bureaus</button>
                </div>
              </div> :
              <div className="button-group">
                <button onClick={() => setEditMode(true)}>Edit Functional Bureaus</button>
              </div>
            }
          </div>
          <TabbedCard
            tabs={[{
              text: 'Functional Bureaus',
              value: 'FUNCTIONALBUREAUS',
              content: <div className="pr-table ag-theme-quartz" style={{ width: '100%' }}>
                <div className="usa-width-one-whole results-dropdown controls-container">
                  <div className="total-results">
                    <TotalResults
                      total={bureauPositions.count}
                      pageNumber={page}
                      pageSize={limit}
                      suffix="Results"
                      isHidden={bureauPositionsIsLoading}
                    />
                  </div>
                  <div className="position-search-controls--right ">
                    <div className="position-search-controls--results">
                      <SelectForm
                        id="position-manager-num-results"
                        options={sorts.options.slice(0, -1)}
                        label="Sort by:"
                        defaultSort={ordering}
                        onSelectOption={value => setOrdering(value.target.value)}
                        disabled={bureauPositionsIsLoading || editMode}
                      />
                      <SelectForm
                        id="position-manager-num-results"
                        options={pageSizes.options}
                        label="Results:"
                        defaultSort={limit}
                        onSelectOption={value => setLimit(value.target.value)}
                        disabled={bureauPositionsIsLoading || editMode}
                      />
                    </div>
                  </div>
                </div>
                <AgGridReact
                  ref={gridRef}
                  domLayout="autoHeight"
                  rowHeight={50}
                  columnDefs={headers}
                  rowData={bureauPositions.results}
                  defaultCsvExportParams={csvExportParams}
                />
                {!editMode &&
                  <div className="usa-grid-full react-paginate position-search-controls--pagination">
                    <PaginationWrapper
                      pageSize={limit}
                      onPageChange={p => setPage(p.page)}
                      forcePage={page}
                      totalResults={bureauPositions.count}
                    />
                  </div>
                }
              </div>,
            }]}
            customComponent={
              <div className="table-actions">
                <InteractiveElement className="action-button" onClick={exportTable} disabled={exportIsLoading}>
                  <FontAwesomeIcon icon={faPrint} />
                  Export Page
                </InteractiveElement>
              </div>
            }
          />
        </div>
      }
    </div>
  );
};

FunctionalBureaus.propTypes = {
  fetchBureauPositions: PropTypes.func.isRequired,
  fetchFilters: PropTypes.func.isRequired,
  editFunctionalBureauPositions: PropTypes.func.isRequired,
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

FunctionalBureaus.defaultProps = {
  bureauFilters: { filters: [] },
  bureauPositions: { results: [] },
  bureauFiltersIsLoading: false,
  bureauPositionsIsLoading: false,
  bureauPositionsHasErrored: false,
  bureauPermissions: [],
  orgPermissions: [],
  userSelections: {},
  showClear: false,
};

const mapStateToProps = state => ({
  bureauPositions: state.functionalBureaus,
  bureauPositionsIsLoading: state.functionalBureausLoading,
  bureauPositionsHasErrored: state.functionalBureausErrored,
  bureauFilters: state.filters,
  bureauFiltersHasErrored: state.filtersHasErrored,
  bureauFiltersIsLoading: state.filtersIsLoading,
  bureauPermissions: state.userProfile.bureau_permissions,
  orgPermissions: state.userProfile.org_permissions,
  userSelections: state.functionalBureausSelections,
});

export const mapDispatchToProps = dispatch => ({
  fetchBureauPositions: (query) => dispatch(functionalBureaus(query)),
  editFunctionalBureauPositions: (query) => dispatch(functionalBureausEdit(query)),
  fetchFilters: (items, queryParams, savedFilters) => dispatch(filtersFetchData(items, queryParams, savedFilters)),
  saveSelections: (selections) => dispatch(saveFunctionalBureausSelections(selections)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FunctionalBureaus);
