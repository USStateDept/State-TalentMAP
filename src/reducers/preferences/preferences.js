import { findIndex } from 'lodash';
import SORT_PREFERENCES from 'Constants/Sort';

// no need to store options in localStorage
const SORT_PREFERENCES_WITHOUT_OPTIONS = Object.assign(
  {},
  ...Object.keys(SORT_PREFERENCES).map(key => (
    { [key]: { ...SORT_PREFERENCES[key], options: undefined } }
  )),
);

// The name of this reducer is important because we whitelist it as a persistent reducer
export function sortPreferences(state = SORT_PREFERENCES_WITHOUT_OPTIONS, action) {
  switch (action.type) {
    case 'SET_SORT_PREFERENCE': {
      const { key, value } = action;
      if (key && SORT_PREFERENCES[key] &&
        findIndex(SORT_PREFERENCES[key].options, (f) => {
          const value$ = `${value}`;
          const optionValue$ = `${f.value}`;
          return value$ === optionValue$;
        }) > -1) {
        return { ...state, [key]: { ...SORT_PREFERENCES[key], defaultSort: value } };
      }
      return state;
    }
    default:
      return state;
  }
}

// The name of this reducer is important because we whitelist it as a persistent reducer
export function darkModePreference(state = false, action) {
  switch (action.type) {
    case 'SET_DARK_MODE_PREFERENCE': {
      return action.value;
    }
    default:
      return state;
  }
}
