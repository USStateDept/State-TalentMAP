import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { filter, flatten, get, has, includes, isEmpty, sortBy, uniqBy } from 'lodash';
import { format } from 'date-fns-v2';
import { panelMeetingAgendasFetchData, savePanelMeetingAgendasSelections } from 'actions/panelMeetingAgendas';
import { filtersFetchData } from 'actions/filters/filters';
import PositionManagerSearch from 'Components/BureauPage/PositionManager/PositionManagerSearch';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import ListItem from 'Components/BidderPortfolio/BidControls/BidCyclePicker/ListItem';
import Spinner from 'Components/Spinner';
import TotalResults from 'Components/TotalResults';
import ScrollUpButton from 'Components/ScrollUpButton';
import BackButton from 'Components/BackButton';
import PaginationWrapper from 'Components/PaginationWrapper';
import SelectForm from 'Components/SelectForm';
import { PANEL_MEETING } from 'Constants/PropTypes';
import { PANEL_MEETINGS_PAGE_SIZES } from 'Constants/Sort';
import { DEFAULT_TEXT } from 'Constants/SystemMessages';
import { useDataLoader } from 'hooks';
import Picky from 'react-picky';
import FA from 'react-fontawesome';
import AgendaItemRow from 'Components/Agenda/AgendaItemRow';
import PrintPanelMeetingAgendas from './PrintPanelMeetingAgendas';
import { meetingCategoryMap } from '../Constants';
import api from '../../../api';

