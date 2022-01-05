import * as reducers from './shortListLock';

describe('reducers', () => {
  it('can set reducer SHORT_LIST_LOCK_SUCCESS', () => {
    expect(reducers.shortListLock(false, { type: 'SHORT_LIST_LOCK_SUCCESS', isLocked: true })).toBe(true);
  });

  it('can set reducer SHORT_LIST_LOCK_IS_LOADING', () => {
    expect(reducers.shortListLockIsLoading(false, { type: 'SHORT_LIST_LOCK_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer SHORT_LIST_LOCK_HAS_ERRORED', () => {
    expect(reducers.shortListLockHasErrored('test', { type: 'SHORT_LIST_LOCK_HAS_ERRORED', hasErrored: '' })).toBe('');
  });

  it('can set reducer SHORT_LIST_LOCK_UPDATE_IS_LOADING', () => {
    expect(reducers.shortListLockUpdateIsLoading(false, { type: 'SHORT_LIST_LOCK_UPDATE_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer SHORT_LIST_LOCK_UPDATE_HAS_ERRORED', () => {
    expect(reducers.shortListLockUpdateHasErrored('test', { type: 'SHORT_LIST_LOCK_UPDATE_HAS_ERRORED', hasErrored: '' })).toBe('');
  });
});
