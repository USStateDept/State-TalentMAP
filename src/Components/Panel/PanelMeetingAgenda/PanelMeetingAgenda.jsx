// import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import FA from 'react-fontawesome';
import Picky from 'react-picky';
import PositionManagerSearch from 'Components/BureauPage/PositionManager/PositionManagerSearch';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import ListItem from 'Components/BidderPortfolio/BidControls/BidCyclePicker/ListItem';
import { formatDate } from 'utilities';

const PanelMeetingAgenda = () => {
  const childRef = useRef();

  const preliminaryCutoff = formatDate('2024-05-20T16:00:00Z', 'MM/DD/YYYY HH:mm:ss');
  const addendumCutoff = formatDate('2024-05-21T17:00:00Z', 'MM/DD/YYYY HH:mm:ss');

  const [clearFilters, setClearFilters] = useState(false);

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
    setClearFilters(false);
  };

  return (
    <div className="panel-meeting-agenda-page">
      <div className="usa-grid-full panel-meeting-agenda-upper-section results-search-bar-container">
        <ProfileSectionTitle title="Panel Meeting Agenda" icon="tasks" />
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
        <PositionManagerSearch
          ref={childRef}
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
              valueKey="code"
              labelKey="description"
            />
          </div>
          <div className="filter-div">
            <div className="label">Category:</div>
            <Picky
              {...pickyProps}
              placeholder="Select Category"
              valueKey="code"
              labelKey="description"
            />
          </div>
          <div className="filter-div">
            <div className="label">Grade:</div>
            <Picky
              {...pickyProps}
              placeholder="Select Grade"
              valueKey="code"
              labelKey="description"
            />
          </div>
          <div className="filter-div">
            <div className="label">Item Action:</div>
            <Picky
              {...pickyProps}
              placeholder="Select Item Action"
              valueKey="code"
              labelKey="description"
            />
          </div>
          <div className="filter-div">
            <div className="label">Item Status:</div>
            <Picky
              {...pickyProps}
              placeholder="Select Item Status"
              valueKey="code"
              labelKey="description"
            />
          </div>
          <div className="filter-div">
            <div className="label">Language:</div>
            <Picky
              {...pickyProps}
              placeholder="Select Language"
              valueKey="code"
              labelKey="description"
            />
          </div>
          <div className="filter-div">
            <div className="label">Location (Org):</div>
            <Picky
              {...pickyProps}
              placeholder="Select Location (Org)"
              valueKey="code"
              labelKey="description"
            />
          </div>
          <div className="filter-div">
            <div className="label">Overseas:</div>
            <Picky
              {...pickyProps}
              placeholder="Select Overseas"
              valueKey="code"
              labelKey="description"
            />
          </div>
          <div className="filter-div">
            <div className="label">Remarks:</div>
            <Picky
              {...pickyProps}
              placeholder="Select Remarks"
              valueKey="code"
              labelKey="description"
            />
          </div>
          <div className="filter-div">
            <div className="label">Skill:</div>
            <Picky
              {...pickyProps}
              placeholder="Select Skill"
              valueKey="code"
              labelKey="description"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// PanelMeetingAgenda.propTypes = {
// };

// PanelMeetingAgenda.defaultProps = {
// };

export default PanelMeetingAgenda;
