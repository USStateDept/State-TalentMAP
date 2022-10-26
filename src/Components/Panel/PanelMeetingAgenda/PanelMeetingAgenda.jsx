import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { connect, useDispatch, useSelector } from 'react-redux';
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
import { FILTERS_PARENT } from 'Constants/PropTypes';
import api from '../../../api';
import ScrollUpButton from '../../ScrollUpButton';
import BackButton from '../../BackButton';


const PanelMeetingAgenda = props => {
  const { panelMeetingAgendaFilters } = props;

  const childRef = useRef();
  const dispatch = useDispatch();

  const meetingStatus = 'Initiated';
  const meetingDate = formatDate('2024-05-20T16:00:00Z', 'MM/DD/YYYY HH:mm:ss');
  const preliminaryCutoff = formatDate('2024-05-19T16:00:00Z', 'MM/DD/YYYY HH:mm:ss');
  const addendumCutoff = formatDate('2024-05-18T17:00:00Z', 'MM/DD/YYYY HH:mm:ss');

  const panelMeetingsFiltersIsLoading = useSelector(state =>
    state.panelMeetingAgendasFiltersFetchDataLoading);

  const userSelections = useSelector(state => state.panelMeetingAgendasSelections);

  const [limit, setLimit] = useState(get(userSelections, 'limit') || PANEL_MEETING_AGENDAS_PAGE_SIZES.defaultSize);
  const [ordering, setOrdering] = useState(get(userSelections, 'ordering') || PANEL_MEETING_AGENDAS_SORT.defaultSort);

  const panelMeetingAgendaFilters$ = panelMeetingAgendaFilters.filters;
  const grades = panelMeetingAgendaFilters$.find(f => get(f, 'item.description') === 'grade');
  const gradeOptions = uniqBy(get(grades, 'data'), 'code');
  const skills = panelMeetingAgendaFilters$.find(f => get(f, 'item.description') === 'skill');
  const skillOptions = uniqBy(sortBy(get(skills, 'data'), [(s) => s.description]), 'code');
  const posts = panelMeetingAgendaFilters$.find(f => get(f, 'item.description') === 'post');
  const postOptions = uniqBy(sortBy(get(posts, 'data'), [(p) => p.city]), 'code');
  const languages = panelMeetingAgendaFilters$.find(f => get(f, 'item.description') === 'language');
  const languageOptions = uniqBy(sortBy(get(languages, 'data'), [(c) => c.custom_description]), 'custom_description');
  const remarks = useDataLoader(api().get, '/fsbid/agenda/remarks/');
  const remarksOptions = uniqBy(sortBy(get(remarks, 'data.data.results'), [(c) => c.text]), 'text');

  const [selectedBureau, setSelectedBureau] = useState(get(userSelections, 'selectedBureau') || []);
  const [selectedCategory, setSelectedCategory] = useState(get(userSelections, 'selectedCategory') || []);
  const [selectedGrade, setSelectedGrade] = useState(get(userSelections, 'selectedGrade') || []);
  const [selectedItemAction, setSelectedItemAction] = useState(get(userSelections, 'selectedItemAction') || []);
  const [selectedItemStatus, setSelectedItemStatus] = useState(get(userSelections, 'selectedItemStatus') || []);
  const [selectedLanguage, setSelectedLanguage] = useState(get(userSelections, 'selectedLanguage') || []);
  const [selectedPost, setSelectedPost] = useState(get(userSelections, 'selectedPost') || []);
  const [selectedOverseas, setSelectedOverseas] = useState(get(userSelections, 'selectedOverseas') || []);
  const [selectedRemarks, setSelectedRemarks] = useState(get(userSelections, 'selectedRemarks') || []);
  const [selectedSkill, setSelectedSkill] = useState(get(userSelections, 'selectedSkill') || []);

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
    [get(grades, 'item.selectionRef')]: selectedGrade.map(gradeObject => (get(gradeObject, 'code'))),
    [get(skills, 'item.selectionRef')]: selectedSkill.map(skillObject => (get(skillObject, 'code'))),
    [get(posts, 'item.selectionRef')]: selectedPost.map(postObject => (get(postObject, 'code'))),
    [get(languages, 'item.selectionRef')]: selectedLanguage.map(langObject => (get(langObject, 'code'))),
    remarks: selectedRemarks.map(remarkObject => (get(remarkObject, 'text'))),

    [get(grades, 'item.selectionRef')]: selectedBureau.map(gradeObject => (get(gradeObject, 'code'))),
    [get(skills, 'item.selectionRef')]: selectedCategory.map(skillObject => (get(skillObject, 'code'))),
    [get(posts, 'item.selectionRef')]: selectedItemAction.map(postObject => (get(postObject, 'code'))),
    [get(languages, 'item.selectionRef')]: selectedItemStatus.map(langObject => (get(langObject, 'code'))),
    [get(languages, 'item.selectionRef')]: selectedOverseas.map(langObject => (get(langObject, 'code'))),


    // Free Text
    q: textInput || textSearch,
  });

  const getCurrentInputs = () => ({
    limit,
    ordering,
    selectedBureau,
    selectedCategory,
    selectedGrade,
    selectedItemAction,
    selectedItemStatus,
    selectedLanguage,
    selectedPost,
    selectedOverseas,
    selectedRemarks,
    selectedSkill,
    textInput,
    textSearch,
  });

  useEffect(() => {
    props.fetchFilters(panelMeetingAgendaFilters, {});
    props.saveSelections(getCurrentInputs);
  }, []);

  useEffect(() => {
    dispatch(panelMeetingAgendasFetchData(getQuery()));
    dispatch(panelMeetingAgendasFiltersFetchData());
  }, []);

  const fetchAndSet = () => {
    const filters = [
      selectedBureau,
      selectedCategory,
      selectedGrade,
      selectedItemAction,
      selectedItemStatus,
      selectedLanguage,
      selectedPost,
      selectedOverseas,
      selectedRemarks,
      selectedSkill,
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
    selectedBureau,
    selectedCategory,
    selectedGrade,
    selectedItemAction,
    selectedItemStatus,
    selectedLanguage,
    selectedPost,
    selectedOverseas,
    selectedRemarks,
    selectedSkill,
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
    if (!has(items[0], 'code')) {
      codeOrText = 'text';
    }
    const getSelected = item => !!selected.find(f => f[codeOrText] === item[codeOrText]);
    let queryProp = 'description';
    if (get(items, '[0].custom_description', false)) queryProp = 'custom_description';
    else if (get(items, '[0].long_description', false)) queryProp = 'long_description';
    const queryProp$ = codeOrText !== 'text' ? queryProp : 'text';
    return items.map(item =>
      (<ListItem
        key={item[codeOrText]}
        item={item}
        {...rest}
        queryProp={queryProp$}
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
    setSelectedBureau([]);
    setSelectedCategory([]);
    setSelectedGrade([]);
    setSelectedItemAction([]);
    setSelectedItemStatus([]);
    setSelectedLanguage([]);
    setSelectedPost([]);
    setSelectedOverseas([]);
    setSelectedRemarks([]);
    setSelectedSkill([]);
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
              value={selectedBureau}
              options={gradeOptions}
              onChange={setSelectedBureau}
              valueKey="code"
              labelKey="description"
              disabled={isLoading}
            />
          </div>
          <div className="filter-div">
            <div className="label">Category:</div>
            <Picky
              {...pickyProps}
              placeholder="Select Category"
              value={selectedCategory}
              options={skillOptions}
              onChange={setSelectedCategory}
              valueKey="code"
              labelKey="description"
              disabled={isLoading}
            />
          </div>
          <div className="filter-div">
            <div className="label">Grade:</div>
            <Picky
              {...pickyProps}
              placeholder="Select Grade"
              value={selectedGrade}
              options={gradeOptions}
              onChange={setSelectedGrade}
              valueKey="code"
              labelKey="description"
              disabled={isLoading}
            />
          </div>
          <div className="filter-div">
            <div className="label">Item Action:</div>
            <Picky
              {...pickyProps}
              placeholder="Select Item Action"
              value={selectedItemAction}
              options={postOptions}
              onChange={setSelectedItemAction}
              valueKey="code"
              labelKey="description"
              disabled={isLoading}
            />
          </div>
          <div className="filter-div">
            <div className="label">Item Status:</div>
            <Picky
              {...pickyProps}
              placeholder="Select Item Status"
              value={selectedItemStatus}
              options={languageOptions}
              onChange={setSelectedItemStatus}
              valueKey="code"
              labelKey="description"
              disabled={isLoading}
            />
          </div>
          <div className="filter-div">
            <div className="label">Language:</div>
            <Picky
              {...pickyProps}
              placeholder="Select Language"
              value={selectedLanguage}
              options={languageOptions}
              onChange={setSelectedLanguage}
              valueKey="code"
              labelKey="description"
              disabled={isLoading}
            />
          </div>
          <div className="filter-div">
            <div className="label">Location (Org):</div>
            <Picky
              {...pickyProps}
              placeholder="Select Location (Org)"
              value={selectedPost}
              options={postOptions}
              onChange={setSelectedPost}
              valueKey="code"
              labelKey="description"
              disabled={isLoading}
            />
          </div>
          <div className="filter-div">
            <div className="label">Overseas:</div>
            <Picky
              {...pickyProps}
              placeholder="Select Overseas"
              value={selectedOverseas}
              options={languageOptions}
              onChange={setSelectedOverseas}
              valueKey="code"
              labelKey="description"
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
              valueKey="code"
              labelKey="description"
              disabled={isLoading}
            />
          </div>
          <div className="filter-div">
            <div className="label">Skill:</div>
            <Picky
              {...pickyProps}
              placeholder="Select Skill"
              value={selectedSkill}
              options={skillOptions}
              onChange={setSelectedSkill}
              valueKey="code"
              labelKey="description"
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

PanelMeetingAgenda.propTypes = {
  fetchFilters: PropTypes.func.isRequired,
  saveSelections: PropTypes.func.isRequired,
  panelMeetingAgendaFilters: FILTERS_PARENT,
};

PanelMeetingAgenda.defaultProps = {
  panelMeetingAgendaFilters: { filters: [] },
};

const mapStateToProps = state => ({
  panelMeetingAgendaFilters: state.filters,
  bureauFiltersHasErrored: state.filtersHasErrored,
});

export const mapDispatchToProps = dispatch => ({
  fetchFilters: (items, queryParams, savedFilters) =>
    dispatch(filtersFetchData(items, queryParams, savedFilters)),
  saveSelections: (selections) => dispatch(savePanelMeetingAgendasSelections(selections)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PanelMeetingAgenda);
