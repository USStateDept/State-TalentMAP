import * as reducers from './userProfile';

describe('reducers', () => {
  it('can set reducer USER_PROFILE_HAS_ERRORED', () => {
    expect(reducers.userProfileHasErrored(false, { type: 'USER_PROFILE_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer USER_PROFILE_IS_LOADING', () => {
    expect(reducers.userProfileIsLoading(false, { type: 'USER_PROFILE_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can spread new props on the reducer USER_PROFILE_FETCH_DATA_SUCCESS', () => {
    const original = { a: 1, b: 2 };
    const updated = { a: 'one', c: 'two' };
    const expected = { ...original, ...updated };
    expect(reducers.userProfile(original, { type: 'USER_PROFILE_FETCH_DATA_SUCCESS', userProfile: updated })).toEqual(expected);
  });

  it('can set reducer USER_PROFILE_FAVORITE_POSITION_HAS_ERRORED', () => {
    expect(reducers.userProfileFavoritePositionHasErrored(new Set(), { type: 'USER_PROFILE_FAVORITE_POSITION_HAS_ERRORED', userProfileFavoritePositionHasErrored: true })).toBe(true);
  });

  it('can set reducer USER_PROFILE_FAVORITE_POSITION_IS_LOADING to add an id', () => {
    expect(reducers.userProfileFavoritePositionIsLoading(new Set(), { type: 'USER_PROFILE_FAVORITE_POSITION_IS_LOADING', userProfileFavoritePositionIsLoading: { bool: true, id: 1 } })).toEqual(new Set([1]));
  });

  it('can set reducer USER_PROFILE_FAVORITE_POSITION_IS_LOADING to remove an id', () => {
    expect(reducers.userProfileFavoritePositionIsLoading(new Set([1]), { type: 'USER_PROFILE_FAVORITE_POSITION_IS_LOADING', userProfileFavoritePositionIsLoading: { bool: false, id: 1 } })).toEqual(new Set());
  });
});
