import * as reducers from './logs';

describe('logs reducers', () => {
  it('can set reducer LOGS_HAS_ERRORED', () => {
    expect(reducers.logsHasErrored(false, { type: 'LOGS_HAS_ERRORED', hasErrored: false })).toBe(false);
  });

  it('can set reducer LOGS_IS_LOADING', () => {
    expect(reducers.logsIsLoading(false, { type: 'LOGS_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer LOGS_SUCCESS', () => {
    expect(reducers.logsSuccess('', { type: 'LOGS_SUCCESS', success: 'a' })).toBe('a');
  });


  it('can set reducer LOGS_LIST_HAS_ERRORED', () => {
    expect(reducers.logsListHasErrored(false, { type: 'LOGS_LIST_HAS_ERRORED', hasErrored: false })).toBe(false);
  });

  it('can set reducer LOGS_LIST_IS_LOADING', () => {
    expect(reducers.logsListIsLoading(false, { type: 'LOGS_LIST_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer LOGS_LIST_SUCCESS', () => {
    expect(reducers.logsListSuccess([], { type: 'LOGS_LIST_SUCCESS', success: ['a'] })).toEqual(['a']);
  });


  it('can set reducer LOG_HAS_ERRORED', () => {
    expect(reducers.logHasErrored(false, { type: 'LOG_HAS_ERRORED', hasErrored: false })).toBe(false);
  });

  it('can set reducer LOG_IS_LOADING', () => {
    expect(reducers.logIsLoading(false, { type: 'LOG_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer LOG_SUCCESS', () => {
    expect(reducers.logSuccess([], { type: 'LOG_SUCCESS', success: ['a'] })).toEqual(['a']);
  });


  it('can set reducer LOG_TO_DOWNLOAD_HAS_ERRORED', () => {
    expect(reducers.logToDownloadHasErrored(false, { type: 'LOG_TO_DOWNLOAD_HAS_ERRORED', hasErrored: false })).toBe(false);
  });

  it('can set reducer LOG_TO_DOWNLOAD_IS_LOADING', () => {
    expect(reducers.logToDownloadIsLoading(false, { type: 'LOG_TO_DOWNLOAD_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer LOG_TO_DOWNLOAD_SUCCESS', () => {
    expect(reducers.logToDownloadSuccess('', { type: 'LOG_TO_DOWNLOAD_SUCCESS', success: 'a' })).toBe('a');
  });
});
