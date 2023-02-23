import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import InteractiveElement from 'Components/InteractiveElement';
import { filter, flatten, get, has, includes, isEmpty, sortBy, throttle, uniqBy } from 'lodash';
import PositionManagerSearch from 'Components/BureauPage/PositionManager/PositionManagerSearch';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import Picky from 'react-picky';
import ListItem from 'Components/BidderPortfolio/BidControls/BidCyclePicker/ListItem';
import { panelMeetingAgendasFetchData, panelMeetingAgendasFiltersFetchData, savePanelMeetingAgendasSelections } from 'actions/panelMeetingAgendas';
import { useDataLoader } from 'hooks';
import { filtersFetchData } from 'actions/filters/filters';
import Spinner from 'Components/Spinner';
import AgendaItemRow from 'Components/Agenda/AgendaItemRow';
// TODO: resolve if possible
// import { meetingCategoryMap } from 'src/Components/Panel/Constants';
import api from '../../../api';
import ScrollUpButton from '../../ScrollUpButton';
import BackButton from '../../BackButton';


const PanelMeetingAgendas = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { isAO, isCDO } = props;
  const pmSeqNum = get(props, 'match.params.pmID');

  const meetingCategoryMap = {
    R: 'Review',
    O: 'Off Panel',
    D: 'Discuss',
    S: 'Separations',
    X: 'Express',
    V: 'Volunteer Cable',
    A: 'Addendum',
    C: 'Addendum(Volunteer Cable)',
    P: 'Position Challenge',
    E: 'Employee Challenge',
  };

  const agendasCategorized = {
    Review: [],
    'Off Panel': [],
    Discuss: [],
    Separations: [],
    Express: [],
    'Volunteer Cable': [],
    Addendum: [],
    'Addendum(Volunteer Cable)': [],
    'Position Challenge': [],
    'Employee Challenge': [],
  };

  const childRef = useRef();
  const dispatch = useDispatch();

  // TO-DO: grab Scott's new data structure and component

  const genericFiltersIsLoading = useSelector(state => state.filtersIsLoading);

  const userSelections = useSelector(state => state.panelMeetingAgendasSelections);
  const genericFilters = useSelector(state => state.filters);
  const isAgendaLoading = useSelector(state => state.panelMeetingAgendasFetchDataLoading);
  const agendas = useSelector(state => state.panelMeetingAgendas);

  const genericFilters$ = get(genericFilters, 'filters') || [];
  const bureaus = genericFilters$.find(f => get(f, 'item.description') === 'region');
  const bureausOptions = uniqBy(sortBy(get(bureaus, 'data'), [(b) => b.short_description]));
  const grades = genericFilters$.find(f => get(f, 'item.description') === 'grade');
  const gradesOptions = uniqBy(get(grades, 'data'), 'code');
  const skills = genericFilters$.find(f => get(f, 'item.description') === 'skill');
  const skillsOptions = uniqBy(sortBy(get(skills, 'data'), [(s) => s.description]), 'code');
  const posts = genericFilters$.find(f => get(f, 'item.description') === 'post');
  const postsOptions = uniqBy(sortBy(get(posts, 'data'), [(p) => p.city]), 'code');
  const languages = genericFilters$.find(f => get(f, 'item.description') === 'language');
  const languagesOptions = uniqBy(sortBy(get(languages, 'data'), [(c) => c.custom_description]), 'custom_description');
  const { data: remarks, loading: remarksLoading } = useDataLoader(api().get, '/fsbid/agenda/remarks/');
  const remarksOptions = uniqBy(sortBy(get(remarks, 'data.results'), [(c) => c.text]), 'text');
  const { data: itemStatuses, loading: itemStatusLoading } = useDataLoader(api().get, '/fsbid/agenda/statuses/');
  const itemStatusesOptions = uniqBy(sortBy(get(itemStatuses, 'data.results'), [(c) => c.desc_text]), 'desc_text');
  const { data: itemActions, loading: itemActionLoading } = useDataLoader(api().get, '/fsbid/agenda/leg_action_types/');
  const itemActionsOptions = uniqBy(sortBy(get(itemActions, 'data.results'), [(c) => c.desc_text]), 'desc_text');
  const { data: categories, loading: categoryLoading } = useDataLoader(api().get, '/fsbid/panel/reference/categories/');
  const categoriesOptions = uniqBy(sortBy(get(categories, 'data.results'), [(c) => c.mic_desc_text]), 'mic_desc_text');

  const panelFiltersIsLoading =
    includes([remarksLoading, itemStatusLoading, itemActionLoading, categoryLoading], true);

  const [showPanelMeetingInfo, setShowPanelMeetingInfo] = useState(false);
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

  const isLoading = genericFiltersIsLoading || panelFiltersIsLoading || isAgendaLoading;

  const getQuery = () => ({
    [get(bureaus, 'item.selectionRef')]: selectedBureaus.map(bureauObject => (get(bureauObject, 'code'))),
    [get(grades, 'item.selectionRef')]: selectedGrades.map(gradeObject => (get(gradeObject, 'code'))),
    [get(skills, 'item.selectionRef')]: selectedSkills.map(skillObject => (get(skillObject, 'code'))),
    [get(posts, 'item.selectionRef')]: selectedPosts.map(postObject => (get(postObject, 'code'))),
    [get(languages, 'item.selectionRef')]: selectedLanguages.map(langObject => (get(langObject, 'code'))),
    itemActions: selectedItemActions.map(itemActionObject => (get(itemActionObject, 'desc_text'))),
    itemStatuses: selectedItemStatuses.map(itemStatusObject => (get(itemStatusObject, 'desc_text'))),
    categories: selectedCategories.map(categoryObject => (get(categoryObject, 'mic_desc_text'))),
    remarks: selectedRemarks.map(remarkObject => (get(remarkObject, 'text'))),
    q: textInput || textSearch,
  });

  const getCurrentInputs = () => ({
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

  function categorizeAgendas() {
    agendas.forEach(a => {
      agendasCategorized[meetingCategoryMap[get(a, 'meeting_category')]].push(a);
    });
    return agendasCategorized;
  }

  useEffect(() => {
    dispatch(panelMeetingAgendasFetchData(getQuery(), pmSeqNum));
    dispatch(panelMeetingAgendasFiltersFetchData());
    dispatch(filtersFetchData(genericFilters));
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
    dispatch(panelMeetingAgendasFetchData(getQuery(), pmSeqNum));
    dispatch(savePanelMeetingAgendasSelections(getCurrentInputs()));
  };

  useEffect(() => {
    fetchAndSet();
  }, [
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
    isLoading ?
      <Spinner type="bureau-filters" size="small" /> :
      <>
        <div className="panel-meeting-agenda-page">
          <div className="usa-grid-full panel-meeting-agenda-upper-section search-bar-container">
            <BackButton />
            <ProfileSectionTitle title="Panel Meeting Agenda" icon="tasks" />
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
                <div className="label">Category:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Category(-ies)"
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
                  placeholder="Select Grade(s)"
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
                  placeholder="Select Item Action(s)"
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
                  placeholder="Select Item Status(es)"
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
                  placeholder="Select Language(s)"
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
                  placeholder="Select Location(s)"
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
                  placeholder="Select Skill(s)"
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
          <ScrollUpButton />
          {
            <div className="panel-meeting-agendas-rows-container">
              <InteractiveElement title="Toggle Panel Information" onClick={() => setShowPanelMeetingInfo(!showPanelMeetingInfo)}>
                <div className={`pma-pm-info ${showPanelMeetingInfo ? 'pma-pm-info-expanded' : ''}`}>
                  <div className={`pma-pm-info-title ${showPanelMeetingInfo ? 'pma-pm-info-title-expanded' : ''}`}>
                    Panel Meeting Information
                  </div>
                </div>
              </InteractiveElement>
              {
                Object.keys(categorizeAgendas()).map(header => (
                  <>
                    <div className="pma-category-header">{header}</div>
                    {
                      agendasCategorized[header].map(result => (
                        <AgendaItemRow
                          key={result.id}
                          isCDO={isCDO}
                          isAIHView
                          agenda={result}
                          isPanelMeetingView
                        />
                      ))
                    }
                  </>
                ))
              }
            </div>
          }
        </div>
      </>
  );
};

PanelMeetingAgendas.propTypes = {
  isCDO: PropTypes.bool,
  isAO: PropTypes.bool,
};

PanelMeetingAgendas.defaultProps = {
  isCDO: false,
  isAO: false,
};

export default withRouter(PanelMeetingAgendas);
