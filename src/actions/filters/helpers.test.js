import {
  getFilterCustomDescription,
  getPillDescription,
  getPostOrMissionDescription,
  doesCodeOrIdMatch,
  isBooleanFilter,
} from './helpers';

describe('filter helpers', () => {
  it('can return correct values for the getFilterCustomDescription function', () => {
    // templated strings are returned based on the description value
    expect(getFilterCustomDescription(
      { item: { description: 'region' } }, { short_description: 't', long_description: 'test' }),
    ).toBe('test (t)');
    expect(getFilterCustomDescription(
      { item: { description: 'skill' } }, { description: 'test', code: 't' }),
    ).toBe('test (t)');
    expect(getFilterCustomDescription(
      { item: { description: 'post' } }, { location: 'Paris' }),
    ).toBe('Paris');
    // but unmapped descriptions will return false
    expect(getFilterCustomDescription(
      { item: { description: 'invalid' } }, { location: 'Paris' }),
    ).toBe(false);
  });

  it('can return correct values for the getPillDescription function', () => {
    // all valid properties should return their own value
    expect(getPillDescription({ short_description: 'test' })).toBe('test');
    expect(getPillDescription({ description: 'test' })).toBe('test');
    expect(getPillDescription({ long_description: 'test' })).toBe('test');
    expect(getPillDescription({ code: 'test' })).toBe('test');
    // otherwise, return an empty string
    expect(getPillDescription({ invalid: 'test' })).toBe('');
  });

  it('can return correct values for the getPostOrMissionDescription function', () => {
    // all valid properties should return a templated value
    expect(getPostOrMissionDescription({ type: 'post', location: 'Paris', short_name: 'PAR' })).toBe('Paris (Post)');
    // but unmapped descriptions will return false
    expect(getPostOrMissionDescription({ type: 'invalid', location: 'Paris', short_name: 'PAR' })).toBe(false);
  });

  it('can return correct values for the doesCodeOrIdMatch function', () => {
    expect(doesCodeOrIdMatch({ item: { selectionRef: 'post' } }, { code: 'code' }, { codeRef: 'code', selectionRef: 'post' })).toBe(true);
    expect(doesCodeOrIdMatch({ item: { selectionRef: 'post' } }, { id: 'code' }, { codeRef: 'code', selectionRef: 'post' })).toBe(true);
    expect(doesCodeOrIdMatch({ item: { selectionRef: 'post' } }, { id: 'code2' }, { codeRef: 'code', selectionRef: 'post' })).toBe(false);
  });

  it('can return correct values for the isBooleanFilter function', () => {
    // all valid properties should return true
    expect(isBooleanFilter('COLA')).toBe(true);
    expect(isBooleanFilter('domestic')).toBe(true);
    expect(isBooleanFilter('available')).toBe(true);
    expect(isBooleanFilter('invalud')).toBe(false);
  });
});
