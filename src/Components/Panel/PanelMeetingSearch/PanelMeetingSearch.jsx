/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { checkFlag } from 'flags';
import FA from 'react-fontawesome';
import Picky from 'react-picky';
import { get, has } from 'lodash';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import PositionManagerSearch from 'Components/BureauPage/PositionManager/PositionManagerSearch';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import ListItem from 'Components/BidderPortfolio/BidControls/BidCyclePicker/ListItem';

const PanelMeetingSearch = ({ isCDO }) => {
  const childRef = useRef();

  const usePanelMeetingFilters = () => checkFlag('flags.panel_filters');
  const displayPanelMeetingFilters = usePanelMeetingFilters();
  // const text = isCDO ? 'yes CDO' : 'no AO';

  // TO-DO: complete integration based off of WS data
  const [panelMeetingType, setPanelMeetingType] = useState([]);
  const [panelMeetingDate, setPanelMeetingDate] = useState(null);
  const [panelMeetingStatus, setPanelMeetingStatus] = useState([]);


  const renderSelectionList = ({ items, selected, ...rest }) => {
    let codeOrID = 'code';
    // only Cycle needs to use 'id'
    if (!has(items[0], 'code')) {
      codeOrID = 'id';
    }
    const getSelected = item => !!selected.find(f => f[codeOrID] === item[codeOrID]);
    let queryProp = 'description';
    if (get(items, '[0].custom_description', false)) queryProp = 'custom_description';
    else if (get(items, '[0].long_description', false)) queryProp = 'long_description';
    else if (get(items, '[0].description', false)) queryProp = 'description';
    else queryProp = 'name';
    return items.map(item =>
      (<ListItem
        key={item[codeOrID]}
        item={item}
        {...rest}
        queryProp={queryProp}
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

  // Controls
  const [clearFilters, setClearFilters] = useState(false);


  const resetFilters = () => {
    // setPanelMeetingType([]);
    // setPanelMeetingStatus([]);
    // setSelectedTED(null);
    childRef.current.clearText();
    setClearFilters(false);
  };


  const panelMeetingTypesOptions = [
    { description: 'ID', code: 'ID' },
    { description: 'ML', code: 'ML' },
  ];

  const panelMeetingStatusOptions = [
    { description: 'Initiated', code: 'initiated' },
    { description: 'Addendum', code: 'addendum' },
    { description: 'Post Panel', code: 'post_panel' },
  ];

  return (
    <div>
      <div className="empl-search-page">
        <div className="usa-grid-full empl-search-upper-section">
          <div className="results-search-bar padded-main-content results-single-search homepage-offset">
            <div className="usa-grid-full results-search-bar-container">
              <ProfileSectionTitle title="Panel Meeting Search" icon="comment" />
              <PositionManagerSearch
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
            <div className="usa-width-one-whole empl-search-filters results-dropdown">
              <div className="filter-div handshake-filter-div">
                <div className="label">Type:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Panel Meeting Type"
                  value={panelMeetingType}
                  options={panelMeetingTypesOptions}
                  onChange={setPanelMeetingType}
                  valueKey="code"
                  labelKey="description"
                  // disabled={isLoading}
                />
              </div>
              <div className="filter-div">
                <div className="label">Meeting Date:</div>
                <DateRangePicker
                  onChange={setPanelMeetingDate}
                  value={panelMeetingDate}
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
                  placeholder="Select Panel Meeting Status"
                  value={panelMeetingStatus}
                  options={panelMeetingStatusOptions}
                  onChange={setPanelMeetingStatus}
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
