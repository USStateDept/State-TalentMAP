import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FA from 'react-fontawesome';
import Picky from 'react-picky';
import { entryLevelFetchData, entryLevelFiltersFetchData, saveEntryLevelSelections } from 'actions/entryLevel';
import { renderSelectionList } from 'utilities';
import PositionManagerSearch from 'Components/BureauPage/PositionManager/PositionManagerSearch';
import ProfileSectionTitle from 'Components/ProfileSectionTitle';
import CheckBox from 'Components/CheckBox';
import ExportButton from 'Components/ExportButton';
import MaintainELPositionsTable from 'Components/EntryLevelPage/MaintainELPositionsTable';
import SelectForm from 'Components/SelectForm';
import PaginationWrapper from 'Components/PaginationWrapper';
import { filter, flatten, isEmpty } from 'lodash';
import { POSITION_PAGE_SIZES } from 'Constants/Sort';
import Spinner from 'Components/Spinner';
import Alert from 'Components/Alert';
import TotalResults from '../../TotalResults';

const MaintainEntryLevelPositions = () => {
  const dispatch = useDispatch();
  const textSearchRef = useRef();
  const tableRef = useRef(null);

  const userSelections = useSelector(state => state.entryLevelSelections);
  const [page, setPage] = useState(userSelections.page || 1);
  const [limit, setLimit] = useState(userSelections.limit || 10);
  const [selectedTps, setSelectedTps] = useState(userSelections?.selectedTps || []);
  const [selectedBureaus, setSelectedBureaus] = useState(userSelections?.selectedBureaus || []);
  const [selectedOrgs, setSelectedOrgs] = useState(userSelections?.selectedOrgs || []);
  const [selectedGrades, setSelectedGrades] = useState(userSelections?.selectedGrades || []);
  const [selectedSkills, setSelectedSkills] = useState(userSelections?.selectedSkills || []);
  const [selectedJobs, setSelectedJobs] = useState(userSelections?.selectedJobs || []);
  const [selectedLanguages, setSelectedLanguages] = useState(userSelections?.selectedLanguages || []);
  const [overseas, setOverseas] = useState(userSelections?.overseas || false);
  const [domestic, setDomestic] = useState(userSelections?.domestic || false);
  const [textSearch, setTextSearch] = useState('');
  const [clearFilters, setClearFilters] = useState(false);

  const elFiltersHasErrored = useSelector(state => state.entryLevelFiltersFetchDataErrored);
  const elFiltersIsLoading = useSelector(state => state.entryLevelFiltersFetchDataLoading);
  const elFiltersList = useSelector(state => state.entryLevelFilters);
  const tpFilters = elFiltersList?.tpFilters;
  const bureauFilters = elFiltersList?.bureauFilters;
  const orgFilters = elFiltersList?.orgFilters;
  const gradeFilters = elFiltersList?.gradeFilters;
  const skillsFilters = elFiltersList?.skillsFilters;
  const jcFilters = elFiltersList?.jcFilters;
  const languageFilters = elFiltersList?.languageFilters;

  const elPositionsHasErrored = useSelector(state => state.entryLevelFetchDataErrored);
  const elPositionsIsLoading = useSelector(state => state.entryLevelFetchDataLoading);
  const elPositions = useSelector(state => state.entryLevelPositions.results);
  const count = useSelector(state => state.entryLevelPositions.count);
  const [exportIsLoading, setExportIsLoading] = useState(false);

  const getCurrentInputs = () => ({
    selectedTps,
    selectedBureaus,
    selectedOrgs,
    selectedGrades,
    selectedSkills,
    selectedJobs,
    selectedLanguages,
    overseas,
    domestic,
  });

  const getQuery = () => ({
    page,
    limit,
    text: textSearch,
    'el-tps': selectedTps.map(tpObject => (tpObject?.code)),
    'el-bureaus': selectedBureaus.map(bureauObject => (bureauObject?.code)),
    'el-orgs': selectedOrgs.map(orgObject => (orgObject?.code)),
    'el-grades': selectedGrades.map(gradeObject => (gradeObject?.code)),
    'el-skills': selectedSkills.map(skillObject => (skillObject?.code)),
    'el-jobs': selectedJobs.map(jobObject => (jobObject?.code)),
    'el-language': selectedLanguages.map(langObject => (langObject?.code)),
    'el-overseas': overseas,
    'el-domestic': domestic,
  });

  const fetchAndSet = (resetPage = false) => {
    const filters = [
      selectedTps,
      selectedBureaus,
      selectedOrgs,
      selectedGrades,
      selectedSkills,
      selectedJobs,
      selectedLanguages,
    ];
    if (isEmpty(filter(flatten(filters))) && !overseas && !domestic && isEmpty(textSearch)) {
      setClearFilters(false);
    } else {
      setClearFilters(true);
    }
    if (resetPage) {
      setPage(1);
    }
    dispatch(saveEntryLevelSelections(getCurrentInputs()));
    dispatch(entryLevelFetchData(getQuery()));
  };

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
    setTextSearch('');
    textSearchRef.current.clearText();
    setClearFilters(false);
  };

  useEffect(() => {
    fetchAndSet(true);
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
    textSearch,
    limit,
  ]);

  useEffect(() => {
    fetchAndSet();
  }, [page]);

  useEffect(() => {
    dispatch(entryLevelFiltersFetchData());
  }, []);

  const pickyProps = {
    numberDisplayed: 2,
    multiple: true,
    includeFilter: true,
    dropdownHeight: 255,
    renderList: renderSelectionList,
    includeSelectAll: true,
  };

  const isLoading = elFiltersIsLoading;
  const getOverlay = () => {
    let toReturn;
    if (elPositionsIsLoading) {
      toReturn = <Spinner type="bureau-results" class="homepage-position-results" size="big" />;
    } else if (elPositionsHasErrored || elFiltersHasErrored) {
      toReturn = <Alert type="error" title="Error loading results" messages={[{ body: 'Please try again.' }]} />;
    } else if (count === 0) {
      toReturn = <Alert type="info" title="No results found" messages={[{ body: 'Please broaden your search criteria and try again.' }]} />;
    }
    if (toReturn) {
      return <div className="usa-width-one-whole empl-search-lower-section results-dropdown">{toReturn}</div>;
    }
    return false;
  };

  const exportTable = () => {
    if (tableRef.current) {
      setExportIsLoading(true);
      const grid = tableRef.current.getGridRef();
      grid.api.exportDataAsCsv();
      setExportIsLoading(false);
    }
  };

  return (
    isLoading ? <Spinner type="bureau-filters" size="small" /> :
      <>
        <div className="entry-level-page position-search">
          <div className="usa-grid-full position-search--header">
            <ProfileSectionTitle title="Entry Level Search" icon="keyboard-o" />
            <div className="search-bar-container">
              <PositionManagerSearch
                ref={textSearchRef}
                placeHolder="Search using Position Number, Position Title, Bureau, Org, Skill, or Language (i.e FR)"
                textSearch={textSearch}
                submitSearch={(input) => setTextSearch(input)}
              />
            </div>
            <div className="filterby-container">
              <div className="filterby-label">Filter by:</div>
              <div className="filterby-clear">
                {clearFilters &&
              <button className="unstyled-button" onClick={resetFilters}>
                <FA name="times" />
                    Clear Filters
              </button>
                }
              </div>
            </div>
            <div className="usa-width-one-whole position-search--filters--el results-dropdown">
              <div className="filter-div">
                <div className="label">Tracking Program:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select TP(s)"
                  value={selectedTps}
                  options={tpFilters}
                  onChange={setSelectedTps}
                  valueKey="code"
                  labelKey="code"
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
                />
              </div>
              <div className="filter-div">
                <div className="label">Location/Org:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Organization(s)"
                  value={selectedOrgs}
                  options={orgFilters}
                  onChange={setSelectedOrgs}
                  valueKey="code"
                  labelKey="description"
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
                />
              </div>
              <div className="filter-div">
                <div className="label">Skill:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Skill(s)"
                  value={selectedSkills}
                  options={skillsFilters}
                  onChange={setSelectedSkills}
                  valueKey="code"
                  labelKey="custom_description"
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
                />
              </div>
              <div className="filter-div">
                <div className="label">Languages:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Language(s)"
                  value={selectedLanguages}
                  options={languageFilters}
                  onChange={setSelectedLanguages}
                  valueKey="code"
                  labelKey="description"
                />
              </div>
              <div className="filter-div">
                <CheckBox
                  id="overseas"
                  label="Overseas Only"
                  value={overseas}
                  onCheckBoxClick={e => setOverseas(e)}
                  disabled={domestic}
                />
                <CheckBox
                  id="domestic"
                  label="Domestic Only"
                  value={domestic}
                  onCheckBoxClick={e => setDomestic(e)}
                  disabled={overseas}
                />
              </div>
            </div>
          </div>
          <div className="controls-container results-dropdown">
            <div>
              <TotalResults
                total={count}
                pageNumber={page}
                pageSize={limit}
                suffix="Results"
                isHidden={elPositionsIsLoading}
              />
            </div>
            <div className="position-search-controls--right">
              <div className="position-search-controls--results">
                <SelectForm
                  id="position-manager-num-results"
                  options={POSITION_PAGE_SIZES.options}
                  label="Results:"
                  defaultSort={limit}
                  onSelectOption={value => setLimit(value.target.value)}
                  disabled={elPositionsIsLoading}
                />
              </div>
              <div className="export-button-container">
                <ExportButton onClick={exportTable} isLoading={exportIsLoading} disabled={elPositionsIsLoading} />
              </div>
            </div>
          </div>
          <div className="usa-width-one-whole position-search--results">
            {
              getOverlay() ||
            <>
              <div className="usa-grid-full el-table-container">
                <MaintainELPositionsTable ref={tableRef} elPositions={elPositions} />
              </div>
              <div className="usa-grid-full react-paginate">
                <PaginationWrapper
                  pageSize={limit}
                  onPageChange={p => setPage(p.page)}
                  forcePage={page}
                  totalResults={count}
                />
              </div>
            </>
            }
          </div>
        </div>
      </>
  );
};

export default MaintainEntryLevelPositions;
