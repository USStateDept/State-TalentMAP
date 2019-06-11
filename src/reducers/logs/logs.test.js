import * as reducers from './logs';

describe('logs reducers', () => {
  it('can set reducer LOGS_HAS_ERRORED', () => {
    expect(reducers.logsHasErrored(false, { type: 'LOGS_HAS_ERRORED', hasErrored: false })).toBe(false);
  });

  it('can set reducer LOGS_IS_LOADING', () => {
    expect(reducers.logsIsLoading(false, { type: 'LOGS_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer LOGS_SUCCESS', () => {
    expect(reducers.logsSuccess(false, { type: 'LOGS_SUCCESS', success: true })).toBe(true);
  });
});
