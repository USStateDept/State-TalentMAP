import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Picky from 'react-picky';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { filter, flatten, get, has, identity, isEmpty } from 'lodash';
import FA from 'react-fontawesome';
import { isDate, startOfDay } from 'date-fns-v2';
import { agendaEmployeesFetchData, agendaEmployeesFiltersFetchData, agendaItemHistoryExport, saveAgendaEmployeesSelections } from 'actions/agendaEmployees';
import { bidderPortfolioCDOsFetchData } from 'actions/bidderPortfolio';
import PositionManagerSearch from 'Components/BureauPage/PositionManager/PositionManagerSearch';
import Spinner from 'Components/Spinner';
import TotalResults from 'Components/TotalResults';
import PaginationWrapper from 'Components/PaginationWrapper';
import ExportButton from 'Components/ExportButton';
import SelectForm from 'Components/SelectForm';
import { AGENDA_EMPLOYEES_PAGE_SIZES, AGENDA_EMPLOYEES_SORT } from 'Constants/Sort';
import shortid from 'shortid';
import ListItem from 'Components/BidderPortfolio/BidControls/BidCyclePicker/ListItem';
import Alert from 'Components/Alert';
import ToggleButton from 'Components/ToggleButton';
import { checkFlag } from 'flags';
import { usePrevious } from 'hooks';
import EmployeeAgendaSearchCard from '../EmployeeAgendaSearchCard/EmployeeAgendaSearchCard';
import EmployeeAgendaSearchRow from '../EmployeeAgendaSearchRow/EmployeeAgendaSearchRow';
import ProfileSectionTitle from '../../ProfileSectionTitle';
import ResultsViewBy from '../../ResultsViewBy/ResultsViewBy';
import ScrollUpButton from '../../ScrollUpButton';
import { colorBlueChill } from '../../../sass/sass-vars/variables';


const useCreateAI = () => checkFlag('flags.create_agenda_item');