const PanelMeetingAgendas = (props) => {
  const { isCDO, location } = props;

  const panelMeetings = location.state?.panelMeetings || [];
  const pmSeqNums = sortBy(panelMeetings.map(pm => pm.pmi_pm_seq_num), (n) => n);

  const agendasIsLoading = useSelector(state => state.panelMeetingAgendasFetchDataLoading);
  const agendas$ = useSelector(state => state.panelMeetingAgendas);
  const count = get(agendas$, 'count', 0);
  const agendas = get(agendas$, 'results', []);
  const agendasByPanelMeeting = panelMeetings.map((pm) => {
    // Filter agendas by panel meeting sequence number
    const filteredAgendas = agendas.filter((agenda) => agenda.pmi_pm_seq_num === pm.pmi_pm_seq_num);

    // Initialize an empty object with keys from meetingCategoryMap
    const categorizedAgendas = Object.keys(meetingCategoryMap).reduce((acc, key) => {
      acc[meetingCategoryMap[key]] = [];
      return acc;
    }, {});

    // Iterate over filteredAgendas and categorize them
    filteredAgendas.forEach((agenda) => {
      const category = meetingCategoryMap[agenda.pmi_mic_code];
      if (category) {
        categorizedAgendas[category].push(agenda);
      }
    });

    return {
      ...pm,
      agendas: categorizedAgendas,
    };
  });
  const isAllCategoriesEmpty = (agenda) => Object.values(agenda).every(category => category.length === 0);

  const childRef = useRef();
  const dispatch = useDispatch();

  const userSelections = useSelector(state => state.panelMeetingAgendasSelections);
  const [page, setPage] = useState(get(userSelections, 'page') || 1);
  const [limit, setLimit] = useState(get(userSelections, 'limit') || PANEL_MEETINGS_PAGE_SIZES.defaultSize);

  const genericFiltersIsLoading = useSelector(state => state.filtersIsLoading);
  const genericFilters = useSelector(state => state.filters);

  const genericFilters$ = get(genericFilters, 'filters') || [];
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
  const [printView, setPrintView] = useState(false);

  const isLoading = genericFiltersIsLoading || panelFiltersIsLoading;
  const getQuery = () => ({
    page,
    limit,
    ordering: ['-panel_date', 'agenda_id'],
    pmipmseqnum: pmSeqNums,
    orgs: selectedOrgs.map(orgObject => orgObject.code),
    categories: selectedCategories.map(categoryObject => categoryObject.mic_code),
    grades: selectedGrades.map(gradeObject => gradeObject.code),
    actions: selectedActions.map(actionObject => actionObject.code),
    statuses: selectedStatuses.map(statusObject => statusObject.code),
    languages: selectedLanguages.map(languageObject => languageObject.code),
    remarks: selectedRemarks.map(remarkObject => remarkObject.seq_num),
    skills: selectedSkills.map(skillObject => skillObject.code),
    freetext: textSearch,
  });

  const getCurrentInputs = () => ({
    selectedOrgs,
    selectedCategories,
    selectedGrades,
    selectedActions,
    selectedStatuses,
    selectedLanguages,
    selectedRemarks,
    selectedSkills,
    textSearch,
    limit,
    page,
  });

  const fetchAndSet = (resetPage = false) => {
    const filters = [
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
    } else {
      setClearFilters(true);
    }
    if (resetPage) {
      setPage(1);
    }
    dispatch(savePanelMeetingAgendasSelections(getCurrentInputs()));
    dispatch(panelMeetingAgendasFetchData(getQuery()));
  };

  useEffect(() => {
    dispatch(panelMeetingAgendasFetchData(getQuery()));
    dispatch(filtersFetchData(genericFilters));
  }, []);

  useEffect(() => {
    fetchAndSet(true);
  }, [
    selectedOrgs,
    selectedCategories,
    selectedGrades,
    selectedActions,
    selectedStatuses,
    selectedLanguages,
    selectedRemarks,
    selectedSkills,
    textSearch,
    limit,
  ]);

  useEffect(() => {
    fetchAndSet();
  }, [page]);

  function renderSelectionList({ items, selected, ...rest }) {
    let codeOrText = 'code';
    // only Remarks needs to use 'short_desc_text'
    if (has(items[0], 'seq_num')) {
      codeOrText = 'short_desc_text';
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
    const getSelected = item => !!selected.find(f => f[codeOrText] === item[codeOrText]);
    let queryProp = 'description';
    if (get(items, '[0].custom_description', false)) queryProp = 'custom_description';
    else if (has(items[0], 'name')) queryProp = 'name';
    else if (codeOrText === 'mic_desc_text') queryProp = 'mic_desc_text';
    else if (codeOrText === 'desc_text') queryProp = 'desc_text';
    else if (codeOrText === 'abbr_desc_text') queryProp = 'abbr_desc_text';
    else if (codeOrText === 'short_desc_text') queryProp = 'short_desc_text';
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

  const getOverlay = () => {
    let overlay;
    if (isLoading) overlay = <Spinner type="bureau-filters" size="small" />;
    if (printView) {
      overlay = (
        <PrintPanelMeetingAgendas
          closePrintView={() => setPrintView(false)}
          panelMeetingsWithAgendas={agendasByPanelMeeting}
        />
      );
    }
    return overlay;
  };

  return (
    getOverlay() ||
      <>
        <div className="panel-meeting-agenda-page position-search">
          <div className="usa-grid-full position-search--header search-bar-container">
            <BackButton />
            <ProfileSectionTitle title="Panel Meeting Agendas" icon="calendar" />
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
            <div className="usa-width-one-whole position-search--filters--panel-m-agendas">
              <div className="filter-div">
                <div className="label">Location/Org:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Organization(s)"
                  value={selectedOrgs}
                  options={organizationOptions}
                  onChange={setSelectedOrgs}
                  valueKey="code"
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
            <div className="panel-meeting-agendas-container">
              <div className="total-results results-dropdown">
                <TotalResults
                  total={count}
                  pageNumber={page}
                  pageSize={limit}
                  suffix="Results"
                  isHidden={agendasIsLoading}
                />
                <div className="panel-results-controls">
                  <SelectForm
                    id="panel-limit"
                    className="panel-select"
                    options={PANEL_MEETINGS_PAGE_SIZES.options}
                    label="Results:"
                    defaultSort={limit}
                    onSelectOption={e => setLimit(e.target.value)}
                    disabled={agendasIsLoading}
                  />
                  { <button onClick={() => setPrintView(true)} disabled={agendasIsLoading}>Print View</button> }                </div>
              </div>
              {
                agendasIsLoading ? <Spinner type="bureau-results" size="medium" /> :
                  <>
                    {
                      agendasByPanelMeeting.map((pm) => {
                        // Find panel meeting date
                        const panelMeetingDate = pm.panelMeetingDates.find(pmd => pmd.mdt_code === 'MEET') || DEFAULT_TEXT;
                        return (
                          <div className="pma-pm-container" key={pm.pmi_pm_seq_num}>
                            <div className="pm-header">
                              {get(pm, 'pmt_code')} {panelMeetingDate !== DEFAULT_TEXT ? format(new Date(panelMeetingDate.pmd_dttm), 'MM/dd/yy') : ''} - {get(pm, 'pms_desc_text')}
                            </div>
                            {
                              isAllCategoriesEmpty(pm.agendas) ? (
                                <div className="pm-empty-row">No agendas</div>
                              ) : (
                                <div className="pm-agendas-container">
                                  {
                                    Object.keys(pm.agendas).map((category) => (
                                      <div key={category} className="category-container">
                                        <div className="category-header">
                                          {category}
                                        </div>
                                        <div className="agenda-item-row-container">
                                          {
                                            pm.agendas[category].length > 0 ? (
                                              pm.agendas[category].map(agenda => (
                                                <AgendaItemRow
                                                  agenda={agenda}
                                                  key={agenda.id}
                                                  isCDO={isCDO}
                                                  isPanelMeetingView
                                                />
                                              ))
                                            ) : (
                                              <div className="ai-empty-row">(No Agendas)</div>
                                            )
                                          }
                                        </div>
                                      </div>
                                    ))
                                  }
                                </div>
                              )
                            }
                          </div>
                        );
                      })
                    }
                    <div className="usa-grid-full react-paginate">
                      <PaginationWrapper
                        pageSize={limit}
                        onPageChange={p => setPage(p.page)}
                        forcePage={page}
                        totalResults={count}
                      />
                    </div>
                  </>
              }
            </div>
          }
        </div>
      </>
  );
};

PanelMeetingAgendas.propTypes = {
  isCDO: PropTypes.bool,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    state: PropTypes.shape({
      panelMeetings: PropTypes.arrayOf(PANEL_MEETING),
    }),
  }).isRequired };

PanelMeetingAgendas.defaultProps = {
  isCDO: false,
};

export default withRouter(PanelMeetingAgendas);
