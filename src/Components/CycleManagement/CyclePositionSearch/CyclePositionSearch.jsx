import { withRouter } from 'react-router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FA from 'react-fontawesome';
import Picky from 'react-picky';
import { Link } from 'react-router-dom';
import { checkFlag } from 'flags';
import PropTypes from 'prop-types';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import Spinner from 'Components/Spinner';
import CyclePositionCard from 'Components/CyclePositionCard';
import Alert from 'Components/Alert';
import { formatDate, onEditModeSearch, renderSelectionList } from 'utilities';
import {
  cycleManagementAssignmentCycleFetchData,
  cyclePositionSearchFetchData,
  cyclePositionsFiltersFetchData,
  saveCyclePositionSearchSelections,
} from 'actions/cycleManagement';

const hideBreadcrumbs = checkFlag('flags.breadcrumbs');

const CyclePositionSearch = ({ isAO, match }) => {
  const dispatch = useDispatch();
  const breadcrumbLinkRole = isAO ? 'ao' : 'bureau';

  const cycleId = match?.params?.id ?? false;

  const assignmentCycle = useSelector(state => state.cycleManagementAssignmentCycle);
  const loadedCycle = assignmentCycle ?? {};

  const cyclePosFilters = useSelector(state => state.cyclePositionsFilters);
  const cyclePosFiltersLoading = useSelector(state => state.cyclePositionsFiltersLoading);

  const cyclePositionsError = useSelector(state => state.cyclePositionSearchFetchDataErrored);
  const cyclePositionsLoading = useSelector(state => state.cyclePositionSearchFetchDataLoading);
  const cyclePositions = useSelector(state => state.cyclePositionSearch);
  const userSelections = useSelector(state => state.cyclePositionSearchSelections);

  const cycleStatus = loadedCycle?.cycle_status?.label || '';
  const cycleStartDate = formatDate(loadedCycle?.dates_mapping?.CYCLE?.begin_date, 'M/D/YYYY');
  const cycleEndDate = formatDate(loadedCycle?.dates_mapping?.CYCLE?.end_date, 'M/D/YYYY');


  const [selectedBureaus, setSelectedBureaus] = useState(userSelections?.selectedBureaus || []);
  const [selectedOrgs, setSelectedOrgs] = useState(userSelections?.selectedOrgs || []);
  const [selectedGrades, setSelectedGrades] = useState(userSelections?.selectedGrades || []);
  const [selectedSkills, setSelectedSkills] = useState(userSelections?.selectedSkills || []);
  const [clearFilters, setClearFilters] = useState(false);

  const [cardsInEditMode, setCardsInEditMode] = useState([]);
  const disableSearch = cardsInEditMode.length > 0;

  // Filter Options
  const bureauOptions = cyclePosFilters?.bureauFilters || [];
  const orgOptions = cyclePosFilters?.orgFilters || [];
  const gradeOptions = cyclePosFilters?.gradeFilters || [];
  const skillOptions = cyclePosFilters?.skillsFilters || [];


  useEffect(() => {
    dispatch(cycleManagementAssignmentCycleFetchData(cycleId));
    dispatch(cyclePositionsFiltersFetchData());
  }, []);


  const resetFilters = () => {
    setSelectedBureaus([]);
    setSelectedOrgs([]);
    setSelectedGrades([]);
    setSelectedSkills([]);
    setClearFilters(false);
  };

  const getCurrentInputs = () => ({
    cycleId,
    selectedBureaus,
    selectedOrgs,
    selectedGrades,
    selectedSkills,
  });


  const noFiltersSelected = [
    selectedBureaus,
    selectedOrgs,
    selectedGrades,
    selectedSkills,
  ].flat().length === 0;

  useEffect(() => {
    dispatch(saveCyclePositionSearchSelections(getCurrentInputs()));
    if (noFiltersSelected) {
      setClearFilters(false);
    } else {
      dispatch(cyclePositionSearchFetchData(getCurrentInputs()));
      setClearFilters(true);
    }
  }, [
    selectedBureaus,
    selectedOrgs,
    selectedGrades,
    selectedSkills,
  ]);


  // Overlay for error, info, and loading state
  const noResults = cyclePositions?.results?.length === 0;
  const getOverlay = () => {
    let overlay;
    if (cyclePositionsLoading) {
      overlay = <Spinner type="bureau-results" class="homepage-position-results" size="big" />;
    } else if (noFiltersSelected) {
      overlay = <Alert type="info" title="Select Filters" messages={[{ body: 'Please select at least one distinct filter to search.' }]} />;
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
    includeSelectAll: true,
  };

  return (
    cyclePosFiltersLoading ? <Spinner type="bureau-filters" size="small" /> :
      (
        <div className="cycle-management-page position-search">
          <div className="position-search--header">
            <ProfileSectionTitle title="Cycle Management Positions" icon="cogs" className="xl-icon" />

            <div className="expanded-content pt-20">
              <div className="filterby-container">
                <div className="filterby-label">Filter by:</div>
                <div className="filterby-clear">
                  {clearFilters &&
                    <button
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
                  <div className="label">Bureau:</div>
                  <Picky
                    {...pickyProps}
                    placeholder="Select Bureau(s)"
                    value={selectedBureaus}
                    options={bureauOptions}
                    onChange={setSelectedBureaus}
                    valueKey="description"
                    labelKey="description"
                    disabled={disableSearch}
                  />
                </div>
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
              </div>
            </div>

          </div>
          {
            disableSearch &&
            <Alert
              type="warning"
              title={'Edit Mode (Search Disabled)'}
              messages={[{
                body: 'Discard or save your edits before searching. ' +
                  'Filters and Pagination are disabled if any cards are in Edit Mode.',
              },
              ]}
            />
          }
          <div className="cps-content">
            { !hideBreadcrumbs &&
              <div className="breadcrumb-container">
                <Link to={`/profile/${breadcrumbLinkRole}/cyclemanagement`} className="breadcrumb-active">
                  Cycle Search Results
                </Link>
                <span className="breadcrumb-arrow">&gt;</span>
                <span>{loadedCycle?.cycle_name ?? ''}</span>
              </div>
            }
            <div className="cps-header">
              {loadedCycle?.cycle_name ?? 'Error Loading Cycle'}
            </div>
            <div className="cps-subheader">
              <div className="cycle-dates">{`Cycle Status: ${cycleStatus}`}</div>
              <div className="cycle-dates">{`Cycle Start: ${cycleStartDate}`}</div>
              <div className="cycle-dates">{`Bid Due: ${cycleEndDate}`}</div>
            </div>
            {
              getOverlay() ||
            <>
              <div className="cps-lower-section">
                {cyclePositions?.map(data =>
                  (
                    <CyclePositionCard
                      data={data}
                      onEditModeSearch={(editMode, id) =>
                        onEditModeSearch(editMode, id, setCardsInEditMode, cardsInEditMode)}
                      cycle={loadedCycle}
                      isAO
                    />
                  ))}
              </div>
            </>
            }
          </div>
        </div>
      )
  );
};

CyclePositionSearch.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  isAO: PropTypes.bool,
};

CyclePositionSearch.defaultProps = {
  match: {},
  isAO: false,
};

export default withRouter(CyclePositionSearch);
