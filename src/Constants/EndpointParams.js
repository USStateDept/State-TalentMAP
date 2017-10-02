const ENDPOINT_PARAMS = {
  skill: 'skill__code__in',
  language: 'languages__language__code__in',
  grade: 'grade__code__in',
  tod: 'post__tour_of_duty__code__in',
  org: 'bureau__code__in',
  cola: 'post__cost_of_living_adjustment__gt',
  postDiff: 'post__differential_rate__gt',
  danger: 'post__danger_pay__gt',
  domestic: 'is_domestic',
};

export default ENDPOINT_PARAMS;
