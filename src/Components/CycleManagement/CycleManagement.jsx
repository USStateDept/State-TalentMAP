import { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Picky from 'react-picky';
import FA from 'react-fontawesome';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { isDate, startOfDay } from 'date-fns-v2';
import Spinner from 'Components/Spinner';
import ProfileSectionTitle from 'Components/ProfileSectionTitle';
import ListItem from 'Components/BidderPortfolio/BidControls/BidCyclePicker/ListItem';
import { filtersFetchData } from 'actions/filters/filters';
import { cycleManagementFetchData, saveCycleManagementSelections } from 'actions/cycleManagement';

const CycleManagement = () => {
  const dispatch = useDispatch();

  const genericFiltersIsLoading = useSelector(state => state.filtersIsLoading);
  const userSelections = useSelector(state => state.cycleManagementSelections);
  // use when adding cards
  // const cycleManagementDataLoading = useSelector(state => state.cycleManagementFetchDataLoading);
  const genericFilters = useSelector(state => state.filters);

  const [selectedCycles, setSelectedCycles] = useState(userSelections?.selectedCycles || []);
  const [selectedStatus, setSelectedStatus] = useState(userSelections?.selectedStatus || []);
  const [selectedDates, setSelectedDates] = useState(userSelections?.selectedDates || null);
  const [clearFilters, setClearFilters] = useState(false);

  const currentInputs = {
    selectedCycles,
    selectedStatus,
    selectedDates,
  };

  useEffect(() => {
    dispatch(filtersFetchData(genericFilters));
    dispatch(saveCycleManagementSelections(currentInputs));
  }, []);

  const getCurrentInputs = () => ({
    selectedCycles,
    selectedStatus,
    selectedDates,
  });

  const getQuery = () => ({
    'cycle-cycles': selectedCycles.map(bidCycleObject => (bidCycleObject?.id)),
    'cycle-statuses': selectedStatus.map(statusObject => (statusObject?.code)),
    'cycle-date-start': isDate(selectedDates?.[0]) ? startOfDay(selectedDates?.[0]).toJSON() : '',
    'cycle-date-end': isDate(selectedDates?.[1]) ? startOfDay(selectedDates?.[1]).toJSON() : '',
  });

  const fetchAndSet = () => {
    const filters = [
      selectedCycles,
      selectedStatus,
    ];
    if (filters.flat().length === 0 && !selectedDates) {
      setClearFilters(false);
    } else {
      setClearFilters(true);
    }
    dispatch(saveCycleManagementSelections(getCurrentInputs()));
    dispatch(cycleManagementFetchData(getQuery()));
  };

  useEffect(() => {
    fetchAndSet();
  }, [
    selectedCycles,
    selectedStatus,
    selectedDates,
  ]);

  // Hardcoded - find where to get this data
  const statusOptions = [
    { code: 1, name: 'Active' },
    { code: 2, name: 'Closed' },
    { code: 3, name: 'Merged' },
    { code: 4, name: 'Proposed' },
  ];

  const genericFilters$ = genericFilters?.filters || [];
  const bidCycle = genericFilters$.find(f => f?.item?.description === 'bidCycle');
  const bidCycleOptions = bidCycle?.data?.length
    ? [...new Set(bidCycle.data)].sort(b => b.name) : [];

  const resetFilters = () => {
    setSelectedCycles([]);
    setSelectedStatus([]);
    setSelectedDates(null);
    setClearFilters(false);
  };

  const renderSelectionList = ({ items, selected, ...rest }) => {
    let queryProp = 'description';
    if (items?.[0]?.custom_description) queryProp = 'custom_description';
    else if (items?.[0]?.long_description) queryProp = 'long_description';
    else if (items?.[0]?.name) queryProp = 'name';
    return items.map((item, index) => {
      const keyId = `${index}-${item}`;
      return (<ListItem
        item={item}
        {...rest}
        key={keyId}
        queryProp={queryProp}
      />);
    });
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
    genericFiltersIsLoading ? <Spinner type="bureau-filters" size="small" /> :
      (
        <div className="cycle-management-page">
          <div className="usa-grid-full cm-upper-section">

            <ProfileSectionTitle title="Cycle Search" icon="keyboard-o" />
            <div className="cycle-search-heading">
              {'Search for a Cycle'}
            </div>
            <div className="cycle-search-subheading">
              {'Search for an existing cycle'}
            </div>
            <div className="filterby-container">
              <div className="filterby-label">Filter by:</div>
              <span className="filterby-clear">
                {clearFilters &&
                  <button className="unstyled-button" onClick={resetFilters}>
                    <FA name="times" />
                        Clear Filters
                  </button>
                }
              </span>
            </div>

            <div className="usa-width-one-whole cm-filters">
              <div className="cm-filter-div">
                <div className="label">Cycle</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Bid Cycle(s)"
                  options={bidCycleOptions}
                  valueKey="id"
                  labelKey="name"
                  disabled={genericFiltersIsLoading}
                  onChange={setSelectedCycles}
                  value={selectedCycles}
                />
              </div>
              <div className="cm-filter-div">
                <div className="label">Status</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Status"
                  options={statusOptions}
                  valueKey="code"
                  labelKey="name"
                  onChange={setSelectedStatus}
                  value={selectedStatus}
                />
              </div>
              <div className="cm-filter-div">
                <div className="label">Cycle Date</div>
                <DateRangePicker
                  onChange={setSelectedDates}
                  value={selectedDates}
                  maxDetail="month"
                  calendarIcon={null}
                  showLeadingZeros
                />
              </div>
            </div>

          </div>

        </div>
      )
  );
};

export default withRouter(CycleManagement);
