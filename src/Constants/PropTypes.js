import PropTypes from 'prop-types';
import {
  APPROVED_PROP,
  CLOSED_PROP,
  DECLINED_PROP,
  HAND_SHAKE_DECLINED_PROP,
  HAND_SHAKE_OFFERED_PROP,
  IN_PANEL_PROP,
} from './BidData';
import SetType from './SetType';

export const STRING_OR_BOOL = PropTypes.oneOfType([PropTypes.string, PropTypes.bool]);

export const LANGUAGES = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number,
    language: PropTypes.string,
    reading_proficiency: PropTypes.string,
    spoken_proficiency: PropTypes.string,
    representation: PropTypes.string,
  }),
);

export const LANGUAGE_QUALIFICATIONS = PropTypes.shape({
  id: PropTypes.number,
  representation: PropTypes.string,
});

export const POST_MISSION_DATA = PropTypes.shape({
  id: PropTypes.number,
  tour_of_duty: PropTypes.string,
  code: PropTypes.string,
  description: PropTypes.string,
  cost_of_living_adjustment: PropTypes.number,
  differential_rate: PropTypes.number,
  danger_pay: PropTypes.number,
  rest_relaxation_point: PropTypes.string,
  has_consumable_allowance: PropTypes.bool,
  has_service_needs_differential: PropTypes.bool,
  languages: LANGUAGES,
});

// TODO - these are the same, but other data will be added later
export const POST_DETAILS = POST_MISSION_DATA;

export const POST_DETAILS_ARRAY = PropTypes.arrayOf(POST_DETAILS);

export const POSITION_DETAILS = PropTypes.shape({
  position: PropTypes.shape({
    id: PropTypes.number,
    grade: PropTypes.string,
    skill: PropTypes.string,
    bureau: PropTypes.string,
    organization: PropTypes.string,
    representation: PropTypes.string,
    classifications: PropTypes.arrayOf(PropTypes.string),
    position_number: PropTypes.string,
    title: PropTypes.string,
    is_overseas: PropTypes.bool,
    create_date: PropTypes.string,
    update_date: PropTypes.string,
    posted_date: PropTypes.string,
    description: PropTypes.shape({
      id: PropTypes.number,
      last_editing_user: PropTypes.string,
      date_created: PropTypes.string,
      date_updated: PropTypes.string,
      content: PropTypes.string,
      point_of_contact: PropTypes.string,
      website: PropTypes.string,
    }),
    post: POST_MISSION_DATA,
    languages: LANGUAGES,
    current_assignment: PropTypes.shape({
      estimated_end_date: PropTypes.string,
    }),
  }),
});

export const POSITION_DETAILS_ARRAY = PropTypes.arrayOf(POSITION_DETAILS);

export const PAGINATION_PROPS = {
  count: PropTypes.number,
  next: PropTypes.string,
  previous: PropTypes.string,
};

export const POSITION_SEARCH_RESULTS = PropTypes.shape({
  ...PAGINATION_PROPS,
  results: POSITION_DETAILS_ARRAY,
});

export const POST_SEARCH_RESULTS = PropTypes.shape({
  ...PAGINATION_PROPS,
  results: POST_DETAILS_ARRAY,
});

export const RECOMMENDED_GRADE_AND_SKILL_POSITIONS = 'recommendedGradeAndSkillPositions';
export const RECOMMENDED_GRADE_AND_SKILL_CONE_POSITIONS = 'recommendedGradeAndSkillConePositions';
export const RECOMMENDED_GRADE_POSITIONS = 'recommendedGradePositions';
export const FAVORITED_POSITIONS = 'favoritedPositions';
export const FEATURED_GRADE_AND_SKILL_POSITIONS = 'featuredGradeAndSkillPositions';
export const FEATURED_GRADE_AND_SKILL_CONE_POSITIONS = 'featuredGradeAndSkillConePositions';
export const FEATURED_GRADE_POSITIONS = 'featuredGradePositions';
export const FEATURED_POSITIONS = 'featuredPositions';

export const FILTER = PropTypes.shape({
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  code: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  description: PropTypes.string,
  long_description: PropTypes.string,
  short_description: PropTypes.string,
  posted_date: PropTypes.string,
  isSelected: PropTypes.bool,
});

export const FILTERS = PropTypes.arrayOf(
  FILTER,
);

