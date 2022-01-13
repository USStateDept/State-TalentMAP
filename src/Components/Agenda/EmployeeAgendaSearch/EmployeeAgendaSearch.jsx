/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Picky from 'react-picky';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { flatten, get, has, isEmpty, sortBy, throttle, uniqBy } from 'lodash';
import FA from 'react-fontawesome';
import { filtersFetchData } from 'actions/filters/filters';
import { agendaEmployeesFetchData, saveAgendaEmployeesSelections } from 'actions/agendaEmployees';
import { bidderPortfolioCDOsFetchData } from 'actions/bidderPortfolio';
import PositionManagerSearch from 'Components/BureauPage/PositionManager/PositionManagerSearch';
import Spinner from 'Components/Spinner';
import TotalResults from 'Components/TotalResults';
import PaginationWrapper from 'Components/PaginationWrapper';
import ExportButton from 'Components/ExportButton';
import SelectForm from 'Components/SelectForm';
import { AGENDA_EMPLOYEES_SORT } from 'Constants/Sort';
import shortid from 'shortid';
import ListItem from 'Components/BidderPortfolio/BidControls/BidCyclePicker/ListItem';
import Alert from 'Components/Alert';
import { checkFlag } from 'flags';
import EmployeeAgendaSearchCard from '../EmployeeAgendaSearchCard/EmployeeAgendaSearchCard';
import EmployeeAgendaSearchRow from '../EmployeeAgendaSearchRow/EmployeeAgendaSearchRow';
import ProfileSectionTitle from '../../ProfileSectionTitle';
import ResultsViewBy from '../../ResultsViewBy/ResultsViewBy';


