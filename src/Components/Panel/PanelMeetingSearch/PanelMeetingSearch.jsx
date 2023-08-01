import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FA from 'react-fontawesome';
import Picky from 'react-picky';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { filter, flatten, get, isEmpty } from 'lodash';
import { isDate, startOfDay } from 'date-fns-v2';
import { usePrevious } from 'hooks';
import { checkFlag } from 'flags';
import { panelMeetingsExport, panelMeetingsFetchData, panelMeetingsFiltersFetchData, savePanelMeetingsSelections } from 'actions/panelMeetings';
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
import { userHasPermissions } from '../../../utilities';

const useAddPanelMeeting = () => checkFlag('flags.panel_admin');

const PanelMeetingSearch = ({ isCDO }) => {
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
  const userProfile = useSelector(state => state.userProfile);
  const isSuperUser = userHasPermissions(['superuser'], userProfile?.permission_groups);

  const panelMeetings = get(panelMeetings$, 'results') || [];

  const [page, setPage] = useState(get(userSelections, 'page') || 1);
  const [limit, setLimit] = useState(get(userSelections, 'limit') || PANEL_MEETINGS_PAGE_SIZES.defaultSize);
  const [ordering, setOrdering] = useState(get(userSelections, 'ordering') || PANEL_MEETINGS_SORT.defaultSort);

  const prevPage = usePrevious(page);

  const [selectedMeetingType, setSelectedMeetingType] = useState(get(userSelections, 'selectedMeetingType') || []);
  const [selectedMeetingStatus, setSelectedMeetingStatus] = useState(get(userSelections, 'selectedMeetingStatus') || []);
  const [selectedPanelMeetDate, setSelectedPanelMeetDate] = useState(get(userSelections, 'selectedPanelMeetDate') || null);

  const meetingStatusFilterErrored = get(panelMeetingsFilters, 'panelStatuses') ? get(panelMeetingsFilters, 'panelStatuses').length === 0 : true;
  const meetingTypeFilterErrored = get(panelMeetingsFilters, 'panelTypes') ? get(panelMeetingsFilters, 'panelTypes').length === 0 : true;

  const [clearFilters, setClearFilters] = useState(false);
  const [exportIsLoading, setExportIsLoading] = useState(false);

  const count = get(panelMeetings$, 'count') || 0;

  const groupLoading = panelMeetingsIsLoading && panelMeetingsFiltersIsLoading;
  const exportDisabled = !panelMeetings.length;

  const pageSizes = PANEL_MEETINGS_PAGE_SIZES;
  const sorts = PANEL_MEETINGS_SORT;

  const getQuery = () => ({
    limit,
    page,
    ordering,
    type: selectedMeetingType.map(meetingObject => (get(meetingObject, 'code'))),
    status: selectedMeetingStatus.map(meetingObject => (get(meetingObject, 'code'))),
    // need to set to beginning of the day to avoid timezone issues
    'panel-date-start': isDate(get(selectedPanelMeetDate, '[0]')) ? startOfDay(get(selectedPanelMeetDate, '[0]')).toJSON() : '',
    'panel-date-end': isDate(get(selectedPanelMeetDate, '[1]')) ? startOfDay(get(selectedPanelMeetDate, '[1]')).toJSON() : '',
  });

  const getCurrentInputs = () => ({
    limit,
    page,
    ordering,
    selectedMeetingType,
    selectedMeetingStatus,
    selectedPanelMeetDate,
  });

  useEffect(() => {
    dispatch(panelMeetingsFetchData(getQuery()));
    dispatch(panelMeetingsFiltersFetchData());
  }, []);

  const fetchAndSet = (resetPage = false) => {
    const filters = [
      selectedMeetingType,
      selectedMeetingStatus,
      selectedPanelMeetDate,
    ];
    if (isEmpty(filter(flatten(filters)))) {
      setClearFilters(false);
    } else {
      setClearFilters(true);
    }
    if (resetPage) {
      setPage(1);
    }
    dispatch(panelMeetingsFetchData(getQuery()));
    dispatch(savePanelMeetingsSelections(getCurrentInputs()));
  };

  useEffect(() => {
    if (prevPage) {
      fetchAndSet(true);
    }
  }, [
    limit,
    ordering,
    selectedMeetingType,
    selectedMeetingStatus,
    selectedPanelMeetDate,
  ]);

  useEffect(() => {
    fetchAndSet(false);
  }, [
    page,
  ]);

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
    setSelectedPanelMeetDate(null);
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
      <div className="panel-meeting-search-page position-search">
        <div className="usa-grid-full position-search--header search-bar-container">
          <ProfileSectionTitle title="Panel Meeting Search" icon="calendar" />
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
          <div className="usa-width-one-whole position-search--filters--panel-m">
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
            <div className="filter-div">
              <div className="label">Panel Date:</div>
              <DateRangePicker
                onChange={setSelectedPanelMeetDate}
                value={selectedPanelMeetDate}
                maxDetail="month"
                calendarIcon={null}
                showLeadingZeros
              />
            </div>
          </div>
        </div>
        {
          !groupLoading &&
          <div className="results-dropdown controls-container">
            <TotalResults
              total={count}
              pageNumber={page}
              pageSize={limit}
              suffix="Results"
              isHidden={panelMeetingsIsLoading}
            />
            <div className="panel-results-controls">
              <SelectForm
                className="panel-select panel-sort"
                options={sorts.options}
                label="Sort by:"
                defaultSort={ordering}
                onSelectOption={e => setOrdering(e.target.value)}
                disabled={panelMeetingsIsLoading}
              />
              <SelectForm
                className="panel-select"
                options={pageSizes.options}
                label="Results:"
                defaultSort={limit}
                onSelectOption={e => setLimit(e.target.value)}
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
          (isSuperUser && useAddPanelMeeting) &&
          <div className="admin-panel-meeting-add-meeting">
            <Link to={'/profile/administrator/panel'}>
              <FA name="sitemap" className="admin-panel-meeting-add-meeting-icon" />
              {'Add Panel Meeting'}
            </Link>
          </div>
        }
        {
          overlay ||
            <div className="usa-width-one-whole panel-search-lower-section results-dropdown">
              {
                panelMeetings.map(pm => (
                  <PanelMeetingSearchRow
                    key={get(pm, 'pm_seq_num')}
                    pm={pm}
                    isCDO={isCDO}
                  />
                ))
              }
              <div className="usa-grid-full react-paginate">
                <PaginationWrapper
                  pageSize={limit}
                  onPageChange={p => setPage(p.page)}
                  forcePage={page}
                  totalResults={count}
                />
              </div>
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