export const FILTER_META_DATA = PropTypes.shape({
  title: PropTypes.string,
  sort: PropTypes.number,
  description: PropTypes.string,
  endpoint: PropTypes.string,
  selectionRef: PropTypes.string,
  text: PropTypes.string,
});

export const FILTER_ITEM = PropTypes.shape({
  item: FILTER_META_DATA,
  data: FILTERS,
});

export const FILTER_ITEMS_ARRAY = PropTypes.arrayOf(
  FILTER_ITEM,
);

export const MAPPED_PARAM = PropTypes.shape({
  selectionRef: PropTypes.string,
  codeRef: PropTypes.string,
  description: PropTypes.string,
});

export const MAPPED_PARAM_ARRAY = PropTypes.arrayOf(MAPPED_PARAM);

export const FILTERS_PARENT = PropTypes.shape({
  filters: FILTER_ITEMS_ARRAY,
  mappedParams: MAPPED_PARAM_ARRAY,
  hasFetched: PropTypes.bool,
});

export const SORT_BY_ARRAY = PropTypes.arrayOf(
  PropTypes.shape({
    value: PropTypes.node,
    text: PropTypes.node,
    disabled: PropTypes.bool,
  }),
);

export const SORT_BY_PARENT_OBJECT = PropTypes.shape({
  options: SORT_BY_ARRAY,
});

export const COMPARE_LIST = PropTypes.arrayOf(POSITION_DETAILS);

export const FAVORITE_POSITION = PropTypes.shape({
  id: PropTypes.number,
  representation: PropTypes.string,
});

export const FAVORITE_POSITION_COUNTS = PropTypes.shape({
  favorites: PropTypes.number,
  favoritesPV: PropTypes.number,
  all: PropTypes.number,
});

export const FAVORITE_POSITIONS_ARRAY = PropTypes.arrayOf(FAVORITE_POSITION);

export const FAVORITE_POSITIONS = PropTypes.shape({
  favorites: PropTypes.arrayOf(FAVORITE_POSITION),
  favoritesPV: PropTypes.arrayOf(FAVORITE_POSITION),
  counts: FAVORITE_POSITION_COUNTS,
});

export const USER_SKILL_CODE = PropTypes.shape({
  code: PropTypes.string,
  description: PropTypes.string,
});

export const USER_SKILL_CODE_ARRAY = PropTypes.arrayOf(USER_SKILL_CODE);

export const USER_NESTED_OBJECT = PropTypes.shape({
  username: PropTypes.string,
  email: PropTypes.string,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
});

export const USER_PROFILE = PropTypes.shape({
  emp_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  employee_info: PropTypes.shape({
    grade: PropTypes.string,
    skills: USER_SKILL_CODE_ARRAY,
  }),
  user_info: PropTypes.shape({
    office_address: PropTypes.string,
    office_phone: PropTypes.string,
  }),
  id: PropTypes.number,
  skill_code: USER_SKILL_CODE_ARRAY,
  initials: PropTypes.string,
  display_name: PropTypes.string,
  user: USER_NESTED_OBJECT,
  is_cdo: PropTypes.bool,
  languages: LANGUAGE_QUALIFICATIONS,
  favorite_positions: FAVORITE_POSITIONS_ARRAY,
  received_shares: PropTypes.arrayOf(
    PropTypes.number,
  ),
});

export const ROUTER_LOCATION_OBJECT = PropTypes.shape({
  pathname: PropTypes.string,
  search: PropTypes.string,
  hash: PropTypes.string,
  key: PropTypes.string,
});

export const ROUTER_LOCATIONS = PropTypes.arrayOf(ROUTER_LOCATION_OBJECT);

export const GO_BACK_TO_LINK = PropTypes.shape({
  text: PropTypes.string,
  link: PropTypes.string,
});

export const PILL_ITEM = PropTypes.shape({
  description: PropTypes.string,
  codeRef: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selectionRef: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
});

export const PILL_ITEM_ARRAY = PropTypes.arrayOf(PILL_ITEM);

export const ACCORDION_SELECTION_OBJECT = PropTypes.shape({
  main: PropTypes.string,
  sub: PropTypes.string,
});

export const NEW_SAVED_SEARCH_SUCCESS_OBJECT = PropTypes.shape({
  title: PropTypes.string,
  message: PropTypes.string,
});

