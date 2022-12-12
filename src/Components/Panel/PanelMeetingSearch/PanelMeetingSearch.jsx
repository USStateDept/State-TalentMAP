import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FA from 'react-fontawesome';
import Picky from 'react-picky';
import { filter, flatten, get, includes, isEmpty, throttle } from 'lodash';
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
import PanelMeetingSearchRow from 'Components/Panel/PanelMeetingSearchRow/PanelMeetingSearchRow';
import Alert from 'Components/Alert';
import shortid from 'shortid';
import ScrollUpButton from '../../ScrollUpButton';

const PanelMeetingSearch = ({ isCDO }) => {
  const childRef = useRef();
  const dispatch = useDispatch();

  const panelMeetingsFilters = useSelector(state => state.panelMeetingsFilters);
  const panelMeetingsFiltersIsLoading = useSelector(state =>
    state.panelMeetingsFiltersFetchDataLoading);

  const panelMeetings$ = useSelector(state => state.panelMeetings);
  const panelMeetingsIsLoading = useSelector(state => state.panelMeetingsFetchDataLoading);
  // const panelMeetingsHasErrored = useSelector(state => state.panelMeetingsFetchDataErrored);
  const userSelections = useSelector(state => state.panelMeetingsSelections);

  const panelMeetings = get(panelMeetings$, 'results') || [];

  // TO-DO: complete integration based off of BE/WS data
  const [limit, setLimit] = useState(get(userSelections, 'limit') || PANEL_MEETINGS_PAGE_SIZES.defaultSize);
  const [ordering, setOrdering] = useState(get(userSelections, 'ordering') || PANEL_MEETINGS_SORT.defaultSort);

  const [selectedMeetingType, setSelectedMeetingType] = useState(get(userSelections, 'selectedMeetingType') || []);
  const [selectedMeetingDate, setSelectedMeetingDate] = useState(get(userSelections, 'selectedMeetingDate') || null);
  const [selectedMeetingStatus, setSelectedMeetingStatus] = useState(get(userSelections, 'selectedMeetingStatus') || []);
  const [textInput, setTextInput] = useState(get(userSelections, 'textInput') || '');
  const [textSearch, setTextSearch] = useState(get(userSelections, 'textSearch') || '');

  const [clearFilters, setClearFilters] = useState(false);
  const [exportIsLoading, setExportIsLoading] = useState(false);

  const fakePanelMeetings = [
    {
      meeting_type: 'Interdivisional',
      short_desc_text: 'ID',
      meeting_date: '2022-10-14T18:00:00Z',
      meeting_status: 'Initiated',
      preliminary_cutoff: '2022-10-11T16:00:00Z',
      addendum_cutoff: '2022-10-12T17:00:00Z',
    },
    {
      meeting_type: 'Mid-Level',
      short_desc_text: 'ML',
      meeting_date: '2023-07-10T18:00:00Z',
      meeting_status: 'Addendum',
      preliminary_cutoff: '2023-07-08T16:00:00Z',
      addendum_cutoff: '2023-07-09T17:00:00Z',
    },
    {
      meeting_type: 'Mid-Level',
      short_desc_text: 'ML',
      meeting_date: '2024-05-22T18:00:00Z',
      meeting_status: 'Post Panel',
      preliminary_cutoff: '2024-05-20T16:00:00Z',
      addendum_cutoff: '2024-05-21T17:00:00Z',
    },
    {
      meeting_type: 'Interdivisional',
      short_desc_text: 'ID',
      meeting_date: '2025-02-03T18:00:00Z',
      meeting_status: 'Review',
      preliminary_cutoff: '2025-02-01T16:00:00Z',
      addendum_cutoff: '2025-02-02T17:00:00Z',
    },
  ];

  const count = fakePanelMeetings.length;

  const isLoading = panelMeetingsFiltersIsLoading;
  const isPanelLoading = panelMeetingsIsLoading && isLoading;
  const exportDisabled = !panelMeetings.length;

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

  const noPanelMeetingResults = count <= 0;
  // eslint-disable-next-line max-len
  // const showOverlay = includes([panelMeetingsIsLoading, panelMeetingsHasErrored, panelMeetingResults], true);
  const showOverlay = includes([panelMeetingsIsLoading, noPanelMeetingResults], true);

  const getOverlay = () => {
    if (panelMeetingsIsLoading) {
      return <Spinner type="bureau-results" class="homepage-position-results" size="big" />;
    // } else if (panelMeetingsHasErrored) {
    // eslint-disable-next-line max-len
    //   toReturn = <Alert type="error" title="Error loading panel meetings" messages={[{ body: 'Please try again.' }]} />;
    } else if (noPanelMeetingResults) {
      return <Alert type="info" title="No results found" messages={[{ body: 'Please broaden your search criteria and try again.' }]} />;
    }
    return false;
  };

  return (
    isPanelLoading ?
      <Spinner type="bureau-filters" size="small" /> :
      <>
        <div className="panel-meeting-search-page">
          <div className="usa-grid-full panel-meeting-search-upper-section search-bar-container">
            <ProfileSectionTitle title="Panel Meeting Search" icon="comment" />
            <PositionManagerSearch
              submitSearch={submitSearch}
              onChange={setTextInputThrottled}
              ref={childRef}
              textSearch={textSearch}
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
                  placeholder="Select Meeting Type(s)"
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
                  placeholder="Select Meeting Status(es)"
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
          {
            !isPanelLoading &&
            <div className="panel-results-controls">
              <SelectForm
                className="panel-select-box"
                id="panel-search-results-sort"
                options={sorts.options}
                label="Sort by:"
                defaultSort={ordering}
                onSelectOption={value => setOrdering(value.target.value)}
              />
              <SelectForm
                className="panel-select-box"
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
              <ScrollUpButton />
            </div>
          }
          {
            showOverlay ?
              <div className="usa-width-one-whole empl-search-lower-section results-dropdown">
                {getOverlay()}
              </div>
              :
              <>
                <div className="usa-width-one-whole panel-search-lower-section results-dropdown">
                  {
                    <div className="panel-meeting-row">
                      {fakePanelMeetings.map(meeting => (
                      // TODO: include React keys once we have real data
                        <PanelMeetingSearchRow
                          key={shortid.generate()}
                          result={meeting}
                          isCDO={isCDO}
                        />
                      ))}
                    </div>
                  }
                </div>
              </>
          }
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
