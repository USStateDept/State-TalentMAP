import { profileMenuExpanded, profileMenuSectionExpanded } from './profileMenu';

describe('reducers', () => {
  it('can set reducer PROFILE_MENU_EXPANDED', () => {
    expect(profileMenuExpanded(true, { type: 'PROFILE_MENU_EXPANDED', isExpanded: false })).toBe(false);
  });

  it('can set reducer PROFILE_MENU_SECTION_EXPANDED', () => {
    expect(profileMenuSectionExpanded({}, { type: 'PROFILE_MENU_SECTION_EXPANDED', isExpanded: { title: 'test' } }).title).toBe('test');
  });
});