export const SAVED_SEARCH_MESSAGE = STRING_OR_BOOL;

export const SAVED_SEARCH_OBJECT = PropTypes.shape({
  count: PropTypes.number,
  date_created: PropTypes.string,
  date_updated: PropTypes.string,
  endpoint: PropTypes.string,
  filters: PropTypes.shape({}),
  id: PropTypes.number,
  name: PropTypes.string,
  owner: PropTypes.string,
});

export const SAVED_SEARCH_PARENT_OBJECT = PropTypes.shape({
  ...PAGINATION_PROPS,
  results: PropTypes.arrayOf(
    SAVED_SEARCH_OBJECT,
  ),
});

export const DELETE_SAVED_SEARCH_SUCCESS = STRING_OR_BOOL;

export const DELETE_SAVED_SEARCH_HAS_ERRORED = STRING_OR_BOOL;

export const CLONE_SAVED_SEARCH_SUCCESS = STRING_OR_BOOL;

export const CLONE_SAVED_SEARCH_HAS_ERRORED = STRING_OR_BOOL;

export const BID_LIST_TOGGLE_SUCCESS = STRING_OR_BOOL;

export const BID_LIST_TOGGLE_HAS_ERRORED = STRING_OR_BOOL;

export const REGION_SELECTION = PropTypes.shape({
  value: PropTypes.string,
});

export const BID_REVIEWER_OBJECT = PropTypes.shape({
  username: PropTypes.string,
  initials: PropTypes.string,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  email: PropTypes.string,
  phone_number: PropTypes.string,
  is_cdo: PropTypes.bool,
});

export const POSITION_POST_NESTED_LOCATION = PropTypes.shape({
  id: PropTypes.number,
  country: PropTypes.string,
  code: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
});

export const BID_CYCLE_NAME_TYPE = PropTypes.oneOfType([
  PropTypes.shape({
    name: PropTypes.string,
  }),
  PropTypes.string,
]);

export const BID_CYCLE = PropTypes.shape({
  id: PropTypes.number,
  name: BID_CYCLE_NAME_TYPE,
  cycle_start_date: PropTypes.string,
  cycle_deadline_date: PropTypes.string,
  cycle_end_date: PropTypes.string,
  active: PropTypes.bool,
});

export const BID_CYCLES = PropTypes.arrayOf(BID_CYCLE);

export const BID_OBJECT = PropTypes.shape({
  id: PropTypes.number,
  emp_id: PropTypes.string,
  user: PropTypes.string,
  can_delete: PropTypes.bool,
  status: PropTypes.string,
  panel_status: PropTypes.string,
  draft_date: PropTypes.string,
  submitted_date: PropTypes.string,
  handshake_offered_date: PropTypes.string,
  handshake_accepted_date: PropTypes.string,
  handshake_declined_date: PropTypes.string,
  in_panel_date: PropTypes.string,
  scheduled_panel_date: PropTypes.string,
  approved_date: PropTypes.string,
  declined_date: PropTypes.string,
  closed_date: PropTypes.string,
  is_priority: PropTypes.bool,
  panel_reschedule_count: PropTypes.number,
  create_date: PropTypes.string,
  update_date: PropTypes.string,
  reviewer: BID_REVIEWER_OBJECT,
  cdo_bid: PropTypes.bool,
  hs_status_code: PropTypes.string,
  hs_cdo_indicator: PropTypes.bool,
  position_info: PropTypes.shape({
    id: PropTypes.number,
    status_code: PropTypes.string,
    ted: PropTypes.string,
    posted_date: PropTypes.string,
    ...POSITION_DETAILS,
    bidcycle: BID_CYCLE,
    bid_statistics: [
      {
        id: PropTypes.number,
        total_bids: PropTypes.number,
        in_grade: PropTypes.number,
        at_skill: PropTypes.number,
        in_grade_at_skill: PropTypes.number,
        has_handshake_offered: PropTypes.bool,
        has_handshake_accepted: PropTypes.bool,
      },
    ],
    unaccompaniedStatus: PropTypes.string,
    isConsumable: PropTypes.bool,
    isServiceNeedDifferential: PropTypes.bool,
    isDifficultToStaff: PropTypes.bool,
    isEFMInside: PropTypes.bool,
    isEFMOutside: PropTypes.bool,
  }),
});

