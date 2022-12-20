import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filter, flatten, get, isEmpty, sortBy, throttle, uniqBy } from 'lodash';
import SelectForm from 'Components/SelectForm';
import PositionManagerSearch from 'Components/BureauPage/PositionManager/PositionManagerSearch';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import { EDIT_POSITION_DETAILS_PAGE_SIZES, EDIT_POSITION_DETAILS_SORT } from 'Constants/Sort';
import { editPositionDetailsFetchData, saveEditPositionDetailsSelections } from 'actions/editPositionDetails';
import Spinner from 'Components/Spinner';
import ListItem from 'Components/BidderPortfolio/BidControls/BidCyclePicker/ListItem';
import { filtersFetchData } from 'actions/filters/filters';
import FA from 'react-fontawesome';
import Picky from 'react-picky';
import ScrollUpButton from '../ScrollUpButton';
import PositionDetailsCard from '../EditPositionDetails/PositionDetailsCard/PositionDetailsCard';

const EditPositionDetails = () => {
  const childRef = useRef();
  const dispatch = useDispatch();

  const userSelections = useSelector(state => state.editPositionDetailsSelections);

  const [limit, setLimit] = useState(get(userSelections, 'limit') || EDIT_POSITION_DETAILS_PAGE_SIZES.defaultSize);
  const [ordering, setOrdering] = useState(get(userSelections, 'ordering') || EDIT_POSITION_DETAILS_SORT.defaultSort);

  const genericFiltersIsLoading = useSelector(state => state.filtersIsLoading);
  const genericFilters = useSelector(state => state.filters);

  const [selectedBureaus, setSelectedBureaus] = useState(get(userSelections, 'selectedBureaus') || []);
  const [selectedPosts, setSelectedPosts] = useState(get(userSelections, 'selectedPosts') || []);

  const genericFilters$ = get(genericFilters, 'filters') || [];
  const bureaus = genericFilters$.find(f => get(f, 'item.description') === 'region');
  const bureausOptions = uniqBy(sortBy(get(bureaus, 'data'), [(b) => b.short_description]));
  const posts = genericFilters$.find(f => get(f, 'item.description') === 'post');
  const postsOptions = uniqBy(sortBy(get(posts, 'data'), [(p) => p.city]), 'code');

  const [textInput, setTextInput] = useState(get(userSelections, 'textInput') || '');
  const [textSearch, setTextSearch] = useState(get(userSelections, 'textSearch') || '');

  const [clearFilters, setClearFilters] = useState(false);

  const pageSizes = EDIT_POSITION_DETAILS_PAGE_SIZES;
  const sorts = EDIT_POSITION_DETAILS_SORT;
  const isLoading = genericFiltersIsLoading;

  const getQuery = () => ({
    limit,
    ordering,
    // User Filters
    [get(bureaus, 'item.SelectionRef')]: selectedBureaus.map(bureauObject => (get(bureauObject, 'code'))),
    [get(posts, 'item.SelectionRef')]: selectedPosts.map(postObject => (get(postObject, 'code'))),

    // Free Text
    q: textInput || textSearch,
  });

  const getCurrentInputs = () => ({
    limit,
    ordering,
    selectedBureaus,
    selectedPosts,
    textInput,
    textSearch,
  });

  useEffect(() => {
    dispatch(editPositionDetailsFetchData(getQuery()));
    dispatch(saveEditPositionDetailsSelections(getCurrentInputs()));
    dispatch(filtersFetchData(genericFilters));
  }, []);

  const fetchAndSet = () => {
    const filters = [
      selectedBureaus,
      selectedPosts,
    ];
    if (isEmpty(filter(flatten(filters))) && isEmpty(textSearch)) {
      setClearFilters(false);
    } else {
      setClearFilters(true);
    }
    dispatch(editPositionDetailsFetchData(getQuery()));
    dispatch(saveEditPositionDetailsSelections(getCurrentInputs()));
  };

  useEffect(() => {
    fetchAndSet();
  }, [
    limit,
    ordering,
    selectedBureaus,
    selectedPosts,
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

  function renderSelectionList({ items, selected, ...rest }) {
    const getSelected = item => !!selected.find(f => f.code === item.code);
    let queryProp = 'description';
    if (get(items, '[0].custom_description', false)) queryProp = 'custom_description';
    else if (get(items, '[0].long_description', false)) queryProp = 'long_description';
    return items.map(item =>
      (<ListItem
        key={item.code}
        item={item}
        {...rest}
        queryProp={queryProp}
        getIsSelected={getSelected}
      />),
    );
  }

  const pickyProps = {
    numberDisplayed: 2,
    multiple: true,
    includeFilter: true,
    dropdownHeight: 255,
    renderList: renderSelectionList,
    includeSelectAll: true,
  };

  const resetFilters = () => {
    setSelectedBureaus([]);
    setSelectedPosts([]);
    childRef.current.clearText();
    setClearFilters(false);
  };

  const dummyPositionDetails = {
    id: '2561',
    status: null,
    status_code: 'OP',
    ted: '2025-05-12T21:12:12.854000Z',
    posted_date: '2022-10-26T21:12:12.854000Z',
    availability: {
      availability: null,
      reason: null,
    },
    position: {
      id: null,
      grade: '05',
      skill: 'ECON RESOURCES & COMMODITIES (5050)',
      skill_code: '5050',
      skill_secondary: 'CONSULAR AFFAIRS (3001)',
      skill_secondary_code: '3001',
      bureau: '(EUR) BUR OF EUROPEAN AFF AND EURASIAN AFFAIRS',
      bureau_code: '120000',
      bureau_short_desc: 'EUR',
      organization: '(A/LM/OPS/TTM) TRANSPORTATION & TRAVEL MANAGEMENT DIVISION',
      tour_of_duty: '2 YRS/HLRT/2 YRS',
      classifications: null,
      representation: null,
      availability: {
        availability: null,
        reason: null,
      },
      position_number: '55207000',
      title: 'INFORMATION MANAGEMENT SPEC',
      is_overseas: null,
      create_date: null,
      update_date: '2022-11-07T21:12:12.019000Z',
      update_user: null,
      effective_date: null,
      posted_date: '2022-10-26T21:12:12.854000Z',
      description: {
        id: null,
        last_editing_user: null,
        is_editable_by_user: null,
        date_created: null,
        date_updated: '2022-11-07T11:12:12.184000Z',
        content: '&#40;Updated June 20070  One of 3 IMS staff members working in the IPC. The incumbent reports directly to the IPO, but is required to perform his assigned duties without supervision on a regular basis when the IPO is absent or when acting as the duty communications officer. Depending on individual job assignments, the incumbent may be assigned to supervise an LE Staff telephone technician, 3 LE Staff telephone operators, or two mailroom staff members. Acts as the Classified LAN &#40;CLAN&#41; systems administrator. May serve as Comsec or WPAS custodian, primary or backup Nortel Switch Administrator/IMS telephone technician. IPC staff manages approximately 50 CX workstations with W2K Client on W2003 Server, the TERP5, CableXpress, Exchange 2000 Server, and the E&#38;E and HF Radio Program- POC IMO Bill Hylton - PHONE NUMBER: 907-8005',
        point_of_contact: null,
        website: null,
      },
      current_assignment: {
        user: null,
        user_perdet_seq_num: null,
        tour_of_duty: '2 YRS/HLRT/2 YRS',
        status: null,
        start_date: null,
        estimated_end_date: '2016-10-17T05:00:00Z',
      },
      commuterPost: {
        description: null,
        frequency: null,
      },
      post: {
        id: null,
        code: 'NI0140000',
        tour_of_duty: '2 YRS/HLRT/2 YRS',
        post_overview_url: {
          internal: 'http://localhost:4000/post/detail/5',
          external: 'http://localhost:4000/external/post/detail/5',
        },
        post_bidding_considerations_url: {
          internal: 'http://localhost:4000/post/postdatadetails/5',
          external: 'http://localhost:4000/external/post/postdatadetails/5',
        },
        cost_of_living_adjustment: null,
        differential_rate: 15,
        danger_pay: 35,
        rest_relaxation_point: null,
        has_consumable_allowance: null,
        has_service_needs_differential: null,
        obc_id: '5',
        location: {
          country: 'USA',
          code: 'NI0140000',
          city: 'Foxworth',
          state: 'Tennessee',
        },
      },
      latest_bidcycle: {
        id: 160,
        name: 'Details/Training 2019',
        cycle_start_date: null,
        cycle_deadline_date: null,
        cycle_end_date: null,
        active: null,
      },
      languages: [
        {
          language: 'Japanese',
          reading_proficiency: '1',
          spoken_proficiency: '1',
          representation: 'Japanese (JA) 1/1',
        },
        {
          language: 'Telugu',
          reading_proficiency: '1',
          spoken_proficiency: '1',
          representation: 'Telugu (TE) 1/1',
        },
      ],
    },
    bidcycle: {
      id: 160,
      name: 'Details/Training 2019',
      cycle_start_date: null,
      cycle_deadline_date: null,
      cycle_end_date: null,
      active: null,
      handshake_allowed_date: null,
    },
    bid_statistics: [
      {
        id: null,
        total_bids: 10,
        in_grade: 2,
        at_skill: 2,
        in_grade_at_skill: 2,
        has_handshake_offered: false,
        has_handshake_accepted: null,
      },
    ],
    bid_handshake: {
      active_handshake_perdet: null,
    },
    lead_handshake: {
      hs_status_code: null,
      bidder_hs_code: null,
      hs_cdo_indicator: false,
      hs_date_accepted: null,
      hs_date_declined: null,
      hs_date_offered: null,
      hs_date_revoked: null,
      hs_date_expiration: null,
    },
    unaccompaniedStatus: 'Fully Accompanied',
    isConsumable: false,
    isServiceNeedDifferential: true,
    isDifficultToStaff: false,
    isEFMInside: true,
    isEFMOutside: false,
    isHardToFill: false,
    has_short_list: false,
  };
  return (
    isLoading ?
      <Spinner type="bureau-filters" size="small" /> :
      <>
        <div className="edit-position-details-page">
          <div className="usa-grid-full edit-position-details-upper-section search-bar-container">
            <ProfileSectionTitle title="Position Details" icon="keyboard-o" />
            <PositionManagerSearch
              submitSearch={submitSearch}
              onChange={setTextInputThrottled}
              ref={childRef}
              textSearch={textSearch}
              label="Search for a Position"
              placeHolder="Search using Position Number or Position Title"
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
            <div className="usa-width-one-whole edit-position-details-filters">
              <div className="filter-div">
                <div className="label">Bureau:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Bureau(s)"
                  value={selectedBureaus}
                  options={bureausOptions}
                  onChange={setSelectedBureaus}
                  valueKey="code"
                  labelKey="long_description"
                  disabled={isLoading}
                />
              </div>
              <div className="filter-div">
                <div className="label">Location:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Location(s)"
                  value={selectedPosts}
                  options={postsOptions}
                  onChange={setSelectedPosts}
                  valueKey="code"
                  labelKey="custom_description"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
          {
            <div className="edit-position-details-results-controls">
              <SelectForm
                className="edit-position-details-results-select"
                id="edit-position-details-results-sort"
                options={sorts.options}
                label="Sort by:"
                defaultSort={ordering}
                onSelectOption={value => setOrdering(value.target.value)}
              />
              <SelectForm
                className="edit-position-details-results-select"
                id="edit-position-details-num-results"
                options={pageSizes.options}
                label="Results:"
                defaultSort={limit}
                onSelectOption={value => setLimit(value.target.value)}
              />
              <ScrollUpButton />
            </div>
          }
        </div>
        <div className="usa-width-one-whole position-manager-lower-section results-dropdown">
          <div className="usa-grid-full position-list">
            <PositionDetailsCard
              result={dummyPositionDetails}
              key={dummyPositionDetails.id}
            />
          </div>
        </div>
      </>
  );
};

EditPositionDetails.propTypes = {
};

EditPositionDetails.defaultProps = {
};

export default EditPositionDetails;
