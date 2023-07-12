import { useEffect, useRef, useState } from 'react';
import SelectForm from 'Components/SelectForm';
import PositionManagerSearch from 'Components/BureauPage/PositionManager/PositionManagerSearch';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import { EDIT_POSITION_DETAILS_PAGE_SIZES, EDIT_POSITION_DETAILS_SORT } from 'Constants/Sort';
import { projectedVacancyFetchData, saveProjectedVacancySelections } from 'actions/projectedVacancy';
import Spinner from 'Components/Spinner';
import ListItem from 'Components/BidderPortfolio/BidControls/BidCyclePicker/ListItem';
import { get, has, includes, isEmpty, sortBy, throttle, uniqBy } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useDataLoader } from 'hooks';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import Picky from 'react-picky';
import { filtersFetchData } from 'actions/filters/filters';
import api from '../../../api';
import ScrollUpButton from '../../ScrollUpButton';
import PositionDetailsCard from '../../EditPositionDetails/PositionDetailsCard/PositionDetailsCard';
import ProjectedVacancyCard from '../../ProjectedVacancyCard/ProjectedVacancyCard';

const ProjectedVacancy = () => {
  const childRef = useRef();
  const dispatch = useDispatch();

  const userSelections = useSelector(state => state.projectedVacancySelections);
  const dummyPositionDetails = useSelector(state => state.projectedVacancy);
  const [limit, setLimit] = useState(get(userSelections, 'limit') || EDIT_POSITION_DETAILS_PAGE_SIZES.defaultSize);
  const [ordering, setOrdering] = useState(get(userSelections, 'ordering') || EDIT_POSITION_DETAILS_SORT.defaultSort);

  const genericFiltersIsLoading = useSelector(state => state.filtersIsLoading);
  const genericFilters = useSelector(state => state.filters);

  const [selectedBureaus, setSelectedBureaus] = useState(userSelections?.selectedBureaus || []);
  const [selectedOrgs, setSelectedOrgs] = useState(userSelections?.selectedOrgs || []);
  const [selectedGrade, setSelectedGrade] = useState(userSelections?.selectedGrade || []);
  const [selectedSkills, setSelectedSkills] = useState(userSelections?.selectedSkills || []);
  const [selectedLanguage, setSelectedLanguage] = useState(userSelections?.selectedLanguage || []);
  const [selectedBidCycle, setSelectedBidCycle] = useState(userSelections?.selectedBidCycle || []);
  const [selectedPost, setSelectedPost] = useState(userSelections?.selectedPost || []);
  const [clearFilters, setClearFilters] = useState(false);

  const genericFilters$ = get(genericFilters, 'filters') || [];
  const bureaus = genericFilters$.find(f => get(f, 'item.description') === 'region');
  const bureausOptions = uniqBy(sortBy(get(bureaus, 'data'), [(b) => b.short_description]));
  const post = genericFilters$.find(f => get(f, 'item.description') === 'post');
  const locationOptions = uniqBy(sortBy(get(post, 'data'), [(p) => p.city]), 'code');
  const grades = genericFilters$.find(f => get(f, 'item.description') === 'grade');
  const gradesOptions = uniqBy(get(grades, 'data'), 'code');
  const skills = genericFilters$.find(f => get(f, 'item.description') === 'skill');
  const skillsOptions = uniqBy(sortBy(get(skills, 'data'), [(s) => s.description]), 'code');
  const languages = genericFilters$.find(f => get(f, 'item.description') === 'language');
  const languagesOptions = uniqBy(sortBy(get(languages, 'data'), [(c) => c.custom_description]), 'custom_description');
  const cycles = genericFilters$.find(f => get(f, 'item.description') === 'bidCycle');
  const cycleOptions = uniqBy(sortBy(get(cycles, 'data'), [(c) => c.custom_description]), 'custom_description');

  const { data: orgs, loading: orgsLoading } = useDataLoader(api().get, '/fsbid/agenda_employees/reference/current-organizations/');
  const organizationOptions = sortBy(get(orgs, 'data'), [(o) => o.name]);

  const projectVacancyFiltersIsLoading =
  includes([orgsLoading], true);

  const [textInput, setTextInput] = useState(get(userSelections, 'textInput') || '');
  const [textSearch, setTextSearch] = useState(get(userSelections, 'textSearch') || '');

  const pageSizes = EDIT_POSITION_DETAILS_PAGE_SIZES;
  const sorts = EDIT_POSITION_DETAILS_SORT;
  const isLoading = genericFiltersIsLoading || projectVacancyFiltersIsLoading;

  const getQuery = () => ({
    limit,
    ordering,
    // User Filters
    'projected-vacancy-bureaus': selectedBureaus.map(bureauObject => (bureauObject?.code)),
    'projected-vacancy-post': selectedPost.map(postObject => (postObject?.code)),
    'projected-vacancy-orgs': selectedOrgs.map(orgObject => (orgObject?.code)),
    'projected-vacancy-cycles': selectedBidCycle.map(cycleObject => (cycleObject?.id)),
    'projected-vacancy-language': selectedLanguage.map(langObject => (langObject?.code)),
    'projected-vacancy-grades': selectedGrade.map(gradeObject => (gradeObject?.code)),
    'projected-vacancy-skills': selectedSkills.map(skillObject => (skillObject?.code)),

    // Free Text
    q: textInput || textSearch,
  });

  const resetFilters = () => {
    setSelectedBureaus([]);
    setSelectedPost([]);
    setSelectedOrgs([]);
    setSelectedGrade([]);
    setSelectedLanguage([]);
    setSelectedSkills([]);
    setSelectedBidCycle([]);
    setTextSearch('');
    setTextInput('');
    childRef.current.clearText();
    setClearFilters(false);
  };

  const getCurrentInputs = () => ({
    selectedBureaus,
    selectedPost,
    selectedOrgs,
    selectedGrade,
    selectedLanguage,
    selectedSkills,
    selectedBidCycle,
    textSearch,
  });

  useEffect(() => {
    dispatch(saveProjectedVacancySelections(getCurrentInputs()));
    dispatch(filtersFetchData(genericFilters));
  }, []);

  const fetchAndSet = () => {
    const filters = [
      selectedBureaus,
      selectedPost,
      selectedOrgs,
      selectedGrade,
      selectedLanguage,
      selectedSkills,
      selectedBidCycle,
    ];
    if (filters.flat().length === 0 && isEmpty(textSearch)) {
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
    selectedPost,
    selectedOrgs,
    selectedGrade,
    selectedLanguage,
    selectedSkills,
    selectedBidCycle,
    textSearch,
  ]);


  function submitSearch(text) {
    setTextSearch(text);
  }

  const throttledTextInput = () =>
    throttle(q => setTextInput(q), 300, { leading: false, trailing: true });

  const setTextInputThrottled = (q) => {
    throttledTextInput(q);
  };

  function renderSelectionList({ items, selected, ...rest }) {
    let codeOrText = 'code';

    if (has(items[0], 'text')) {
      codeOrText = 'text';
    }
    // only Item Actions/Statuses need to use 'desc_text'
    if (has(items[0], 'desc_text')) {
      codeOrText = 'desc_text';
    }
    if (has(items[0], 'abbr_desc_text') && items[0].code === 'V') {
      codeOrText = 'abbr_desc_text';
    }
    // only Categories need to use 'mic_desc_text'
    if (has(items[0], 'mic_desc_text')) {
      codeOrText = 'mic_desc_text';
    }
    let queryProp = 'description';
    if (get(items, '[0].custom_description', false)) queryProp = 'custom_description';
    else if (get(items, '[0].long_description', false)) queryProp = 'long_description';
    else if (codeOrText === 'text') queryProp = 'text';
    else if (codeOrText === 'desc_text') queryProp = 'desc_text';
    else if (codeOrText === 'abbr_desc_text') queryProp = 'abbr_desc_text';
    else if (codeOrText === 'mic_desc_text') queryProp = 'mic_desc_text';
    else if (has(items[0], 'name')) queryProp = 'name';
    return items.map((item, index) => {
      const keyId = `${index}-${item}`;
      return (<ListItem
        item={item}
        {...rest}
        key={keyId}
        queryProp={queryProp}
      />);
    });
  }

  const pickyProps = {
    numberDisplayed: 2,
    multiple: true,
    includeFilter: true,
    dropdownHeight: 255,
    renderList: renderSelectionList,
    includeSelectAll: true,
  };

  const dummyid = get(dummyPositionDetails, 'id', '');

  return (
    isLoading ?
      <Spinner type="projected-vacancy-filters" size="small" /> :
      <>
        <div className="projected-vacancy-page">
          <div className="usa-grid-full projected-vacancy-upper-section">
            <ProfileSectionTitle title="Projected Vacancy Search" icon="keyboard-o" />
            <div className="results-search-bar">
              <div className="usa-grid-full search-bar-container">
                <PositionManagerSearch
                  submitSearch={submitSearch}
                  onChange={setTextInputThrottled}
                  ref={childRef}
                  textSearch={textSearch}
                  label="Search for a Position"
                  placeHolder="Search using Position Number or Position Title"
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
                <div className="usa-width-one-whole projected-vacancy-filters results-dropdown">
                  <div className="filter-div">
                    <div className="label">Bureau:</div>
                    <Picky
                      {...pickyProps}
                      placeholder="Select Bureau(s)"
                      value={selectedBureaus}
                      options={bureausOptions}
                      onChange={setSelectedBureaus}
                      valueKey="code"
                      labelKey="long_description"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="filter-div">
                    <div className="label">Organization:</div>
                    <Picky
                      {...pickyProps}
                      placeholder="Select an Org"
                      value={selectedOrgs}
                      options={organizationOptions}
                      onChange={setSelectedOrgs}
                      valueKey="code"
                      labelKey="name"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="filter-div">
                    <div className="label">Grade:</div>
                    <Picky
                      {...pickyProps}
                      placeholder="Select a Grade"
                      value={selectedGrade}
                      options={gradesOptions}
                      onChange={setSelectedGrade}
                      valueKey="code"
                      labelKey="custom_description"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="filter-div">
                    <div className="label">Skills:</div>
                    <Picky
                      {...pickyProps}
                      placeholder="Select Skill(s)"
                      value={selectedSkills}
                      options={skillsOptions}
                      onChange={setSelectedSkills}
                      valueKey="code"
                      labelKey="custom_description"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="filter-div">
                    <div className="label">Language:</div>
                    <Picky
                      {...pickyProps}
                      placeholder="Select a Language"
                      value={selectedLanguage}
                      options={languagesOptions}
                      onChange={setSelectedLanguage}
                      valueKey="code"
                      labelKey="custom_description"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="filter-div">
                    <div className="label">Location:</div>
                    <Picky
                      {...pickyProps}
                      placeholder="Select Location(s)"
                      value={selectedPost}
                      options={locationOptions}
                      onChange={setSelectedPost}
                      valueKey="code"
                      labelKey="custom_description"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="filter-div">
                    <div className="label">Bid Cycle:</div>
                    <Picky
                      {...pickyProps}
                      placeholder="Select a Bid Cycle"
                      value={selectedBidCycle}
                      options={cycleOptions}
                      onChange={setSelectedBidCycle}
                      valueKey="id"
                      labelKey="name"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {
            <div className="edit-position-details-results-controls">
              <SelectForm
                className="edit-position-details-results-select"
                id="edit-position-details-results-sort"
                options={sorts.options}
                label="Sort by:"
                defaultSort={ordering}
                onSelectOption={value => setOrdering(value.target.value)}
              />
              <SelectForm
                className="edit-position-details-results-select"
                id="edit-position-details-num-results"
                options={pageSizes.options}
                label="Results:"
                defaultSort={limit}
                onSelectOption={value => setLimit(value.target.value)}
              />
              <ScrollUpButton />
            </div>
          }
          <div className="usa-width-one-whole projected-vacancy-lower-section results-dropdown">
            <div className="usa-grid-full position-list">
              <ProjectedVacancyCard
                result={dummyPositionDetails}
                key={dummyid}
              />
            </div>
          </div>
        </div>
      </>
  );
};


ProjectedVacancy.propTypes = {
  bureauFiltersIsLoading: PropTypes.bool,
};

ProjectedVacancy.defaultProps = {
  bureauFilters: { filters: [] },
  bureauPositions: { results: [] },
  bureauFiltersIsLoading: false,
  bureauPositionsIsLoading: false,
};

export default ProjectedVacancy;