export const BID_RESULTS = PropTypes.arrayOf(
  BID_OBJECT,
);

export const BID_LIST = PropTypes.shape({
  ...PAGINATION_PROPS,
  results: BID_RESULTS,
});

export const MISSION_DETAILS = PropTypes.shape({
  id: PropTypes.number,
  code: PropTypes.string,
  short_code: PropTypes.string,
  location_prefix: PropTypes.string,
  name: PropTypes.string,
  short_name: PropTypes.string,
});

export const ASSIGNMENT_OBJECT = PropTypes.shape({
  id: PropTypes.number,
  user: PropTypes.string,
  tour_of_duty: PropTypes.string,
  status: PropTypes.string,
  curtailment_reason: PropTypes.string,
  create_date: PropTypes.string,
  start_date: PropTypes.string,
  estimated_end_date: PropTypes.string,
  end_date: PropTypes.string,
  bid_approval_date: PropTypes.string,
  arrival_date: PropTypes.string,
  service_duration: PropTypes.string,
  update_date: PropTypes.string,
  is_domestic: PropTypes.bool,
  combined_differential: PropTypes.number,
  standard_tod_months: PropTypes.number,
  position: PropTypes.shape({
    skill: PropTypes.string,
    bureau: PropTypes.string,
    position_number: PropTypes.string,
    title: PropTypes.string,
    post: PropTypes.shape({
      location: POSITION_POST_NESTED_LOCATION,
    }),
  }),
});

export const ASSIGNMENT_RESULTS = PropTypes.arrayOf(
  ASSIGNMENT_OBJECT,
);

export const ASSIGNMENT_LIST = PropTypes.shape({
  ...PAGINATION_PROPS,
  results: ASSIGNMENT_RESULTS,
});

export const MISSION_DETAILS_ARRAY = PropTypes.arrayOf(MISSION_DETAILS);

export const SUBMIT_BID_HAS_ERRORED = STRING_OR_BOOL;

export const SUBMIT_BID_SUCCESS = STRING_OR_BOOL;

export const ACCEPT_BID_HAS_ERRORED = STRING_OR_BOOL;

export const ACCEPT_BID_SUCCESS = STRING_OR_BOOL;

export const DECLINE_BID_HAS_ERRORED = STRING_OR_BOOL;

export const DECLINE_BID_SUCCESS = STRING_OR_BOOL;

export const REGISTER_HANDSHAKE_HAS_ERRORED = STRING_OR_BOOL;

export const REGISTER_HANDSHAKE_SUCCESS = STRING_OR_BOOL;

export const UNREGISTER_HANDSHAKE_HAS_ERRORED = STRING_OR_BOOL;

export const UNREGISTER_HANDSHAKE_SUCCESS = STRING_OR_BOOL;

export const MARK_NOTIFICATION_SUCCESS = STRING_OR_BOOL;

export const NOTIFICATION_OBJECT = PropTypes.shape({
  id: PropTypes.number,
  owner: PropTypes.string,
  message: PropTypes.string,
  is_read: PropTypes.bool,
  date_created: PropTypes.string,
  date_updated: PropTypes.string,
});

export const NOTIFICATION_RESULTS = PropTypes.arrayOf(
  NOTIFICATION_OBJECT,
);

export const NOTIFICATION_LIST = PropTypes.shape({
  ...PAGINATION_PROPS,
  results: NOTIFICATION_RESULTS,
});

export const CDO_OBJECT = PropTypes.shape({
  username: PropTypes.string,
  initials: PropTypes.string,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  email: PropTypes.string,
  phone_number: PropTypes.string,
  is_cdo: PropTypes.bool,
});

export const BIDDER_OBJECT = PropTypes.shape(
  {
    id: PropTypes.number,
    skill_code: USER_SKILL_CODE_ARRAY,
    grade: PropTypes.string,
    cdo: CDO_OBJECT,
    is_cdo: PropTypes.bool,
    primary_nationality: PropTypes.string,
    secondary_nationality: PropTypes.string,
    date_of_birth: PropTypes.string,
    phone_number: PropTypes.string,
    user: USER_NESTED_OBJECT,
    languages: LANGUAGE_QUALIFICATIONS,
    favorite_positions: FAVORITE_POSITIONS_ARRAY,
    received_shares: PropTypes.arrayOf(PropTypes.number),
  },
);

