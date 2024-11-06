import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Picky from 'react-picky';
import FA from 'react-fontawesome';
import PropTypes from 'prop-types';
import { checkFlag } from 'flags';
import { sortBy } from 'lodash';
import { usePrevious } from 'hooks';
import {
  projectedVacancyEdit,
  projectedVacancyFetchData,
  projectedVacancyFilters,
  saveProjectedVacancySelections,
} from 'actions/projectedVacancy';
import { onEditModeSearch, renderSelectionList, userHasPermissions } from 'utilities';
import { PANEL_MEETINGS_PAGE_SIZES } from 'Constants/Sort';
import Spinner from 'Components/Spinner';
import Alert from 'Components/Alert';
import SelectForm from 'Components/SelectForm';
import TotalResults from 'Components/TotalResults';
import ScrollUpButton from 'Components/ScrollUpButton';
import PaginationWrapper from 'Components/PaginationWrapper';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import ProjectedVacancyCard from '../../ProjectedVacancyCard/ProjectedVacancyCard';

const enableCycleImport = () => checkFlag('flags.projected_vacancy_cycle_import');
const enableEdit = () => checkFlag('flags.projected_vacancy_edit');

// eslint-disable-next-line complexity
const ProjectedVacancy = ({ viewType }) => {
  const dispatch = useDispatch();

  const userProfile = useSelector(state => state.userProfile);
  const isAo = userHasPermissions(['ao_user'], userProfile?.permission_groups);
  const isBureau = userHasPermissions(['bureau_user'], userProfile?.permission_groups);
  const bureauPermissions = useSelector(state => state.userProfile.bureau_permissions);
  // const isBureauView = viewType === 'bureau';

  const userSelections = useSelector(state => state.projectedVacancySelections);
  const filters = useSelector(state => state.projectedVacancyFilters) || [];
  const filtersLoading = useSelector(state => state.projectedVacancyFiltersLoading);
  const filtersErrored = useSelector(state => state.projectedVacancyFiltersErrored);
  const positionsData = useSelector(state => state.projectedVacancy);
  const positionsLoading = useSelector(state => state.projectedVacancyFetchDataLoading);
  const positionsErrored = useSelector(state => state.projectedVacancyFetchDataErrored);

  const [page, setPage] = useState(userSelections?.page || 1);
  const [limit, setLimit] = useState(userSelections?.limit || 5);
  const positions = positionsData?.results?.length ? positionsData?.results : [];
  const prevPage = usePrevious(page);
  const pageSizes = PANEL_MEETINGS_PAGE_SIZES;

  const [importedPositions, setImportedPositions] = useState([]);
  const [cardsInEditMode, setCardsInEditMode] = useState([]);
  const [importInEditMode, setImportInEditMode] = useState(false);
  const [clearFilters, setClearFilters] = useState(false);
  const [selectedBureaus, setSelectedBureaus] =
    useState(userSelections?.selectedBureaus || []);
  const [selectedOrganizations, setSelectedOrganizations] =
    useState(userSelections?.selectedOrganizations || []);
  const [selectedGrades, setSelectedGrades] =
    useState(userSelections?.selectedGrade || []);
  const [selectedSkills, setSelectedSkills] =
    useState(userSelections?.selectedSkills || []);
  const [selectedLanguages, setSelectedLanguages] =
    useState(userSelections?.selectedLanguage || []);
  const [selectedBidSeasons, setSelectedBidSeasons] =
    useState(userSelections?.selectedBidSeasons || []);
  const [selectedCycle, setSelectedCycle] =
    useState(userSelections?.selectedCycle || null);

  const filterSelectionValid = () => {
    // valid if:
    // not Bureau user
    // a Bureau filter selected
    if (viewType === 'bureau') {
      return selectedBureaus.length > 0;
    }
    return true;
  };

  const grades = sortBy(filters?.grades || [], [o => o.code]);
  const skills = sortBy(filters?.skills || [], [o => o.description]);
  const languages = sortBy(filters?.languages || [], [o => o.description]);
  const bidSeasons = sortBy(filters?.bid_seasons || [], [o => o.description]);
  const organizations = sortBy(filters?.organizations || [], [o => o.description]);
  const statuses = sortBy(filters?.statuses || [], [o => o.description]);
  const bureaus = sortBy(bureauPermissions || [], [(b) => b.long_description]);

  const resultsLoading = positionsLoading;
  const resultsErrored = filtersErrored || positionsErrored;
  const disableSearch = cardsInEditMode?.length > 0 || importInEditMode;
  const disableInput = filtersLoading || resultsLoading || disableSearch;

  // TODO: Use real field for cycle import in this function
  const originalImport = positions?.filter(
    p => p.future_vacancy_exclude_import_indicator === 'N',
  )?.map(
    k => k.future_vacancy_seq_num,
  ) || [];

  const getQuery = () => ({
    limit,
    page,
    bureaus: selectedBureaus?.map(o => o?.code),
    organizations: selectedOrganizations?.map(o => o?.short_description),
    bidSeasons: selectedBidSeasons?.map(o => o?.code),
    languages: selectedLanguages?.map(o => o?.code),
    grades: selectedGrades?.map(o => o?.code),
    skills: selectedSkills?.map(o => o?.code),
    cycle: selectedCycle?.code,
  });

  const resetFilters = () => {
    setSelectedBureaus([]);
    setSelectedOrganizations([]);
    setSelectedGrades([]);
    setSelectedLanguages([]);
    setSelectedSkills([]);
    setSelectedBidSeasons([]);
    setSelectedCycle(null);
    setClearFilters(false);
  };

  const getCurrentInputs = () => ({
    limit,
    page,
    selectedBureaus,
    selectedOrganizations,
    selectedGrades,
    selectedLanguages,
    selectedSkills,
    selectedBidSeasons,
    selectedCycle,
  });

  const getOverlay = () => {
    let overlay;
    if (resultsLoading) {
      overlay = <Spinner type="standard-center" class="homepage-position-results" size="big" />;
    } else if (resultsErrored) {
      overlay = <Alert type="error" title="Error displaying Projected Vacancies" messages={[{ body: 'Please try again.' }]} />;
    } else if (!filterSelectionValid()) {
      overlay = <Alert type="info" title="Select Bureau Filter" messages={[{ body: 'Please select a Bureau Filter.' }]} />;
    } else if (!positionsData?.results?.length) {
      overlay = <Alert type="info" title="No results found" messages={[{ body: 'No projected vacancies for filter inputs.' }]} />;
    } else {
      return false;
    }
    return overlay;
  };

  const submitEdit = (editData) => {
    dispatch(projectedVacancyEdit(editData, () => dispatch(projectedVacancyFetchData(getQuery()))));
  };

  useEffect(() => {
    dispatch(saveProjectedVacancySelections(getCurrentInputs()));
    dispatch(projectedVacancyFilters());
  }, []);

  useEffect(() => {
    if (positions.length) {
      setImportedPositions(originalImport);
    }
  }, [positions]);

  useEffect(() => {
    const diffExists = originalImport?.sort().join(',') !== importedPositions?.sort().join(',');
    if (diffExists) {
      setImportInEditMode(true);
    } else {
      setImportInEditMode(false);
    }
  }, [importedPositions]);

  const fetchAndSet = (resetPage = false) => {
    const f = [
      selectedBureaus,
      selectedOrganizations,
      selectedGrades,
      selectedLanguages,
      selectedSkills,
      selectedBidSeasons,
    ];
    if (f.flat()?.length === 0 && !selectedCycle) {
      setClearFilters(false);
    } else {
      setClearFilters(true);
    }
    if (filterSelectionValid()) {
      if (resetPage) {
        setPage(1);
      }
      dispatch(projectedVacancyFetchData(getQuery()));
      dispatch(saveProjectedVacancySelections(getCurrentInputs()));
    }
  };

  useEffect(() => {
    fetchAndSet(false);
  }, [page]);

  useEffect(() => {
    if (prevPage) {
      fetchAndSet(true);
    } else {
      fetchAndSet(false);
    }
  }, [
    limit,
    selectedBureaus,
    selectedOrganizations,
    selectedGrades,
    selectedLanguages,
    selectedSkills,
    selectedBidSeasons,
    selectedCycle,
  ]);

  const pickyProps = {
    numberDisplayed: 2,
    multiple: true,
    includeFilter: true,
    dropdownHeight: 255,
    renderList: renderSelectionList,
    includeSelectAll: true,
  };

  const onImportUpdate = (id, imported) => {
    if (imported) {
      setImportedPositions([...importedPositions, id]);
    } else {
      setImportedPositions(importedPositions?.filter(x => x !== id));
    }
  };

  const addToProposedCycle = () => {
    const updatedPvs = [];
    positions.forEach(p => {
      const imported = importedPositions.find(o => o === p.future_vacancy_seq_num);
      const currentValue = p.future_vacancy_exclude_import_indicator;
      const needsUpdate = (currentValue === 'Y' && imported) || (currentValue === 'N' && !imported);

      if (needsUpdate) {
        const overrideTED = p.fvoverrideteddate;
        updatedPvs.push({
          ...p,
          future_vacancy_override_tour_end_date: overrideTED ?
            new Date(overrideTED).toISOString().substring(0, 10) : null,
          // TODO: Change proposed cycle field
        });
      }
    });
    const editData = { projected_vacancy: updatedPvs };
    dispatch(projectedVacancyEdit(getQuery(), editData)); // swapped out PV Endpoints - this no longer works
  };

  return (filtersLoading ?
    <Spinner type="bureau-filters" size="small" /> :
    <div className="position-search">
      <div className="usa-grid-full position-search--header">
        <ProfileSectionTitle title="Projected Vacancy Management" icon="keyboard-o" className="xl-icon" />
        <div className="results-search-bar pt-20">
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
          <div className="usa-width-one-whole position-search--filters--pv-man results-dropdown">
            <div className="filter-div">
              <div className="label">Bid Season:</div>
              <Picky
                {...pickyProps}
                placeholder="Select Bid Season(s)"
                value={selectedBidSeasons}
                options={bidSeasons}
                onChange={setSelectedBidSeasons}
                valueKey="code"
                labelKey="description"
                disabled={disableInput}
              />
            </div>
            <div className="filter-div">
              <div className="label">Bureau:</div>
              <Picky
                {...pickyProps}
                placeholder="Select Bureau(s)"
                value={selectedBureaus}
                options={bureaus}
                onChange={setSelectedBureaus}
                valueKey="code"
                labelKey="short_description"
                disabled={disableInput}
              />
            </div>
            <div className="filter-div">
              <div className="label">Organization:</div>
              <Picky
                {...pickyProps}
                placeholder="Select Organization(s)"
                value={selectedOrganizations}
                options={organizations}
                onChange={setSelectedOrganizations}
                valueKey="short_description"
                labelKey="description"
                disabled={disableInput}
              />
            </div>
            <div className="filter-div">
              <div className="label">Skills:</div>
              <Picky
                {...pickyProps}
                placeholder="Select Skill(s)"
                value={selectedSkills}
                options={skills}
                onChange={setSelectedSkills}
                valueKey="code"
                labelKey="description"
                disabled={disableInput}
              />
            </div>
            <div className="filter-div">
              <div className="label">Grade:</div>
              <Picky
                {...pickyProps}
                placeholder="Select Grade(s)"
                value={selectedGrades}
                options={grades}
                onChange={setSelectedGrades}
                valueKey="code"
                labelKey="description"
                disabled={disableInput}
              />
            </div>
            <div className="filter-div">
              <div className="label">Language:</div>
              <Picky
                {...pickyProps}
                placeholder="Select Language(s)"
                value={selectedLanguages}
                options={languages}
                onChange={setSelectedLanguages}
                valueKey="code"
                labelKey="description"
                disabled={disableInput}
              />
            </div>
            {enableCycleImport() &&
              <div className="filter-div">
                <div className="label">Cycle:</div>
                <Picky
                  {...pickyProps}
                  multiple={false}
                  placeholder="Select Cycle"
                  value={selectedCycle}
                  options={languages}
                  onChange={setSelectedCycle}
                  valueKey="code"
                  labelKey="description"
                  disabled={disableInput}
                />
              </div>
            }
          </div>
        </div>
      </div>
      {disableSearch &&
        <Alert
          type="warning"
          title="Edit Mode"
          customClassName="mb-10"
          messages={[{
            body: 'Discard or save your edits before searching, marking for include, adding to proposed cycle, or editing other projected vacancies. ' +
              'Filters, "Included" checkboxes, "Import" checkboxes, and other edit buttons are disabled if one card is in Edit Mode.',
          }]}
        />
      }
      {getOverlay() || <>
        <div className="viewing-results-and-dropdown--fullscreen padding-top results-dropdown">
          <TotalResults
            total={positionsData?.count}
            pageNumber={page}
            pageSize={limit}
            suffix="Results"
            isHidden={false}
          />
          <ScrollUpButton />
          <SelectForm
            className="panel-select"
            id="panel-select"
            options={pageSizes.options}
            label="Results:"
            defaultSort={limit}
            onSelectOption={e => setLimit(e.target.value)}
            disabled={disableSearch}
          />
        </div>
        <div className="usa-width-one-whole position-search--results mt-20">
          {enableCycleImport() &&
            <div className="double-action-banner">
              <div className="selected-submission-row import-row">
                <span>
                  {importedPositions?.length} {importedPositions?.length === 1 ? 'Position' : 'Positions'} Selected for Import
                </span>
                {(isAo && importInEditMode) &&
                  <div>
                    <button
                      onClick={() => {
                        setImportInEditMode(false);
                        setImportedPositions(originalImport);
                      }}
                      disabled={!importedPositions?.length}
                    >
                      Cancel
                    </button>
                    <button
                      className="usa-button-secondary"
                      onClick={addToProposedCycle}
                      disabled={!importedPositions?.length}
                    >
                      Add to Proposed Cycle
                    </button>
                  </div>
                }
              </div>
            </div>
          }
          <div className="usa-grid-full position-list">
            {positions?.map(k => (
              <ProjectedVacancyCard
                key={k.future_vacancy_seq_num}
                result={k}
                updateImport={onImportUpdate}
                disableImport={cardsInEditMode?.length > 0 || !isAo || !selectedCycle || !enableEdit}
                disableEdit={importInEditMode || disableSearch || !enableEdit || !isBureau}
                isBureau={isBureau}
                onEditModeSearch={(editMode, id) =>
                  onEditModeSearch(editMode, id, setCardsInEditMode, cardsInEditMode)
                }
                onSubmit={editData => submitEdit(editData)}
                selectOptions={{
                  bidSeasons,
                  statuses,
                }}
              />
            ))}
          </div>
          <div className="usa-grid-full react-paginate">
            <PaginationWrapper
              pageSize={limit}
              onPageChange={(p) => setPage(p.page)}
              forcePage={page}
              totalResults={positionsData?.count}
            />
          </div>
        </div>
      </>}
    </div>
  );
};


ProjectedVacancy.propTypes = {
  viewType: PropTypes.string.isRequired,
  bureauFiltersIsLoading: PropTypes.bool,
};

ProjectedVacancy.defaultProps = {
  bureauFilters: { filters: [] },
  bureauPositions: { results: [] },
  bureauFiltersIsLoading: false,
  bureauPositionsIsLoading: false,
};

export default ProjectedVacancy;

