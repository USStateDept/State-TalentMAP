import descriptionSort from './descriptionSort';

describe('SearchFiltersContainerComponent', () => {
  const items = [{ item: { description: 'a' } }, { item: { description: 'b' } }];

  it('can sort', () => {
    expect(descriptionSort(items[0], items[1])).toBe(-1);
    expect(descriptionSort(items[1], items[0])).toBe(1);
    expect(descriptionSort(items[0], items[0])).toBe(0);
  });
});
