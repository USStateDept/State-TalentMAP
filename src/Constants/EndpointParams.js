// valid query params to filter positions against

export const ENDPOINT_PARAMS = {
  skill: 'skill__code__in',
  language: 'languages__language__code__in',
  grade: 'grade__code__in',
  tod: 'post__tour_of_duty__code__in',
  org: 'bureau__code__in',
  cola: 'post__cost_of_living_adjustment__gt',
  postDiff: 'post__differential_rate__in',
  danger: 'post__danger_pay__in',
  domestic: 'is_domestic',
  mission: 'post__location__country__in',
  post: 'post__in',
  available: 'is_available_in_current_bidcycle',
  bidCycle: 'is_available_in_bidcycle',
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
  ENDPOINT_PARAMS.skill,
  ENDPOINT_PARAMS.language,
  ENDPOINT_PARAMS.grade,
  ENDPOINT_PARAMS.tod,
  ENDPOINT_PARAMS.org,
  ENDPOINT_PARAMS.cola,
  ENDPOINT_PARAMS.postDiff,
  ENDPOINT_PARAMS.danger,
  ENDPOINT_PARAMS.domestic,
  ENDPOINT_PARAMS.mission,
  ENDPOINT_PARAMS.post,
  ENDPOINT_PARAMS.available,
  'q',
];

export const ASYNC_PARAMS = [
  ENDPOINT_PARAMS.mission,
  ENDPOINT_PARAMS.post,
];
