import * as reducers from './share';

describe('reducers', () => {
  it('can set reducer SHARE_HAS_ERRORED', () => {
    expect(reducers.shareHasErrored(false, { type: 'SHARE_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer SHARE_IS_SENDING', () => {
    expect(reducers.shareIsSending(false, { type: 'SHARE_IS_SENDING', isLoading: true })).toBe(true);
  });

  it('can set reducer SHARE_SUCCESS', () => {
    expect(reducers.share([], { type: 'SHARE_SUCCESS', results: true })).toBe(true);
  });
});
