import * as reducers from './homeBannerContent';

describe('GET reducers', () => {
  it('can set reducer HOME_BANNER_CONTENT_HAS_ERRORED', () => {
    expect(reducers.homeBannerContentHasErrored(false, { type: 'HOME_BANNER_CONTENT_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer HOME_BANNER_CONTENT_IS_LOADING', () => {
    expect(reducers.homeBannerContentIsLoading(false, { type: 'HOME_BANNER_CONTENT_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer HOME_BANNER_CONTENT_FETCH_DATA_SUCCESS', () => {
    expect(reducers.homeBannerContent('t', { type: 'HOME_BANNER_CONTENT_FETCH_DATA_SUCCESS', data: '' })).toBe('t');
  });
});

describe('PATCH reducers', () => {
  it('can set reducer HOME_BANNER_CONTENT_PATCH_HAS_ERRORED', () => {
    expect(reducers.homeBannerContentPatchHasErrored(false, { type: 'HOME_BANNER_CONTENT_PATCH_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer ABOUT_CONTENT_PATCH_IS_LOADING', () => {
    expect(reducers.homeBannerContentPatchIsLoading(false, { type: 'HOME_BANNER_CONTENT_PATCH_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer HOME_BANNER_CONTENT_PATCH_SUCCESS', () => {
    expect(reducers.homeBannerContentPatchSuccess(true, { type: 'HOME_BANNER_CONTENT_PATCH_SUCCESS', success: false })).toBe(false);
  });
});
