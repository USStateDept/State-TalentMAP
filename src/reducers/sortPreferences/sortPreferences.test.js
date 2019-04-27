import sortPreferences from './sortPreferences';
import { POSITION_SEARCH_SORTS_TYPE } from '../../Constants/Sort';

describe('reducers', () => {
  it('can set reducer SET_SORT_PREFERENCE', () => {
    expect(sortPreferences({}, { type: 'SET_SORT_PREFERENCE', key: POSITION_SEARCH_SORTS_TYPE, value: 'title' }))
      .toBeDefined();
  });
});
