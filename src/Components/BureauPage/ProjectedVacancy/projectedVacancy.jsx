import { useEffect, useRef, useState } from 'react';
import SelectForm from 'Components/SelectForm';
import PositionManagerSearch from 'Components/BureauPage/PositionManager/PositionManagerSearch';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import { PUBLISHABLE_POSITIONS_PAGE_SIZES, PUBLISHABLE_POSITIONS_SORT } from 'Constants/Sort';
import { projectedVacancyAddToProposedCycle, projectedVacancyFetchData, saveProjectedVacancySelections } from 'actions/projectedVacancy';
import Spinner from 'Components/Spinner';
import ListItem from 'Components/BidderPortfolio/BidControls/BidCyclePicker/ListItem';
import Alert from 'Components/Alert';
import { get, has, includes, isEmpty, sortBy, throttle, uniqBy } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useDataLoader } from 'hooks';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import Picky from 'react-picky';
import { filtersFetchData } from 'actions/filters/filters';
import api from '../../../api';
import ScrollUpButton from '../../ScrollUpButton';
import ProjectedVacancyCard from '../../ProjectedVacancyCard/ProjectedVacancyCard';

const ProjectedVacancy = ({ isAO }) => {
  const childRef = useRef();
  const dispatch = useDispatch();

  const userSelections = useSelector(state => state.projectedVacancySelections);
  const dummyPositionDetails = useSelector(state => state.projectedVacancy);
  const [limit, setLimit] = useState(get(userSelections, 'limit') || PUBLISHABLE_POSITIONS_PAGE_SIZES.defaultSize);
  const [ordering, setOrdering] = useState(get(userSelections, 'ordering') || PUBLISHABLE_POSITIONS_SORT.defaultSort);
  const [cardsInEditMode, setCardsInEditMode] = useState([]);
  const disableSearch = cardsInEditMode.length > 0;

  const genericFiltersIsLoading = useSelector(state => state.filtersIsLoading);
  const genericFilters = useSelector(state => state.filters);

  const [selectedBureaus, setSelectedBureaus] = useState(userSelections?.selectedBureaus || []);
  const [selectedOrgs, setSelectedOrgs] = useState(userSelections?.selectedOrgs || []);
  const [selectedGrades, setSelectedGrades] = useState(userSelections?.selectedGrade || []);
  const [selectedSkills, setSelectedSkills] = useState(userSelections?.selectedSkills || []);
  const [selectedLanguages, setSelectedLanguages] =
    useState(userSelections?.selectedLanguage || []);
  const [selectedBidCycles, setSelectedBidCycles] =
    useState(userSelections?.selectedBidCycle || []);
  const [selectedPosts, setSelectedPosts] = useState(userSelections?.selectedPost || []);
  const [clearFilters, setClearFilters] = useState(false);

  const dummyid = dummyPositionDetails?.id;
  const dummyIds = [...Array(10).keys()].map(k => dummyid + k);
  const [includedPositions, setIncludedPositions] = useState();

  useEffect(() => {
    if (dummyid) {
      setIncludedPositions([...Array(10).keys()].map(k => dummyid + k));
    }
  }, [dummyid]);

  const genericFilters$ = get(genericFilters, 'filters') || [];
  const bureaus = genericFilters$.find(f => get(f, 'item.description') === 'region');
  const bureausOptions = uniqBy(sortBy(get(bureaus, 'data'), [(b) => b.short_description]));
  const posts = genericFilters$.find(f => get(f, 'item.description') === 'post');
  const locationOptions = uniqBy(sortBy(get(posts, 'data'), [(p) => p.city]), 'code');
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

  const pageSizes = PUBLISHABLE_POSITIONS_PAGE_SIZES;
  const sorts = PUBLISHABLE_POSITIONS_SORT;
  const isLoading = genericFiltersIsLoading || projectVacancyFiltersIsLoading;

  const onEditModeSearch = (editMode, id) => {
    if (editMode) {
      setCardsInEditMode([...cardsInEditMode, id]);
    } else {
      setCardsInEditMode(cardsInEditMode.filter(x => x !== id));
    }
  };

  const getQuery = () => ({
    limit,
    ordering,
    // User Filters
    'projected-vacancy-bureaus': selectedBureaus.map(bureauObject => (bureauObject?.code)),
    'projected-vacancy-post': selectedPosts.map(postObject => (postObject?.code)),
    'projected-vacancy-orgs': selectedOrgs.map(orgObject => (orgObject?.code)),
    'projected-vacancy-cycles': selectedBidCycles.map(cycleObject => (cycleObject?.id)),
    'projected-vacancy-language': selectedLanguages.map(langObject => (langObject?.code)),
    'projected-vacancy-grades': selectedGrades.map(gradeObject => (gradeObject?.code)),
    'projected-vacancy-skills': selectedSkills.map(skillObject => (skillObject?.code)),

    // Free Text
    q: textInput || textSearch,
  });

  const resetFilters = () => {
    setSelectedBureaus([]);
    setSelectedPosts([]);
    setSelectedOrgs([]);
    setSelectedGrades([]);
    setSelectedLanguages([]);
    setSelectedSkills([]);
    setSelectedBidCycles([]);
    setTextSearch('');
    setTextInput('');
    childRef.current.clearText();
    setClearFilters(false);
  };

  const getCurrentInputs = () => ({
    selectedBureaus,
    selectedPost: selectedPosts,
    selectedOrgs,
    selectedGrade: selectedGrades,
    selectedLanguage: selectedLanguages,
    selectedSkills,
    selectedBidCycle: selectedBidCycles,
    textSearch,
  });

  useEffect(() => {
    dispatch(saveProjectedVacancySelections(getCurrentInputs()));
    dispatch(filtersFetchData(genericFilters));
  }, []);

  const fetchAndSet = () => {
    const filters = [
      selectedBureaus,
      selectedPosts,
      selectedOrgs,
      selectedGrades,
      selectedLanguages,
      selectedSkills,
      selectedBidCycles,
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
    selectedPosts,
    selectedOrgs,
    selectedGrades,
    selectedLanguages,
    selectedSkills,
    selectedBidCycles,
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

  const onIncludedUpdate = (id, include) => {
    if (include) {
      setIncludedPositions([...includedPositions, id]);
    } else {
      setIncludedPositions(includedPositions.filter(x => x !== id));
    }
  };

  const addToProposedCycle = () => {
    dispatch(projectedVacancyAddToProposedCycle());
  };

  return (
    isLoading ?
      <Spinner type="bureau-filters" size="small" /> :
      <>
        <div className="position-search">
          <div className="usa-grid-full position-search--header">
            <ProfileSectionTitle title="Projected Vacancy Search" icon="keyboard-o" className="xl-icon" />
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
                <div className="usa-width-one-whole position-search--filters results-dropdown">
                  <div className="filter-div">
                    <div className="label">Bid Cycle:</div>
                    <Picky
                      {...pickyProps}
                      placeholder="Select Bid Cycle(s)"
                      value={selectedBidCycles}
                      options={cycleOptions}
                      onChange={setSelectedBidCycles}
                      valueKey="id"
                      labelKey="name"
                      disabled={isLoading || disableSearch}
                    />
                  </div>
                  <div className="filter-div">
                    <div className="label">Location:</div>
                    <Picky
                      {...pickyProps}
                      placeholder="Select Location(s)"
                      value={selectedPosts}
                      options={locationOptions}
                      onChange={setSelectedPosts}
                      valueKey="code"
                      labelKey="custom_description"
                      disabled={isLoading || disableSearch}
                    />
                  </div>
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
                      disabled={isLoading || disableSearch}
                    />
                  </div>
                  <div className="filter-div">
                    <div className="label">Organization:</div>
                    <Picky
                      {...pickyProps}
                      placeholder="Select Organization(s)"
                      value={selectedOrgs}
                      options={organizationOptions}
                      onChange={setSelectedOrgs}
                      valueKey="code"
                      labelKey="name"
                      disabled={isLoading || disableSearch}
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
                      disabled={isLoading || disableSearch}
                    />
                  </div>
                  <div className="filter-div">
                    <div className="label">Grade:</div>
                    <Picky
                      {...pickyProps}
                      placeholder="Select Grade(s)"
                      value={selectedGrades}
                      options={gradesOptions}
                      onChange={setSelectedGrades}
                      valueKey="code"
                      labelKey="custom_description"
                      disabled={isLoading || disableSearch}
                    />
                  </div>
                  <div className="filter-div">
                    <div className="label">Language:</div>
                    <Picky
                      {...pickyProps}
                      placeholder="Select Language(s)"
                      value={selectedLanguages}
                      options={languagesOptions}
                      onChange={setSelectedLanguages}
                      valueKey="code"
                      labelKey="custom_description"
                      disabled={isLoading || disableSearch}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {
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
          }
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
          <div className="usa-width-one-whole position-search--results">
            <div className="proposed-cycle-banner">
              {includedPositions.length} {includedPositions.length === 1 ? 'Position' : 'Positions'} Selected
              {
                isAO &&
                <button className="usa-button-secondary" onClick={addToProposedCycle} disabled={!includedPositions.length}>Add to Proposed Cycle</button>
              }
            </div>
            <div className="usa-grid-full position-list">
              {
                dummyIds.map(k =>
                  (<ProjectedVacancyCard
                    result={dummyPositionDetails}
                    key={k}
                    id={k}
                    updateIncluded={onIncludedUpdate}
                    onEditModeSearch={onEditModeSearch}
                  />))
              }
            </div>
          </div>
          {/* placeholder for when we put in pagination */}
          {
            disableSearch &&
            <div className="disable-react-paginate-overlay" />
          }
        </div>
      </>
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
