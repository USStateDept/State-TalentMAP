import { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Picky from 'react-picky';
import FA from 'react-fontawesome';
import { useDataLoader } from 'hooks';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { isDate, startOfDay } from 'date-fns-v2';
import Spinner from 'Components/Spinner';
import ProfileSectionTitle from 'Components/ProfileSectionTitle';
import ListItem from 'Components/BidderPortfolio/BidControls/BidCyclePicker/ListItem';
import { filtersFetchData } from 'actions/filters/filters';
import { cycleManagementFetchData, saveCycleManagementSelections } from 'actions/cycleManagement';
import PositionManagerSearch from 'Components/BureauPage/PositionManager/PositionManagerSearch';
import api from '../../api';

const CycleManagement = () => {
  const dispatch = useDispatch();
  const childRef = useRef();

  const genericFiltersIsLoading = useSelector(state => state.filtersIsLoading);
  const userSelections = useSelector(state => state.cycleManagementSelections);
  const genericFilters = useSelector(state => state.filters);

  const [textSearch, setTextSearch] = useState(userSelections?.textSearch || '');
  const [selectedBureaus, setSelectedBureaus] = useState(userSelections?.selectedBureaus || []);
  const [selectedOrgs, setSelectedOrgs] = useState(userSelections?.selectedOrgs || []);
  const [selectedGrades, setSelectedGrades] = useState(userSelections?.selectedGrades || []);
  const [selectedSkills, setSelectedSkills] = useState(userSelections?.selectedSkills || []);
  const [selectedLangs, setSelectedLangs] = useState(userSelections?.selectedLangs || []);
  const [selectedCycles, setSelectedCycles] = useState(userSelections?.selectedCycles || []);
  const [selectedStatus, setSelectedStatus] = useState(userSelections?.selectedStatus || []);
  const [selectedDates, setSelectedDates] = useState(userSelections?.selectedDates || null);
  const [clearFilters, setClearFilters] = useState(false);

  const currentInputs = {
    textSearch,
    selectedBureaus,
    selectedOrgs,
    selectedGrades,
    selectedSkills,
    selectedLangs,
    selectedCycles,
    selectedStatus,
    selectedDates,
  };

  useEffect(() => {
    dispatch(filtersFetchData(genericFilters));
    dispatch(saveCycleManagementSelections(currentInputs));
  }, []);

  const getCurrentInputs = () => ({
    textSearch,
    selectedBureaus,
    selectedOrgs,
    selectedGrades,
    selectedSkills,
    selectedLangs,
    selectedCycles,
    selectedStatus,
    selectedDates,
  });

  const fetchAndSet = () => {
    const filters = [
      selectedBureaus,
      selectedOrgs,
      selectedGrades,
      selectedSkills,
      selectedLangs,
      selectedCycles,
      selectedStatus,
    ];
    if (filters.flat().length === 0 && textSearch.length === 0 && !selectedDates) {
      setClearFilters(false);
    } else {
      setClearFilters(true);
    }
    dispatch(saveCycleManagementSelections(getCurrentInputs()));
  };

  useEffect(() => {
    console.log('UE 2');
    fetchAndSet();
  }, [
    textSearch,
    selectedBureaus,
    selectedOrgs,
    selectedGrades,
    selectedSkills,
    selectedLangs,
    selectedCycles,
    selectedStatus,
    selectedDates,
  ]);

  // Hardcoded - where should i get this data?
  const statusOptions = [
    { code: 1, name: 'Active' },
    { code: 2, name: 'Closed' },
    { code: 3, name: 'Merged' },
    { code: 4, name: 'Proposed' },
  ];

  const genericFilters$ = genericFilters?.filters || [];
  const bureaus = genericFilters$.find(f => f?.item?.description === 'region');
  const bureauOptions = bureaus?.data?.length
    ? [...new Set(bureaus.data)].sort(b => b.short_description) : [];
  const grades = genericFilters$.find(f => f?.item?.description === 'grade');
  const gradesOptions = grades?.data?.length
    ? [...new Set(grades.data)].sort(b => b.code) : [];
  const skills = genericFilters$.find(f => f?.item?.description === 'skill');
  const skillOptions = skills?.data?.length
    ? [...new Set(skills.data)].sort(b => b.description) : [];
  const languages = genericFilters$.find(f => f?.item?.description === 'language');
  const languageOptions = languages?.data?.length
    ? [...new Set(languages.data)].sort(b => b.custom_description) : [];
  const bidCycle = genericFilters$.find(f => f?.item?.description === 'bidCycle');
  const bidCycleOptions = bidCycle?.data?.length
    ? [...new Set(bidCycle.data)].sort(b => b.name) : [];
  const { data: orgs, loading: orgsLoading } = useDataLoader(api().get, '/fsbid/agenda_employees/reference/current-organizations/');
  const organizationOptions = !orgsLoading && orgs?.data?.length
    ? [...new Set(orgs.data)].sort(o => o.name) : [];

  // better labeling for the URL params?
  const getQuery = () => ({
    'cycle-bureaus': selectedBureaus.map(bureauObject => (bureauObject?.code)),
    'cycle-organizations': selectedOrgs.map(orgsObject => (orgsObject?.code)),
    'cycle-grades': selectedGrades.map(gradesObject => (gradesObject?.id)),
    'cycle-skills': selectedSkills.map(skillsObject => (skillsObject?.code)),
    'cycle-languages': selectedLangs.map(languagesObject => (languagesObject?.code)),
    'cycle-cycles': selectedCycles.map(bidCycleObject => (bidCycleObject?.id)),
    'cycle-statuses': selectedStatus.map(statusObject => (statusObject?.code)),
    'cycle-text': textSearch,
    'cycle-date-start': isDate(selectedDates?.[0]) ? startOfDay(selectedDates?.[0]).toJSON() : '',
    'cycle-date-end': isDate(selectedDates?.[1]) ? startOfDay(selectedDates?.[1]).toJSON() : '',
  });

  const resetFilters = () => {
    setSelectedBureaus([]);
    setSelectedOrgs([]);
    setSelectedGrades([]);
    setSelectedSkills([]);
    setSelectedLangs([]);
    setSelectedCycles([]);
    setSelectedStatus([]);
    setTextSearch('');
    setSelectedDates(null);
    childRef.current.clearText();
    setClearFilters(false);
  };

  const submitSearch = () => {
    console.log('SUBMIT');
    dispatch(cycleManagementFetchData(getQuery()));
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

  const pickyProps = {
    numberDisplayed: 2,
    multiple: true,
    includeFilter: true,
    dropdownHeight: 255,
    renderList: renderSelectionList,
    includeSelectAll: true,
  };

  const isLoading = orgsLoading || genericFiltersIsLoading;

  return (
    isLoading ? <Spinner type="bureau-filters" size="small" /> :
      (
        <div className="cycle-management-page">
          <div className="usa-grid-full cm-upper-section">
            <div className="results-search-bar">

              <div className="usa-grid-full search-bar-container">
                <ProfileSectionTitle title="Cycle Search" icon="keyboard-o" />
                <PositionManagerSearch
                  onChange={setTextSearch}
                  ref={childRef}
                  textSearch={textSearch}
                  label="Search for a Cycle"
                  placeholder="Search using Position Number or Position Title"
                  noButton
                />
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

                <div className="usa-width-one-whole cm-filters">

                  <div className="cm-filter-div">
                    <div className="label">Bureau</div>
                    <Picky
                      {...pickyProps}
                      placeholder="Select Bureau(s)"
                      options={bureauOptions}
                      valueKey="code"
                      labelKey="long_description"
                      key="stuff"
                      disabled={isLoading}
                      value={selectedBureaus}
                      onChange={setSelectedBureaus}
                    />
                  </div>
                  <div className="cm-filter-div">
                    <div className="label">ORG</div>
                    <Picky
                      {...pickyProps}
                      placeholder="Select Organization(s)"
                      options={organizationOptions}
                      valueKey="code"
                      labelKey="name"
                      disabled={isLoading}
                      value={selectedOrgs}
                      onChange={setSelectedOrgs}
                    />
                  </div>
                  <div className="cm-filter-div">
                    <div className="label">Grade</div>
                    <Picky
                      {...pickyProps}
                      placeholder="Select Grade(s)"
                      options={gradesOptions}
                      valueKey="id"
                      labelKey="code"
                      disabled={isLoading}
                      value={selectedGrades}
                      onChange={setSelectedGrades}
                    />
                  </div>
                  <div className="cm-filter-div">
                    <div className="label">Skills</div>
                    <Picky
                      {...pickyProps}
                      placeholder="Select Skill(s)"
                      options={skillOptions}
                      valueKey="code"
                      labelKey="custom_description"
                      onChange={setSelectedSkills}
                      value={selectedSkills}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="cm-filter-div">
                    <div className="label">Language</div>
                    <Picky
                      {...pickyProps}
                      placeholder="Select Language(s)"
                      options={languageOptions}
                      valueKey="code"
                      labelKey="custom_description"
                      disabled={isLoading}
                      onChange={setSelectedLangs}
                      value={selectedLangs}
                    />
                  </div>

                </div>
              </div>

            </div>
          </div>

          <div className="cm-lower-section">
            <div className="cycle-search-heading">
              {'Search for a Cycle'}
            </div>
            <div className="cycle-search-subheading">
              {'Search for an existing cycle'}
            </div>

            <div className="usa-width-one-whole cm-filters cm-lower-filters">
              <div className="cm-filter-div">
                <div className="label">Cycle</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Bid Cycle(s)"
                  options={bidCycleOptions}
                  valueKey="id"
                  labelKey="name"
                  disabled={isLoading}
                  onChange={setSelectedCycles}
                  value={selectedCycles}
                />
              </div>
              <div className="cm-filter-div">
                <div className="label">Status</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Status"
                  options={statusOptions}
                  valueKey="code"
                  labelKey="name"
                  onChange={setSelectedStatus}
                  value={selectedStatus}
                />
              </div>
              <div className="cm-filter-div">
                <div className="label">Cycle Date</div>
                <DateRangePicker
                  onChange={setSelectedDates}
                  value={selectedDates}
                  maxDetail="month"
                  calendarIcon={null}
                  showLeadingZeros
                  disabled={isLoading}
                />
              </div>
              <div className="cm-filter-div cycle-search-submit-button-wrapper">
                <button className="cycle-search-submit-button" type="submit" onClick={submitSearch}>
                  <FA name="search" />
                  Search
                </button>
              </div>
            </div>
          </div>

        </div>
      )
  );
};

export default withRouter(CycleManagement);
