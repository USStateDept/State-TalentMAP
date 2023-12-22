import { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Picky from 'react-picky';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import swal from '@sweetalert/with-react';
import Spinner from 'Components/Spinner';
import ProfileSectionTitle from 'Components/ProfileSectionTitle';
import Alert from 'Components/Alert';
import TMDatePicker from 'Components/TMDatePicker';
import {
  cycleManagementFetchData,
  postAssignmentCyclesSelections,
  saveAssignmentCyclesSelections,
} from 'actions/cycleManagement';
import { renderSelectionList, userHasPermissions } from 'utilities';
import CycleSearchCard from './CycleSearchCard';
import EditAssignmentCycles from './EditAssignmentCycles';

const CycleManagement = (props) => {
  const dispatch = useDispatch();
  const { isAO } = props;

  // Redux State
  const userProfile = useSelector(state => state.userProfile);
  const cycleManagementDataLoading = useSelector(state => state.cycleManagementFetchDataLoading);
  const cycleManagementData = useSelector(state => state.cycleManagement);
  const cycleManagementError = useSelector(state => state.cycleManagementFetchDataErrored);
  const isSuperUser = userHasPermissions(['superuser'], userProfile?.permission_groups);

  // Filters
  const [selectedCycles, setSelectedCycles] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedDates, setSelectedDates] = useState(null);
  const [cycleManagementData$, setCycleManagementData$] = useState(cycleManagementData);
  const [clearFilters, setClearFilters] = useState(false);
  const [cardsInEditMode, setCardsInEditMode] = useState([]);
  const [addNewCycles, setAddNewCycles] = useState(false);
  const disableInput = addNewCycles || cardsInEditMode.length > 0;
  const noFiltersSelected = selectedCycles.flat().length === 0
    && selectedStatus.flat().length === 0
    && !selectedDates;


  const filterCyclesByDate = (cycles, date) => {
    const filteredCycles = cycles.filter(cycle => {
      const startDate = new Date(cycle.begin_date).getTime();
      const endDate = new Date(cycle.end_date).getTime();
      return ((date >= startDate) && (date <= endDate));
    });
    return filteredCycles;
  };

  const cycleDataFiltered = () => {
    if (noFiltersSelected) return cycleManagementData;

    let cycles = cycleManagementData;
    if (selectedCycles.length > 0) {
      cycles = selectedCycles;
    }
    if (selectedStatus.length > 0) {
      cycles = cycles.filter(cycle =>
        selectedStatus.some(status => status.text === cycle.status),
      );
    }

    if (selectedDates) return filterCyclesByDate(cycles, selectedDates);
    return cycles;
  };


  // initial render
  useEffect(() => {
    dispatch(cycleManagementFetchData());
  }, []);

  useEffect(() => {
    setCycleManagementData$(cycleDataFiltered);
    if (noFiltersSelected) {
      setClearFilters(false);
    } else {
      setClearFilters(true);
    }
  }, [
    selectedCycles,
    selectedDates,
    selectedStatus,
    cycleManagementData,
  ]);


  const uniqueStatuses = () => {
    const statuses = cycleManagementData.map(cycles => cycles.status);
    const uniq = [...new Set(statuses)];
    const uniqObj = uniq.map(x => ({ text: x }));
    return uniqObj;
  };

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
      className: 'modal-700',
      button: false,
      content: (
        <EditAssignmentCycles
          onPost={onPost}
          onSave={onSave}
          onClose={onClose}
        />
      ),
    });
  };

  // Overlay for error, info, and loading state
  const noResults = cycleManagementData$?.length === 0;
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
    cycleManagementDataLoading ? <Spinner type="bureau-filters" size="small" /> :
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
                <div className="label">Cycle:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Bid Cycle(s)"
                  options={cycleManagementData}
                  valueKey="id"
                  labelKey="name"
                  disabled={disableInput}
                  onChange={setSelectedCycles}
                  value={selectedCycles}
                />
              </div>
              <div className="filter-div">
                <div className="label">Status:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Status"
                  options={uniqueStatuses()}
                  valueKey="text"
                  labelKey="text"
                  onChange={setSelectedStatus}
                  value={selectedStatus}
                  disabled={disableInput}
                />
              </div>
              <div className="filter-div">
                <div className="label">Cycle Date:</div>
                <TMDatePicker
                  onChange={setSelectedDates}
                  selected={selectedDates}
                  type="filter"
                  showMonthDropdown
                  showYearDropdown
                  isClearable
                  disabled={disableInput}
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
                    onClick={addNewCycle}
                    to="#"
                  >
                    {isSuperUser &&
                      <span>
                        <FA className="fa-solid fa-plus" />
                        {' Add New Assignment Cycle'}
                      </span>
                    }
                  </Link>
                </div>
              </div>
              <div className="cm-lower-section">
                {cycleManagementData$?.map(data => (
                  <CycleSearchCard
                    {...{ ...data, isAO }}
                    onEditModeSearch={onCardAdd}
                    isSuperUser={isSuperUser}
                  />
                ))}
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
