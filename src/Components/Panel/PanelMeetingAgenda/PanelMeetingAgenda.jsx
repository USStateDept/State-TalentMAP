import FA from 'react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import SelectForm from 'Components/SelectForm';
import { useEffect, useRef, useState } from 'react';
import { filter, flatten, get, has, isEmpty, sortBy, throttle, uniqBy } from 'lodash';
import { PANEL_MEETING_AGENDAS_PAGE_SIZES, PANEL_MEETING_AGENDAS_SORT } from 'Constants/Sort';
import PositionManagerSearch from 'Components/BureauPage/PositionManager/PositionManagerSearch';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import Picky from 'react-picky';
import ListItem from 'Components/BidderPortfolio/BidControls/BidCyclePicker/ListItem';
import { formatDate } from 'utilities';
import { panelMeetingAgendasFetchData, panelMeetingAgendasFiltersFetchData, savePanelMeetingAgendasSelections } from 'actions/panelMeetingAgendas';
import { useDataLoader } from 'hooks';
import { filtersFetchData } from 'actions/filters/filters';
import api from '../../../api';
import ScrollUpButton from '../../ScrollUpButton';
import BackButton from '../../BackButton';


const PanelMeetingAgenda = () => {
  const childRef = useRef();
  const dispatch = useDispatch();

  const meetingStatus = 'Initiated';
  const meetingDate = formatDate('2024-05-20T16:00:00Z', 'MM/DD/YYYY HH:mm:ss');
  const preliminaryCutoff = formatDate('2024-05-19T16:00:00Z', 'MM/DD/YYYY HH:mm:ss');
  const addendumCutoff = formatDate('2024-05-18T17:00:00Z', 'MM/DD/YYYY HH:mm:ss');

  const panelMeetingsFiltersIsLoading = useSelector(state =>
    state.panelMeetingAgendasFiltersFetchDataLoading);

  const userSelections = useSelector(state => state.panelMeetingAgendasSelections);
  const panelMeetingAgendaFilters = useSelector(state => state.filters);

  const [limit, setLimit] = useState(get(userSelections, 'limit') || PANEL_MEETING_AGENDAS_PAGE_SIZES.defaultSize);
  const [ordering, setOrdering] = useState(get(userSelections, 'ordering') || PANEL_MEETING_AGENDAS_SORT.defaultSort);

  const panelMeetingAgendaFilters$ = get(panelMeetingAgendaFilters, 'filters') || [];
  const bureaus = panelMeetingAgendaFilters$.find(f => get(f, 'item.description') === 'region');
  const bureausOptions = uniqBy(sortBy(get(bureaus, 'data'), [(b) => b.short_description]));
  const grades = panelMeetingAgendaFilters$.find(f => get(f, 'item.description') === 'grade');
  const gradesOptions = uniqBy(get(grades, 'data'), 'code');
  const skills = panelMeetingAgendaFilters$.find(f => get(f, 'item.description') === 'skill');
  const skillsOptions = uniqBy(sortBy(get(skills, 'data'), [(s) => s.description]), 'code');
  const posts = panelMeetingAgendaFilters$.find(f => get(f, 'item.description') === 'post');
  const postsOptions = uniqBy(sortBy(get(posts, 'data'), [(p) => p.city]), 'code');
  const languages = panelMeetingAgendaFilters$.find(f => get(f, 'item.description') === 'language');
  const languagesOptions = uniqBy(sortBy(get(languages, 'data'), [(c) => c.custom_description]), 'custom_description');
  const remarks = useDataLoader(api().get, '/fsbid/agenda/remarks/');
  const remarksOptions = uniqBy(sortBy(get(remarks, 'data.data.results'), [(c) => c.text]), 'text');
  const itemStatuses = useDataLoader(api().get, '/fsbid/agenda/statuses/');
  const itemStatusesOptions = uniqBy(sortBy(get(itemStatuses, 'data.data.results'), [(c) => c.desc_text]), 'desc_text');
  const itemActions = useDataLoader(api().get, '/fsbid/agenda/leg_action_types/');
  const itemActionsOptions = uniqBy(sortBy(get(itemActions, 'data.data.results'), [(c) => c.desc_text]), 'desc_text');
  const categories = useDataLoader(api().get, '/panel/categories/');
  const categoriesOptions = uniqBy(sortBy(get(categories, 'data.data.results'), [(c) => c.mic_desc_text]), 'mic_desc_text');

  const [selectedBureaus, setSelectedBureaus] = useState(get(userSelections, 'selectedBureaus') || []);
  const [selectedCategories, setSelectedCategories] = useState(get(userSelections, 'selectedCategories') || []);
  const [selectedGrades, setSelectedGrades] = useState(get(userSelections, 'selectedGrades') || []);
  const [selectedItemActions, setSelectedItemActions] = useState(get(userSelections, 'selectedItemActions') || []);
  const [selectedItemStatuses, setSelectedItemStatuses] = useState(get(userSelections, 'selectedItemStatuses') || []);
  const [selectedLanguages, setSelectedLanguages] = useState(get(userSelections, 'selectedLanguages') || []);
  const [selectedPosts, setSelectedPosts] = useState(get(userSelections, 'selectedPosts') || []);
  const [selectedRemarks, setSelectedRemarks] = useState(get(userSelections, 'selectedRemarks') || []);
  const [selectedSkills, setSelectedSkills] = useState(get(userSelections, 'selectedSkills') || []);

  const [textInput, setTextInput] = useState(get(userSelections, 'textInput') || '');
  const [textSearch, setTextSearch] = useState(get(userSelections, 'textSearch') || '');

  const [clearFilters, setClearFilters] = useState(false);

  const isLoading = panelMeetingsFiltersIsLoading;

  const pageSizes = PANEL_MEETING_AGENDAS_PAGE_SIZES;
  const sorts = PANEL_MEETING_AGENDAS_SORT;

  const getQuery = () => ({
    limit,
    ordering,
    // User Filters
    [get(bureaus, 'item.selectionRef')]: selectedBureaus.map(bureauObject => (get(bureauObject, 'code'))),
    [get(grades, 'item.selectionRef')]: selectedGrades.map(gradeObject => (get(gradeObject, 'code'))),
    [get(skills, 'item.selectionRef')]: selectedSkills.map(skillObject => (get(skillObject, 'code'))),
    [get(posts, 'item.selectionRef')]: selectedPosts.map(postObject => (get(postObject, 'code'))),
    [get(languages, 'item.selectionRef')]: selectedLanguages.map(langObject => (get(langObject, 'code'))),
    itemActions: selectedItemActions.map(itemActionObject => (get(itemActionObject, 'desc_text'))),
    itemStatuses: selectedItemStatuses.map(itemStatusObject => (get(itemStatusObject, 'desc_text'))),
    categories: selectedCategories.map(categoryObject => (get(categoryObject, 'mic_desc_text'))),
    remarks: selectedRemarks.map(remarkObject => (get(remarkObject, 'text'))),

    // Free Text
    q: textInput || textSearch,
  });

  const getCurrentInputs = () => ({
    limit,
    ordering,
    selectedBureaus,
    selectedCategories,
    selectedGrades,
    selectedItemActions,
    selectedItemStatuses,
    selectedLanguages,
    selectedPosts,
    selectedRemarks,
    selectedSkills,
    textInput,
    textSearch,
  });

  useEffect(() => {
    dispatch(panelMeetingAgendasFetchData(getQuery()));
    dispatch(panelMeetingAgendasFiltersFetchData());
    dispatch(filtersFetchData(panelMeetingAgendaFilters));
    dispatch(savePanelMeetingAgendasSelections(getCurrentInputs()));
  }, []);

  const fetchAndSet = () => {
    const filters = [
      selectedBureaus,
      selectedCategories,
      selectedGrades,
      selectedItemActions,
      selectedItemStatuses,
      selectedLanguages,
      selectedPosts,
      selectedRemarks,
      selectedSkills,
    ];
    if (isEmpty(filter(flatten(filters))) && isEmpty(textSearch)) {
      setClearFilters(false);
    } else {
      setClearFilters(true);
    }
    dispatch(panelMeetingAgendasFetchData(getQuery()));
    dispatch(savePanelMeetingAgendasSelections(getCurrentInputs()));
  };

  useEffect(() => {
    fetchAndSet();
  }, [
    limit,
    ordering,
    selectedBureaus,
    selectedCategories,
    selectedGrades,
    selectedItemActions,
    selectedItemStatuses,
    selectedLanguages,
    selectedPosts,
    selectedRemarks,
    selectedSkills,
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
    // only Categories need to use 'mic_desc_text'
    if (has(items[0], 'mic_desc_text')) {
      codeOrText = 'mic_desc_text';
    }
    const getSelected = item => !!selected.find(f => f[codeOrText] === item[codeOrText]);
    let queryProp = 'description';
    if (get(items, '[0].custom_description', false)) queryProp = 'custom_description';
    else if (get(items, '[0].long_description', false)) queryProp = 'long_description';
    else if (codeOrText === 'text') queryProp = 'text';
    else if (codeOrText === 'desc_text') queryProp = 'desc_text';
    else if (codeOrText === 'mic_desc_text') queryProp = 'mic_desc_text';
    return items.map(item =>
      (<ListItem
        key={item[codeOrText]}
        item={item}
        {...rest}
        queryProp={queryProp}
        getIsSelected={getSelected}
      />),
    );
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
    setSelectedBureaus([]);
    setSelectedCategories([]);
    setSelectedGrades([]);
    setSelectedItemActions([]);
    setSelectedItemStatuses([]);
    setSelectedLanguages([]);
    setSelectedPosts([]);
    setSelectedRemarks([]);
    setSelectedSkills([]);
    setTextSearch('');
    childRef.current.clearText();
    setClearFilters(false);
  };

  return (
    <div className="panel-meeting-agenda-page">
      <div className="usa-grid-full panel-meeting-agenda-upper-section results-search-bar-container">
        <BackButton />
        <ProfileSectionTitle title="Panel Meeting Agenda" icon="tasks" />
        <div className="cutoff-date-container">
          <div className="panel-meeting-agenda-header-data-point">
            <dt>Meeting Date:</dt>
            <dd>{meetingDate}</dd>
          </div>
          <div className="panel-meeting-agenda-header-data-point">
            <dt>Meeting Status:</dt>
            <dd>{meetingStatus}</dd>
          </div>
          <div className="panel-meeting-agenda-header-data-point">
            <dt>Preliminary Cut-Off:</dt>
            <dd>{preliminaryCutoff}</dd>
          </div>
          <div className="panel-meeting-agenda-header-data-point">
            <dt>Addendum Cut-Off:</dt>
            <dd>{addendumCutoff}</dd>
          </div>
        </div>
        <PositionManagerSearch
          submitSearch={submitSearch}
          onChange={setTextInputThrottled}
          ref={childRef}
          textSearch={textSearch}
          label="Find Agenda Item"
          placeHolder="Search using Panel Meeting Agenda Item Info"
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
        <div className="usa-width-one-whole panel-meeting-agenda-filters">
          <div className="filter-div">
            <div className="label">Bureau:</div>
            <Picky
              {...pickyProps}
              placeholder="Select Bureau"
              value={selectedBureaus}
              options={bureausOptions}
              onChange={setSelectedBureaus}
              valueKey="code"
              labelKey="long_description"
              disabled={isLoading}
            />
          </div>
          <div className="filter-div">
            <div className="label">Category:</div>
            <Picky
              {...pickyProps}
              placeholder="Select Categories"
              value={selectedCategories}
              options={categoriesOptions}
              onChange={setSelectedCategories}
              valueKey="mic_code"
              labelKey="mic_desc_text"
              disabled={isLoading}
            />
          </div>
          <div className="filter-div">
            <div className="label">Grade:</div>
            <Picky
              {...pickyProps}
              placeholder="Select Grade"
              value={selectedGrades}
              options={gradesOptions}
              onChange={setSelectedGrades}
              valueKey="code"
              labelKey="custom_description"
              disabled={isLoading}
            />
          </div>
          <div className="filter-div">
            <div className="label">Item Action:</div>
            <Picky
              {...pickyProps}
              placeholder="Select Item Action"
              value={selectedItemActions}
              options={itemActionsOptions}
              onChange={setSelectedItemActions}
              valueKey="code"
              labelKey="desc_text"
              disabled={isLoading}
            />
          </div>
          <div className="filter-div">
            <div className="label">Item Status:</div>
            <Picky
              {...pickyProps}
              placeholder="Select Item Status"
              value={selectedItemStatuses}
              options={itemStatusesOptions}
              onChange={setSelectedItemStatuses}
              valueKey="code"
              labelKey="desc_text"
              disabled={isLoading}
            />
          </div>
          <div className="filter-div">
            <div className="label">Language:</div>
            <Picky
              {...pickyProps}
              placeholder="Select Language"
              value={selectedLanguages}
              options={languagesOptions}
              onChange={setSelectedLanguages}
              valueKey="code"
              labelKey="custom_description"
              disabled={isLoading}
            />
          </div>
          <div className="filter-div">
            <div className="label">Location (Org):</div>
            <Picky
              {...pickyProps}
              placeholder="Select Location (Org)"
              value={selectedPosts}
              options={postsOptions}
              onChange={setSelectedPosts}
              valueKey="code"
              labelKey="custom_description"
              disabled={isLoading}
            />
          </div>
          <div className="filter-div">
            <div className="label">Remarks:</div>
            <Picky
              {...pickyProps}
              placeholder="Select Remarks"
              value={selectedRemarks}
              options={remarksOptions}
              onChange={setSelectedRemarks}
              valueKey="rc_code"
              labelKey="text"
              disabled={isLoading}
            />
          </div>
          <div className="filter-div">
            <div className="label">Skill:</div>
            <Picky
              {...pickyProps}
              placeholder="Select Skill"
              value={selectedSkills}
              options={skillsOptions}
              onChange={setSelectedSkills}
              valueKey="code"
              labelKey="custom_description"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
      {
        <div className="panel-results-controls">
          <SelectForm
            className="panel-results-select"
            id="panel-search-results-sort"
            options={sorts.options}
            label="Sort by:"
            defaultSort={ordering}
            onSelectOption={value => setOrdering(value.target.value)}
          />
          <SelectForm
            className="panel-results-select"
            id="panel-search-num-results"
            options={pageSizes.options}
            label="Results:"
            defaultSort={limit}
            onSelectOption={value => setLimit(value.target.value)}
          />
          <ScrollUpButton />
        </div>
      }
    </div>
  );
};

export default PanelMeetingAgenda;
