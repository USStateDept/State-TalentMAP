import { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
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
  const ManageBidSeasonsDataLoading = useSelector(state => state.cycleManagementFetchDataLoading);
  const ManageBidSeasonsData = useSelector(state => state.cycleManagement);
  const ManageBidSeasonsError = useSelector(state => state.cycleManagementFetchDataErrored);
  const genericFilters = useSelector(state => state.filters);

  // Filters
  const [selectedStatus, setSelectedStatus] = useState(userSelections?.selectedStatus || []);
  const [selectedDates, setSelectedDates] = useState(userSelections?.selectedDates || null);
  const [newModalOpen, setNewModalOpen] = useState(false);

  // Pagination
  const [page, setPage] = useState(userSelections.page || 1);
  const prevPage = usePrevious(page);
  const currentInputs = {
    page,
    selectedStatus,
    selectedDates,
  };

  const getCurrentInputs = () => ({
    page,
    selectedStatus,
    selectedDates,
  });

  const getQuery = () => ({
    'cycle-statuses': selectedStatus.map(statusObject => (statusObject?.code)),
    'cycle-date-start': isDate(selectedDates?.[0]) ? startOfDay(selectedDates?.[0]).toJSON() : '',
    'cycle-date-end': isDate(selectedDates?.[1]) ? startOfDay(selectedDates?.[1]).toJSON() : '',
    page,
  });

  const fetchAndSet = (resetPage = false) => {
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
  const noResults = ManageBidSeasonsData?.results?.length === 0;
  const getOverlay = () => {
    let overlay;
    if (ManageBidSeasonsDataLoading) {
      overlay = <Spinner type="bureau-results" class="homepage-position-results" size="big" />;
    } else if (ManageBidSeasonsError) {
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

  const openNewModal = () => {
    setNewModalOpen(true);
    setTimeout(() => {
      setNewModalOpen(false);
    }, 200);
  };

  return (
    genericFiltersIsLoading ? <Spinner type="bureau-filters" size="small" /> :
      (
        <div className="cycle-management-page position-search">
          <div className="usa-grid-full position-search--header">
            <ProfileSectionTitle title="Bid Season Search" icon="calendar" className="xl-icon" />
            <div className="usa-width-one-whole position-search--filters--cm">
              <div className="filter-div">
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
              <div className="filter-div">
                <div className="label">Season Date:</div>
                <div style={{ marginTop: '7px' }}>
                  <DateRangePicker
                    onChange={setSelectedDates}
                    value={selectedDates}
                    maxDetail="month"
                    calendarIcon={null}
                    showLeadingZeros
                  />
                </div>
              </div>
              <div className="filter-div">
                <button>
                    Search
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
                  <button onClick={openNewModal} to="#" >
                    <FA className="fa-solid fa-plus" />
                    {' Add New Bid Season'}
                  </button>
                </div>
              </div>

              <div className="cm-lower-section">
                {ManageBidSeasonsData?.results?.map(data =>
                  <ManageBidSeasonCard {...{ ...data, isAO }} displayNewModal={newModalOpen} />)}
                <div className="usa-grid-full react-paginate bureau-pagination-controls">
                  <PaginationWrapper
                    pageSize={5}
                    onPageChange={p => setPage(p.page)}
                    forcePage={page}
                    totalResults={ManageBidSeasonsData.count}
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
  id: PropTypes.string.isRequired,
};

ManageBidSeasons.defaultProps = {
  isAO: false,
};

export default withRouter(ManageBidSeasons);
