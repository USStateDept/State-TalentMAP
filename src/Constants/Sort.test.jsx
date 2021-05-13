import { POSITION_PAGE_SIZES, POSITION_SEARCH_SORTS, filterPVSorts } from './Sort';

describe('Dropdown options', () => {
  it('POSITION_SEARCH_SORTS should be defined', () => {
    expect(POSITION_SEARCH_SORTS).toBeDefined();
  });

  it('POSITION_SEARCH_SORTS defaultSort should be defined', () => {
    expect(POSITION_SEARCH_SORTS.defaultSort).toBeDefined();
  });

  it('POSITION_PAGE_SIZES should be defined', () => {
    expect(POSITION_PAGE_SIZES).toBeDefined();
  });

  it('returns objects where availableOnly === false on filterPVSorts()', () => {
    const result = filterPVSorts(POSITION_SEARCH_SORTS);
    let hasFailed = false;
    result.options.forEach((f) => {
      if (f.availableOnly) {
        hasFailed = true;
      }
    });
    expect(hasFailed).toBe(false);
  });
});
