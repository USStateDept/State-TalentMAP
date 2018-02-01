import selectedSearchbarFilters from './selectedSearchbarFilters';

describe('reducers', () => {
  const searchBarFilters = {};

  it('can set reducer SELECTED_ACCORDION', () => {
    expect(selectedSearchbarFilters('', { type: 'SELECTED_SEARCHBAR_FILTERS', searchBarFilters })).toBe(searchBarFilters);
  });
});
