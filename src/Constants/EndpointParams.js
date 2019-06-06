// valid query params to filter positions against

export const ENDPOINT_PARAMS = {
  skill: 'position__skill__code__in',
  language: 'language_codes',
  grade: 'position__grade__code__in',
  tod: 'position__post__tour_of_duty__code__in',
  org: 'position__bureau__code__in',
  functionalOrg: 'position__org_has_groups',
  cola: 'position__post__cost_of_living_adjustment__gt',
  postDiff: 'position__post__differential_rate__in',
  danger: 'position__post__danger_pay__in',
  domestic: 'position__is_domestic',
  mission: 'position__post__location__country__in',
  post: 'position__post__in',
  available: 'is_available_in_current_bidcycle',
  bidCycle: 'is_available_in_bidcycle',
  bidSeason: 'position__is_available_in_bidseason',
  highlighted: 'position__is_highlighted',
  projectedVacancy: 'projectedVacancy', // this isn't a real query param, but we'll use it to transform the request
};

// any properties that we want to abstract to a common name
export const COMMON_PROPERTIES = {
  posted: 'posted_date',
  NULL_LANGUAGE: 'NONE',
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

export const ASYNC_PARAMS = [
  ENDPOINT_PARAMS.mission,
  ENDPOINT_PARAMS.post,
];
