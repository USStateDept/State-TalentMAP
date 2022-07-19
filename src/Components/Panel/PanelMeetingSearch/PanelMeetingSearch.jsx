import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FA from 'react-fontawesome';
import Picky from 'react-picky';
import { filter, flatten, get, isEmpty, throttle } from 'lodash';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { panelMeetingsExport, panelMeetingsFetchData, panelMeetingsFiltersFetchData, savePanelMeetingsSelections } from 'actions/panelMeetings';
import PositionManagerSearch from 'Components/BureauPage/PositionManager/PositionManagerSearch';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import ListItem from 'Components/BidderPortfolio/BidControls/BidCyclePicker/ListItem';
import SelectForm from 'Components/SelectForm';
import { PANEL_MEETINGS_PAGE_SIZES, PANEL_MEETINGS_SORT } from 'Constants/Sort';
import ExportButton from 'Components/ExportButton';
import { isDate, startOfDay } from 'date-fns-v2';
import Spinner from 'Components/Spinner';

// eslint-disable-next-line no-unused-vars
const PanelMeetingSearch = ({ isCDO }) => {
  const childRef = useRef();
  const dispatch = useDispatch();

  // TO-DO: complete integration based off of BE/WS data
  const [selectedMeetingType, setSelectedMeetingType] = useState([]);
  const [selectedMeetingDate, setSelectedMeetingDate] = useState(null);
  const [selectedMeetingStatus, setSelectedMeetingStatus] = useState([]);
  const [clearFilters, setClearFilters] = useState(false);
  const [exportIsLoading, setExportIsLoading] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [textSearch, setTextSearch] = useState('');

  const panelMeetings$ = useSelector(state => state.panelMeetings);
  const panelMeetingsFilters = useSelector(state => state.panelMeetingsFilters);
  const panelMeetingsFiltersIsLoading = useSelector(state =>
    state.panelMeetingsFiltersFetchDataLoading);

  const panelMeetings = get(panelMeetings$, 'results', []);

  const isLoading = panelMeetingsFiltersIsLoading;
  const exportDisabled = panelMeetings.length <= 0;

  const [limit, setLimit] = useState(PANEL_MEETINGS_PAGE_SIZES.defaultSize);
  const [ordering, setOrdering] = useState(PANEL_MEETINGS_SORT.defaultSort);

  const pageSizes = PANEL_MEETINGS_PAGE_SIZES;
  const sorts = PANEL_MEETINGS_SORT;

  const getQuery = () => ({
    limit,
    ordering,
    // User Filters
    panelMeetingsTypes: selectedMeetingType.map(meetingObject => (get(meetingObject, 'code'))),
    panelMeetingsStatus: selectedMeetingStatus.map(meetingObject => (get(meetingObject, 'code'))),

    // need to set to beginning of the day to avoid timezone issues
    'pmd-start': isDate(get(selectedMeetingDate, '[0]')) ? startOfDay(get(selectedMeetingDate, '[0]')).toJSON() : '',
    'pmd-end': isDate(get(selectedMeetingDate, '[1]')) ? startOfDay(get(selectedMeetingDate, '[1]')).toJSON() : '',

    // Free Text
    q: textInput || textSearch,
  });

  const getCurrentInputs = () => ({
    limit,
    ordering,
    selectedMeetingType,
    selectedMeetingStatus,
    selectedMeetingDate,
    textInput,
    textSearch,
  });

  useEffect(() => {
    dispatch(panelMeetingsFetchData(getQuery()));
    dispatch(savePanelMeetingsSelections(getCurrentInputs()));
  }, []);

  useEffect(() => {
    dispatch(panelMeetingsFiltersFetchData());
  }, []);

  const fetchAndSet = () => {
    const filters = [
      selectedMeetingType,
      selectedMeetingDate,
      selectedMeetingStatus,
    ];
    if (isEmpty(filter(flatten(filters))) && isEmpty(textSearch)) {
      setClearFilters(false);
    } else {
      setClearFilters(true);
    }
    dispatch(panelMeetingsFetchData(getQuery()));
    dispatch(savePanelMeetingsSelections(getCurrentInputs()));
  };

  useEffect(() => {
    fetchAndSet();
  }, [
    limit,
    ordering,
    selectedMeetingType,
    selectedMeetingDate,
    selectedMeetingStatus,
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

  const exportPanelMeetings = () => {
    if (!exportIsLoading) {
      setExportIsLoading(true);
      panelMeetingsExport(getQuery())
        .then(() => {
          setExportIsLoading(false);
        })
        .catch(() => {
          setExportIsLoading(false);
        });
    }
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
    setSelectedMeetingType([]);
    setSelectedMeetingDate(null);
    setSelectedMeetingStatus([]);
    setTextSearch('');
    childRef.current.clearText();
    setClearFilters(false);
  };

  return (
    isLoading ?
      <Spinner type="bureau-filters" size="small" /> :
      <>
        <div className="panel-meeting-search-page">
          <div className="panel-meeting-search-upper-section">
            <div className="results-search-bar results-single-search">
              <div className="usa-grid-full results-search-bar-container">
                <ProfileSectionTitle title="Panel Meeting Search" icon="comment" />
                <PositionManagerSearch
                  submitSearch={submitSearch}
                  onChange={setTextInputThrottled}
                  ref={childRef}
                  label="Search for a Panel Meeting"
                  placeHolder="Search using Panel ID"
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
                <div className="usa-width-one-whole panel-meeting-search-filters">
                  <div className="filter-div">
                    <div className="label">Type:</div>
                    <Picky
                      {...pickyProps}
                      placeholder="Select Meeting Type"
                      value={selectedMeetingType}
                      options={get(panelMeetingsFilters, 'panelMeetingsTypesOptions', [])}
                      onChange={setSelectedMeetingType}
                      valueKey="code"
                      labelKey="description"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="filter-div">
                    <div className="label label-date">Meeting Date:</div>
                    <DateRangePicker
                      onChange={setSelectedMeetingDate}
                      value={selectedMeetingDate}
                      maxDetail="month"
                      calendarIcon={null}
                      showLeadingZeros
                      disabled={isLoading}
                    />
                  </div>
                  <div className="filter-div">
                    <div className="label">Status:</div>
                    <Picky
                      {...pickyProps}
                      placeholder="Select Meeting Status"
                      value={selectedMeetingStatus}
                      options={get(panelMeetingsFilters, 'panelMeetingsStatusOptions', [])}
                      onChange={setSelectedMeetingStatus}
                      valueKey="code"
                      labelKey="description"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
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
            <div className="export-button-container">
              <ExportButton
                onClick={exportPanelMeetings}
                isLoading={exportIsLoading}
                disabled={exportDisabled}
              />
            </div>
          </div>
        </div>
      </>
  );
};

PanelMeetingSearch.propTypes = {
  isCDO: PropTypes.bool,
};

PanelMeetingSearch.defaultProps = {
  isCDO: false,
};

export default PanelMeetingSearch;
