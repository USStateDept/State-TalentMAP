import toast from './toast';

describe('reducers', () => {
  it('can set reducer TOAST_NOTIFICATION_SUCCESS', () => {
    expect(toast({}, { type: 'TOAST_NOTIFICATION_SUCCESS', toast: 'message' }).message)
      .toBe('message');
  });
  it('can set reducer TOAST_NOTIFICATION_ERROR', () => {
    expect(toast({}, { type: 'TOAST_NOTIFICATION_ERROR', toast: 'message' }).message)
      .toBe('message');
  });
  it('can set reducer TOAST_NOTIFICATION_WARNING', () => {
    expect(toast({}, { type: 'TOAST_NOTIFICATION_WARNING', toast: 'message' }).message)
      .toBe('message');
  });
});
