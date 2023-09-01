import { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { get, sortBy, uniqBy } from 'lodash';
import Picky from 'react-picky';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
import { bidSeasonsFetchData, saveBidSeasonsSelections } from 'actions/BidSeasons';
import BureauExceptionListCard from './BureauExceptionListCard';


const BureauExceptionList = (props) => {
  const dispatch = useDispatch();
  const { isAO } = props;

  const genericFiltersIsLoading = useSelector(state => state.filtersIsLoading);
  const userSelections = useSelector(state => state.bidSeasonsSelections);
  const ManageBidSeasonsDataLoading = useSelector(state => state.bidSeasonsFetchDataLoading);
  const ManageBidSeasonsData = useSelector(state => state.bidSeasons);
  const ManageBidSeasonsError = useSelector(state => state.bidSeasonsFetchDataErrored);
  const genericFilters = useSelector(state => state.filters);
  const genericFilters$ = get(genericFilters, 'filters') || [];

  // Filters
  const [selectedBidSeasons, setSelectedBidSeasons] =
    useState(userSelections?.selectedBidSeasons || []);
  const [selectedStatus, setSelectedStatus] = useState(userSelections?.selectedStatus || []);
  const [selectedDates, setSelectedDates] = useState(userSelections?.selectedDates || null);
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [clearFilters, setClearFilters] = useState(false);

  // Pagination
  const [page, setPage] = useState(userSelections.page || 1);
  const prevPage = usePrevious(page);
  const currentInputs = {
    page,
    selectedBidSeasons,
    selectedStatus,
    selectedDates,
  };

  const getCurrentInputs = () => ({
    page,
    selectedBidSeasons,
    selectedStatus,
    selectedDates,
  });

  const getQuery = () => ({
    'bid-seasons': selectedBidSeasons.map(bidCycleObject => (bidCycleObject?.id)),
    'bid-seasons-statuses': selectedStatus.map(statusObject => (statusObject?.code)),
    'bid-seasons-date-start': isDate(selectedDates?.[0]) ? startOfDay(selectedDates?.[0]).toJSON() : '',
    'bid-seasons-date-end': isDate(selectedDates?.[1]) ? startOfDay(selectedDates?.[1]).toJSON() : '',
    page,
  });

  const bidSeasons = genericFilters$.find(f => get(f, 'item.description') === 'bidCycle');
  const bidSeasonsOptions = uniqBy(sortBy(get(bidSeasons, 'data'), [(c) => c.custom_description]), 'custom_description');

  const fetchAndSet = (resetPage = false) => {
    setSelectedBidSeasons([]);
    const filters = [
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
    dispatch(saveBidSeasonsSelections(getCurrentInputs()));
    dispatch(bidSeasonsFetchData(getQuery()));
  };


  // initial render
  useEffect(() => {
    dispatch(filtersFetchData(genericFilters));
    dispatch(saveBidSeasonsSelections(currentInputs));
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

  const resetFilters = () => {
    setSelectedStatus([]);
    setSelectedDates(null);
    setClearFilters(false);
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
  const noResults = ManageBidSeasonsData?.results?.length === 0;
  const getOverlay = () => {
    let overlay;
    if (ManageBidSeasonsDataLoading) {
      overlay = <Spinner type="bid-season-filters" class="homepage-position-results" size="big" />;
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

  const openNewModal = (e) => {
    e.preventDefault();
    setNewModalOpen(true);
    setTimeout(() => {
      setNewModalOpen(false);
    }, 200);
  };

  return (
    genericFiltersIsLoading ?
      <Spinner type="homepage-position-results" class="homepage-position-results" size="big" /> :
      <div className="bid-seasons-page position-search">
        <div className="usa-grid-full position-search--header">
          <ProfileSectionTitle title="Bid Season Search" icon="calendar" className="xl-icon" />
          <div className="filterby-container" >
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
          <div className="usa-width-one-whole position-search--filters--bs">
            <div className="filter-div">
              <div className="label">Season:</div>
              <Picky
                {...pickyProps}
                placeholder="Type to filter seasons"
                options={bidSeasonsOptions}
                valueKey="code"
                labelKey="name"
                onChange={setSelectedStatus}
                value={selectedStatus}
              />
            </div>
            <div className="filter-div">
              <div className="label">Season Date:</div>
              <DateRangePicker
                onChange={setSelectedDates}
                value={selectedDates}
                maxDetail="month"
                calendarIcon={null}
                showLeadingZeros
              />
            </div>
          </div>

        </div>

        {
          getOverlay() ||
          <>
            <div className="usa-grid-full results-dropdown controls-container">
              <div className="bs-results">
                <Link
                  onClick={(e) => openNewModal(e)}
                  to="#"
                >
                  <FA className="fa-solid fa-plus" />
                  {' Add New Bid Season'}
                </Link>
              </div>
            </div>

            <div className="bs-lower-section">
              {ManageBidSeasonsData?.results?.map(data =>
                <BureauExceptionListCard {...{ ...data, isAO }} displayNewModal={newModalOpen} />)}
              <div className="usa-grid-full react-paginate">
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
  );
};

BureauExceptionList.propTypes = {
  isAO: PropTypes.bool,
};

BureauExceptionList.defaultProps = {
  isAO: false,
};

export default withRouter(BureauExceptionList);
