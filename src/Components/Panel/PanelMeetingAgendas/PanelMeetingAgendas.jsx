import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import InteractiveElement from 'Components/InteractiveElement';
import { filter, flatten, get, has, includes, isEmpty, sortBy, uniqBy } from 'lodash';
import PositionManagerSearch from 'Components/BureauPage/PositionManager/PositionManagerSearch';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import Picky from 'react-picky';
import ListItem from 'Components/BidderPortfolio/BidControls/BidCyclePicker/ListItem';
import { panelMeetingAgendasExport, panelMeetingAgendasFetchData,
  panelMeetingAgendasFiltersFetchData, savePanelMeetingAgendasSelections } from 'actions/panelMeetingAgendas';
import { panelMeetingsFetchData } from 'actions/panelMeetings';
import { useDataLoader } from 'hooks';
import { filtersFetchData } from 'actions/filters/filters';
import Fuse from 'fuse.js';
import Spinner from 'Components/Spinner';
import AgendaItemRow from 'Components/Agenda/AgendaItemRow';
import PanelMeetingTracker from 'Components/Panel/PanelMeetingTracker';
import { meetingCategoryMap } from 'Components/Panel/Constants';
import ExportButton from 'Components/ExportButton';
import api from '../../../api';
import ScrollUpButton from '../../ScrollUpButton';
import BackButton from '../../BackButton';

const fuseOptions = {
  shouldSort: false,
  findAllMatches: true,
  tokenize: true,
  useExtendedSearch: true,
  includeScore: false,
  threshold: 0.25,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    'status_short',
    'meeting_category',
    'remarks.seq_num',
    'assignment.pos_num',
    'assignment.pos_title',
    'legs.action',
    'legs.languages.code',
    'legs.grade',
    'legs.pos_num',
    'legs.pos_title',
    'legs.org',
    'creators.last_name',
    'creators.first_name',
    'creators.emp_user.emp_user_last_name',
    'creators.emp_user.emp_user_first_name',
    'updaters.last_name',
    'updaters.first_name',
    'updaters.emp_user.emp_user_last_name',
    'updaters.emp_user.emp_user_first_name',
    'user.current_assignment.position.bureau',
    'user.skills.code',
    'user.grade',
    'user.languages.code',
    'user.cdo.name',
    'user.name',
    'user.shortened_name',
    'pmi_official_item_num',
  ],
};

