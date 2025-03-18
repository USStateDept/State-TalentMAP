import { withRouter } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FA from 'react-fontawesome';
import { Picky } from 'react-picky';
import { Link } from 'react-router-dom';
import { checkFlag } from 'flags';
import PropTypes from 'prop-types';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import Spinner from 'Components/Spinner';
import CyclePositionCard from 'Components/CyclePositionCard';
import Alert from 'Components/Alert';
import BackButton from 'Components/BackButton';
import PositionManagerSearch from 'Components/BureauPage/PositionManager/PositionManagerSearch';
import { formatDate, renderSelectionList } from 'utilities';
import {
  cycleManagementAssignmentCycleFetchData,
  cyclePositionEditSuccess,
  cyclePositionFiltersFetchData,
  cyclePositionGetPosition,
  cyclePositionSearchFetchData,
  saveCyclePositionSearchSelections,
} from 'actions/cycleManagement';

const hideBreadcrumbs = checkFlag('flags.breadcrumbs');

const CyclePositionSearch = ({ location, viewType }) => {
  const dispatch = useDispatch();
  const searchPosNumRef = useRef();

  const activeTab = location.state?.activeTab || 'INFORMATION';
  const cycleIDs = location.state?.cycleIDs || [];
  const cycles = location.state?.cycles || [];
  const numCycles = cycles.length;

  const assignmentCycle = useSelector(state => state.cycleManagementAssignmentCycle);
  const loadedCycle = assignmentCycle ?? {};

  const cyclePosFilters = useSelector(state => state.cyclePositionsFilters);
  const cyclePosFiltersLoading = useSelector(state => state.cyclePositionFiltersIsLoading);

  const cyclePositionsError = useSelector(state => state.cyclePositionSearchFetchDataErrored);
  const cyclePositionsLoading = useSelector(state => state.cyclePositionSearchFetchDataLoading);
  const cyclePositions = useSelector(state => state.cyclePositionSearch);
  const positionsByCycle = cycles.map((cycle) => {
    const filteredPositions = cyclePositions.filter((pos) => pos.bid_cycle === cycle.name);
    return {
      ...cycle,
      positions: filteredPositions,
    };
  });
  const bureauPermissions = useSelector(state => state.userProfile.bureau_permissions);
  const orgPermissions = useSelector(state => state.userProfile.org_permissions);
  const userSelections = useSelector(state => state.cyclePositionSearchSelections);

  const extraPositionDataLoading = useSelector(state => state.cyclePositionFetchDataLoading);
  const extraPositionDataError = useSelector(state => state.cyclePositionFetchDataErrored);
  const extraPositionData = useSelector(state => state.cyclePositionFetch);
  const cyclePositionEditWasSuccessful = useSelector(state => state.cyclePositionEditSuccess);

  const cycleStatus = (loadedCycle?.cycle_status && loadedCycle?.cycle_status_reference)
    ? loadedCycle?.cycle_status_reference?.find(x => x?.value === loadedCycle?.cycle_status)?.label : 'Not Listed';
  const cycleStartDate = formatDate(loadedCycle?.dates_mapping?.CYCLE?.begin_date, 'M/D/YYYY');
  const cycleEndDate = formatDate(loadedCycle?.dates_mapping?.CYCLE?.end_date, 'M/D/YYYY');

  const [selectedStatuses, setSelectedStatuses] = useState(userSelections?.selectedStatuses || []);
  const [selectedBureaus, setSelectedBureaus] = useState(userSelections?.selectedBureaus || []);
  const [selectedOrgs, setSelectedOrgs] = useState(userSelections?.selectedOrgs || []);
  const [selectedGrades, setSelectedGrades] = useState(userSelections?.selectedGrades || []);
  const [selectedSkills, setSelectedSkills] = useState(userSelections?.selectedSkills || []);
  const [selectedLanguages, setSelectedLanguages] = useState(userSelections?.selectedLanguages || []);
  const [tempPosNumberText, setTempPosNumberText] = useState('');
  const [posNumberText, setPosNumberText] = useState('');
  const [clearFilters, setClearFilters] = useState(false);

  const filters = [
    selectedStatuses,
    selectedOrgs,
    selectedGrades,
    selectedSkills,
    selectedLanguages,
  ];
  const noFiltersSelected = filters.flat().length === 0 && posNumberText === '';
  const atLeastTwoFiltersSelected = filters.filter(f => f.length > 0).length + (posNumberText !== '' ? 1 : 0) >= 2;

  const [cardsInEditMode, setCardsInEditMode] = useState([]);
  const disableSearch = cardsInEditMode.length > 0;

  // Filter Options
  const statusOptions = cyclePosFilters?.statusFilter || [];
  const bureauOptions = viewType === 'bureau' ? cyclePosFilters?.bureauFilter?.filter((filter) => bureauPermissions.some((permission) => permission.short_description === filter.code)) || [] : cyclePosFilters?.bureauFilter;
  const orgOptions = viewType === 'post' ? cyclePosFilters?.orgFilter?.filter((filter) => orgPermissions.some((permission) => permission.short_description === filter.code)) || [] : cyclePosFilters?.orgFilter;
  const gradeOptions = cyclePosFilters?.gradeFilter || [];
  const skillOptions = cyclePosFilters?.skillsFilter || [];
  const languageOptions = cyclePosFilters?.languageFilter || [];

  const resetFilters = () => {
    setSelectedStatuses([]);
    setSelectedOrgs([]);
    setSelectedGrades([]);
    setSelectedSkills([]);
    setSelectedLanguages([]);
    setTempPosNumberText('');
    setPosNumberText('');
    searchPosNumRef.current.clearText();
    setClearFilters(false);
  };

  const getCurrentInputs = () => ({
    cycleId: cycleIDs,
    statuses: selectedStatuses.map(f => (f?.code)),
    orgs: selectedOrgs.map(f => (f?.code)),
    grades: selectedGrades.map(f => (f?.code)),
    skills: selectedSkills.map(f => (f?.code)),
    languages: selectedLanguages.map(f => (f?.code)),
    positionNumber: posNumberText,
    ...(viewType !== 'post' && {
      bureaus: selectedBureaus.map(b => b.code),
    }),
  });

  useEffect(() => {
    if (numCycles === 1) {
      dispatch(cycleManagementAssignmentCycleFetchData(cycleIDs));
    }
    dispatch(cyclePositionFiltersFetchData());
  }, []);

  useEffect(() => {
    if (cyclePositionEditWasSuccessful) {
      setCardsInEditMode([]);
      dispatch(cyclePositionEditSuccess(false));
      dispatch(cyclePositionSearchFetchData(getCurrentInputs()));
    }
  }, [cyclePositionEditWasSuccessful]);

  const onCyclePositionEditModeSearch = (editMode, id) => {
    if (editMode) {
      setCardsInEditMode([id]);
      dispatch(cyclePositionGetPosition(id));
    } else {
      setCardsInEditMode(cardsInEditMode.filter(x => x !== id));
    }
  };

  useEffect(() => {
    setClearFilters(!noFiltersSelected);
    dispatch(saveCyclePositionSearchSelections(getCurrentInputs()));
    if (atLeastTwoFiltersSelected) {
      dispatch(cyclePositionSearchFetchData(getCurrentInputs()));
    }
  }, [
    selectedStatuses,
    selectedOrgs,
    selectedGrades,
    selectedSkills,
    selectedLanguages,
    posNumberText,
  ]);

  useEffect(() => {
    if (tempPosNumberText === '' && posNumberText !== '') {
      setPosNumberText('');
    }
  }, [tempPosNumberText]);

  const noResults = cyclePositions?.length === 0;

  // Overlay for error, info, and loading state
  const getOverlay = () => {
    let overlay;
    if (cyclePositionsLoading) {
      overlay = <Spinner type="bureau-results" class="homepage-position-results" size="big" />;
    } else if (noFiltersSelected || !atLeastTwoFiltersSelected) {
      overlay = <Alert type="info" title="Select Filter" messages={[{ body: 'Please select at least two distinct filters to search.' }]} />;
    } else if (cyclePositionsError) {
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
  };

  return (
    cyclePosFiltersLoading ? <Spinner type="bureau-filters" size="small" />
      : (
        <div className="cycle-management-page position-search">
          <div className="position-search--header">
            <BackButton />
            <ProfileSectionTitle title="Cycle Management Positions" icon="cogs" className="xl-icon" />
            <div className="expanded-content search-bar-container">
              <div className="filterby-container">
                <div className="filterby-label">Filter by:</div>
                <div className="filterby-clear">
                  {clearFilters &&
                    <button
                      type="button"
                      className="unstyled-button"
                      onClick={resetFilters}
                      disabled={disableSearch}
                    >
                      <FA name="times" />
                        Clear Filters
                    </button>
                  }
                </div>
              </div>
              <div className="position-search--filters--cm-pos">
                <div className="filter-div">
                  <div className="label">Position Number:</div>
                  <div className="filter-search-bar fsb-240">
                    <PositionManagerSearch
                      id="pos-num-search"
                      submitSearch={(e) => { setPosNumberText(e); }}
                      onChange={setTempPosNumberText}
                      ref={searchPosNumRef}
                      textSearch={tempPosNumberText}
                      placeHolder="Search by Position Number"
                      noButton
                      showIcon={false}
                      disableSearch={disableSearch}
                    />
                  </div>
                </div>
                <div className="filter-div">
                  <div className="label">Status:</div>
                  <Picky
                    {...pickyProps}
                    placeholder="Select Status(es)"
                    value={selectedStatuses}
                    options={statusOptions}
                    onChange={setSelectedStatuses}
                    valueKey="description"
                    labelKey="description"
                    disabled={disableSearch}
                  />
                </div>
                <div className="filter-div">
                  <div className="label">Grade:</div>
                  <Picky
                    {...pickyProps}
                    placeholder="Select Grade(s)"
                    options={gradeOptions}
                    valueKey="code"
                    labelKey="description"
                    onChange={setSelectedGrades}
                    value={selectedGrades}
                    disabled={disableSearch}
                  />
                </div>
                {viewType !== 'post' &&
                  <div className="filter-div">
                    <div className="label">Bureau:</div>
                    <Picky
                      {...pickyProps}
                      placeholder="Select Bureau(s)"
                      options={bureauOptions}
                      valueKey={viewType === 'bureau' ? 'long_description' : 'code'}
                      labelKey={viewType === 'bureau' ? 'long_description' : 'code'}
                      onChange={setSelectedBureaus}
                      value={selectedBureaus}
                      disabled={disableSearch}
                    />
                  </div>
                }
                {viewType !== 'bureau' &&
                  <div className="filter-div">
                    <div className="label">Organization:</div>
                    <Picky
                      {...pickyProps}
                      placeholder="Select Organization(s)"
                      options={orgOptions}
                      valueKey="code"
                      labelKey="description"
                      onChange={setSelectedOrgs}
                      value={selectedOrgs}
                      disabled={disableSearch}
                    />
                  </div>
                }
                <div className="filter-div">
                  <div className="label">Skills:</div>
                  <Picky
                    {...pickyProps}
                    placeholder="Select Skill(s)"
                    options={skillOptions}
                    valueKey="code"
                    labelKey="description"
                    onChange={setSelectedSkills}
                    value={selectedSkills}
                    disabled={disableSearch}
                  />
                </div>
                <div className="filter-div">
                  <div className="label">Language:</div>
                  <Picky
                    {...pickyProps}
                    placeholder="Select Language(s)"
                    options={languageOptions}
                    valueKey="code"
                    labelKey="short_description"
                    onChange={setSelectedLanguages}
                    value={selectedLanguages}
                    disabled={disableSearch}
                  />
                </div>
              </div>
            </div>
          </div>
          {
            disableSearch
            && (
              <Alert
                type="warning"
                title="Edit Mode (Search Disabled)"
                messages={[{
                  body: 'Discard or save your edits before searching. '
                    + 'Filters are disabled if any cards are in Edit Mode.',
                },
                ]}
              />
            )
          }
          <div className="cps-content">
            {!hideBreadcrumbs
              && (
                <div className="breadcrumb-container">
                  <Link to={`/profile/${viewType}/cyclemanagement`} className="breadcrumb-active">
                    Cycle Search Results
                  </Link>
                  <span className="breadcrumb-arrow">&gt;</span>
                  {numCycles > 1
                    ? <span>Multiple Cycles Selected</span>
                    : <span>{loadedCycle?.cycle_name ?? ''}</span>}
                </div>
              )}
            {numCycles === 1
              && (
                <>
                  <div className="cps-header">
                    {loadedCycle?.cycle_name ?? 'Error Loading Cycle'}
                  </div>
                  <div className="cps-subheader">
                    <div className="cycle-dates">{`Cycle Status: ${cycleStatus}`}</div>
                    <div className="cycle-dates">{`Cycle Start: ${cycleStartDate}`}</div>
                    <div className="cycle-dates">{`Bid Due: ${cycleEndDate}`}</div>
                  </div>
                </>
              )}
            {getOverlay()
              || (
                <div className="cps-lower-section">
                  {numCycles > 1 ? (
                    positionsByCycle?.map(cycle => (
                      <div key={cycle.id} className="cps-cycle-section">
                        <div className="cps-cycle-header">
                          {cycle.name}
                        </div>
                        <div className="cps-cycle-positions">
                          {cycle.positions?.map(position => (
                            <CyclePositionCard
                              data={position}
                              key={position.id}
                              onEditModeSearch={(editMode, id) => onCyclePositionEditModeSearch(editMode, id)}
                              isOpen={cardsInEditMode?.includes(position?.id)}
                              editableInfo={extraPositionData}
                              editableInfoLoading={extraPositionDataLoading}
                              editableInfoError={extraPositionDataError}
                              isAO
                              initialActiveTab={activeTab}
                            />
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    cyclePositions?.map(data => (
                      <CyclePositionCard
                        data={data}
                        key={data.id}
                        onEditModeSearch={(editMode, id) => onCyclePositionEditModeSearch(editMode, id)}
                        isOpen={cardsInEditMode?.includes(data?.id)}
                        editableInfo={extraPositionData}
                        editableInfoLoading={extraPositionDataLoading}
                        editableInfoError={extraPositionDataError}
                        isAO
                        initialActiveTab={activeTab}
                      />
                    ))
                  )}
                </div>
              )}
          </div>
        </div>
      )
  );
};

CyclePositionSearch.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
    state: PropTypes.shape({
      cycleIDs: PropTypes.arrayOf(PropTypes.string),
      cycles: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })),
      activeTab: PropTypes.string,
    }),
  }).isRequired,
  viewType: PropTypes.string.isRequired,
};

export default withRouter(CyclePositionSearch);
