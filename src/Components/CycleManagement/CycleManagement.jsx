import { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Picky from 'react-picky';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import swal from '@sweetalert/with-react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { isDate, startOfDay } from 'date-fns-v2';
import Spinner from 'Components/Spinner';
import ProfileSectionTitle from 'Components/ProfileSectionTitle';
import PaginationWrapper from 'Components/PaginationWrapper';
import TotalResults from 'Components/TotalResults';
import Alert from 'Components/Alert';
import { POSITION_MANAGER_PAGE_SIZES } from 'Constants/Sort';
import SelectForm from 'Components/SelectForm';
import { usePrevious } from 'hooks';
import { filtersFetchData } from 'actions/filters/filters';
import {
  cycleManagementAssignmentCycleFetchData,
  cycleManagementFetchData,
  postAssignmentCyclesSelections,
  saveAssignmentCyclesSelections,
  saveCycleManagementSelections,
} from 'actions/cycleManagement';
import { nameSort, renderSelectionList, userHasPermissions } from 'utilities';
import CycleSearchCard from './CycleSearchCard';
import EditAssignmentCycles from './EditAssignmentCycles';

const CycleManagement = (props) => {
  const dispatch = useDispatch();
  const { isAO } = props;

  const userProfile = useSelector(state => state.userProfile);
  const genericFiltersIsLoading = useSelector(state => state.filtersIsLoading);
  const userSelections = useSelector(state => state.cycleManagementSelections);
  const cycleManagementDataLoading = useSelector(state => state.cycleManagementFetchDataLoading);
  const cycleManagementData = useSelector(state => state.cycleManagement);
  const cycleManagementError = useSelector(state => state.cycleManagementFetchDataErrored);
  const genericFilters = useSelector(state => state.filters);
  const isSuperUser = userHasPermissions(['superuser'], userProfile?.permission_groups);

  // Filters
  const [selectedCycles, setSelectedCycles] = useState(userSelections?.selectedCycles || []);
  const [selectedStatus, setSelectedStatus] = useState(userSelections?.selectedStatus || []);
  const [selectedDates, setSelectedDates] = useState(userSelections?.selectedDates || null);
  const [clearFilters, setClearFilters] = useState(false);
  const [cardsInEditMode, setCardsInEditMode] = useState([]);
  const [addNewCycles, setAddNewCycles] = useState(false);

  // Pagination
  const [page, setPage] = useState(userSelections.page || 1);
  const [limit, setLimit] = useState(userSelections.limit || 10);
  const prevPage = usePrevious(page);
  const pageSizes = POSITION_MANAGER_PAGE_SIZES;
  const disableInput = addNewCycles || cardsInEditMode.length > 0 || genericFiltersIsLoading;

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
    dispatch(cycleManagementAssignmentCycleFetchData());
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

  const genericFilters$ = genericFilters?.filters || [];
  const bidCycle = genericFilters$.find(f => f?.item?.description === 'bidCycle');
  const bidCycleOptions = bidCycle?.data?.length
    ? nameSort([...new Set(bidCycle.data)], 'name') : [];

  const resetFilters = () => {
    setSelectedCycles([]);
    setSelectedStatus([]);
    setSelectedDates(null);
    setClearFilters(false);
  };

  const onSave = (isNew, userData) => {
    dispatch(saveAssignmentCyclesSelections(userData));
    setAddNewCycles(false);
    swal.close();
    if (!isNew) setCardsInEditMode([]);
  };

  const onPost = (isNew, userData) => {
    dispatch(postAssignmentCyclesSelections(userData));
    setAddNewCycles(false);
    swal.close();
    if (!isNew) setCardsInEditMode([]);
  };

  const onClose = (isNew) => {
    swal.close();
    setAddNewCycles(false);
    if (!isNew) setCardsInEditMode([]);
  };

  const onCardAdd = (e) => {
    if (cardsInEditMode.includes(e)) {
      setCardsInEditMode(cardsInEditMode.filter(item => item !== e));
    } else {
      setCardsInEditMode([...cardsInEditMode, e]);
    }
  };

  const addNewCycle = (e) => {
    e.preventDefault();
    swal({
      title: 'New Assignment Cycle',
      button: false,
      content: (
        <EditAssignmentCycles
          onPost={onPost}
          onSave={onSave}
          onClose={onClose}
        />
      ),
    });
    setAddNewCycles(ac => !ac);
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
        <div className="cycle-management-page position-search">
          <div className="usa-grid-full position-search--header">
            <ProfileSectionTitle title="Cycle Management" icon="cogs" className="xl-icon" />
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

            <div className="usa-width-one-whole position-search--filters--cm">
              <div className="filter-div">
                <div className="label">Status:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Status"
                  options={statusOptions}
                  valueKey="code"
                  labelKey="name"
                  onChange={setSelectedStatus}
                  value={selectedStatus}
                  disabled={disableInput}
                />
              </div>
              <div className="filter-div">
                <div className="label">Cycle:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Bid Cycle(s)"
                  options={bidCycleOptions}
                  valueKey="id"
                  labelKey="name"
                  disabled={disableInput}
                  onChange={setSelectedCycles}
                  value={selectedCycles}
                />
              </div>
              <div className="filter-div">
                <div className="label">Cycle Date:</div>
                <DateRangePicker
                  onChange={setSelectedDates}
                  value={selectedDates}
                  maxDetail="month"
                  calendarIcon={null}
                  showLeadingZeros
                  disabled={disableInput}
                />
              </div>
            </div>

          </div>

          {
            getOverlay() ||
            <>
              <div className="usa-grid-full results-dropdown controls-container">
                <div className="cm-results">
                  <TotalResults
                    total={cycleManagementData.count}
                    pageNumber={page}
                    pageSize={limit}
                    suffix="Results"
                    isHidden={cycleManagementDataLoading}
                  />
                </div>
                <div className="cm-results-dropdown cm-results">
                  <SelectForm
                    options={pageSizes.options}
                    label="Results:"
                    defaultSort={limit}
                    onSelectOption={value => setLimit(value.target.value)}
                    disabled={cycleManagementDataLoading}
                  />
                </div>
              </div>

              <div className="usa-grid-full results-dropdown controls-container">
                <div className="bs-results">
                  <Link
                    onClick={addNewCycle}
                    to="#"
                  >
                    { isSuperUser &&
                      <span>
                        <FA className="fa-solid fa-plus" />
                        {' Add New Assignment Cycle'}
                      </span>
                    }
                  </Link>
                </div>
              </div>

              <div className="cm-lower-section">
                {cycleManagementData?.results?.map(data => (
                  <CycleSearchCard
                    {...{ ...data, isAO }}
                    onEditModeSearch={onCardAdd}
                    isSuperUser={isSuperUser}
                  />
                ),
                )}
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

CycleManagement.propTypes = {
  isAO: PropTypes.bool,
};

CycleManagement.defaultProps = {
  isAO: false,
};

export default withRouter(CycleManagement);
