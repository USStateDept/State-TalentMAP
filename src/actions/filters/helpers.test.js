import {
  getCustomGradeDescription,
  getFilterCustomDescription,
  getPillDescription,
  getPostOrMissionDescription,
  doesCodeOrIdMatch,
  isBooleanFilter,
} from './helpers';

describe('filter helpers', () => {
  it('can return custom grade descriptions', () => {
    expect(getCustomGradeDescription('CM')).toBe('CM Career Minister (FE-CM)');
    expect(getCustomGradeDescription('MC')).toBe('MC Minister-Counselor (FE-MC)');
    expect(getCustomGradeDescription('OC')).toBe('OC Counselor (FE-OC)');
    expect(getCustomGradeDescription('OM')).toBe('Office Manager (OM)');
    expect(getCustomGradeDescription('06')).toBe('06');
  });

  it('can return correct values for the getFilterCustomDescription function', () => {
    // templated strings are returned based on the description value
    expect(getFilterCustomDescription(
      { item: { description: 'region' } }, { short_description: 't', long_description: 'test' }),
    ).toBe('(t) test');
    expect(getFilterCustomDescription(
      { item: { description: 'skill' } }, { description: 'test', code: 't' }),
    ).toBe('test (t)');
    expect(getFilterCustomDescription(
      { item: { description: 'post' } }, { location: { city: 'Paris', country: 'France' } }),
    ).toBe('Paris, France');
    expect(getFilterCustomDescription(
      { item: { description: 'bidCycle' } }, { name: 'test' }),
    ).toBe('test');
    expect(getFilterCustomDescription(
      { item: { description: 'language' } }, { formal_description: 'test', code: '1' }),
    ).toBe('test (1)');
    ['postDiff', 'dangerPay', 'functionalRegion'].forEach((f) => {
      expect(getFilterCustomDescription(
        { item: { description: f } }, { description: 'test' }),
      ).toBe('test');
    });
    // but unmapped descriptions will return false
    expect(getFilterCustomDescription(
      { item: { description: 'invalid' } }, { location: { city: 'Paris', country: 'France' } }),
    ).toBe(false);
  });

  it('can return correct values for the getPillDescription function', () => {
    // all valid properties should return their own value
    expect(getPillDescription({ description: 'test' }, 'dangerPay')).toBe('Danger pay: test');
    expect(getPillDescription({ description: 'test' }, 'postDiff')).toBe('Post differential: test');
    expect(getPillDescription({ custom_description: 'test' }, 'language')).toBe('test');
    expect(getPillDescription({ short_description: 'test' })).toBe('test');
    expect(getPillDescription({ description: 'test' })).toBe('test');
    expect(getPillDescription({ long_description: 'test' })).toBe('test');
    expect(getPillDescription({ code: 'test' })).toBe('test');
    // otherwise, return an empty string
    expect(getPillDescription({ invalid: 'test' })).toBe('');
  });

  it('can return correct values for the getPostOrMissionDescription function', () => {
    // all valid properties should return a templated value
    expect(getPostOrMissionDescription({ type: 'post', location: { city: 'Paris', country: 'France' }, short_name: 'PAR' })).toBe('Paris, France (Post)');
    // but unmapped descriptions will return false
    expect(getPostOrMissionDescription({ type: 'invalid', location: { city: 'Paris', country: 'France' }, short_name: 'PAR' })).toBe(false);
  });

  it('can return correct values for the doesCodeOrIdMatch function', () => {
    expect(doesCodeOrIdMatch({ item: { selectionRef: 'post' } }, { code: 'code' }, { codeRef: 'code', selectionRef: 'post' })).toBe(true);
    expect(doesCodeOrIdMatch({ item: { selectionRef: 'post' } }, { id: 'code' }, { codeRef: 'code', selectionRef: 'post' })).toBe(true);
    expect(doesCodeOrIdMatch({ item: { selectionRef: 'post' } }, { id: 'code2' }, { codeRef: 'code', selectionRef: 'post' })).toBe(false);
  });

  it('can return correct values for the isBooleanFilter function', () => {
    // all valid properties should return true
    expect(isBooleanFilter('COLA')).toBe(true);
    expect(isBooleanFilter('available')).toBe(true);
    expect(isBooleanFilter('invalud')).toBe(false);
  });
});
