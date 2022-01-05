import * as reducers from './userRoles';

describe('reducers', () => {
  it('can set reducer USERS_HAS_ERRORED', () => {
    expect(reducers.usersHasErrored(false, { type: 'USERS_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer USERS_IS_LOADING', () => {
    expect(reducers.usersIsLoading(false, { type: 'USERS_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer USERS_SUCCESS', () => {
    expect(reducers.usersSuccess(false, { type: 'USERS_SUCCESS', results: true })).toBe(true);
  });

  it('can set reducer MODIFY_PERMISSION_HAS_ERRORED', () => {
    expect(reducers.modifyPermissionHasErrored(false, { type: 'MODIFY_PERMISSION_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer MODIFY_PERMISSION_IS_LOADING', () => {
    expect(reducers.modifyPermissionIsLoading(false, { type: 'MODIFY_PERMISSION_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer MODIFY_PERMISSION_SUCCESS', () => {
    expect(reducers.modifyPermissionSuccess(false, { type: 'MODIFY_PERMISSION_SUCCESS', results: true })).toBe(true);
  });

  it('can set reducer GET_TABLE_STATS_HAS_ERRORED', () => {
    expect(reducers.getTableStatsHasErrored(false, { type: 'GET_TABLE_STATS_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer GET_TABLE_STATS_IS_LOADING', () => {
    expect(reducers.getTableStatsIsLoading(false, { type: 'GET_TABLE_STATS_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer GET_TABLE_STATS_SUCCESS', () => {
    expect(reducers.getTableStatsSuccess(false, { type: 'GET_TABLE_STATS_SUCCESS', results: true })).toBe(true);
  });
});
