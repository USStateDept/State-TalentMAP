import shouldShowSearchBar from './showSearchBar';

describe('showSearchBar reducers', () => {
  it('can set reducer SHOULD_SHOW_SEARCH_BAR', () => {
    expect(shouldShowSearchBar(false, { type: 'SHOULD_SHOW_SEARCH_BAR', shouldShow: true })).toBe(true);
  });
});
