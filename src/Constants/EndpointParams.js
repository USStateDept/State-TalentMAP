// valid query params to filter positions against

export const ENDPOINT_PARAMS = {
  skill: 'position__skill__code__in',
  language: 'language_codes',
  grade: 'position__grade__code__in',
  tod: 'position__post__tour_of_duty__code__in',
  org: 'position__bureau__code__in',
  organization: 'position__org__code__in',
  functionalOrg: 'org_has_groups',
  cola: 'position__post__cost_of_living_adjustment__gt',
  postDiff: 'position__post__differential_rate__in',
  danger: 'position__post__danger_pay__in',
  domestic: 'is_domestic',
  mission: 'position__post__location__country__in',
  post: 'position__post__in',
  postAP: 'position__post__code__in',
  available: 'is_available_in_current_bidcycle',
  bidCycle: 'is_available_in_bidcycle',
  bidSeason: 'is_available_in_bidseason',
  highlighted: 'position__is_highlighted',
  projectedVacancy: 'projectedVacancy', // this isn't a real query param, but we'll use it to transform the request
  tandem: 'tandem',
  handshake: 'cps_codes',
  postIndicators: 'position__post_indicator__in',
  usCodes: 'position__us_codes__in',
  commuterPosts: 'position__cpn_codes__in',
  tmHandshake: 'lead_hs_status_code',
  hardToFill: 'htf_indicator',
  ordering: 'ordering',
};

export const ENDPOINT_PARAMS_TANDEM = {
  ...Object.assign({}, ...Object.keys(ENDPOINT_PARAMS).map(m => ({ [m]: `${ENDPOINT_PARAMS[m]}-tandem` }))),
  projectedVacancy: ENDPOINT_PARAMS.projectedVacancy,
  tandem: ENDPOINT_PARAMS.tandem,
};

// any properties that we want to abstract to a common name
export const COMMON_PROPERTIES = {
  posted: 'posted_date',
  NULL_LANGUAGE: 'NLR',
};

// Take our custom query param from the Bidder Portfolio navigation and convert them to queries
export const BIDDER_PORTFOLIO_PARAM_OBJECTS = {
  all: {},
  bidding: { is_bidding: true },
  inpanel: { is_in_panel: true },
  onpost: { is_on_post: true },
  handshakeneeded: { is_bidding_no_handshake: true },
};

export const VALID_PARAMS = [
  ...Object.values(ENDPOINT_PARAMS),
  'q',
];

export const VALID_TANDEM_PARAMS = [
  ...Object.values(ENDPOINT_PARAMS_TANDEM),
  'q',
];

// Params that need their data fetched on-the-fly in order to populate pill text
export const ASYNC_PARAMS = [
  ENDPOINT_PARAMS.mission,
  ENDPOINT_PARAMS.post,
  ENDPOINT_PARAMS.postAP,
];

export const SPECIAL_NEEDS = [
  'BT_MOST_DIFFICULT_TO_STAFF_FLG',
  'BT_SERVICE_NEEDS_DIFF_FLG',
];
