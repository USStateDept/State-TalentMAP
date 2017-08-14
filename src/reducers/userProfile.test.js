import * as reducers from './userProfile';

describe('reducers', () => {
  it('can set reducer USER_PROFILE_HAS_ERRORED', () => {
    expect(reducers.userProfileHasErrored(false, { type: 'USER_PROFILE_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer USER_PROFILE_IS_LOADING', () => {
    expect(reducers.userProfileIsLoading(false, { type: 'USER_PROFILE_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer USER_PROFILE_FETCH_DATA_SUCCESS', () => {
    expect(reducers.userProfile([], { type: 'USER_PROFILE_FETCH_DATA_SUCCESS', userProfile: true })).toBe(true);
  });
});
