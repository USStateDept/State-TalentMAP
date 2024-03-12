import { useEffect, useState } from 'react';
import Picky from 'react-picky';
import FA from 'react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { onEditModeSearch, renderSelectionList } from 'utilities';
import { entryLevelFetchData, entryLevelFiltersFetchData, saveEntryLevelSelections } from 'actions/entryLevel';
import Alert from 'Components/Alert';
import Spinner from 'Components/Spinner';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import EntryLevelCard from './EntryLevelCard';
import CheckBox from '../../CheckBox/CheckBox';

const ManageEntryLevel = () => {
  const dispatch = useDispatch();

  const userSelections = useSelector(state => state.entryLevelSelections);

  const elPositionsList = useSelector(state => state.entryLevelPositions);
  const elPositionsIsLoading = useSelector(state => state.entryLevelFetchDataLoading);
  const elFiltersIsLoading = useSelector(state => state.entryLevelFiltersFetchDataLoading);

  const [cardsInEditMode, setCardsInEditMode] = useState([]);

  const [selectedTps, setSelectedTps] = useState(userSelections?.selectedTps || []);
  const [selectedBureaus, setSelectedBureaus] = useState(userSelections?.selectedBureaus || []);
  const [selectedOrgs, setSelectedOrgs] = useState(userSelections?.selectedOrgs || []);
  const [selectedGrades, setSelectedGrades] = useState(userSelections?.selectedGrade || []);
  const [selectedSkills, setSelectedSkills] = useState(userSelections?.selectedSkills || []);
  const [selectedJobs, setSelectedJobs] = useState(userSelections?.selectedJobs || []);
  const [selectedLanguages, setSelectedLanguages] =
    useState(userSelections?.selectedLanguage || []);
  const [overseas, setOverseas] = useState(userSelections?.overseas || false);
  const [domestic, setDomestic] = useState(userSelections?.domestic || false);
  const [clearFilters, setClearFilters] = useState(false);

  const elFiltersList = useSelector(state => state.entryLevelFilters);
  const tpFilters = elFiltersList?.tpFilters;
  const bureauFilters = elFiltersList?.bureauFilters;
  const orgFilters = elFiltersList?.orgFilters;
  const gradeFilters = elFiltersList?.gradeFilters;
  const skillsFilters = elFiltersList?.skillsFilters;
  const jcFilters = elFiltersList?.jcFilters;
  const languageFilters = elFiltersList?.languageFilters;

  const isLoading = elPositionsIsLoading || elFiltersIsLoading;
  const disableSearch = cardsInEditMode.length > 0;
  const disableInput = isLoading || disableSearch;

  const getQuery = () => ({
    'el-tps': selectedTps.map(tpObject => (tpObject?.code)),
    'el-bureaus': selectedBureaus.map(bureauObject => (bureauObject?.code)),
    'el-orgs': selectedOrgs.map(orgObject => (orgObject?.code)),
    'el-grades': selectedGrades.map(gradeObject => (gradeObject?.code)),
    'el-skills': selectedSkills.map(skillObject => (skillObject?.code)),
    'el-jobs': selectedJobs.map(jobObject => (jobObject?.code)),
    'el-language': selectedLanguages.map(langObject => (langObject?.code)),
  });

  const resetFilters = () => {
    setSelectedTps([]);
    setSelectedBureaus([]);
    setSelectedOrgs([]);
    setSelectedGrades([]);
    setSelectedSkills([]);
    setSelectedJobs([]);
    setSelectedLanguages([]);
    setOverseas(false);
    setDomestic(false);
    setClearFilters(false);
  };

  const getCurrentInputs = () => ({
    selectedTps,
    selectedBureaus,
    selectedOrgs,
    selectedGrade: selectedGrades,
    selectedSkills,
    selectedJobs,
    selectedLanguage: selectedLanguages,
    overseas,
    domestic,
  });

  useEffect(() => {
    // dispatch(saveEntryLevelSelections(getCurrentInputs()));
    dispatch(entryLevelFiltersFetchData());
    dispatch(entryLevelFetchData());
  }, []);

  const fetchAndSet = () => {
    const filters = [
      selectedTps,
      selectedBureaus,
      selectedOrgs,
      selectedGrades,
      selectedSkills,
      selectedJobs,
      selectedLanguages,
      overseas,
      domestic,
    ];
    if (filters.flat().length === 0) {
      setClearFilters(false);
    } else {
      setClearFilters(true);
    }
    dispatch(entryLevelFetchData(getQuery()));
    dispatch(saveEntryLevelSelections(getCurrentInputs()));
  };

  useEffect(() => {
    fetchAndSet();
  }, [
    selectedTps,
    selectedBureaus,
    selectedOrgs,
    selectedGrades,
    selectedSkills,
    selectedJobs,
    selectedLanguages,
    overseas,
    domestic,
  ]);

  const pickyProps = {
    numberDisplayed: 2,
    multiple: true,
    includeFilter: true,
    dropdownHeight: 255,
    renderList: renderSelectionList,
    includeSelectAll: true,
  };

  return (
    <div className="position-search">
      <div className="usa-grid-full position-search--header">
        <ProfileSectionTitle title="Manage Entry Level" icon="keyboard-o" className="xl-icon" />
        {elFiltersIsLoading ?
          <Spinner type="manage-el-filters" size="small" /> :
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
            <div className="usa-width-one-whole position-search--filters--el results-dropdown">
              <div className="filter-div">
                <div className="label">TP:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select TP(s)"
                  value={selectedTps}
                  options={tpFilters}
                  onChange={setSelectedTps}
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
                  options={bureauFilters}
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
                  value={selectedOrgs}
                  options={orgFilters}
                  onChange={setSelectedOrgs}
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
                  options={gradeFilters}
                  onChange={setSelectedGrades}
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
                  options={skillsFilters}
                  onChange={setSelectedSkills}
                  valueKey="code"
                  labelKey="custom_description"
                  disabled={disableInput}
                />
              </div>
              <div className="filter-div">
                <div className="label">Job Categories:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Job Categories(s)"
                  value={selectedJobs}
                  options={jcFilters}
                  onChange={setSelectedJobs}
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
                  options={languageFilters}
                  onChange={setSelectedLanguages}
                  valueKey="code"
                  labelKey="description"
                  disabled={disableInput}
                />
              </div>
              <div className="filter-div">
                <CheckBox
                  id="overseas"
                  label="Overseas"
                  value={overseas}
                  onChange={setOverseas}
                  disabled={disableInput}
                />
              </div>
              <div className="filter-div">
                <CheckBox
                  id="domestic"
                  label="Domestic"
                  value={domestic}
                  onChange={setDomestic}
                  disabled={disableInput}
                />
              </div>
            </div>
          </div>
        }
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
      {elFiltersIsLoading && !isLoading ?
        <Spinner type="tm-spinner-manage-el-positions" size="small" /> :
        <div className="usa-width-one-whole position-search--results">
          <div className="usa-grid-full position-list">
            {
              elPositionsList?.map((pos, i) => (
                <EntryLevelCard
                  id={i}
                  // key={i}
                  result={pos}
                  appendAdditionalFieldsToBodyPrimary={false}
                  onEditModeSearch={(editMode, id) =>
                    onEditModeSearch(editMode, id, setCardsInEditMode, cardsInEditMode)
                  }
                />
              ))}
          </div>
        </div>
      }
      {disableSearch &&
        <div className="disable-react-paginate-overlay" />
      }
    </div>
  );
};


ManageEntryLevel.propTypes = {
  bureauFiltersIsLoading: PropTypes.bool,
};

ManageEntryLevel.defaultProps = {
  bureauFilters: { filters: [] },
  bureauPositions: { results: [] },
  bureauFiltersIsLoading: false,
  bureauPositionsIsLoading: false,
};

export default ManageEntryLevel;
