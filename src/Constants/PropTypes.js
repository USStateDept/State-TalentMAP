import PropTypes from 'prop-types';
import {
  APPROVED_PROP,
  CLOSED_PROP,
  HAND_SHAKE_OFFERED_PROP,
  HAND_SHAKE_DECLINED_PROP,
  IN_PANEL_PROP,
  DECLINED_PROP,
} from './BidData';

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
  id: PropTypes.number.isRequired,
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
  effective_date: PropTypes.string,
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

export const USER_SKILL_CODE_POSITIONS = 'userSkillCodePositions';
export const USER_GRADE_RECENT_POSITIONS = 'userGradeRecentPositions';
export const SERVICE_NEED_POSITIONS = 'serviceNeedPositions';
export const RECENTLY_POSTED_POSITIONS = 'recentlyPostedPositions';
export const FAVORITED_POSITIONS = 'favoritedPositions';
export const HOME_PAGE_POSITIONS = PropTypes.shape({
  [USER_SKILL_CODE_POSITIONS]: POSITION_DETAILS_ARRAY,
  [USER_GRADE_RECENT_POSITIONS]: POSITION_DETAILS_ARRAY,
  [SERVICE_NEED_POSITIONS]: POSITION_DETAILS_ARRAY,
  [RECENTLY_POSTED_POSITIONS]: POSITION_DETAILS_ARRAY,
});

export const FILTER = PropTypes.shape({
  id: PropTypes.number,
  code: PropTypes.string,
  description: PropTypes.string,
  long_description: PropTypes.string,
  short_description: PropTypes.string,
  effective_date: PropTypes.string,
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

export const FAVORITE_POSITIONS_ARRAY = PropTypes.arrayOf(FAVORITE_POSITION);

export const USER_SKILL_CODE = PropTypes.shape({
  id: PropTypes.number,
  cone: PropTypes.string,
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

export const BID_OBJECT = PropTypes.shape({
  id: PropTypes.number,
  bidcycle: PropTypes.string,
  user: PropTypes.string,
  position: PropTypes.shape({
    id: PropTypes.number,
    grade: PropTypes.string,
    skill: PropTypes.string,
    position_number: PropTypes.string,
    title: PropTypes.string,
    create_date: PropTypes.string,
    update_date: PropTypes.string,
    post: PropTypes.shape({
      id: PropTypes.number,
      location: PropTypes.string,
    }),
  }),
  reviewer: BID_REVIEWER_OBJECT,
  status: PropTypes.string,
  submission_date: PropTypes.string,
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
      location: PropTypes.string,
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
