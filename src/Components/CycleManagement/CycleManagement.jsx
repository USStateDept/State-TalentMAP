import { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Picky from 'react-picky';
import FA from 'react-fontawesome';
import DatePicker from 'react-datepicker';
import { useDataLoader } from 'hooks';
import ProfileSectionTitle from 'Components/ProfileSectionTitle';
import ListItem from 'Components/BidderPortfolio/BidControls/BidCyclePicker/ListItem';
import { filtersFetchData } from 'actions/filters/filters';
import PositionManagerSearch from 'Components/BureauPage/PositionManager/PositionManagerSearch';
import api from '../../api';

const CycleManagement = () => {
  const dispatch = useDispatch();
  const childRef = useRef();
  // const [selectedBureaus, setSelectedBureaus] = useState(userSelections.selectedBureaus || []);

  const genericFiltersIsLoading = useSelector(state => state.filtersIsLoading);
  const userSelections = useSelector(state => state.panelMeetingAgendasSelections);
  const genericFilters = useSelector(state => state.filters);

  const [clearFilters, setClearFilters] = useState(false);
  const [textSearch, setTextSearch] = useState(userSelections.textSearch || '');

  useEffect(() => {
    dispatch(filtersFetchData(genericFilters));
  }, []);

  const genericFilters$ = genericFilters?.filters || [];
  // console.log(genericFilters$?.map(x => x?.item?.description));

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

  // console.log(bidCycleOptions);
  // console.log(bureauOptions);

  const { data: orgs, loading: orgsLoading } = useDataLoader(api().get, '/fsbid/agenda_employees/reference/current-organizations/');
  const organizationOptions = !orgsLoading && orgs?.data?.length
    ? [...new Set(orgs.data)].sort(o => o.name) : [];

  const statusOptions = [
    { code: 1, name: 'Active' },
    { code: 2, name: 'Closed' },
    { code: 3, name: 'Merged' },
    { code: 4, name: 'Proposed' },
  ];

  const resetFilters = () => {
    setClearFilters(false);
    childRef.current.clearText();
  };

  // const submitSearch = (text) => {
  //   console.log(text);
  // };

  const isLoading = orgsLoading || genericFiltersIsLoading;

  // console.log(isLoading);

  const renderSelectionList = ({ items, selected, ...rest }) => {
    // console.log(selected);
    // const codeOrText = 'code';
    // const getSelected = item => !!selected.find(f => f[codeOrText] === item[codeOrText]);
    let queryProp = 'description';
    if (items?.[0]?.custom_description) queryProp = 'custom_description';
    else if (items?.[0]?.long_description) queryProp = 'long_description';
    // else if (codeOrText === 'text') queryProp = 'text';
    // else if (codeOrText === 'desc_text') queryProp = 'desc_text';
    // else if (codeOrText === 'abbr_desc_text') queryProp = 'abbr_desc_text';
    // else if (codeOrText === 'mic_desc_text') queryProp = 'mic_desc_text';
    else if (items?.[0]?.name) queryProp = 'name';
    return items.map((item, index) => {
      const keyId = `${index}-${item}`;
      return (<ListItem
        item={item}
        {...rest}
        key={keyId}
        queryProp={queryProp}
        // getIsSelected={getSelected}
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
                  // value={selectedBureaus}
                  // onChange={setSelectedBureaus}
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
                  // value={selectedOrgs}
                  // onChange={setSelectedOrgs}
                />
              </div>
              <div className="cm-filter-div">
                <div className="label">Grade</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Bureau(s)"
                  options={gradesOptions}
                  valueKey="id"
                  disabled={isLoading}
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
                  // onChange={setSelectedSkills}
                  // value={selectedSkills}
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
                  // onChange={setSelectedLanguages}
                  // value={selectedLanguages}
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
            />
          </div>
          <div className="cm-filter-div larger-date-picker">
            <div className="label">Cycle Date</div>
            <DatePicker
              dateFormat="MM/dd/yyyy"
              showIcon
              placeholderText="mm/dd/yyyy"
            />
            <FA name="calendar" />
          </div>
          <div className="cm-filter-div cycle-search-submit-button-wrapper">
            <button className="cycle-search-submit-button" type="submit" onClick={() => console.log('click')}>
              <FA name="search" />
              Search
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default withRouter(CycleManagement);
