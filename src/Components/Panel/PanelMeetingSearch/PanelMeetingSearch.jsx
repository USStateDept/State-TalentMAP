import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { checkFlag } from 'flags';
import FA from 'react-fontawesome';
import Picky from 'react-picky';
import { filter, flatten, isEmpty } from 'lodash';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import PositionManagerSearch from 'Components/BureauPage/PositionManager/PositionManagerSearch';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import ListItem from 'Components/BidderPortfolio/BidControls/BidCyclePicker/ListItem';

// eslint-disable-next-line no-unused-vars
const PanelMeetingSearch = ({ isCDO }) => {
  const childRef = useRef();

  const usePanelMeetingFilters = () => checkFlag('flags.panel_filters');
  const displayPanelMeetingFilters = usePanelMeetingFilters();

  // TO-DO: complete integration based off of WS data
  const [selectedMeetingType, setSelectedMeetingType] = useState([]);
  const [selectedMeetingDate, setSelectedMeetingDate] = useState(null);
  const [selectedMeetingStatus, setSelectedMeetingStatus] = useState([]);
  const [clearFilters, setClearFilters] = useState(false);

  const panelMeetingTypesOptions = [
    { description: 'ID', code: 'ID' },
    { description: 'ML', code: 'ML' },
  ];

  const panelMeetingStatusOptions = [
    { description: 'Initiated', code: 'initiated' },
    { description: 'Addendum', code: 'addendum' },
    { description: 'Post Panel', code: 'post_panel' },
  ];

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

  const fetchAndSet = () => {
    const filters = [
      selectedMeetingType,
      selectedMeetingDate,
      selectedMeetingStatus,
    ];
    if (isEmpty(filter(flatten(filters)))) {
      setClearFilters(false);
    } else {
      setClearFilters(true);
    }
  };

  useEffect(() => {
    fetchAndSet();
  }, [
    selectedMeetingType,
    selectedMeetingDate,
    selectedMeetingStatus,
  ]);

  const resetFilters = () => {
    setSelectedMeetingType([]);
    setSelectedMeetingDate(null);
    setSelectedMeetingStatus([]);
    childRef.current.clearText();
    setClearFilters(false);
  };

  return (
    <div>
      <div className="panel-meeting-search-page">
        <div className="panel-meeting-search-upper-section">
          <div className="results-search-bar results-single-search">
            <div className="usa-grid-full results-search-bar-container">
              <ProfileSectionTitle title="Panel Meeting Search" icon="comment" />
              <PositionManagerSearch
                // submitSearch={submitSearch}
                // onChange={setTextInputThrottled}
                ref={childRef}
                // textSearch={textSearch}
                label="Search for a Panel Meeting"
                placeHolder="Search using Panel Meeting Type, Date, or Status here"
              />
              {
                displayPanelMeetingFilters &&
          <>
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
                  options={panelMeetingTypesOptions}
                  onChange={setSelectedMeetingType}
                  valueKey="code"
                  labelKey="description"
                  // disabled={isLoading}
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
                  // disabled={isLoading}
                />
              </div>
              <div className="filter-div">
                <div className="label">Status:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Meeting Status"
                  value={selectedMeetingStatus}
                  options={panelMeetingStatusOptions}
                  onChange={setSelectedMeetingStatus}
                  valueKey="code"
                  labelKey="description"
                  // disabled={isLoading}
                />
              </div>
            </div>
          </>
              }
            </div>
          </div>
        </div>
      </div>
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