const PanelMeetingAgendas = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { isAO, isCDO } = props;

  const pmSeqNum = get(props, 'match.params.pmID');
  const panelMeetingData = useSelector(state => state.panelMeetings);
  const panelMeetingsIsLoading = useSelector(state => state.panelMeetingsFetchDataLoading);
  const panelMeetingsHasErrored = useSelector(state => state.panelMeetingsFetchDataErrored);

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

  // TODO: Re-enable skill and bureau picky once implemented

  const genericFiltersIsLoading = useSelector(state => state.filtersIsLoading);

  const userSelections = useSelector(state => state.panelMeetingAgendasSelections);
  const genericFilters = useSelector(state => state.filters);
  const isAgendaLoading = useSelector(state => state.panelMeetingAgendasFetchDataLoading);
  const agendas = useSelector(state => state.panelMeetingAgendas);
  const [agendas$, setAgendas$] = useState(agendas);

  const genericFilters$ = get(genericFilters, 'filters') || [];
  const bureaus = genericFilters$.find(f => get(f, 'item.description') === 'region');
  const bureausOptions = uniqBy(sortBy(get(bureaus, 'data'), [(b) => b.short_description]));
  const grades = genericFilters$.find(f => get(f, 'item.description') === 'grade');
  const gradesOptions = uniqBy(get(grades, 'data'), 'code');
  const skills = genericFilters$.find(f => get(f, 'item.description') === 'skill');
  const skillsOptions = uniqBy(sortBy(get(skills, 'data'), [(s) => s.description]), 'code');
  const languages = genericFilters$.find(f => get(f, 'item.description') === 'language');
  const languagesOptions = uniqBy(sortBy(get(languages, 'data'), [(c) => c.custom_description]), 'custom_description');
  const { data: remarks, loading: remarksLoading } = useDataLoader(api().get, '/fsbid/agenda/remarks/');
  const remarksOptions = uniqBy(sortBy(get(remarks, 'data.results'), [(c) => c.text]), 'text');
  const { data: statuses, loading: statusLoading } = useDataLoader(api().get, '/fsbid/agenda/statuses/');
  const statusesOptions = uniqBy(sortBy(get(statuses, 'data.results'), [(c) => c.desc_text]), 'desc_text');
  const { data: actions, loading: actionLoading } = useDataLoader(api().get, '/fsbid/agenda/leg_action_types/');
  const actionsOptions = uniqBy(sortBy(get(actions, 'data.results'), [(c) => c.desc_text]), 'desc_text');
  const { data: categories, loading: categoryLoading } = useDataLoader(api().get, '/fsbid/panel/reference/categories/');
  const categoriesOptions = uniqBy(sortBy(get(categories, 'data.results'), [(c) => c.mic_desc_text]), 'mic_desc_text');
  // Replace with real ref data endpoints
  const { data: orgs, loading: orgsLoading } = useDataLoader(api().get, '/fsbid/agenda_employees/reference/current-organizations/');
  const organizationOptions = sortBy(get(orgs, 'data'), [(o) => o.name]);

  const panelFiltersIsLoading =
    includes([orgsLoading, remarksLoading, statusLoading,
      actionLoading, categoryLoading], true);

  const [showPanelMeetingInfo, setShowPanelMeetingInfo] = useState(false);
  const [selectedBureaus, setSelectedBureaus] = useState(get(userSelections, 'selectedBureaus') || []);
  const [selectedOrgs, setSelectedOrgs] = useState(get(userSelections, 'selectedOrgs') || []);
  const [selectedCategories, setSelectedCategories] = useState(get(userSelections, 'selectedCategories') || []);
  const [selectedGrades, setSelectedGrades] = useState(get(userSelections, 'selectedGrades') || []);
  const [selectedActions, setSelectedActions] = useState(get(userSelections, 'selectedActions') || []);
  const [selectedStatuses, setSelectedStatuses] = useState(get(userSelections, 'selectedStatuses') || []);
  const [selectedLanguages, setSelectedLanguages] = useState(get(userSelections, 'selectedLanguages') || []);
  const [selectedRemarks, setSelectedRemarks] = useState(get(userSelections, 'selectedRemarks') || []);
  const [selectedSkills, setSelectedSkills] = useState(get(userSelections, 'selectedSkills') || []);
  const [textSearch, setTextSearch] = useState(get(userSelections, 'textSearch') || '');
  const [clearFilters, setClearFilters] = useState(false);
  const [exportIsLoading, setExportIsLoading] = useState(false);

  const isLoading = genericFiltersIsLoading || panelFiltersIsLoading || isAgendaLoading;

  const fuse$ = new Fuse(agendas, fuseOptions);

  const prepareFuseQuery = () => {
    const fuseQuery = [];

    const statuses$ = selectedStatuses.map(({ abbr_desc_text }) => (
      { status_short: abbr_desc_text }
    ));
    const categories$ = selectedCategories.map(({ mic_code }) => (
      { meeting_category: mic_code }
    ));
    const remarks$ = selectedRemarks.map(({ seq_num }) => (
      { 'remarks.seq_num': seq_num.toString() }
    ));
    const actions$ = selectedActions.map(({ abbr_desc_text }) => (
      { 'legs.action': abbr_desc_text }
    ));
    const languages$ = selectedLanguages.flatMap(({ code }) => ([
      { 'legs.languages.code': code },
      { 'user.languages.code': code },
    ]));
    const grades$ = selectedGrades.flatMap(({ code }) => ([
      { 'legs.grade': code },
      { 'user.grade': code },
    ]));
    const orgs$ = selectedOrgs.map(({ name }) => (
      { 'legs.org': `=${name}` }
    ));
    const bureaus$ = selectedBureaus.map(({ custom_description }) => (
      { 'user.current_assignment.position.bureau': custom_description }
    ));
    const skills$ = selectedSkills.map(({ code }) => (
      { 'user.skills.code': code }
    ));
    if (orgs$.length) { fuseQuery.push({ $or: orgs$ }); }
    if (grades$.length) { fuseQuery.push({ $or: grades$ }); }
    if (languages$.length) { fuseQuery.push({ $or: languages$ }); }
    if (actions$.length) { fuseQuery.push({ $or: actions$ }); }
    if (remarks$.length) { fuseQuery.push({ $or: remarks$ }); }
    if (categories$.length) { fuseQuery.push({ $or: categories$ }); }
    if (statuses$.length) { fuseQuery.push({ $or: statuses$ }); }
    if (bureaus$.length) { fuseQuery.push({ $or: bureaus$ }); }
    if (skills$.length) { fuseQuery.push({ $or: skills$ }); }
    if (textSearch) {
      const t = textSearch;
      // See Fuse extended search docs
      const freeTextLookups = [
        { 'assignment.pos_num': `^${t}` },
        { 'assignment.pos_title': t },
        { 'legs.pos_num': `^${t}` },
        { 'legs.pos_title': t },
        { 'creators.last_name': t },
        { 'creators.first_name': t },
        { 'creators.emp_user.emp_user_last_name': t },
        { 'creators.emp_user.emp_user_first_name': t },
        { 'updaters.last_name': t },
        { 'updaters.first_name': t },
        { 'updaters.emp_user.emp_user_last_name': t },
        { 'updaters.emp_user.emp_user_first_name': t },
        { 'user.cdo.name': t },
        { 'user.name': t },
        { 'user.shortened_name': t },
        { pmi_official_item_num: `^${t}` },
      ];
      fuseQuery.push({ $or: freeTextLookups });
    }
    return fuseQuery;
  };

  const search = () => setAgendas$(fuse$.search({
    $and: prepareFuseQuery(),
  }).map(({ item }) => item));

  const getCurrentInputs = () => ({
    selectedBureaus,
    selectedOrgs,
    selectedCategories,
    selectedGrades,
    selectedActions,
    selectedStatuses,
    selectedLanguages,
    selectedRemarks,
    selectedSkills,
    textSearch,
  });

  const fetchAndSet = () => {
    const filters = [
      selectedBureaus,
      selectedOrgs,
      selectedCategories,
      selectedGrades,
      selectedActions,
      selectedStatuses,
      selectedLanguages,
      selectedRemarks,
      selectedSkills,
    ];
    if (isEmpty(filter(flatten(filters))) && isEmpty(textSearch)) {
      setClearFilters(false);
      setAgendas$(agendas);
    } else {
      setClearFilters(true);
      search();
    }
    dispatch(savePanelMeetingAgendasSelections(getCurrentInputs()));
  };

  useEffect(() => {
    dispatch(panelMeetingAgendasFetchData({}, pmSeqNum));
    dispatch(panelMeetingAgendasFiltersFetchData());
    dispatch(filtersFetchData(genericFilters));
    dispatch(panelMeetingsFetchData({ id: pmSeqNum }));
  }, []);

  useEffect(() => {
    fetchAndSet();
  }, [agendas]);

  useEffect(() => {
    fetchAndSet();
  }, [
    selectedBureaus,
    selectedOrgs,
    selectedCategories,
    selectedGrades,
    selectedActions,
    selectedStatuses,
    selectedLanguages,
    selectedRemarks,
    selectedSkills,
    textSearch,
  ]);

  function categorizeAgendas() {
    agendas$.forEach(a => {
      agendasCategorized[meetingCategoryMap[get(a, 'meeting_category')]].push(a);
    });
    return agendasCategorized;
  }

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
    // Used for handshake-organizations - Replace with comprehensive org ref data
    if (has(items[0], 'name')) {
      codeOrText = 'name';
    }
    const getSelected = item => !!selected.find(f => f[codeOrText] === item[codeOrText]);
    let queryProp = 'description';
    if (get(items, '[0].custom_description', false)) queryProp = 'custom_description';
    else if (get(items, '[0].long_description', false)) queryProp = 'long_description';
    else if (codeOrText === 'text') queryProp = 'text';
    else if (codeOrText === 'desc_text') queryProp = 'desc_text';
    else if (codeOrText === 'abbr_desc_text') queryProp = 'abbr_desc_text';
    else if (codeOrText === 'mic_desc_text') queryProp = 'mic_desc_text';
    else if (codeOrText === 'name') queryProp = 'name';
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
    setSelectedOrgs([]);
    setSelectedCategories([]);
    setSelectedGrades([]);
    setSelectedActions([]);
    setSelectedStatuses([]);
    setSelectedLanguages([]);
    setSelectedRemarks([]);
    setSelectedSkills([]);
    setTextSearch('');
    childRef.current.clearText();
    setClearFilters(false);
  };

  const exportPanelMeetingAgendas = () => {
    if (!exportIsLoading) {
      setExportIsLoading(true);
      panelMeetingAgendasExport(pmSeqNum)
        .then(() => {
          setExportIsLoading(false);
        })
        .catch(() => {
          setExportIsLoading(false);
        });
    }
  };

  return (
    isLoading ?
      <Spinner type="bureau-filters" size="small" /> :
      <>
        <div className="panel-meeting-agenda-page">
          <div className="usa-grid-full panel-meeting-agenda-upper-section search-bar-container">
            <BackButton />
            <ProfileSectionTitle title="Panel Meetings Agendas" icon="calendar" />
            <PositionManagerSearch
              onChange={setTextSearch}
              ref={childRef}
              textSearch={textSearch}
              label="Find Agenda Item"
              placeHolder="Search for Agenda using Position, Name, or Official Item #"
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
                <div className="label">Organization:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Organization(s)"
                  value={selectedOrgs}
                  options={organizationOptions}
                  onChange={setSelectedOrgs}
                  valueKey="name"
                  labelKey="name"
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
                <div className="label">Action:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Action(s)"
                  value={selectedActions}
                  options={actionsOptions}
                  onChange={setSelectedActions}
                  valueKey="code"
                  labelKey="desc_text"
                  disabled={isLoading}
                />
              </div>
              <div className="filter-div">
                <div className="label">Status:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Item Status(es)"
                  value={selectedStatuses}
                  options={statusesOptions}
                  onChange={setSelectedStatuses}
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
                <div className="label">Remarks:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Remarks"
                  value={selectedRemarks}
                  options={remarksOptions}
                  onChange={setSelectedRemarks}
                  valueKey="seq_num"
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
                  {
                    !panelMeetingsIsLoading && !panelMeetingsHasErrored &&
                     <div className={`tracker-container ${showPanelMeetingInfo ? 'showTracker' : 'hideTracker'}`}>
                       <PanelMeetingTracker panelMeeting={get(panelMeetingData, 'results.[0]')} />
                     </div>
                  }
                </div>
              </InteractiveElement>
              <div className="total-results">
                <div>
                  {/* eslint-disable-next-line max-len */}
                  Viewing <strong>{agendas$.length}</strong> of <strong>{agendas.length}</strong> Total Results
                </div>
                <div className="export-button-container">
                  <ExportButton
                    onClick={exportPanelMeetingAgendas}
                    isLoading={exportIsLoading}
                  />
                </div>
              </div>
              {
                Object.keys(categorizeAgendas()).map(header => (
                  <>
                    <div className="pma-category-header">{header}</div>
                    <div className="agenda-item-row-container">
                      {
                        agendasCategorized[header].map(result => (
                          <AgendaItemRow
                            agenda={result}
                            key={result.id}
                            isCDO={isCDO}
                            isPanelMeetingView
                          />
                        ))
                      }
                    </div>
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