export const BIDDER_RESULTS = PropTypes.arrayOf(BIDDER_OBJECT);

export const BIDDER_LIST = PropTypes.shape({
  ...PAGINATION_PROPS,
  results: BIDDER_RESULTS,
});

export const BIDDER_PORTFOLIO_COUNTS = PropTypes.shape({
  all: PropTypes.number,
  bidding: PropTypes.number,
  inpanel: PropTypes.number,
  onpost: PropTypes.number,
  handshakeneeded: PropTypes.number,
});

export const BID_TRACKER_ALERT_TYPES = PropTypes.oneOf([
  APPROVED_PROP, CLOSED_PROP, HAND_SHAKE_OFFERED_PROP,
  HAND_SHAKE_DECLINED_PROP, IN_PANEL_PROP, DECLINED_PROP,
]);

export const DESCRIPTION_EDIT_HAS_ERRORED = STRING_OR_BOOL;

export const EMPTY_FUNCTION = () => {};

export const PREVENT_DEFAULT = (e) => { e.preventDefault(); };

export const PROFILE_MENU_SECTION_EXPANDED = PropTypes.shape({
  title: PropTypes.string,
  display: PropTypes.bool,
});

export const GLOSSARY_OBJECT = PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
  definition: PropTypes.string,
  link: PropTypes.string,
});

export const GLOSSARY_ARRAY = PropTypes.arrayOf(GLOSSARY_OBJECT);

export const GLOSSARY_LIST = PropTypes.shape({
  ...PAGINATION_PROPS,
  results: GLOSSARY_ARRAY,
});

// Object property of each available character
export const groupedGlossaryMap = () => {
  const letterList = ('#ABCDEFGHIJKLMNOPQRSTUVWXYZ').split();
  const obj = {};
  letterList.forEach((letter) => { obj[letter] = GLOSSARY_ARRAY; });
  return obj;
};

export const GROUPED_GLOSSARY_ARRAYS_OBJECT = PropTypes.shape({
  ...groupedGlossaryMap(),
});

export const GLOSSARY_ERROR_OBJECT = PropTypes.shape({
  id: PropTypes.number,
  message: PropTypes.string,
  hasErrored: PropTypes.bool,
});

export const GLOSSARY_SUCCESS_OBJECT = PropTypes.shape({
  id: PropTypes.number,
  success: PropTypes.bool,
});

export const BID_STATISTICS_OBJECT = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  cycle_start_date: PropTypes.string,
  cycle_deadline_date: PropTypes.string,
  cycle_end_date: PropTypes.string,
  total_positions: PropTypes.number,
  available_positions: PropTypes.number,
  available_domestic_positions: PropTypes.number,
  available_international_positions: PropTypes.number,
  total_bids: PropTypes.number,
  total_bidders: PropTypes.number,
  in_panel_bidders: PropTypes.number,
  approved_bidders: PropTypes.number,
  bidding_days_remaining: PropTypes.number,
});

export const BID_STATISTICS_ARRAY = PropTypes.arrayOf(BID_STATISTICS_OBJECT);

export const CLIENT_BY_ID = PropTypes.shape({
  id: PropTypes.number,
  current_assignment: ASSIGNMENT_OBJECT,
  skills: USER_SKILL_CODE_ARRAY,
  grade: PropTypes.string,
  is_cdo: PropTypes.bool,
  primary_nationality: PropTypes.string,
  secondary_nationality: PropTypes.string,
  bid_statistics: PropTypes.arrayOf(BID_STATISTICS_OBJECT),
  user: USER_NESTED_OBJECT,
  language_qualifications: LANGUAGES,
});

export const HOME_PAGE_CARD_TYPE = PropTypes.oneOf(['default', 'serviceNeed']);

export const HIGHLIGHT_POSITION = PropTypes.shape({
  loading: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.bool,
});

export { SetType };

export const CLASSIFICATION = PropTypes.shape({
  code: PropTypes.string,
  text: PropTypes.string,
  seasons: PropTypes.arrayOf(PropTypes.object),
  glossary_term: PropTypes.string,
});

export const CLASSIFICATIONS = PropTypes.arrayOf(CLASSIFICATION);

