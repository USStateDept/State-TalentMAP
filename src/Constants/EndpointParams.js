// valid query params to filter positions against

export const ENDPOINT_PARAMS = {
  skill: 'skill__code__in',
  language: 'languages__language__code__in',
  grade: 'grade__code__in',
  tod: 'post__tour_of_duty__code__in',
  org: 'bureau__code__in',
  functionalOrg: 'org_has_groups',
  cola: 'post__cost_of_living_adjustment__gt',
  postDiff: 'post__differential_rate__in',
  danger: 'post__danger_pay__in',
  domestic: 'is_domestic',
  mission: 'post__location__country__in',
  post: 'post__in',
  available: 'is_available_in_current_bidcycle',
  bidCycle: 'is_available_in_bidcycle',
};

// any properties that we want to abstract to a common name
export const COMMON_PROPERTIES = {
  posted: 'posted_date',
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
