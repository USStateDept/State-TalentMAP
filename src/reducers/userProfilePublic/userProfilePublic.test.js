import * as reducers from './userProfilePublic';

describe('reducers', () => {
  it('can set reducer USER_PROFILE_PUBLIC_HAS_ERRORED', () => {
    expect(reducers.userProfilePublicHasErrored(false, { type: 'USER_PROFILE_PUBLIC_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer USER_PROFILE_PUBLIC_IS_LOADING', () => {
    expect(reducers.userProfilePublicIsLoading(false, { type: 'USER_PROFILE_PUBLIC_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer USER_PROFILE_PUBLIC_FETCH_DATA_SUCCESS', () => {
    expect(reducers.userProfilePublic({}, { type: 'USER_PROFILE_PUBLIC_FETCH_DATA_SUCCESS', userProfile: true })).toBe(true);
  });
});
