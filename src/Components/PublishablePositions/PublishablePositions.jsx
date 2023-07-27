import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Picky from 'react-picky';
import FA from 'react-fontawesome';
import { filter, flatten, get, has, includes, isEmpty, sortBy, throttle, uniqBy } from 'lodash';

import { useDataLoader } from 'hooks';
import { filtersFetchData } from 'actions/filters/filters';
import { publishablePositionsFetchData, savePublishablePositionsSelections } from 'actions/publishablePositions';
import { PUBLISHABLE_POSITIONS_PAGE_SIZES, PUBLISHABLE_POSITIONS_SORT } from 'Constants/Sort';
import Spinner from 'Components/Spinner';
import SelectForm from 'Components/SelectForm';
import ScrollUpButton from 'Components/ScrollUpButton';
import ListItem from 'Components/BidderPortfolio/BidControls/BidCyclePicker/ListItem';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import PositionManagerSearch from 'Components/BureauPage/PositionManager/PositionManagerSearch';
import Alert from 'Components/Alert';
import api from '../../api';
import PublishablePositionCard from '../PublishablePositionCard/PublishablePositionCard';

const PublishablePositions = () => {
  const childRef = useRef();
  const dispatch = useDispatch();

  const userSelections = useSelector(state => state.publishablePositionsSelections);
  const dummyPositionDetails = useSelector(state => state.publishablePositions);

  const [limit, setLimit] = useState(get(userSelections, 'limit') || PUBLISHABLE_POSITIONS_PAGE_SIZES.defaultSize);
  const [ordering, setOrdering] = useState(get(userSelections, 'ordering') || PUBLISHABLE_POSITIONS_SORT.defaultSort);

  const genericFiltersIsLoading = useSelector(state => state.filtersIsLoading);
  const genericFilters = useSelector(state => state.filters);

  const [selectedStatuses, setSelectedStatuses] = useState(userSelections?.selectedStatus || []);
  const [selectedBureaus, setSelectedBureaus] = useState(userSelections?.selectedBureaus || []);
  const [selectedOrgs, setSelectedOrgs] = useState(userSelections?.selectedOrgs || []);
  const [selectedGrades, setSelectedGrades] = useState(userSelections?.selectedGrade || []);
  const [selectedSkills, setSelectedSkills] = useState(userSelections?.selectedSkills || []);
  const [selectedLanguages, setSelectedLanguages] =
    useState(userSelections?.selectedLanguage || []);
  const [selectedPosts, setSelectedPosts] = useState(userSelections?.selectedPost || []);
  const [selectedBidCycles, setSelectedBidCycles] =
    useState(userSelections?.selectedBidCycle || []);
  const [cardsInEditMode, setCardsInEditMode] = useState([]);
  const disableSearch = cardsInEditMode.length > 0;

  const genericFilters$ = get(genericFilters, 'filters') || [];
  const statusOptions = [
    { code: 1, name: 'Vet' },
    { code: 2, name: 'Publishable' },
    { code: 3, name: 'Non-Publishable' },
  ];
  const bureaus = genericFilters$.find(f => get(f, 'item.description') === 'region');
  const bureauOptions = uniqBy(sortBy(get(bureaus, 'data'), [(b) => b.short_description]));
  const grades = genericFilters$.find(f => get(f, 'item.description') === 'grade');
  const gradeOptions = uniqBy(get(grades, 'data'), 'code');
  const skills = genericFilters$.find(f => get(f, 'item.description') === 'skill');
  const skillOptions = uniqBy(sortBy(get(skills, 'data'), [(s) => s.description]), 'code');
  const languages = genericFilters$.find(f => get(f, 'item.description') === 'language');
  const languageOptions = uniqBy(sortBy(get(languages, 'data'), [(c) => c.custom_description]), 'custom_description');
  const post = genericFilters$.find(f => get(f, 'item.description') === 'post');
  const locationOptions = uniqBy(sortBy(get(post, 'data'), [(p) => p.city]), 'code');
  const cycles = genericFilters$.find(f => get(f, 'item.description') === 'bidCycle');
  const cycleOptions = uniqBy(sortBy(get(cycles, 'data'), [(c) => c.custom_description]), 'custom_description');

  const { data: orgs, loading: orgsLoading } = useDataLoader(api().get, '/fsbid/agenda_employees/reference/current-organizations/');
  const organizationOptions = sortBy(get(orgs, 'data'), [(o) => o.name]);

  const additionalFiltersIsLoading = includes([orgsLoading], true);

  const [textInput, setTextInput] = useState(get(userSelections, 'textInput') || '');
  const [textSearch, setTextSearch] = useState(get(userSelections, 'textSearch') || '');

  const [clearFilters, setClearFilters] = useState(false);

  const pageSizes = PUBLISHABLE_POSITIONS_PAGE_SIZES;
  const sorts = PUBLISHABLE_POSITIONS_SORT;
  const isLoading = genericFiltersIsLoading || additionalFiltersIsLoading;

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
    'position-details-status': selectedStatuses.map(statusObject => (statusObject?.code)),
    'position-details-bureaus': selectedBureaus.map(bureauObject => (bureauObject?.code)),
    'position-details-orgs': selectedOrgs.map(orgObject => (orgObject?.code)),
    'position-details-grades': selectedGrades.map(gradeObject => (gradeObject?.code)),
    'position-details-skills': selectedSkills.map(skillObject => (skillObject?.code)),
    'position-details-language': selectedLanguages.map(langObject => (langObject?.code)),
    'position-details-post': selectedPosts.map(postObject => (postObject?.code)),
    'position-details-cycles': selectedBidCycles.map(cycleObject => (cycleObject?.id)),

    // Free Text
    q: textInput || textSearch,
  });

  const getCurrentInputs = () => ({
    selectedStatus: selectedStatuses,
    selectedBureaus,
    selectedOrgs,
    selectedGrade: selectedGrades,
    selectedSkills,
    selectedLanguage: selectedLanguages,
    selectedPost: selectedPosts,
    selectedBidCycle: selectedBidCycles,
    textSearch,
  });

  useEffect(() => {
    dispatch(savePublishablePositionsSelections(getCurrentInputs()));
    dispatch(filtersFetchData(genericFilters));
  }, []);

  const fetchAndSet = () => {
    const filters = [
      selectedStatuses,
      selectedBureaus,
      selectedOrgs,
      selectedGrades,
      selectedSkills,
      selectedLanguages,
      selectedPosts,
      selectedBidCycles,
      textSearch,
    ];
    if (isEmpty(filter(flatten(filters))) && isEmpty(textSearch)) {
      setClearFilters(false);
    } else {
      setClearFilters(true);
    }
    dispatch(publishablePositionsFetchData(getQuery()));
    dispatch(savePublishablePositionsSelections(getCurrentInputs()));
  };

  useEffect(() => {
    fetchAndSet();
  }, [
    limit,
    ordering,
    selectedStatuses,
    selectedBureaus,
    selectedOrgs,
    selectedGrades,
    selectedSkills,
    selectedLanguages,
    selectedPosts,
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
    // only Remarks needs to use 'text'
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

  const resetFilters = () => {
    setSelectedStatuses([]);
    setSelectedBureaus([]);
    setSelectedOrgs([]);
    setSelectedGrades([]);
    setSelectedSkills([]);
    setSelectedLanguages([]);
    setSelectedPosts([]);
    setSelectedBidCycles([]);
    setTextSearch('');
    setTextInput('');
    childRef.current.clearText();
    setClearFilters(false);
  };

  return (
    isLoading ?
      <Spinner type="bureau-filters" size="small" /> :
      <>
        <div className="position-search">
          <div className="usa-grid-full position-search--header">
            <ProfileSectionTitle title="Position Details" icon="keyboard-o" className="xl-icon" />
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
                <div className="usa-width-one-whole position-search--filters wide-filter-labels results-dropdown">
                  <div className="filter-div">
                    <div className="label">Publishable Status:</div>
                    <Picky
                      {...pickyProps}
                      placeholder="Select Status(es)"
                      value={selectedStatuses}
                      options={statusOptions}
                      onChange={setSelectedStatuses}
                      valueKey="code"
                      labelKey="name"
                      disabled={isLoading || disableSearch}
                    />
                  </div>
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
                      options={bureauOptions}
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
                      options={skillOptions}
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
                      options={gradeOptions}
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
                      options={languageOptions}
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
                id="position-details-sort-results"
                options={sorts.options}
                label="Sort by:"
                defaultSort={ordering}
                onSelectOption={value => setOrdering(value.target.value)}
                disabled={disableSearch}
              />
              <SelectForm
                id="position-details-num-results"
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
            <div className="usa-grid-full position-list">
              <PublishablePositionCard
                result={dummyPositionDetails}
                cycles={cycles}
                onEditModeSearch={onEditModeSearch}
              />
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

PublishablePositions.propTypes = {
};

PublishablePositions.defaultProps = {
};

export default PublishablePositions;
