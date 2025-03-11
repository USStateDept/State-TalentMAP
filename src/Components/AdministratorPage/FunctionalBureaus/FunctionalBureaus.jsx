import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Picky } from 'react-picky';
import FA from 'react-fontawesome';
import { flatten, get, has, isEmpty, sortBy, throttle, uniqBy } from 'lodash';
import { AgGridReact } from 'ag-grid-react';
import { usePrevious } from 'hooks';
import { scrollToTop } from 'utilities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox, faPrint } from '@fortawesome/free-solid-svg-icons';
import { filtersFetchData } from 'actions/filters/filters';
import { bureauPositionsFetchData, saveBureauUserSelections } from 'actions/bureauPositions';
import { POSITION_MANAGER_PAGE_SIZES } from 'Constants/Sort';
import { BUREAU_PERMISSIONS, BUREAU_USER_SELECTIONS, FILTERS_PARENT, ORG_PERMISSIONS, POSITION_SEARCH_RESULTS } from 'Constants/PropTypes';
import Spinner from 'Components/Spinner';
import ProfileSectionTitle from 'Components/ProfileSectionTitle';
import Alert from 'Components/Alert';
import ListItem from 'Components/BidderPortfolio/BidControls/BidCyclePicker/ListItem';
import PermissionsWrapper from 'Containers/PermissionsWrapper';
import PositionManagerSearch from '../../BureauPage/PositionManager/PositionManagerSearch';
import TabbedCard from '../../TabbedCard';
import InteractiveElement from '../../InteractiveElement';
import SelectRenderer from '../../AgGrid/SelectRenderer';
import LanguageList from '../../LanguageList';

