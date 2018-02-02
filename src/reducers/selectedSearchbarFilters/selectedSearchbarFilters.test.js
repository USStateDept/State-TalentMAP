import selectedSearchbarFilters from './selectedSearchbarFilters';

describe('reducers', () => {
  const searchBarFilters = {};

  it('can set reducer SELECTED_SEARCHBAR', () => {
    expect(selectedSearchbarFilters({}, { type: 'SELECTED_SEARCHBAR_FILTERS', filters: searchBarFilters })).toBe(searchBarFilters);
  });
});
