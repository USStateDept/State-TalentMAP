import PropTypes from 'prop-types';

export const LANGUAGES = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number,
    language: PropTypes.string,
    written_proficiency: PropTypes.string,
    spoken_proficiency: PropTypes.string,
    representation: PropTypes.string,
  }),
);

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

export const POSITION_DETAILS = PropTypes.shape({
  id: PropTypes.number,
  grade: PropTypes.string,
  skill: PropTypes.string,
  bureau: PropTypes.string,
  organization: PropTypes.string,
  position_number: PropTypes.string,
  is_overseas: PropTypes.bool,
  create_date: PropTypes.string,
  update_date: PropTypes.string,
  post: POST_MISSION_DATA,
  languages: LANGUAGES,
});

export const POSITION_SEARCH_RESULTS = PropTypes.shape({
  count: PropTypes.number,
  next: PropTypes.string,
  previous: PropTypes.string,
  results: PropTypes.arrayOf(POSITION_DETAILS),
});

export const FILTERS = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number,
    code: PropTypes.string,
    description: PropTypes.string,
    long_description: PropTypes.string,
    short_description: PropTypes.string,
    effective_date: PropTypes.string,
    isSelected: PropTypes.bool,
  }),
);

export const ITEM = PropTypes.shape({
  title: PropTypes.string,
  sort: PropTypes.number,
  description: PropTypes.string,
  endpoint: PropTypes.string,
  selectionRef: PropTypes.string,
  text: PropTypes.string,
});

export const ITEMS = PropTypes.arrayOf(
  PropTypes.shape({
    item: ITEM,
    data: FILTERS,
  }),
);

export const FILTER_ITEM = PropTypes.shape({
  item: ITEM,
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
  filters: ITEMS,
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

export const USER_PROFILE = PropTypes.shape({
  id: PropTypes.number,
  user: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }),
  language_qualifications: PropTypes.arrayOf(
    PropTypes.number,
  ),
  favorite_positions: PropTypes.arrayOf(
    PropTypes.number,
  ),
  received_shares: PropTypes.arrayOf(
    PropTypes.number,
  ),
});

export const ROUTER_LOCATIONS = PropTypes.arrayOf(PropTypes.shape({
  pathname: PropTypes.string,
  search: PropTypes.string,
  hash: PropTypes.string,
  key: PropTypes.string,
}));

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

export const EMPTY_FUNCTION = () => {};
