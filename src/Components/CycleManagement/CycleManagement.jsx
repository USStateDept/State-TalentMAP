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
  cycleManagementCreateCycle,
  cycleManagementFetchData,
  cycleManagementMergeCycle,
  cycleManagementMergeCycleSuccess,
  saveCycleManagementSelections,
} from 'actions/cycleManagement';
import { renderSelectionList, userHasPermissions } from 'utilities';
import CycleSearchCard from './CycleSearchCard';
import NewAssignmentCycle from './NewAssignmentCycle';
import MergeAssignmentCycles from './MergeAssignmentCycles';
import { history } from '../../store';

const CycleManagement = (props) => {
  const dispatch = useDispatch();
  const { isAO } = props;

  // Redux State
  const userProfile = useSelector(state => state.userProfile);
  const userSelections = useSelector(state => state.cycleManagementSelections);
  const cycleManagementDataLoading = useSelector(state => state.cycleManagementFetchDataLoading);
  const cycleManagementData = useSelector(state => state.cycleManagement);
  const cycleManagementError = useSelector(state => state.cycleManagementFetchDataErrored);
  const cycleManagementMergeSuccess = useSelector(state => state.cycleManagementMerge);
  const isSuperUser = userHasPermissions(['superuser'], userProfile?.permission_groups);

  // Filters
  const [selectedCycles, setSelectedCycles] = useState(userSelections?.selectedCycles || []);
  const [selectedStatus, setSelectedStatus] = useState(userSelections?.selectedStatus || []);
  const [selectedDate, setSelectedDate] = useState(userSelections?.selectedDate || null);
  const [mergeTargetCycle, setMergeTargetCycle] = useState('');
  const [cycleManagementData$, setCycleManagementData$] = useState(cycleManagementData);
  const [clearFilters, setClearFilters] = useState(false);
  const noFiltersSelected = [selectedCycles, selectedStatus].flat().length === 0
    && !selectedDate;

  const getCurrentInputs = () => ({
    selectedCycles,
    selectedStatus,
    selectedDate,
  });

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

    if (selectedDate) return filterCyclesByDate(cycles, selectedDate);
    return cycles;
  };


  // initial render
  useEffect(() => {
    dispatch(cycleManagementFetchData());
  }, []);

  useEffect(() => {
    dispatch(saveCycleManagementSelections(getCurrentInputs()));
    setCycleManagementData$(cycleDataFiltered);
    if (noFiltersSelected) {
      setClearFilters(false);
    } else {
      setClearFilters(true);
    }
  }, [
    selectedCycles,
    selectedStatus,
    selectedDate,
    cycleManagementData,
  ]);

  useEffect(() => {
    if (swal?.getState()?.isOpen) {
      swal.close();
    }
  }, [cycleManagementDataLoading]);

  useEffect(() => {
    if (cycleManagementMergeSuccess) {
      swal.close();
      dispatch(cycleManagementMergeCycleSuccess(false));
      history.push(`/profile/${isAO ? 'ao' : 'bureau'}/assignmentcycle/${mergeTargetCycle}`);
    }
  }, [cycleManagementMergeSuccess]);

  const uniqueStatuses = () => {
    const statuses = cycleManagementData.map(cycles => cycles.status);
    const uniq = [...new Set(statuses)];
    const uniqObj = uniq.map(x => ({ text: x }));
    return uniqObj;
  };

  const resetFilters = () => {
    setSelectedCycles([]);
    setSelectedStatus([]);
    setSelectedDate(null);
    setClearFilters(false);
  };

  const onSave = (data) => {
    dispatch(cycleManagementCreateCycle(data));
  };

  const onMergeSave = (data) => {
    setMergeTargetCycle(data.targetCycle);
    dispatch(cycleManagementMergeCycle(data));
  };

  const createNewAssignmentCycle = () => {
    swal({
      title: 'New Assignment Cycle',
      className: 'modal-700-long',
      button: false,
      content: (
        <NewAssignmentCycle
          onSave={onSave}
        />
      ),
    });
  };

  const mergeCycles = () => {
    swal({
      title: 'Merge Assignment Cycles',
      className: 'modal-700',
      button: false,
      content: (
        <MergeAssignmentCycles
          onSave={onMergeSave}
          cycles={cycleManagementData}
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
            <ProfileSectionTitle title="Cycle Search" icon="cogs" className="xl-icon" />
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
                />
              </div>
              <div className="filter-div">
                <div className="label">Cycle Date:</div>
                <TMDatePicker
                  onChange={setSelectedDate}
                  selected={selectedDate}
                  type="filter"
                  showMonthDropdown
                  showYearDropdown
                  isClearable
                />
              </div>
            </div>

          </div>
          {
            getOverlay() ||
            <>
              <div className="usa-grid-full results-dropdown controls-container">

                <div className="cm-heading">
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      createNewAssignmentCycle();
                    }}
                    to="#"
                  >
                    {isSuperUser &&
                      <span>
                        {'Cycle Date Classifications'}
                      </span>
                    }
                  </Link>
                  <div className="cm-new-merge">
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        createNewAssignmentCycle();
                      }}
                      to="#"
                    >
                      {isSuperUser &&
                        <span>
                          <FA className="fa-solid fa-plus" />
                          {' Add New Assignment Cycle'}
                        </span>
                      }
                    </Link>

                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        mergeCycles();
                      }}
                      to="#"
                    >
                      {isSuperUser &&
                        <span>
                          <FA className="fa-solid fa-plus" />
                          {' Merge Assignment Cycles'}
                        </span>
                      }
                    </Link>
                  </div>

                </div>
              </div>
              <div className="cm-lower-section">
                {cycleManagementData$?.map(data => (
                  <CycleSearchCard
                    {...{ ...data, isAO }}
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
