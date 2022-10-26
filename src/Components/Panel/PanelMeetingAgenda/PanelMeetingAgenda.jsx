import FA from 'react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import SelectForm from 'Components/SelectForm';
import { useEffect, useRef, useState } from 'react';
import { filter, flatten, get, isEmpty, throttle } from 'lodash';
import { PANEL_MEETING_AGENDAS_PAGE_SIZES, PANEL_MEETING_AGENDAS_SORT } from 'Constants/Sort';
import PositionManagerSearch from 'Components/BureauPage/PositionManager/PositionManagerSearch';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import Picky from 'react-picky';
import ListItem from 'Components/BidderPortfolio/BidControls/BidCyclePicker/ListItem';
import { formatDate } from 'utilities';
import { panelMeetingAgendasFetchData, panelMeetingAgendasFiltersFetchData, savePanelMeetingAgendasSelections } from 'actions/panelMeetingAgendas';
import ScrollUpButton from '../../ScrollUpButton';
import BackButton from '../../BackButton';

const PanelMeetingAgenda = () => {
  const dispatch = useDispatch();
  const childRef = useRef();

  const preliminaryCutoff = formatDate('2024-05-20T16:00:00Z', 'MM/DD/YYYY HH:mm:ss');
  const addendumCutoff = formatDate('2024-05-21T17:00:00Z', 'MM/DD/YYYY HH:mm:ss');

  const panelMeetingAgendasFilters = useSelector(state => state.panelMeetingAgendasFilters);
  const panelMeetingsFiltersIsLoading = useSelector(state =>
    state.panelMeetingAgendasFiltersFetchDataLoading);

  const userSelections = useSelector(state => state.panelMeetingAgendasSelections);

  const [limit, setLimit] = useState(get(userSelections, 'limit') || PANEL_MEETING_AGENDAS_PAGE_SIZES.defaultSize);
  const [ordering, setOrdering] = useState(get(userSelections, 'ordering') || PANEL_MEETING_AGENDAS_SORT.defaultSort);

  const [selectedBureau, setSelectedBureau] = useState(get(userSelections, 'selectedBureau') || []);
  const [selectedCategory, setSelectedCategory] = useState(get(userSelections, 'selectedCategory') || []);
  const [selectedGrade, setSelectedGrade] = useState(get(userSelections, 'selectedGrade') || []);
  const [selectedItemAction, setSelectedItemAction] = useState(get(userSelections, 'selectedItemAction') || []);
  const [selectedItemStatus, setSelectedItemStatus] = useState(get(userSelections, 'selectedItemStatus') || []);
  const [selectedLanguage, setSelectedLanguage] = useState(get(userSelections, 'selectedLanguage') || []);
  const [selectedLocation, setSelectedLocation] = useState(get(userSelections, 'selectedLocation') || []);
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
    bureau: selectedBureau.map(meetingObject => (get(meetingObject, 'code'))),
    category: selectedCategory.map(meetingObject => (get(meetingObject, 'code'))),
    grade: selectedGrade.map(meetingObject => (get(meetingObject, 'code'))),
    itemAction: selectedItemAction.map(meetingObject => (get(meetingObject, 'code'))),
    itemStatus: selectedItemStatus.map(meetingObject => (get(meetingObject, 'code'))),
    language: selectedLanguage.map(meetingObject => (get(meetingObject, 'code'))),
    location: selectedLocation.map(meetingObject => (get(meetingObject, 'code'))),
    overseas: selectedOverseas.map(meetingObject => (get(meetingObject, 'code'))),
    remarks: selectedRemarks.map(meetingObject => (get(meetingObject, 'code'))),
    skill: selectedSkill.map(meetingObject => (get(meetingObject, 'code'))),

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
    selectedLocation,
    selectedOverseas,
    selectedRemarks,
    selectedSkill,
    textInput,
    textSearch,
  });

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
      selectedLocation,
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
    selectedLocation,
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

  const renderSelectionList = ({ items, selected, ...rest }) => {
    const getSelected = item => !!selected.find(f => f.code === item.code);
    return items.map(item =>
      (<ListItem
        key={item.code}
        item={item}
        {...rest}
        queryProp={'description'}
        getIsSelected={getSelected}
      />),
    );
  };

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
    setSelectedLocation([]);
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
        <div className="date-container">
          <div className="cutoff-date-container">
            <div>
              <span>
                Preliminary Cut-off:
              </span>
              <span className="preliminary-cut-off-date">
                {preliminaryCutoff}
              </span>
            </div>
            <div>
              <span>
                Addendum Cut-off:
              </span>
              <span className="addendum-cut-off-date">
                {addendumCutoff}
              </span>
            </div>
          </div>
        </div>
        <PositionManagerSearch
          submitSearch={submitSearch}
          onChange={setTextInputThrottled}
          ref={childRef}
          textSearch={textSearch}
          label="Find Panel Meeting Agenda Item"
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
              options={get(panelMeetingAgendasFilters, 'bureau', [])}
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
              options={get(panelMeetingAgendasFilters, 'category', [])}
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
              options={get(panelMeetingAgendasFilters, 'grade', [])}
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
              options={get(panelMeetingAgendasFilters, 'itemAction', [])}
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
              options={get(panelMeetingAgendasFilters, 'itemStatus', [])}
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
              options={get(panelMeetingAgendasFilters, 'language', [])}
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
              value={selectedLocation}
              options={get(panelMeetingAgendasFilters, 'location', [])}
              onChange={setSelectedLocation}
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
              options={get(panelMeetingAgendasFilters, 'overseas', [])}
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
              options={get(panelMeetingAgendasFilters, 'remarks', [])}
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
              options={get(panelMeetingAgendasFilters, 'skill', [])}
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

export default PanelMeetingAgenda;
