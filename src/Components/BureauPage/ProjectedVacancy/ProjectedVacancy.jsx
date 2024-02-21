import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Picky from 'react-picky';
import FA from 'react-fontawesome';
import PropTypes from 'prop-types';
import { get, sortBy } from 'lodash';
import {
  projectedVacancyEdit, projectedVacancyFetchData, projectedVacancyFilters,
  projectedVacancyLanguageOffsetOptions, saveProjectedVacancySelections,
} from 'actions/projectedVacancy';
import { PUBLISHABLE_POSITIONS_PAGE_SIZES, PUBLISHABLE_POSITIONS_SORT } from 'Constants/Sort';
import { onEditModeSearch, renderSelectionList } from 'utilities';
import Spinner from 'Components/Spinner';
import Alert from 'Components/Alert';
import SelectForm from 'Components/SelectForm';
import ScrollUpButton from 'Components/ScrollUpButton';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import ProjectedVacancyCard from '../../ProjectedVacancyCard/ProjectedVacancyCard';

const ProjectedVacancy = ({ isAO }) => {
  const dispatch = useDispatch();

  const userSelections = useSelector(state => state.projectedVacancySelections);
  const filters = useSelector(state => state.projectedVacancyFilters) ?? [];
  const filtersLoading = useSelector(state => state.projectedVacancyFiltersLoading);
  const languageOffsets = useSelector(state => state.projectedVacancyLanguageOffsetOptions) ?? [];
  const languageOffsetsLoading =
    useSelector(state => state.projectedVacancyLanguageOffsetOptionsLoading);
  const positionsData = useSelector(state => state.projectedVacancy);
  const positionsLoading = useSelector(state => state.projectedVacancyFetchDataLoading);
  const positions = positionsData?.length ? positionsData : [];

  const [includedPositions, setIncludedPositions] = useState([]);
  const [cardsInEditMode, setCardsInEditMode] = useState([]);
  const [clearFilters, setClearFilters] = useState(false);
  const [limit, setLimit] = useState(get(userSelections, 'limit') || PUBLISHABLE_POSITIONS_PAGE_SIZES.defaultSize);
  const [ordering, setOrdering] = useState(get(userSelections, 'ordering') || PUBLISHABLE_POSITIONS_SORT.defaultSort);
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

  useEffect(() => {
    if (positions) {
      setIncludedPositions(positions?.map(k => k.future_vacancy_seq_num));
    }
  }, [positions]);

  const bureaus = sortBy(filters?.bureaus || [], [o => o.description]);
  const grades = sortBy(filters?.grades || [], [o => o.code]);
  const skills = sortBy(filters?.skills || [], [o => o.description]);
  const languages = sortBy(filters?.languages || [], [o => o.description]);
  const bidSeasons = sortBy(filters?.bid_seasons || [], [o => o.description]);
  const organizations = sortBy(filters?.organizations || [], [o => o.description]);
  const statuses = sortBy(filters?.statuses || [], [o => o.description]);

  const pageSizes = PUBLISHABLE_POSITIONS_PAGE_SIZES;
  const sorts = PUBLISHABLE_POSITIONS_SORT;
  const isLoading = filtersLoading || positionsLoading || languageOffsetsLoading;
  const disableSearch = cardsInEditMode?.length > 0;
  const disableInput = isLoading || disableSearch;

  const getQuery = () => ({
    limit,
    ordering,
    bureaus: selectedBureaus?.map(o => o?.code),
    organizations: selectedOrganizations?.map(o => o?.code),
    bidSeasons: selectedBidSeasons?.map(o => o?.code),
    languages: selectedLanguages?.map(o => o?.code),
    grades: selectedGrades?.map(o => o?.code),
    skills: selectedSkills?.map(o => o?.code),
  });

  const resetFilters = () => {
    setSelectedBureaus([]);
    setSelectedOrganizations([]);
    setSelectedGrades([]);
    setSelectedLanguages([]);
    setSelectedSkills([]);
    setSelectedBidSeasons([]);
    setClearFilters(false);
  };

  const getCurrentInputs = () => ({
    selectedBureaus,
    selectedOrganizations,
    selectedGrades,
    selectedLanguages,
    selectedSkills,
    selectedBidSeasons,
  });

  useEffect(() => {
    dispatch(saveProjectedVacancySelections(getCurrentInputs()));
    dispatch(projectedVacancyFilters());
    dispatch(projectedVacancyLanguageOffsetOptions());
  }, []);

  const fetchAndSet = () => {
    const f = [
      selectedBureaus,
      selectedOrganizations,
      selectedGrades,
      selectedLanguages,
      selectedSkills,
      selectedBidSeasons,
    ];
    if (f.flat()?.length === 0) {
      setClearFilters(false);
    } else {
      setClearFilters(true);
    }
    dispatch(projectedVacancyFetchData(getQuery()));
    dispatch(saveProjectedVacancySelections(getCurrentInputs()));
  };

  useEffect(() => {
    fetchAndSet();
  }, [
    limit,
    ordering,
    selectedBureaus,
    selectedOrganizations,
    selectedGrades,
    selectedLanguages,
    selectedSkills,
    selectedBidSeasons,
  ]);

  const pickyProps = {
    numberDisplayed: 2,
    multiple: true,
    includeFilter: true,
    dropdownHeight: 255,
    renderList: renderSelectionList,
    includeSelectAll: true,
  };

  const onIncludedUpdate = (id, include) => {
    if (include) {
      setIncludedPositions([...includedPositions, id]);
    } else {
      setIncludedPositions(includedPositions?.filter(x => x !== id));
    }
  };

  const addToProposedCycle = () => {
    const updatedPvs = positions?.map(p => {
      if (includedPositions.find(o => o === p.future_vacancy_seq_num)) {
        return {
          ...p,
          future_vacancy_exclude_import_indicator: 'N',
        };
      }
      return {
        ...p,
        future_vacancy_exclude_import_indicator: 'Y',
      };
    });
    dispatch(projectedVacancyEdit(updatedPvs));
  };

  return (isLoading ?
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
                labelKey="description"
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
                valueKey="code"
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
          </div>
        </div>
      </div>
      <div className="position-search-controls--results padding-top results-dropdown">
        <SelectForm
          id="projected-vacancy-sort-results"
          options={sorts.options}
          label="Sort by:"
          defaultSort={ordering}
          onSelectOption={value => setOrdering(value.target.value)}
          disabled={disableSearch}
        />
        <SelectForm
          id="projected-vacancy-num-results"
          options={pageSizes.options}
          label="Results:"
          defaultSort={limit}
          onSelectOption={value => setLimit(value.target.value)}
          disabled={disableSearch}
        />
        <ScrollUpButton />
      </div>
      {disableSearch &&
        <Alert
          type="warning"
          title={'Edit Mode (Search Disabled)'}
          customClassName="mb-10"
          messages={[{
            body: 'Discard or save your edits before searching. ' +
              'Filters and Pagination are disabled if any cards are in Edit Mode.',
          }]}
        />
      }
      <div className="usa-width-one-whole position-search--results">
        <div className="proposed-cycle-banner">
          {includedPositions?.length} {includedPositions?.length === 1 ? 'Position' : 'Positions'} Selected
          {isAO &&
            <button
              className="usa-button-secondary"
              onClick={addToProposedCycle}
              disabled={!includedPositions?.length}
            >
              Add to Proposed Cycle
            </button>
          }
        </div>
        <div className="usa-grid-full position-list">
          {positions?.map(k => (
            <ProjectedVacancyCard
              result={k}
              key={k.future_vacancy_seq_num}
              updateIncluded={onIncludedUpdate}
              onEditModeSearch={(editMode, id) =>
                onEditModeSearch(editMode, id, setCardsInEditMode, cardsInEditMode)
              }
              selectOptions={{
                languageOffsets,
                bidSeasons,
                statuses,
              }}
            />
          ))}
        </div>
      </div>
      {/* placeholder for when we put in pagination */}
      {disableSearch &&
        <div className="disable-react-paginate-overlay" />
      }
    </div>
  );
};


ProjectedVacancy.propTypes = {
  bureauFiltersIsLoading: PropTypes.bool,
  isAO: PropTypes.bool.isRequired,
};

ProjectedVacancy.defaultProps = {
  bureauFilters: { filters: [] },
  bureauPositions: { results: [] },
  bureauFiltersIsLoading: false,
  bureauPositionsIsLoading: false,
};

export default ProjectedVacancy;

