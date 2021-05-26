import { APPROVED, getStatusProperty } from './BidStatuses';

describe('BidStatuses', () => {
  it('should return a class_name with getStatusProperty function', () => {
    expect(getStatusProperty(APPROVED.property)).toBe(APPROVED.class_name);
    expect(getStatusProperty('fake class')).toBe('');
  });
});
