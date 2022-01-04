import * as reducers from './feedback';

describe('reducers', () => {
  it('can set reducer FEEDBACK_HAS_ERRORED', () => {
    const result = reducers.feedbackHasErrored(false, { type: 'FEEDBACK_HAS_ERRORED', hasErrored: 'error message' });
    expect(result.hasErrored).toBe(true);
    expect(result.message).toBe('error message');
  });

  it('can set reducer FEEDBACK_IS_SENDING', () => {
    expect(reducers.feedbackIsSending(false, { type: 'FEEDBACK_IS_SENDING', isLoading: true })).toBe(true);
  });

  it('can set reducer FEEDBACK_SUCCESS', () => {
    expect(reducers.feedbackSuccess([], { type: 'FEEDBACK_SUCCESS', isSuccess: true })).toBe(true);
  });
});
