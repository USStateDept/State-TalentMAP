import { POSITION_SEARCH_SORTS, POSITION_PAGE_SIZES } from './Sort';

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
});