export const CLIENT_CLASSIFICATION = PropTypes.string;

export const CLIENT_CLASSIFICATIONS = PropTypes.arrayOf(CLIENT_CLASSIFICATION);

export const HISTORY_OBJECT = PropTypes.shape({
  push: PropTypes.func,
  listen: PropTypes.func,
});

export const OBC_URLS = PropTypes.shape({
  internal: PropTypes.string,
  external: PropTypes.string,
});

export const BUREAU_PERMISSIONS = PropTypes.arrayOf(
  PropTypes.shape({
    code: PropTypes.string,
    long_description: PropTypes.string,
    short_description: PropTypes.string,
  }),
);

export const ORG_PERMISSIONS = PropTypes.arrayOf(
  PropTypes.shape({
    code: PropTypes.string,
    long_description: PropTypes.string,
    short_description: PropTypes.string,
  }),
);

export const FILTER_SELECTION = PropTypes.arrayOf(
  PropTypes.oneOfType(
    [
      PropTypes.string,
      PropTypes.shape({}),
    ],
  ),
);

export const BUREAU_USER_SELECTIONS = PropTypes.shape({
  page: PropTypes.number,
  limit: PropTypes.number,
  ordering: PropTypes.string,
  selectedGrades: FILTER_SELECTION,
  selectedSkills: FILTER_SELECTION,
  selectedPosts: FILTER_SELECTION,
  selectedTEDs: FILTER_SELECTION,
  selectedBureaus: FILTER_SELECTION,
  isLoading: PropTypes.bool,
  textSearch: PropTypes.string,
  textInput: PropTypes.string,
});

export const HOME_PAGE_FEATURED_POSITIONS = PropTypes.shape({
  positions: PropTypes.arrayOf(POSITION_DETAILS),
  name: PropTypes.string,
});

export const HOME_PAGE_RECOMMENDED_POSITIONS = PropTypes.shape({
  positions: PropTypes.arrayOf(POSITION_DETAILS),
  name: PropTypes.string,
});

export const HANDSHAKE_DETAILS = PropTypes.shape({
  hs_status_code: PropTypes.string,
  bidder_hs_code: PropTypes.string,
  hs_date_accepted: PropTypes.string,
  hs_date_declined: PropTypes.string,
  hs_date_offered: PropTypes.string,
  hs_date_revoked: PropTypes.string,
  hs_date_expiration: PropTypes.string,
  hs_cdo_indicator: PropTypes.bool,
});

export const AB_DETAILS_OBJECT = PropTypes.shape({
  id: PropTypes.number,
  status: PropTypes.string,
  oc_reason: PropTypes.string,
  oc_bureau: PropTypes.string,
  notes: PropTypes.string,
  date_created: PropTypes.string,
  update_date: PropTypes.string,
  is_shared: PropTypes.bool,
  last_editing_user_id: PropTypes.number,
  perdet_seq_num: PropTypes.number,
});

export const AVAILABLE_BIDDER_OBJECT = PropTypes.shape({
  id: PropTypes.number,
  cdo: CDO_OBJECT,
  name: PropTypes.string,
  shortened_name: PropTypes.string,
  initials: PropTypes.string,
  perdet_seq_number: PropTypes.string,
  grade: PropTypes.string,
  skills: USER_SKILL_CODE_ARRAY,
  employee_id: PropTypes.string,
  pos_location: PropTypes.string,
  classifications: CLIENT_CLASSIFICATIONS,
  current_assignment: ASSIGNMENT_OBJECT,
  languages: LANGUAGE_QUALIFICATIONS,
  available_bidder_details: AB_DETAILS_OBJECT,
});

export const AB_EDIT_SECTIONS_OBJECT = PropTypes.shape({
  name: PropTypes.element,
  status: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  skill: PropTypes.element,
  grade: PropTypes.string,
  languages: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  ted: PropTypes.string,
  current_post: PropTypes.string,
  cdo: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  notes: PropTypes.string,
});

export const AB_EDIT_DETAILS_OBJECT = PropTypes.shape({
  oc_bureau: PropTypes.string,
  oc_reason: PropTypes.string,
  status: PropTypes.string,
  shared: PropTypes.bool,
  languages: LANGUAGE_QUALIFICATIONS,
  bidderBureau: PropTypes.string,
  formattedCreated: PropTypes.string,
});

