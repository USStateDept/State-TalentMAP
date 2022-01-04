import * as reducers from './aboutContent';

describe('GET reducers', () => {
  it('can set reducer ABOUT_CONTENT_HAS_ERRORED', () => {
    expect(reducers.aboutContentHasErrored(false, { type: 'ABOUT_CONTENT_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer ABOUT_CONTENT_IS_LOADING', () => {
    expect(reducers.aboutContentIsLoading(false, { type: 'ABOUT_CONTENT_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer ABOUT_CONTENT_FETCH_DATA_SUCCESS', () => {
    expect(reducers.aboutContent('t', { type: 'ABOUT_CONTENT_FETCH_DATA_SUCCESS', data: '' })).toBe('t');
  });
});

describe('PATCH reducers', () => {
  it('can set reducer ABOUT_CONTENT_PATCH_HAS_ERRORED', () => {
    expect(reducers.aboutContentPatchHasErrored(false, { type: 'ABOUT_CONTENT_PATCH_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer ABOUT_CONTENT_PATCH_IS_LOADING', () => {
    expect(reducers.aboutContentPatchIsLoading(false, { type: 'ABOUT_CONTENT_PATCH_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer ABOUT_CONTENT_PATCH_SUCCESS', () => {
    expect(reducers.aboutContentPatchSuccess(true, { type: 'ABOUT_CONTENT_PATCH_SUCCESS', success: false })).toBe(false);
  });
});
