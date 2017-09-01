import { descriptionSort, titleSort } from './descriptionSort';

describe('SearchFiltersContainerComponent', () => {
  const items = [{ title: 'a', long_description: 'a' }, { title: 'b', long_description: 'b' }];

  it('can sort by description', () => {
    expect(descriptionSort(items[0], items[1])).toBe(-1);
    expect(descriptionSort(items[1], items[0])).toBe(1);
    expect(descriptionSort(items[0], items[0])).toBe(0);
  });

  it('can sort by title', () => {
    expect(titleSort(items[0], items[1])).toBe(-1);
    expect(titleSort(items[1], items[0])).toBe(1);
    expect(titleSort(items[0], items[0])).toBe(0);
  });
});
