import shouldShowMobileFilter from './showMobileFilter';

describe('showMobileFilter reducers', () => {
  it('can set reducer SHOULD_SHOW_MOBILE_FILTER', () => {
    expect(shouldShowMobileFilter(false, { type: 'SHOULD_SHOW_MOBILE_FILTER', shouldShow: true })).toBe(true);
  });
});
