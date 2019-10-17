import preferences from './preferences';
import { POSITION_SEARCH_SORTS_TYPE } from '../../Constants/Sort';

describe('reducers', () => {
  it('can set reducer SET_SORT_PREFERENCE', () => {
    expect(preferences({}, { type: 'SET_SORT_PREFERENCE', key: POSITION_SEARCH_SORTS_TYPE, value: 'title' }))
      .toBeDefined();
  });
});
