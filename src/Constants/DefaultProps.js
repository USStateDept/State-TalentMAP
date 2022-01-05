export { initialState as DEFAULT_HIGHLIGHT_POSITION } from '../reducers/highlightPosition';

export const ACCORDION_SELECTION = { main: '', sub: '' };

export const DEFAULT_USER_PROFILE = {
  user: {
    username: '',
    first_name: '',
    last_name: '',
  },
  display_name: '...', // show '...' when loading
  initials: '',
  favorite_positions: [],
};

export const POSITION_RESULTS_OBJECT = {
  results: [],
};

export const DEFAULT_FAVORITES_COUNTS = {
  favorites: 0,
  favoritesPV: 0,
  favoritesTandem: 0,
  favoritesPVTandem: 0,
  all: 0,
};

export const DEFAULT_FAVORITES = {
  favorites: [],
  favoritesPV: [],
  favoritesTandem: [],
  favoritesPVTandem: [],
  counts: DEFAULT_FAVORITES_COUNTS,
};

export const PROFILE_MENU_SECTION_EXPANDED_OBJECT = {
  title: '',
  display: false,
};

export default ACCORDION_SELECTION;

export const DEFAULT_HOME_PAGE_RECOMMENDED_POSITIONS = {
  positions: [],
  name: '',
};

export const DEFAULT_HOME_PAGE_FEATURED_POSITIONS = {
  positions: [],
  name: '',
};
