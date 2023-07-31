import { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Picky from 'react-picky';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { isDate, startOfDay } from 'date-fns-v2';
import Spinner from 'Components/Spinner';
import ProfileSectionTitle from 'Components/ProfileSectionTitle';
import ListItem from 'Components/BidderPortfolio/BidControls/BidCyclePicker/ListItem';
import PaginationWrapper from 'Components/PaginationWrapper';
import Alert from 'Components/Alert';
import { usePrevious } from 'hooks';
import { filtersFetchData } from 'actions/filters/filters';
import { cycleManagementFetchData, saveCycleManagementSelections } from 'actions/cycleManagement';
import ManageBidSeasonCard from './ManageBidSeasonsCard';


const ManageBidSeasons = (props) => {
  const dispatch = useDispatch();
  const { isAO } = props;

  const genericFiltersIsLoading = useSelector(state => state.filtersIsLoading);
  const userSelections = useSelector(state => state.cycleManagementSelections);
  const cycleManagementDataLoading = useSelector(state => state.cycleManagementFetchDataLoading);
  const cycleManagementData = useSelector(state => state.cycleManagement);
  const cycleManagementError = useSelector(state => state.cycleManagementFetchDataErrored);
  const genericFilters = useSelector(state => state.filters);

  // Filters
  const [selectedCycles, setSelectedCycles] = useState(userSelections?.selectedCycles || []);
  const [selectedStatus, setSelectedStatus] = useState(userSelections?.selectedStatus || []);
  const [selectedDates, setSelectedDates] = useState(userSelections?.selectedDates || null);
  const [clearFilters, setClearFilters] = useState(false);

  // Pagination
  const [page, setPage] = useState(userSelections.page || 1);
  const [limit, setLimit] = useState(userSelections.limit || 10);
  const prevPage = usePrevious(page);
  const currentInputs = {
    page,
    limit,
    selectedCycles,
    selectedStatus,
    selectedDates,
  };

  const getCurrentInputs = () => ({
    page,
    limit,
    selectedCycles,
    selectedStatus,
    selectedDates,
  });

  const getQuery = () => ({
    'cycle-cycles': selectedCycles.map(bidCycleObject => (bidCycleObject?.id)),
    'cycle-statuses': selectedStatus.map(statusObject => (statusObject?.code)),
    'cycle-date-start': isDate(selectedDates?.[0]) ? startOfDay(selectedDates?.[0]).toJSON() : '',
    'cycle-date-end': isDate(selectedDates?.[1]) ? startOfDay(selectedDates?.[1]).toJSON() : '',
    limit,
    page,
  });

  const fetchAndSet = (resetPage = false) => {
    const filters = [
      selectedCycles,
      selectedStatus,
    ];
    if (filters.flat().length === 0 && !selectedDates) {
      setClearFilters(false);
    } else {
      setClearFilters(true);
    }
    if (resetPage) {
      setPage(1);
    }
    dispatch(saveCycleManagementSelections(getCurrentInputs()));
    dispatch(cycleManagementFetchData(getQuery()));
  };

  // initial render
  useEffect(() => {
    dispatch(filtersFetchData(genericFilters));
    dispatch(saveCycleManagementSelections(currentInputs));
  }, []);

  useEffect(() => {
    if (prevPage) {
      fetchAndSet(true);
    }
  }, [
    limit,
    selectedCycles,
    selectedStatus,
    selectedDates,
  ]);

  useEffect(() => {
    fetchAndSet(false);
  }, [
    page,
  ]);

  // Hardcoded - find where to get this data
  const statusOptions = [
    { code: 1, name: 'Active' },
    { code: 2, name: 'Closed' },
    { code: 3, name: 'Merged' },
    { code: 4, name: 'Proposed' },
  ];

  const resetFilters = () => {
    setSelectedCycles([]);
    setSelectedStatus([]);
    setSelectedDates(null);
    setClearFilters(false);
    setLimit(0);
  };

  const renderSelectionList = ({ items, selected, ...rest }) => {
    let queryProp = 'description';
    if (items?.[0]?.custom_description) queryProp = 'custom_description';
    else if (items?.[0]?.long_description) queryProp = 'long_description';
    else if (items?.[0]?.name) queryProp = 'name';
    return items.map((item, index) => {
      const keyId = `${index}-${item}`;
      return (<ListItem
        item={item}
        {...rest}
        key={keyId}
        queryProp={queryProp}
      />);
    });
  };

  // Overlay for error, info, and loading state
  const noResults = cycleManagementData?.results?.length === 0;
  const getOverlay = () => {
    let overlay;
    if (cycleManagementDataLoading) {
      overlay = <Spinner type="bureau-results" class="homepage-position-results" size="big" />;
    } else if (cycleManagementError) {
      overlay = <Alert type="error" title="Error loading results" messages={[{ body: 'Please try again.' }]} />;
    } else if (noResults) {
      overlay = <Alert type="info" title="No results found" messages={[{ body: 'Please broaden your search criteria and try again.' }]} />;
    } else {
      return false;
    }
    return overlay;
  };

  const pickyProps = {
    numberDisplayed: 2,
    multiple: true,
    includeFilter: true,
    dropdownHeight: 255,
    renderList: renderSelectionList,
    includeSelectAll: true,
  };

  return (
    genericFiltersIsLoading ? <Spinner type="bureau-filters" size="small" /> :
      (
        <div className="cycle-management-page">
          <div className="usa-grid-full cm-upper-section">
            <ProfileSectionTitle title="Bid Season Search" icon="cogs" />
            <div className="filterby-container" style={{ marginTop: '40px' }}>
              <div className="filterby-label">Filter by:</div>
              <span className="filterby-clear">
                {clearFilters &&
                  <button className="unstyled-button" onClick={resetFilters}>
                    <FA name="times" />
                        Clear Filters
                  </button>
                }
              </span>
            </div>

            <div className="usa-width-one-whole cm-filters grid-450">
              <div className="cm-filter-div">
                <div className="label">Season:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Type to filter seasons"
                  options={statusOptions}
                  valueKey="code"
                  labelKey="name"
                  onChange={setSelectedStatus}
                  value={selectedStatus}
                />
              </div>
              <div className="cm-filter-div">
                <div className="label">Season Date:</div>
                <DateRangePicker
                  onChange={setSelectedDates}
                  value={selectedDates}
                  maxDetail="month"
                  calendarIcon={null}
                  showLeadingZeros
                />
              </div>
              <div className="cm-filter-div">
                <button
                  className="usa-button-disabled"
                  disabled="true"
                  type="submit"
                  id="disabled-search-button"
                  title="search button disabled"
                >
                  <span className="usa-search-submit-text usa-button-disabled">
                    Search
                  </span>
                </button>
              </div>
            </div>

          </div>

          {
            getOverlay() ||
            <>
              <div className="usa-grid-full results-dropdown controls-container">
                <div className="cm-results">
                  <h2>Search for a Bid Season</h2>
                  <p>Search for an existing bid season or add a new one.</p>
                </div>
                <div className="cm-results-dropdown cm-results">
                  <Link to={'/'}>
                    <FA className="fa-solid fa-plus" />
                    {' Add New Bid Season'}
                  </Link>
                </div>
              </div>

              <div className="cm-lower-section">
                {cycleManagementData?.results?.map(data =>
                  <ManageBidSeasonCard {...{ ...data, isAO }} />)}
                <div className="usa-grid-full react-paginate bureau-pagination-controls">
                  <PaginationWrapper
                    pageSize={limit}
                    onPageChange={p => setPage(p.page)}
                    forcePage={page}
                    totalResults={cycleManagementData.count}
                  />
                </div>
              </div>
            </>
          }
        </div>
      )
  );
};

ManageBidSeasons.propTypes = {
  isAO: PropTypes.bool,
};

ManageBidSeasons.defaultProps = {
  isAO: false,
};

export default withRouter(ManageBidSeasons);
