import shouldShowStaticContent from './showStaticContent';

describe('shouldShowStaticContent reducer', () => {
  it('can set reducer SHOULD_SHOW_STATIC_CONTENT', () => {
    expect(shouldShowStaticContent(false, { type: 'SHOULD_SHOW_STATIC_CONTENT', shouldShow: true })).toBe(true);
  });
});