export const TEMP_FAKE_LEGS = PropTypes.shape({
  position: PropTypes.string,
  org: PropTypes.string,
  eta: PropTypes.string,
  ted: PropTypes.string,
  tod: PropTypes.string,
  grade: PropTypes.string,
  posNum: PropTypes.string,
  action: PropTypes.string,
  travel: PropTypes.string,
});

export const TEMP_FAKE_DATA = PropTypes.shape({
  status: PropTypes.string,
  legs: PropTypes.arrayOf(TEMP_FAKE_LEGS),
  panelDate: PropTypes.string,
});

export const POS_LANGUAGES = PropTypes.arrayOf(
  PropTypes.shape({
    language: PropTypes.string,
    spoken_proficiency: PropTypes.number,
    reading_proficiency: PropTypes.number,
    code: PropTypes.string,
    representation: PropTypes.string,
  }),
);

export const AGENDA_ITEM = PropTypes.shape({
  creator_name: PropTypes.number,
  id: PropTypes.number,
  modifier_name: PropTypes.number,
  panel_date: PropTypes.string,
  panel_date_type: PropTypes.string,
  panel_meeting_seq_num: PropTypes.string,
  perdet: PropTypes.number,
  status_full: PropTypes.string,
  status_short: PropTypes.string,
  update_date: PropTypes.string,
  assignment: PropTypes.shape({
    eta: PropTypes.string,
    grade: PropTypes.string,
    id: PropTypes.number,
    languages: POS_LANGUAGES,
    org: PropTypes.string,
    pos_num: PropTypes.string,
    pos_title: PropTypes.string,
    ted: PropTypes.string,
    tod: PropTypes.string,
  }),
  creators: PropTypes.arrayOf(
    PropTypes.shape({
      empUser: PropTypes.arrayOf(
        PropTypes.shape({
          perdetseqnum: PropTypes.number,
          perpiifirstname: PropTypes.string,
          perpiilastname: PropTypes.string,
          perpiimiddlename: PropTypes.string,
          perpiiseqnum: PropTypes.number,
          perpiisuffixname: PropTypes.string,
          persdesc: PropTypes.string,
        }),
      ),
      hruempseqnbr: PropTypes.number,
      hruid: PropTypes.number,
      hruneuid: PropTypes.number,
      neufirstnm: PropTypes.string,
      neuid: PropTypes.number,
      neulastnm: PropTypes.string,
      neumiddlenm: PropTypes.string,
    }),
  ),
  legs: PropTypes.arrayOf(
    PropTypes.shape({
      eta: PropTypes.string,
      grade: PropTypes.string,
      id: PropTypes.number,
      languages: PropTypes.arrayOf(
        PropTypes.shape({
          code: PropTypes.string,
          language: PropTypes.string,
          reading_proficiency: PropTypes.string,
          representation: PropTypes.string,
          spoken_proficiency: PropTypes.string,
        }),
      ),
      org: PropTypes.string,
      pos_num: PropTypes.string,
      pos_title: PropTypes.string,
      ted: PropTypes.string,
      tod: PropTypes.string,
    }),
  ),
  report_category: PropTypes.shape({
    code: PropTypes.string,
    desc_text: PropTypes.string,
  }),
  remarks: PropTypes.arrayOf(PropTypes.shape({
    seq_num: PropTypes.number,
    rc_code: PropTypes.string,
    remark_inserts: [],
    order_num: PropTypes.number,
    short_desc_text: PropTypes.string,
    mutually_exclusive_ind: PropTypes.string,
    text: PropTypes.string,
    active_ind: PropTypes.string,
    type: null,
  })),
  updaters: PropTypes.shape({
    emp_seq_num: PropTypes.number,
    emp_user: PropTypes.shape({
      emp_user_first_name: PropTypes.string,
      emp_user_last_name: PropTypes.string,
      emp_user_middle_name: PropTypes.string,
      emp_user_seq_num: PropTypes.number,
      emp_user_suffix_name: PropTypes.string,
      per_desc: PropTypes.string,
      perdet_seqnum: PropTypes.number,
    }),
    first_name: PropTypes.string,
    hru_id: PropTypes.string,
    last_name: PropTypes.string,
    middle_name: PropTypes.string,
    neu_id: PropTypes.number,
  }),
});
