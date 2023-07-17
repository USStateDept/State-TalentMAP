import { withRouter } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FA from 'react-fontawesome';
import Picky from 'react-picky';
import { useDataLoader } from 'hooks';
import { isEmpty, throttle } from 'lodash';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import PositionManagerSearch from 'Components/BureauPage/PositionManager/PositionManagerSearch';
import InteractiveElement from 'Components/InteractiveElement';
import ListItem from 'Components/BidderPortfolio/BidControls/BidCyclePicker/ListItem';
import Spinner from 'Components/Spinner';
import { filtersFetchData } from 'actions/filters/filters';
// eslint-disable-next-line no-unused-vars
import { cycleManagementFetchData, cyclePositionSearchFetchData, saveCyclePositionSearchSelections } from 'actions/cycleManagement';
import api from '../../../api';

const CyclePositionSearch = (props) => {
  const childRef = useRef();
  const dispatch = useDispatch();
  const cycleId = props.match?.params?.id ?? false;
  console.log('cycleId: ', cycleId);

  const genericFilters = useSelector(state => state.filters);
  const genericFiltersIsLoading = useSelector(state => state.filtersIsLoading);

  const { data: orgs, loading: orgsLoading } = useDataLoader(api().get, '/fsbid/agenda_employees/reference/current-organizations/');
  const organizationOptions = orgs?.data?.sort(o => o.name) ?? [];

  const [showMore, setShowMore] = useState(false);
  const [selectedCurrentBureaus, setSelectedCurrentBureaus] = useState([]);
  const [selectedOrganizations, setSelectedOrganizations] = useState([]);
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [clearFilters, setClearFilters] = useState(false);

  const [textInput, setTextInput] = useState('');
  const [textSearch, setTextSearch] = useState('');

  const genericFilters$ = genericFilters?.filters || [];
  const bureaus = genericFilters$.find(f => f?.item?.description === 'region');
  const bureauOptions = bureaus?.data?.length ? [...new Set(bureaus.data)].sort(b => b.name) : [];
  const grades = genericFilters$.find(f => f?.item?.description === 'grade');
  const gradeOptions = grades?.data?.length ? [...new Set(grades.data)].sort(b => b.name) : [];
  const skills = genericFilters$.find(f => f?.item?.description === 'skill');
  const skillOptions = skills?.data?.length ? [...new Set(skills.data)].sort(b => b.name) : [];

  useEffect(() => {
    dispatch(filtersFetchData(genericFilters));
  }, []);

  function submitSearch(text) {
    setTextSearch(text);
  }

  const getQuery = () => ({
    'cps-bureaus': selectedCurrentBureaus.map(bureauObject => (bureauObject?.code)),
    'cps-orgs': selectedOrganizations.map(orgObject => (orgObject?.code)),
    'cps-grades': selectedGrades.map(gradeObject => (gradeObject?.code)),
    'cps-skills': selectedSkills.map(skillObject => (skillObject?.code)),

    q: textInput || textSearch,
  });

  const throttledTextInput = () =>
    throttle(q => setTextInput(q), 300, { leading: false, trailing: true });

  const setTextInputThrottled = (q) => {
    throttledTextInput(q);
  };

  const resetFilters = () => {
    setSelectedCurrentBureaus([]);
    setSelectedOrganizations([]);
    setSelectedGrades([]);
    setSelectedSkills([]);
    setTextSearch('');
    childRef.current.clearText();
    setClearFilters(false);
  };

  const getCurrentInputs = () => ({
    selectedCurrentBureaus,
    selectedOrganizations,
    selectedGrade: selectedGrades,
    selectedSkills,
    textSearch,
  });

  const fetchAndSet = () => {
    const filters = [
      selectedCurrentBureaus,
      selectedOrganizations,
      selectedGrades,
      selectedSkills,
    ];
    if (filters.flat().length === 0 && isEmpty(textSearch)) {
      setClearFilters(false);
    } else {
      setClearFilters(true);
    }
    dispatch(saveCyclePositionSearchSelections(getCurrentInputs()));
    dispatch(cyclePositionSearchFetchData(getQuery()));
  };

  useEffect(() => {
    fetchAndSet();
  }, [
    selectedCurrentBureaus,
    selectedOrganizations,
    selectedGrades,
    selectedSkills,
    textSearch,
  ]);

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

  return (
    orgsLoading || genericFiltersIsLoading ? <Spinner type="bureau-filters" size="small" /> :
      (
        <div className="cycle-management-page">
          <div className="cm-upper-section">
            <ProfileSectionTitle title="Cycle Position Search" icon="keyboard-o" />
            {showMore &&
              <div className="expanded-content">
                <div className="search-bar-container">
                  <PositionManagerSearch
                    submitSearch={submitSearch}
                    onChange={setTextInputThrottled}
                    ref={childRef}
                    textSearch={textSearch}
                    placeHolder="Search using Position Number or Position Title"
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
                <div className="cps-filters">
                  <div className="cps-filter-div">
                    <div className="label">Bureau:</div>
                    <Picky
                      {...pickyProps}
                      placeholder="Select Bureau(s)"
                      value={selectedCurrentBureaus}
                      options={bureauOptions}
                      onChange={setSelectedCurrentBureaus}
                      valueKey="code"
                      labelKey="long_description"
                    />
                  </div>
                  <div className="cps-filter-div">
                    <div className="label">Organization</div>
                    <Picky
                      {...pickyProps}
                      placeholder="Select Organization(s)"
                      options={organizationOptions}
                      valueKey="code"
                      labelKey="name"
                      onChange={setSelectedOrganizations}
                      value={selectedOrganizations}
                    />
                  </div>
                  <div className="cps-filter-div">
                    <div className="label">Grade</div>
                    <Picky
                      {...pickyProps}
                      placeholder="Select Grade(s)"
                      options={gradeOptions}
                      valueKey="code"
                      labelKey="custom_description"
                      onChange={setSelectedGrades}
                      value={selectedGrades}
                    />
                  </div>
                  <div className="cps-filter-div">
                    <div className="label">Skills</div>
                    <Picky
                      {...pickyProps}
                      placeholder="Select Skill(s)"
                      options={skillOptions}
                      valueKey="code"
                      labelKey="custom_description"
                      onChange={setSelectedSkills}
                      value={selectedSkills}
                    />
                  </div>
                </div>
              </div>
            }
            <div className="toggle-more-container">
              <InteractiveElement className="toggle-more" onClick={() => setShowMore(!showMore)}>
                <FA name={`chevron-${showMore ? 'up' : 'down'}`} />
              </InteractiveElement>
            </div>
          </div>
        </div>
      )
  );
};

export default withRouter(CyclePositionSearch);
