import shouldShowFeedback from './showFeedback';

describe('showFeedback reducers', () => {
  it('can set reducer SHOULD_SHOW_FEEDBACK', () => {
    expect(shouldShowFeedback(false, { type: 'SHOULD_SHOW_FEEDBACK', shouldShow: true })).toBe(true);
  });
});
