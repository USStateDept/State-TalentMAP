import { useState } from 'react';
import { withRouter } from 'react-router';
import { useSelector } from 'react-redux';
import Picky from 'react-picky';
import FA from 'react-fontawesome';
import DatePicker from 'react-datepicker';
import ProfileSectionTitle from 'Components/ProfileSectionTitle';
import ListItem from 'Components/BidderPortfolio/BidControls/BidCyclePicker/ListItem';
// import { filtersFetchData } from 'actions/filters/filters';
import CycleManagementSearch from './CycleManagmentSearch';

const CycleManagement = () => {
  // const dispatch = useDispatch();
  // const genericFiltersIsLoading = useSelector(state => state.filtersIsLoading);
  // const userSelections = useSelector(state => state.panelMeetingAgendasSelections);
  // const [selectedBureaus, setSelectedBureaus] = useState(userSelections.selectedBureaus || []);

  const genericFilters = useSelector(state => state.filters);

  const genericFilters$ = genericFilters?.filters || [];
  const bureaus = genericFilters$.find(f => f?.item?.description === 'region');
  const bureausOptions = bureaus?.data.length
    ? [...new Set(bureaus.data)].sort(b => b.short_description) : [];

  const placeHolder = [{ bureau: 'Things' }, { bureau: 'Stuff' }];
  const [clearFilters, setClearFilters] = useState(false);

  const resetFilters = () => {
    setClearFilters(false);
  };

  const renderSelectionList = ({ items, selected, ...rest }) => {
    // console.log(selected);
    // const codeOrText = 'code';
    // const getSelected = item => !!selected.find(f => f[codeOrText] === item[codeOrText]);
    let queryProp = 'description';
    if (items?.[0]?.custom_description) queryProp = 'custom_description';
    else if (items?.[0]?.long_description) queryProp = 'long_description';
    // else if (codeOrText === 'text') queryProp = 'text';
    // else if (codeOrText === 'desc_text') queryProp = 'desc_text';
    // else if (codeOrText === 'abbr_desc_text') queryProp = 'abbr_desc_text';
    // else if (codeOrText === 'mic_desc_text') queryProp = 'mic_desc_text';
    // else if (has(items[0], 'name')) queryProp = 'name';
    return items.map(item =>
      (<ListItem
        item={item}
        // getIsSelected={getSelected}
        {...rest}
        key={item}
        queryProp={queryProp}
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

  return (
    <div className="cycle-management-page">
      <div className="usa-grid-full cm-upper-section">
        <div className="results-search-bar">

          <div className="usa-grid-full search-bar-container">
            <ProfileSectionTitle title="Cycle Search" icon="keyboard-o" />
            <CycleManagementSearch
              submitSearch={() => console.log('submit')}
              // onChange={setTextInputThrottled}
              // ref={childRef}
              // textSearch={textSearch}
              label="Search for a position"
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

            <div className="usa-width-one-whole cm-filters">

              <div className="cm-filter-div">
                <div className="label">Bureau</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Bureau(s)"
                  options={bureausOptions}
                  valueKey="code"
                  labelKey="long_description"
                  // value={selectedBureaus}
                  // onChange={setSelectedBureaus}
                />
              </div>
              <div className="cm-filter-div">
                <div className="label">ORG</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Bureau(s)"
                  options={placeHolder}
                  valueKey="id"
                />
              </div>
              <div className="cm-filter-div">
                <div className="label">Grade</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Bureau(s)"
                  options={placeHolder}
                  valueKey="id"
                />
              </div>
              <div className="cm-filter-div">
                <div className="label">Skills</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Bureau(s)"
                  options={placeHolder}
                  valueKey="id"
                />
              </div>
              <div className="cm-filter-div">
                <div className="label">Language</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Bureau(s)"
                  options={placeHolder}
                  valueKey="id"
                />
              </div>

            </div>
          </div>

        </div>
      </div>

      <div className="cm-lower-section">
        <div className="cycle-search-heading">
          {'Search for a Cycle'}
        </div>
        <div className="cycle-search-subheading">
          {'Search for an existing cycle'}
        </div>

        <div className="usa-width-one-whole cm-filters cm-lower-filters">
          <div className="cm-filter-div">
            <div className="label">Cycle</div>
            <Picky
              {...pickyProps}
              placeholder="Select Bureau(s)"
              options={placeHolder}
              valueKey="id"
            />
          </div>
          <div className="cm-filter-div">
            <div className="label">Status</div>
            <Picky
              {...pickyProps}
              placeholder="Select Bureau(s)"
              options={placeHolder}
              valueKey="id"
            />
          </div>
          <div className="cm-filter-div larger-date-picker">
            <div className="label">Cycle Date</div>
            <DatePicker
              dateFormat="MM/dd/yyyy"
              showIcon
              placeholderText="mm/dd/yyyy"
            />
            <FA name="calendar" />
          </div>
          <div className="cm-filter-div cycle-search-submit-button-wrapper">
            <button className="cycle-search-submit-button" type="submit" onClick={() => console.log('click')}>
              <FA name="search" />
              Search
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default withRouter(CycleManagement);
