import { darkModePreference, sortPreferences } from './preferences';
import { POSITION_SEARCH_SORTS_TYPE } from '../../Constants/Sort';

describe('reducers', () => {
  it('can set reducer SET_SORT_PREFERENCE', () => {
    expect(sortPreferences({}, { type: 'SET_SORT_PREFERENCE', key: POSITION_SEARCH_SORTS_TYPE, value: 'title' }))
      .toBeDefined();
  });

  it('can set reducer SET_SORT_PREFERENCE', () => {
    expect(darkModePreference(false, { type: 'SET_DARK_MODE_PREFERENCE', value: true }))
      .toBe(true);
  });
});
