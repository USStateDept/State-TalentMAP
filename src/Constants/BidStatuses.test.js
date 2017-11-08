import { getStatusClass, APPROVED } from './BidStatuses';

describe('BidStatuses', () => {
  it('should return a class_name with getStatusClass function', () => {
    expect(getStatusClass(APPROVED.property)).toBe(APPROVED.class_name);
    expect(getStatusClass('fake class')).toBe('');
  });
});
