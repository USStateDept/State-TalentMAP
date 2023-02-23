import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FA from 'react-fontawesome';
import Picky from 'react-picky';
import { filter, flatten, get, isEmpty } from 'lodash';
import { panelMeetingsExport, panelMeetingsFetchData, panelMeetingsFiltersFetchData, savePanelMeetingsSelections } from 'actions/panelMeetings';
import PositionManagerSearch from 'Components/BureauPage/PositionManager/PositionManagerSearch';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import ListItem from 'Components/BidderPortfolio/BidControls/BidCyclePicker/ListItem';
import SelectForm from 'Components/SelectForm';
import { PANEL_MEETINGS_PAGE_SIZES, PANEL_MEETINGS_SORT } from 'Constants/Sort';
import ExportButton from 'Components/ExportButton';
import Spinner from 'Components/Spinner';
import PanelMeetingSearchRow from 'Components/Panel/PanelMeetingSearchRow/PanelMeetingSearchRow';
import Alert from 'Components/Alert';
import PaginationWrapper from 'Components/PaginationWrapper';
import TotalResults from 'Components/TotalResults';
import ScrollUpButton from '../../ScrollUpButton';

const PanelMeetingSearch = ({ isCDO }) => {
  const childRef = useRef();
  const dispatch = useDispatch();

  const panelMeetingsFilters = useSelector(state => state.panelMeetingsFilters);
  const panelMeetingsFiltersIsLoading = useSelector(state =>
    state.panelMeetingsFiltersFetchDataLoading);
  const panelMeetingsFiltersHasErrored = useSelector(state =>
    state.panelMeetingsFiltersFetchDataErrored);

  const panelMeetings$ = useSelector(state => state.panelMeetings);
  const panelMeetingsIsLoading = useSelector(state => state.panelMeetingsFetchDataLoading);
  const panelMeetingsHasErrored = useSelector(state => state.panelMeetingsFetchDataErrored);
  const userSelections = useSelector(state => state.panelMeetingsSelections);

  const panelMeetings = get(panelMeetings$, 'results') || [];

  const [page, setPage] = useState(get(userSelections, 'page') || 1);
  const [limit, setLimit] = useState(get(userSelections, 'limit') || PANEL_MEETINGS_PAGE_SIZES.defaultSize);
  const [ordering, setOrdering] = useState(get(userSelections, 'ordering') || PANEL_MEETINGS_SORT.defaultSort);

  const [selectedMeetingType, setSelectedMeetingType] = useState(get(userSelections, 'selectedMeetingType') || []);
  const [selectedMeetingStatus, setSelectedMeetingStatus] = useState(get(userSelections, 'selectedMeetingStatus') || []);
  const [textSearch, setTextSearch] = useState(get(userSelections, 'textSearch') || '');

  const meetingStatusFilterErrored = get(panelMeetingsFilters, 'panelStatuses') ? get(panelMeetingsFilters, 'panelStatuses').length === 0 : true;
  const meetingTypeFilterErrored = get(panelMeetingsFilters, 'panelTypes') ? get(panelMeetingsFilters, 'panelTypes').length === 0 : true;

  const [clearFilters, setClearFilters] = useState(false);
  const [exportIsLoading, setExportIsLoading] = useState(false);

  const count = panelMeetings.length;

  const groupLoading = panelMeetingsIsLoading && panelMeetingsFiltersIsLoading;
  const exportDisabled = !panelMeetings.length;

  const pageSizes = PANEL_MEETINGS_PAGE_SIZES;
  const sorts = PANEL_MEETINGS_SORT;

  const getQuery = () => ({
    limit,
    ordering,
    type: selectedMeetingType.map(meetingObject => (get(meetingObject, 'code'))),
    status: selectedMeetingStatus.map(meetingObject => (get(meetingObject, 'code'))),
    id: textSearch,
  });

  const getCurrentInputs = () => ({
    limit,
    ordering,
    selectedMeetingType,
    selectedMeetingStatus,
    textSearch,
  });

  useEffect(() => {
    dispatch(panelMeetingsFetchData(getQuery()));
    dispatch(panelMeetingsFiltersFetchData());
  }, []);

  const fetchAndSet = () => {
    const filters = [
      selectedMeetingType,
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
    selectedMeetingStatus,
    textSearch,
  ]);

  function submitSearch(text) {
    setTextSearch(text);
  }

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
        queryProp={'text'}
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
    setSelectedMeetingStatus([]);
    setTextSearch('');
    childRef.current.clearText();
    setClearFilters(false);
  };

  const noPanelMeetingResults = count <= 0;

  const getOverlay = () => {
    let toReturn;
    if (panelMeetingsIsLoading) {
      toReturn = <Spinner type="bureau-results" class="homepage-position-results" size="big" />;
    } else if (panelMeetingsHasErrored || panelMeetingsFiltersHasErrored) {
      toReturn = <Alert type="error" title="Error loading panel meetings" messages={[{ body: 'Please try again.' }]} />;
    } else if (noPanelMeetingResults) {
      toReturn = <Alert type="info" title="No results found" messages={[{ body: 'Please broaden your search criteria and try again.' }]} />;
    }
    if (toReturn) {
      return <div className="usa-width-one-whole empl-search-lower-section results-dropdown">{toReturn}</div>;
    }
    return false;
  };

  const overlay = getOverlay();

  return (
    groupLoading ?
      <Spinner type="bureau-results" class="homepage-position-results" size="big" /> :
      <div className="panel-meeting-search-page">
        <div className="usa-grid-full panel-meeting-search-upper-section search-bar-container">
          <ProfileSectionTitle title="Panel Meeting Search" icon="comment" />
          <PositionManagerSearch
            submitSearch={submitSearch}
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
                options={get(panelMeetingsFilters, 'panelTypes')}
                onChange={setSelectedMeetingType}
                valueKey="code"
                labelKey="text"
                disabled={meetingTypeFilterErrored || panelMeetingsFiltersHasErrored}
              />
            </div>
            <div className="filter-div">
              <div className="label">Status:</div>
              <Picky
                {...pickyProps}
                placeholder="Select Meeting Status(es)"
                value={selectedMeetingStatus}
                options={get(panelMeetingsFilters, 'panelStatuses')}
                onChange={setSelectedMeetingStatus}
                valueKey="code"
                labelKey="text"
                disabled={meetingStatusFilterErrored || panelMeetingsFiltersHasErrored}
              />
            </div>
          </div>
        </div>
        {
          !groupLoading &&
          <div className="usa-width-one-whole results-dropdown bureau-controls-container">
            <TotalResults
              total={count}
              pageNumber={page}
              pageSize={limit}
              suffix="Results"
              isHidden={panelMeetingsIsLoading}
            />
            <div className="panel-results-controls">
              <SelectForm
                className="panel-select-box"
                id="panel-search-results-sort"
                options={sorts.options}
                label="Sort by:"
                defaultSort={ordering}
                onSelectOption={value => setOrdering(value.target.value)}
                disabled={panelMeetingsIsLoading}
              />
              <SelectForm
                className="panel-select-box"
                id="panel-search-num-results"
                options={pageSizes.options}
                label="Results:"
                defaultSort={limit}
                onSelectOption={value => setLimit(value.target.value)}
                disabled={panelMeetingsIsLoading}
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
          </div>
        }
        {
          overlay ||
            <div className="usa-width-one-whole panel-search-lower-section results-dropdown">
              {
                <div className="panel-meeting-row">
                  {panelMeetings.map(pm => (
                    <PanelMeetingSearchRow
                      key={get(pm, 'pm_seq_num')}
                      pm={pm}
                      isCDO={isCDO}
                    />
                  ))}
                </div>
              }
            </div>
        }
        {
          !panelMeetingsIsLoading &&
          <div className="usa-grid-full react-paginate panel-meeting-search-pagination-controls">
            <PaginationWrapper
              pageSize={limit}
              onPageChange={p => setPage(p.page)}
              forcePage={page}
              totalResults={count}
            />
          </div>
        }
      </div>
  );
};

PanelMeetingSearch.propTypes = {
  isCDO: PropTypes.bool,
};

PanelMeetingSearch.defaultProps = {
  isCDO: false,
};

export default PanelMeetingSearch;