const EmployeeAgendaSearch = ({ isCDO, viewType }) => {
  const searchLastNameRef = useRef();
  const searchFirstNameRef = useRef();
  const searchEmpIDRef = useRef();

  const dispatch = useDispatch();
  const createAI = useCreateAI();

  const agendaEmployeesFilters = useSelector(state => state.agendaEmployeesFilters);
  const agendaEmployeesFiltersIsLoading = useSelector(state =>
    state.agendaEmployeesFiltersFetchDataLoading);
  // const agendaEmployeesFiltersHasErrored = useSelector(state =>
  //  state.agendaEmployeesFiltersFetchDataErrored);

  const cdos = useSelector(state => state.bidderPortfolioCDOs);
  // const cdosIsLoading = useSelector(state => state.bidderPortfolioCDOsIsLoading);

  const agendaEmployees$ = useSelector(state => state.agendaEmployees);
  const agendaEmployeesIsLoading = useSelector(state => state.agendaEmployeesFetchDataLoading);
  const agendaEmployeesHasErrored = useSelector(state => state.agendaEmployeesFetchDataErrored);
  const userSelections = useSelector(state => state.agendaEmployeesSelections);

  const agendaEmployees = get(agendaEmployees$, 'results') || [];
  // TODO: update dummy filter to be based on active/inactive boolean from new WS payload
  const activeEmployees = agendaEmployees.filter(r => r.person.fullName === 'Abella, Hewett');

  const fsbidHandshakeStatusOptions = [{ description: 'Handshake', code: 'Y' }, { description: 'No Handshake', code: 'N' }];

  const isLoading = agendaEmployeesFiltersIsLoading;

  // Pagination
  const [page, setPage] = useState(get(userSelections, 'page') || 1);
  const [limit, setLimit] = useState(get(userSelections, 'limit') || AGENDA_EMPLOYEES_PAGE_SIZES.defaultSize);
  const [ordering, setOrdering] = useState(get(userSelections, 'ordering') || AGENDA_EMPLOYEES_SORT.defaultSort);
  // Filters
  const [selectedCurrentBureaus, setSelectedCurrentBureaus] = useState(get(userSelections, 'selectedCurrentBureaus') || []);
  const [selectedOngoingBureaus, setSelectedOngoingBureaus] = useState(get(userSelections, 'selectedOngoingBureaus') || []);
  const [selectedCDOs, setSelectedCDOs] = useState(get(userSelections, 'selectedCDOs') || []);
  // To-Do: Fake creator data
  const [selectedHandshakeStatus, setSelectedHandshakeStatus] = useState(get(userSelections, 'selectedHandshakeStatus') || []);
  const [selectedCurrentPosts, setSelectedCurrentPosts] = useState(get(userSelections, 'selectedCurrentPosts') || []);
  const [selectedOngoingPosts, setSelectedOngoingPosts] = useState(get(userSelections, 'selectedOngoingPosts') || []);
  const [selectedTED, setSelectedTED] = useState(get(userSelections, 'selectedTED') || null);

  const prevPage = usePrevious(page);

  // Controls
  const [cardView, setCardView] = useState(get(userSelections, 'cardView', true));
  const [clearFilters, setClearFilters] = useState(false);
  // Export
  const [exportIsLoading, setExportIsLoading] = useState(false);
  // Text Searches
  const [searchTextLastName, setSearchTextLastName] = useState(get(userSelections, 'searchTextLastName') || '');
  const [searchTextFirstName, setSearchTextFirstName] = useState(get(userSelections, 'searchTextFirstName') || '');
  const [searchTextEmpID, setSearchTextEmpID] = useState(get(userSelections, 'searchTextEmpID') || '');

  const [searchInputLastName, setSearchInputLastName] = useState(get(userSelections, 'searchInputLastName') || '');
  const [searchInputFirstName, setSearchInputFirstName] = useState(get(userSelections, 'searchInputFirstName') || '');
  const [searchInputEmpID, setSearchInputEmpID] = useState(get(userSelections, 'searchInputEmpID') || '');

  const [inactiveIsSelected, setInactiveIsSelected] = useState(get(userSelections, 'inactiveIsSelected') || false);

  const count = get(agendaEmployees$, 'count') || 0;

  const view = cardView ? 'card' : 'grid';

  const pageSizes = AGENDA_EMPLOYEES_PAGE_SIZES;
  const sorts = AGENDA_EMPLOYEES_SORT;

  const getQuery = () => ({
    // Pagination
    page,
    limit,
    ordering,
    // User Filters
    'current-bureaus': selectedCurrentBureaus.map(bureauObject => (get(bureauObject, 'code'))),
    'handshake-bureaus': selectedOngoingBureaus.map(bureauObject => (get(bureauObject, 'code'))),
    cdos: selectedCDOs.map(cdoObject => get(cdoObject, 'id')),
    'current-organizations': selectedCurrentPosts.map(postObject => (get(postObject, 'code'))),
    'handshake-organizations': selectedOngoingPosts.map(postObject => (get(postObject, 'code'))),
    handshake: selectedHandshakeStatus.map(hsObject => (get(hsObject, 'code'))),

    // need to set to beginning of the day to avoid timezone issues
    'ted-start': isDate(get(selectedTED, '[0]')) ? startOfDay(get(selectedTED, '[0]')).toJSON() : '',
    'ted-end': isDate(get(selectedTED, '[1]')) ? startOfDay(get(selectedTED, '[1]')).toJSON() : '',

    // Search Text
    lastName: searchTextLastName,
    firstName: searchTextFirstName,
    empID: searchTextEmpID,
  });

  const getCurrentInputs = () => ({
    page,
    limit,
    ordering,
    selectedCurrentBureaus,
    selectedOngoingBureaus,
    selectedCDOs,
    selectedHandshakeStatus,
    selectedCurrentPosts,
    selectedOngoingPosts,
    selectedTED,
    cardView,
    searchTextLastName,
    searchTextFirstName,
    searchTextEmpID,
    searchInputLastName,
    searchInputFirstName,
    searchInputEmpID,
    inactiveIsSelected,
  });

  useEffect(() => {
    dispatch(agendaEmployeesFetchData(getQuery()));
    dispatch(saveAgendaEmployeesSelections(getCurrentInputs()));
  }, []);

  useEffect(() => {
    dispatch(agendaEmployeesFiltersFetchData());
    dispatch(bidderPortfolioCDOsFetchData());
  }, []);

  const fetchAndSet = (resetPage = false) => {
    const filters$ = [
      selectedCurrentBureaus,
      selectedOngoingBureaus,
      selectedCDOs,
      selectedHandshakeStatus,
      selectedCurrentPosts,
      selectedOngoingPosts,
      selectedTED,
      searchTextLastName,
      searchTextFirstName,
      searchTextEmpID,
      inactiveIsSelected,
    ];
    if (isEmpty(filter(flatten(filters$), identity)) && isEmpty(searchTextLastName)
      && isEmpty(searchTextFirstName) && isEmpty(searchTextEmpID)) {
      setClearFilters(false);
    } else {
      setClearFilters(true);
    }
    if (resetPage) {
      setPage(1);
    }
    dispatch(agendaEmployeesFetchData(getQuery()));
    dispatch(saveAgendaEmployeesSelections(getCurrentInputs()));
  };

  useEffect(() => {
    if (prevPage) {
      fetchAndSet(true);
    }
  }, [
    limit,
    ordering,
    selectedCurrentBureaus,
    selectedOngoingBureaus,
    selectedCDOs,
    selectedHandshakeStatus,
    selectedCurrentPosts,
    selectedOngoingPosts,
    selectedTED,
    searchTextLastName,
    searchTextFirstName,
    searchTextEmpID,
    inactiveIsSelected,
  ]);

  useEffect(() => {
    fetchAndSet(false);
  }, [
    page,
  ]);

  useEffect(() => {
    dispatch(saveAgendaEmployeesSelections(getCurrentInputs()));
  }, [cardView]);

  function submitSearch() {
    setSearchTextLastName(searchInputLastName);
    setSearchTextFirstName(searchInputFirstName);
    setSearchTextEmpID(searchInputEmpID);
  }

  const exportAgendaEmployees = () => {
    if (!exportIsLoading) {
      setExportIsLoading(true);
      agendaItemHistoryExport(getQuery())
        .then(() => {
          setExportIsLoading(false);
        })
        .catch(() => {
          setExportIsLoading(false);
        });
    }
  };

  const renderSelectionList = ({ items, selected, ...rest }) => {
    let codeOrID = 'code';
    // only Cycle needs to use 'id'
    if (!has(items[0], 'code')) {
      codeOrID = 'id';
    }
    const getSelected = item => !!selected.find(f => f[codeOrID] === item[codeOrID]);
    let queryProp = 'description';
    if (get(items, '[0].custom_description', false)) queryProp = 'custom_description';
    else if (get(items, '[0].long_description', false)) queryProp = 'long_description';
    else if (get(items, '[0].description', false)) queryProp = 'description';
    else queryProp = 'name';
    return items.map(item =>
      (<ListItem
        key={item[codeOrID]}
        item={item}
        {...rest}
        queryProp={queryProp}
        getIsSelected={getSelected}
      />),
    );
  };

  const pickyProps = {
    numberDisplayed: 2,
    multiple: true,
    includeFilter: true,
    dropdownHeight: 255,
    renderList: renderSelectionList,
    includeSelectAll: true,
  };

  const resetFilters = () => {
    Promise.resolve().then(() => {
      setSelectedCurrentBureaus([]);
      setSelectedOngoingBureaus([]);
      setSelectedCDOs([]);
      setSelectedHandshakeStatus([]);
      setSelectedCurrentPosts([]);
      setSelectedOngoingPosts([]);
      setSelectedTED(null);
      setSearchTextLastName('');
      setSearchTextFirstName('');
      setSearchTextEmpID('');
      searchFirstNameRef.current.clearText();
      searchLastNameRef.current.clearText();
      searchEmpIDRef.current.clearText();
      setInactiveIsSelected(false);
      setClearFilters(false);
    });
  };

  const onInactiveToggle = value => {
    setInactiveIsSelected(value);
  };

  const getOverlay = () => {
    let toReturn;
    if (agendaEmployeesIsLoading) {
      toReturn = <Spinner type="bureau-results" class="homepage-position-results" size="big" />;
    } else if (agendaEmployeesHasErrored) {
      toReturn = <Alert type="error" title="Error loading employees" messages={[{ body: 'Please try again.' }]} />;
    } else if (count <= 0) {
      toReturn = <Alert type="info" title="No results found" messages={[{ body: 'Please broaden your search criteria and try again.' }]} />;
    } else {
      toReturn = false;
    }
    if (toReturn) {
      return <div className="usa-width-one-whole empl-search-lower-section results-dropdown">{toReturn}</div>;
    }
    return false;
  };

  const overlay = getOverlay();

  const exportDisabled = !agendaEmployees.length;

  return (
    isLoading ?
      <Spinner type="bureau-filters" size="small" /> :
      <>
        <div className="empl-search-page">
          <div className="usa-grid-full empl-search-upper-section">
            <div className="results-search-bar">
              <div className="usa-grid-full search-bar-container">
                <ProfileSectionTitle title="Employee Agenda Search" icon="user-circle-o" />
                <div className="search-header">
                  Search For An Employee
                </div>
                <div className="eas-search-form-container">
                  <label htmlFor="last-name-search" className="search-label">
                    Last Name:
                  </label>
                  <PositionManagerSearch
                    id="last-name-search"
                    submitSearch={submitSearch}
                    onChange={setSearchInputLastName}
                    ref={searchLastNameRef}
                    placeHolder="Search by Last Name"
                    textSearch={searchTextLastName}
                    noButton
                  />
                  <label htmlFor="first-name-search" className="search-label">
                    First Name:
                  </label>
                  <PositionManagerSearch
                    id="first-name-search"
                    submitSearch={submitSearch}
                    onChange={setSearchInputFirstName}
                    ref={searchFirstNameRef}
                    placeHolder="Search by First Name"
                    textSearch={searchTextFirstName}
                    noButton
                  />
                  <label htmlFor="emp-id-search" className="search-label">
                    Employee ID:
                  </label>
                  <PositionManagerSearch
                    id="emp-id-search"
                    submitSearch={submitSearch}
                    onChange={setSearchInputEmpID}
                    ref={searchEmpIDRef}
                    textSearch={searchTextEmpID}
                    placeHolder="Search by Employee ID"
                  />
                  <ToggleButton
                    labelTextRight="Show Inactive Employees"
                    onChange={onInactiveToggle}
                    checked={inactiveIsSelected}
                    onColor={colorBlueChill}
                  />
                </div>
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
                <div className="usa-width-one-whole empl-search-filters results-dropdown">
                  <div className="filter-div split-filter-div">
                    <div className="label">Post:</div>
                    <Picky
                      {...pickyProps}
                      placeholder="Current"
                      value={selectedCurrentPosts}
                      options={get(agendaEmployeesFilters, 'currentOrganizations', [])}
                      onChange={setSelectedCurrentPosts}
                      valueKey="code"
                      labelKey="name"
                      includeSelectAll={false}
                    />
                    <Picky
                      {...pickyProps}
                      placeholder="Ongoing"
                      value={selectedOngoingPosts}
                      options={get(agendaEmployeesFilters, 'handshakeOrganizations', [])}
                      onChange={setSelectedOngoingPosts}
                      valueKey="code"
                      labelKey="name"
                      includeSelectAll={false}
                    />
                  </div>
                  <div className="filter-div split-filter-div">
                    <div className="label">Bureau:</div>
                    <Picky
                      {...pickyProps}
                      placeholder="Current"
                      value={selectedCurrentBureaus}
                      options={get(agendaEmployeesFilters, 'currentBureaus', [])}
                      onChange={setSelectedCurrentBureaus}
                      valueKey="code"
                      labelKey="name"
                    />
                    <Picky
                      {...pickyProps}
                      placeholder="Ongoing"
                      value={selectedOngoingBureaus}
                      options={get(agendaEmployeesFilters, 'handshakeBureaus', [])}
                      onChange={setSelectedOngoingBureaus}
                      valueKey="code"
                      labelKey="name"
                    />
                  </div>
                  <div className="filter-div handshake-filter-div">
                    <div className="label">Handshake:</div>
                    <Picky
                      {...pickyProps}
                      placeholder="Select Handshake Register Status"
                      value={selectedHandshakeStatus}
                      options={fsbidHandshakeStatusOptions}
                      onChange={setSelectedHandshakeStatus}
                      valueKey="code"
                      labelKey="description"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="filter-div">
                    <div className="label">CDO:</div>
                    <Picky
                      {...pickyProps}
                      placeholder="Select CDOs"
                      value={selectedCDOs}
                      options={cdos}
                      onChange={setSelectedCDOs}
                      valueKey="id"
                      labelKey="name"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="filter-div">
                    <div className="label">TED:</div>
                    <DateRangePicker
                      onChange={setSelectedTED}
                      value={selectedTED}
                      maxDetail="month"
                      calendarIcon={null}
                      showLeadingZeros
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {
            !agendaEmployeesIsLoading && !isLoading &&
            <div className="usa-width-one-whole results-dropdown empl-search-controls-container">
              <TotalResults
                total={count}
                pageNumber={page}
                pageSize={limit}
                suffix="Results"
                isHidden={isLoading || agendaEmployeesIsLoading}
              />
              <div className="empl-search-controls-right">
                <ResultsViewBy initial={view} onClick={e => setCardView(e === 'card')} />
                <div className="empl-search-results-controls">
                  <SelectForm
                    id="empl-search-num-results"
                    options={sorts.options}
                    label="Sort by:"
                    defaultSort={ordering}
                    onSelectOption={value => setOrdering(value.target.value)}
                    disabled={isLoading}
                  />
                  <SelectForm
                    id="empl-search-num-results"
                    options={pageSizes.options}
                    label="Results:"
                    defaultSort={limit}
                    onSelectOption={value => setLimit(value.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="export-button-container">
                  <ExportButton
                    onClick={exportAgendaEmployees}
                    isLoading={exportIsLoading}
                    disabled={exportDisabled}
                  />
                </div>
                <ScrollUpButton />
              </div>
            </div>
          }
          {
            overlay ||
              <>
                <div className="usa-width-one-whole empl-search-lower-section results-dropdown">
                  {
                    cardView && !agendaEmployeesIsLoading &&
                    <div className="employee-agenda-card">
                      {
                        inactiveIsSelected ?
                          // Return both active and inactive employees
                          agendaEmployees.map(emp => (
                            // TODO: include React keys once we have real data
                            <EmployeeAgendaSearchCard
                              key={shortid.generate()}
                              result={emp}
                              isCDO={isCDO}
                              showCreate={createAI}
                              viewType={viewType}
                            />
                          )) :
                          activeEmployees.map(emp => (
                            // TODO: include React keys once we have real data
                            <EmployeeAgendaSearchCard
                              key={shortid.generate()}
                              result={emp}
                              isCDO={isCDO}
                              showCreate={createAI}
                              viewType={viewType}
                            />
                          ))
                      }
                    </div>
                  }
                  {
                    !cardView && !agendaEmployeesIsLoading &&
                    <div className="employee-agenda-row">
                      {
                        inactiveIsSelected ?
                          // Return both active and inactive employees
                          agendaEmployees.map(emp => (
                            // TODO: include React keys once we have real data
                            <EmployeeAgendaSearchRow
                              key={shortid.generate()}
                              result={emp}
                              isCDO={isCDO}
                              showCreate={createAI}
                              viewType={viewType}
                            />
                          )) :
                          activeEmployees.map(emp => (
                            // TODO: include React keys once we have real data
                            <EmployeeAgendaSearchRow
                              key={shortid.generate()}
                              result={emp}
                              isCDO={isCDO}
                              showCreate={createAI}
                              viewType={viewType}
                            />
                          ))
                      }
                    </div>
                  }
                </div>
                <div className="usa-grid-full react-paginate empl-search-pagination-controls">
                  <PaginationWrapper
                    pageSize={limit}
                    onPageChange={p => setPage(p.page)}
                    forcePage={page}
                    totalResults={count}
                    marginPagesDisplayed={4}
                    pageRangeDisplayed={3}
                  />
                </div>
              </>
          }
        </div>
      </>
  );
};

EmployeeAgendaSearch.propTypes = {
  isCDO: PropTypes.bool,
  viewType: PropTypes.string,
};

EmployeeAgendaSearch.defaultProps = {
  isCDO: false,
  viewType: '',
};

export default EmployeeAgendaSearch;