const EmployeeAgendaSearch = ({ isCDO }) => {
  const childRef = useRef();
  const dispatch = useDispatch();

  const cdos = useSelector(state => state.bidderPortfolioCDOs);
  const cdosIsLoading = useSelector(state => state.bidderPortfolioCDOsIsLoading);
  const filterData = useSelector(state => state.filters);
  const filtersIsLoading = useSelector(state => state.filtersIsLoading);
  const agendaEmployees$ = useSelector(state => state.agendaEmployees);
  const agendaEmployeesIsLoading = useSelector(state => state.agendaEmployeesFetchDataLoading);
  const agendaEmployeesHasErrored = useSelector(state => state.agendaEmployeesFetchDataErrored);
  const userSelections = useSelector(state => state.agendaEmployeesSelections);

  const agendaEmployees = get(agendaEmployees$, 'results', []);

  const isLoading = false; // filtersIsLoading || cdosIsLoading;

  const filters = get(filterData, 'filters', []);

  const useEmployeeAgendaFilters = () => checkFlag('flags.agenda_filters');
  const displayEmployeeAgendaFilters = useEmployeeAgendaFilters();

  const bureaus = filters.find(f => f.item.description === 'region');
  const bureauOptions = uniqBy(sortBy(get(bureaus, 'data', []), [(b) => b.long_description]), 'long_description');
  const cycles = filters.find(f => f.item.description === 'bidCycle');
  const cycleOptions = uniqBy(sortBy(get(cycles, 'data', []), [(c) => c.custom_description]), 'custom_description');
  const fsbidHandshakeStatus = filters.find(f => f.item.description === 'handshake');
  const fsbidHandshakeStatusOptions = uniqBy(get(fsbidHandshakeStatus, 'data', []), 'code');
  const panels = [new Date(), new Date(), new Date(), new Date(), new Date()];
  // To-Do: Missing org/post data - using location as placeholder
  const posts = filters.find(f => f.item.description === 'post');
  const postOptions = uniqBy(sortBy(get(posts, 'data', []), [(p) => p.city]), 'code');

  // Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [ordering, setOrdering] = useState(get(userSelections, 'ordering', AGENDA_EMPLOYEES_SORT.defaultSort));
  // Filters
  const [selectedCurrentBureaus, setSelectedCurrentBureaus] = useState([]);
  const [selectedOngoingBureaus, setSelectedOngoingBureaus] = useState([]);
  const [selectedCDOs, setSelectedCDOs] = useState([]);
  // To-Do: Fake creator data
  const [selectedCreators, setSelectedCreators] = useState([]);
  const [selectedCycles, setSelectedCycles] = useState([]);
  const [selectedHandshakeStatus, setSelectedHandshakeStatus] = useState([]);
  const [selectedPanels, setSelectedPanels] = useState([]);
  const [selectedCurrentPosts, setSelectedCurrentPosts] = useState([]);
  const [selectedOngoingPosts, setSelectedOngoingPosts] = useState([]);
  const [selectedTED, setSelectedTED] = useState(null);
  // Free Text
  const [textInput, setTextInput] = useState(get(userSelections, 'textInput', ''));
  const [textSearch, setTextSearch] = useState(get(userSelections, 'textSearch', ''));
  // Controls
  const [cardView, setCardView] = useState(get(userSelections, 'cardView', true));
  const [clearFilters, setClearFilters] = useState(false);

  const count = agendaEmployees ? agendaEmployees.length : 0;

  const view = cardView ? 'card' : 'grid';

  const sorts = AGENDA_EMPLOYEES_SORT;

  const query = {
    // Pagination
    page,
    limit,
    ordering,
    // User Filters
    // [`${get(bureaus, 'item.selectionRef', '')}-current`]: selectedCurrentBureaus.map(bureauObject => (get(bureauObject, 'code'))),
    // [`${get(bureaus, 'item.selectionRef', '')}-ongoing`]: selectedOngoingBureaus.map(bureauObject => (get(bureauObject, 'code'))),
    // [get(cycles, 'item.selectionRef', '')]: selectedCycles.map(cycleObject => (get(cycleObject, 'id'))),
    // [get(fsbidHandshakeStatus, 'item.selectionRef', '')]: selectedHandshakeStatus.map(fsbidHSStatusObject => (get(fsbidHSStatusObject, 'code'))),
    // selectedPanels,
    // [`${get(posts, 'item.selectionRef', '')}-current`]: selectedCurrentPosts.map(postObject => (get(postObject, 'code'))),
    // [`${get(posts, 'item.selectionRef', '')}-ongoing`]: selectedOngoingPosts.map(postObject => (get(postObject, 'code'))),
    // selectedTED,
    // Free Text
    q: textInput || textSearch,
  };

  const currentInputs = {
    page,
    limit,
    ordering,
    selectedCurrentBureaus,
    selectedOngoingBureaus,
    selectedCDOs,
    selectedCreators,
    selectedCycles,
    selectedHandshakeStatus,
    selectedPanels,
    selectedCurrentPosts,
    selectedOngoingPosts,
    selectedTED,
    textInput,
    textSearch,
    cardView,
  };

  useEffect(() => {
    // dispatch(filtersFetchData(filterData, {}));
    // dispatch(bidderPortfolioCDOsFetchData());
    dispatch(agendaEmployeesFetchData(query));
    dispatch(saveAgendaEmployeesSelections(currentInputs));
  }, []);

  useEffect(() => {
    const filters$ = [
      selectedCurrentBureaus,
      selectedOngoingBureaus,
      selectedCDOs,
      selectedCycles,
      selectedHandshakeStatus,
      selectedPanels,
      selectedCurrentPosts,
      selectedOngoingPosts,
      selectedTED,
    ];
    if (isEmpty(flatten(filters$)) && isEmpty(textSearch)) {
      setClearFilters(false);
    } else {
      setClearFilters(true);
    }
    dispatch(agendaEmployeesFetchData(query));
    dispatch(saveAgendaEmployeesSelections(currentInputs));
  }, [
    page,
    limit,
    ordering,
    selectedCurrentBureaus,
    selectedOngoingBureaus,
    selectedCDOs,
    selectedCycles,
    selectedHandshakeStatus,
    selectedPanels,
    selectedCurrentPosts,
    selectedOngoingPosts,
    selectedTED,
    textSearch,
  ]);

  useEffect(() => {
    dispatch(saveAgendaEmployeesSelections(currentInputs));
  }, [cardView]);

  function submitSearch(text) {
    setTextSearch(text);
  }

  const throttledTextInput = () =>
    throttle(q => setTextInput(q), 300, { leading: false, trailing: true });

  const setTextInputThrottled = (q) => {
    throttledTextInput(q);
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
    setSelectedCurrentBureaus([]);
    setSelectedOngoingBureaus([]);
    setSelectedCDOs([]);
    setSelectedCycles([]);
    setSelectedHandshakeStatus([]);
    setSelectedPanels([]);
    setSelectedCurrentPosts([]);
    setSelectedOngoingPosts([]);
    setSelectedTED(null);
    setTextSearch('');
    childRef.current.clearText();
    setClearFilters(false);
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

  return (
    isLoading ?
      <Spinner type="bureau-filters" size="small" /> :
      <>
        <div className="empl-search-page">
          <div className="usa-grid-full empl-search-upper-section">
            <div className="results-search-bar padded-main-content results-single-search homepage-offset">
              <div className="usa-grid-full results-search-bar-container">
                <ProfileSectionTitle title="Employee Agenda Search" icon="user-circle-o" />
                <PositionManagerSearch
                  submitSearch={submitSearch}
                  onChange={setTextInputThrottled}
                  ref={childRef}
                  textSearch={textSearch}
                  label="Search for an Employee"
                  placeHolder="Search using Employee ID or Name here"
                />
                {
                  displayEmployeeAgendaFilters &&
                  <>
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
                      <div className="filter-div">
                        <div className="label">Cycle:</div>
                        <Picky
                          {...pickyProps}
                          placeholder="Select Cycle(s)"
                          value={selectedCycles}
                          options={cycleOptions}
                          onChange={setSelectedCycles}
                          valueKey="id"
                          labelKey="custom_description"
                          disabled
                        />
                      </div>
                      <div className="filter-div">
                        <div className="label">Panel:</div>
                        <Picky
                          {...pickyProps}
                          placeholder="Select Panel Date(s)"
                          value={selectedPanels}
                          options={panels}
                          onChange={setSelectedPanels}
                          valueKey="code"
                          labelKey="long_description"
                          disabled
                        />
                      </div>
                      <div className="filter-div split-filter-div">
                        <div className="label">Post:</div>
                        <Picky
                          {...pickyProps}
                          placeholder="Current"
                          value={selectedCurrentPosts}
                          options={postOptions}
                          onChange={setSelectedCurrentPosts}
                          valueKey="code"
                          labelKey="custom_description"
                          disabled
                        />
                        <Picky
                          {...pickyProps}
                          placeholder="Ongoing"
                          value={selectedOngoingPosts}
                          options={postOptions}
                          onChange={setSelectedOngoingPosts}
                          valueKey="code"
                          labelKey="custom_description"
                          disabled
                        />
                      </div>
                      <div className="filter-div split-filter-div">
                        <div className="label">Bureau:</div>
                        <Picky
                          {...pickyProps}
                          placeholder="Current"
                          value={selectedCurrentBureaus}
                          options={bureauOptions}
                          onChange={setSelectedCurrentBureaus}
                          valueKey="code"
                          labelKey="long_description"
                          disabled
                        />
                        <Picky
                          {...pickyProps}
                          placeholder="Ongoing"
                          value={selectedOngoingBureaus}
                          options={bureauOptions}
                          onChange={setSelectedOngoingBureaus}
                          valueKey="code"
                          labelKey="long_description"
                          disabled
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
                          disabled
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
                          disabled
                        />
                      </div>
                      <div className="filter-div">
                        <div className="label">Creator:</div>
                        <Picky
                          {...pickyProps}
                          placeholder="Select Creator(s)"
                          value={selectedCreators}
                          options={cdos}
                          onChange={setSelectedCreators}
                          valueKey="id"
                          labelKey="name"
                          disabled
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
                          disabled
                        />
                      </div>
                    </div>
                  </>
                }
              </div>
            </div>
          </div>
          {
            !agendaEmployeesIsLoading && !isLoading &&
            <div className="usa-width-one-whole results-dropdown empl-search-controls-container">
              <TotalResults
                total={count}
                pageNumber={1}
                pageSize={count}
                suffix="Results"
                isHidden={isLoading || agendaEmployeesIsLoading}
              />
              <div className="empl-search-controls-right">
                <ResultsViewBy initial={view} onClick={e => setCardView(e === 'card')} />
                {
                  displayEmployeeAgendaFilters &&
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
                      options={[]}
                      label="Results:"
                      defaultSort={limit}
                      onSelectOption={value => setLimit(value.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                }
                <div className="export-button-container">
                  <ExportButton
                    onClick={() => {}}
                    isLoading={isLoading}
                    disabled
                  />
                </div>
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
                      {agendaEmployees.map(emp => (
                        // TODO: include React keys once we have real data
                        <EmployeeAgendaSearchCard key={shortid.generate()} result={emp} isCDO={isCDO} />
                      ))}
                    </div>
                  }
                  {
                    !cardView && !agendaEmployeesIsLoading &&
                    <div className="employee-agenda-row">
                      {agendaEmployees.map(emp => (
                        // TODO: include React keys once we have real data
                        <EmployeeAgendaSearchRow key={shortid.generate()} result={emp} isCDO={isCDO} />
                      ))}
                    </div>
                  }
                </div>
                <div className="usa-grid-full react-paginate empl-search-pagination-controls">
                  {
                    displayEmployeeAgendaFilters &&
                    <PaginationWrapper
                      pageSize={limit}
                      onPageChange={p => setPage(p.page)}
                      forcePage={page}
                      totalResults={count}
                    />
                  }
                </div>
                {
                  (count >= 50) &&
                  <div className="empl-search-controls-container">
                    <Alert
                      type="info"
                      title="Page Max: 50 results"
                      messages={[{ body: 'Please refine search to see different results.' }]}
                    />
                  </div>
                }
              </>
          }
        </div>
      </>
  );
};

EmployeeAgendaSearch.propTypes = {
  isCDO: PropTypes.bool,
};

EmployeeAgendaSearch.defaultProps = {
  isCDO: false,
};

export default EmployeeAgendaSearch;