const FunctionalBureaus = props => {
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
  } = props;

  // Local state populating with defaults from previous user selections stored in redux
  const [page, setPage] = useState(userSelections.page || 1);
  const [limit, setLimit] = useState(userSelections.limit || 10);
  const [ordering, setOrdering] = useState(userSelections.ordering || 'position__title');
  const [selectedGrades, setSelectedGrades] = useState(userSelections.selectedGrades || []);
  const [selectedSkills, setSelectedSkills] = useState(userSelections.selectedSkills || []);
  const [selectedLanguages, setSelectedLanguages] = useState(userSelections.selectedLanguages || []);
  const [selectedBureaus, setSelectedBureaus] = useState(userSelections.selectedBureaus || []);
  const [selectedOrgs, setSelectedOrgs] = useState(userSelections.selectedOrgs || []);
  const [selectedPosts, setSelectedPosts] = useState(userSelections.selectedPosts || []);

  // const [isLoading, setIsLoading] = useState(userSelections.isLoading || false);
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
  const bureauOptions = sortBy(bureauPermissions, [(b) => b.long_description]);
  const orgs = bureauFilters$.find(f => get(f, 'item.description') === 'organization');
  const organizationOptions = sortBy(orgPermissions, [(o) => o.long_description]);
  const posts = bureauFilters$.find(f => get(f, 'item.description') === 'post');
  const postOptions = uniqBy(sortBy(get(posts, 'data'), [(p) => p.city]), 'code');
  const languages = bureauFilters$.find(f => get(f, 'item.description') === 'language');
  const languageOptions = uniqBy(sortBy(get(languages, 'data'), [(c) => c.custom_description]), 'custom_description');

  // Local state inputs to push to redux state
  const currentInputs = {
    page,
    limit,
    ordering,
    selectedGrades,
    selectedSkills,
    selectedBureaus,
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
      // TODO: Change this to be handled in the table component
      setPage(1);
      setLimit(10);
      setOrdering('position__title');
    }
  }, [
    selectedGrades,
    selectedSkills,
    selectedPosts,
    selectedBureaus,
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


  // Free Text Search
  function submitSearch(text) {
    setTextSearch(text);
  }

  const throttledTextInput = () =>
    throttle(q => setTextInput(q), 300, { leading: false, trailing: true });

  const setTextInputThrottled = (q) => {
    throttledTextInput(q);
  };

  // Overlay for error, info, and positionLoading state
  const noResults = !get(bureauPositions, 'results.length');
  const getOverlay = () => {
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

  // Resetting the filters
  const resetFilters = () => {
    childRef.current.clearText();
    setSelectedSkills([]);
    setSelectedGrades([]);
    setSelectedOrgs([props.orgPermissions[0]]);
    setSelectedBureaus([bureauPermissions[0]].filter(f => f));
    setSelectedLanguages([]);
    setSelectedPosts([]);
    setTextSearch('');
    setClearFilters(false);
  };

  useEffect(() => {
    const defaultOrgCode = get(props, 'orgPermissions[0].code');
    const defaultBureauCode = get(bureauPermissions, '[0].code');
    const filters = [
      selectedGrades,
      selectedSkills,
      selectedPosts,
      selectedLanguages,
      selectedOrgs.filter(f => get(f, 'code') !== defaultOrgCode),
      selectedBureaus.filter(f => get(f, 'code') !== defaultBureauCode),
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
    selectedPosts,
  ]);

  const submitEdit = () => {
    props.fetchBureauPositions(query);
  };

  const [headers] = useState([
    {
      field: 'position.bureau',
      headerName: 'Functional Bureau',
      cellRenderer: SelectRenderer,
      cellRendererParams: {
        options: bureauOptions,
        data: 'Value',
        setData: () => { },
      },
      flex: 2,
    },
    { field: 'position.bureau', headerName: 'Bureau', flex: 1 },
    { field: 'position.bureau', headerName: 'Skill Bureau', flex: 1 },
    {
      field: 'location',
      headerName: 'Location (Org)',
      flex: 1,
    },
    { field: 'position.position_number', headerName: 'Position Number', flex: 1 },
    { field: 'position.skill', headerName: 'Skill', flex: 1 },
    { field: 'position.title', headerName: 'Position Title', flex: 1 },
    { field: 'position.grade', headerName: 'PP/Grade', flex: 1 },
    {
      field: 'position.languages',
      headerName: 'Language',
      flex: 1,
      cellRenderer: (e) => <LanguageList languages={get(e, 'position.languages') || []} propToUse="representation" />,
    },
  ]);

  const pickyProps = {
    numberDisplayed: 2,
    multiple: true,
    includeFilter: true,
    dropdownHeight: 300,
    renderList: renderSelectionList,
    includeSelectAll: true,
    disabled: editMode,
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
              label="Search for a position"
              disabled={editMode}
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
              <PermissionsWrapper permissions={['bureau_user', 'ao_user', 'cdo']} minimum>
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
              </PermissionsWrapper>
              <PermissionsWrapper permissions={['post_user', 'ao_user', 'cdo']} minimum>
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
              </PermissionsWrapper>
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
                    body: 'Discard or save your functional bureau edits before changing the search criteria.',
                  }]}
                />
                <div className="button-group">
                  <button className="usa-button-secondary" onClick={() => setEditMode(false)}>Cancel</button>
                  <button onClick={submitEdit}>Update Functional Bureau</button>
                </div>
              </div> :
              <div className="button-group">
                <button onClick={() => setEditMode(true)}>Edit Functional Bureau</button>
              </div>
            }
          </div>
          <TabbedCard
            tabs={[{
              text: 'Functional Bureaus',
              value: 'FUNCTIONALBUREAUS',
              content: <div className="pr-table ag-theme-quartz" style={{ width: '100%' }}>
                <AgGridReact
                  domLayout="autoHeight"
                  columnDefs={headers}
                  rowData={bureauPositions.results}
                  pagination
                  paginationPageSize={10}
                  paginationPageSizeSelector={pageSizes}
                />
              </div>,
            }]}
            customComponent={
              <div className="table-actions">
                <InteractiveElement className="action-button" onClick={() => null} disabled={false}>
                  <FontAwesomeIcon icon={faInbox} />
                  Export Page
                </InteractiveElement>
                <InteractiveElement className="action-button" onClick={() => null} disabled={false}>
                  <FontAwesomeIcon icon={faPrint} />
                  Export All
                </InteractiveElement>
              </div>
            }
          />
        </div>
      }
    </div >
  );
};

FunctionalBureaus.propTypes = {
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
  fetchBureauPositions: (query) =>
    dispatch(bureauPositionsFetchData(query)),
  fetchFilters: (items, queryParams, savedFilters) =>
    dispatch(filtersFetchData(items, queryParams, savedFilters)),
  saveSelections: (selections) => dispatch(saveBureauUserSelections(selections)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FunctionalBureaus);
