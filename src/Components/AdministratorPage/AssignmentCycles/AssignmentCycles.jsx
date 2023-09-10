import { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { get, sortBy, uniqBy } from 'lodash';
import Picky from 'react-picky';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FA from 'react-fontawesome';
import { isDate, startOfDay } from 'date-fns-v2';
import Spinner from 'Components/Spinner';
import ProfileSectionTitle from 'Components/ProfileSectionTitle';
import ListItem from 'Components/BidderPortfolio/BidControls/BidCyclePicker/ListItem';
import PaginationWrapper from 'Components/PaginationWrapper';
import Alert from 'Components/Alert';
import { usePrevious } from 'hooks';
import { filtersFetchData } from 'actions/filters/filters';
import { assignmentCycleFetchData, saveAssignmentCycleSelections } from 'actions/assignmentCycle';
import AssignmentCyclesCard from './AssignmentCyclesCard';


const AssignmentCycles = (props) => {
  const dispatch = useDispatch();
  const { isAO } = props;

  const genericFiltersIsLoading = useSelector(state => state.filtersIsLoading);
  const userSelections = useSelector(state => state.assignmentCycleSelections);
  const AssignmentCycleDataLoading = useSelector(state => state.assignmentCycleFetchDataLoading);
  const AssignmentCycleData = useSelector(state => state.assignmentCycle);
  const AssignmentCycleError = useSelector(state => state.assignmentCycleFetchDataErrored);
  const genericFilters = useSelector(state => state.filters);
  const genericFilters$ = get(genericFilters, 'filters') || [];

  // Filters
  const [selectedAssignmentCycles, setSelectedAssignmentCycles] =
    useState(userSelections?.selectedAssignmentCycles || []);
  const [selectedStatus, setSelectedStatus] = useState(userSelections?.selectedStatus || []);
  const [selectedDates, setSelectedDates] = useState(userSelections?.selectedDates || null);
  const [assignmentCycle, setAssignmentCycle] = useState(userSelections?.selectedDates || null);
  const [cycleCategory, setCycleCategory] = useState(userSelections?.selectedDates || null);
  const [cycleStatus, setCycleStatus] = useState(userSelections?.selectedDates || null);
  const [exclusivePosition, setExclusivePosition] =
   useState(userSelections?.selectedDates || null);
  const [postView, setPostView] = useState(userSelections?.selectedDates || null);
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [clearFilters, setClearFilters] = useState(false);

  // Pagination
  const [page, setPage] = useState(userSelections.page || 1);
  const prevPage = usePrevious(page);

  const choices = [
    { code: 1, name: 'Yes' },
    { code: 2, name: 'No' },
  ];

  const statusOptions = [
    { code: 1, name: 'Active' },
    { code: 2, name: 'Closed' },
    { code: 3, name: 'Merged' },
    { code: 4, name: 'Proposed' },
  ];

  const cycleCategoryOptions = [
    { code: 0, name: 'O (Other)' },
    { code: 1, name: 'Bid' },
    { code: 2, name: 'Handshake' },
    { code: 3, name: 'Handshake' },
  ];
  const currentInputs = {
    page,
    selectedAssignmentCycles,
    selectedStatus,
    selectedDates,
  };

  const getCurrentInputs = () => ({
    page,
    selectedAssignmentCycles,
    selectedStatus,
    selectedDates,
  });

  const getQuery = () => ({
    'assignment-cycles': selectedAssignmentCycles.map(bidCycleObject => (bidCycleObject?.id)),
    'assignment-cycles-statuses': selectedStatus.map(statusObject => (statusObject?.code)),
    'assignment-cycles-date-start': isDate(selectedDates?.[0]) ? startOfDay(selectedDates?.[0]).toJSON() : '',
    'assignment-cycles-date-end': isDate(selectedDates?.[1]) ? startOfDay(selectedDates?.[1]).toJSON() : '',
    page,
  });

  const bidSeasons = genericFilters$.find(f => get(f, 'item.description') === 'bidCycle');
  const bidSeasonsOptions = uniqBy(sortBy(get(bidSeasons, 'data'), [(c) => c.custom_description]), 'custom_description');

  const fetchAndSet = (resetPage = false) => {
    setSelectedAssignmentCycles([]);
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
    dispatch(saveAssignmentCycleSelections(getCurrentInputs()));
    dispatch(assignmentCycleFetchData(getQuery()));
  };


  // initial render
  useEffect(() => {
    dispatch(filtersFetchData(genericFilters));
    dispatch(saveAssignmentCycleSelections(currentInputs));
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
  const noResults = AssignmentCycleData?.results?.length === 0;
  console.log('Results', AssignmentCycleData?.results);
  const getOverlay = () => {
    let overlay;
    if (AssignmentCycleDataLoading) {
      overlay = <Spinner type="bid-season-filters" class="homepage-position-results" size="big" />;
    } else if (AssignmentCycleError) {
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
          <ProfileSectionTitle title="Assignment Cycles" icon="calendar" className="xl-icon" />
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
              <div className="label">Assignment Cycle:</div>
              <Picky
                {...pickyProps}
                placeholder="Select assignment cycle(s)"
                options={bidSeasonsOptions}
                valueKey="code"
                labelKey="name"
                onChange={setAssignmentCycle}
                value={assignmentCycle}
              />
            </div>
            <div className="filter-div">
              <div className="label">Cycle Category:</div>
              <Picky
                {...pickyProps}
                placeholder="Select cycle category(s)"
                options={cycleCategoryOptions}
                valueKey="code"
                labelKey="name"
                onChange={setCycleCategory}
                value={cycleCategory}
              />
            </div>
            <div className="filter-div">
              <div className="label">Cycle Status:</div>
              <Picky
                {...pickyProps}
                placeholder="Select cycle status"
                options={statusOptions}
                valueKey="code"
                labelKey="name"
                onChange={setCycleStatus}
                value={cycleStatus}
              />
            </div>
            <div className="filter-div">
              <div className="label">Exclusive Position:</div>
              <Picky
                {...pickyProps}
                includeSelectAll={false}
                includeFilter={false}
                placeholder="Select an option"
                options={choices}
                valueKey="code"
                labelKey="name"
                onChange={setExclusivePosition}
                value={exclusivePosition}
              />
            </div>
            <div className="filter-div">
              <div className="label">Post Viewable:</div>
              <Picky
                {...pickyProps}
                includeSelectAll={false}
                includeFilter={false}
                placeholder="Select an option"
                options={choices}
                valueKey="code"
                labelKey="name"
                onChange={setPostView}
                value={postView}
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
                  {' Add New Assignment Cycle'}
                </Link>
              </div>
            </div>

            <div className="bs-lower-section">
              {AssignmentCycleData?.results?.map(data =>
                <AssignmentCyclesCard {...{ ...data, isAO }} displayNewModal={newModalOpen} />)}
              <div className="usa-grid-full react-paginate">
                <PaginationWrapper
                  pageSize={5}
                  onPageChange={p => setPage(p.page)}
                  forcePage={page}
                  totalResults={AssignmentCycleData.count}
                />
              </div>
            </div>
          </>
        }
      </div>
  );
};

AssignmentCycles.propTypes = {
  isAO: PropTypes.bool,
};

AssignmentCycles.defaultProps = {
  isAO: false,
};

export default withRouter(AssignmentCycles);
