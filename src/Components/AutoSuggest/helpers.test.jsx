import getSuggestionValues from './helpers';

describe('AutoSuggest Helpers', () => {
  it('can call the getSuggestionValues function', () => {
    expect(getSuggestionValues('suggestion')).toBe('suggestion');
  });
});
