import shouldShowGlossary from './showGlossary';

describe('showGlossary reducers', () => {
  it('can set reducer SHOULD_SHOW_GLOSSARY', () => {
    expect(shouldShowGlossary(false, { type: 'SHOULD_SHOW_GLOSSARY', shouldShow: true })).toBe(true);
  });
});
