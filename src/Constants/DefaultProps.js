import { USER_SKILL_CODE_POSITIONS, USER_GRADE_RECENT_POSITIONS, SERVICE_NEED_POSITIONS } from './PropTypes';

export { initialState as DEFAULT_HIGHLIGHT_POSITION } from '../reducers/highlightPosition';

export const ACCORDION_SELECTION = { main: '', sub: '' };

export const DEFAULT_HOME_PAGE_POSITIONS = {
  [USER_SKILL_CODE_POSITIONS]: [],
  [USER_GRADE_RECENT_POSITIONS]: [],
  [SERVICE_NEED_POSITIONS]: [],
};

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

export const PROFILE_MENU_SECTION_EXPANDED_OBJECT = {
  title: '',
  display: false,
};

export default ACCORDION_SELECTION;
