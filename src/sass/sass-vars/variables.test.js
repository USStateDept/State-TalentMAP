import variables from './variables';

describe('breakpoints', () => {
  it('returns values for valid variables', () => {
    expect(variables.screenSmMinNum).toBeDefined();
    expect(variables['screen-sm-min']).toBe(`${variables.screenSmMinNum}px`);

    expect(variables.screenXsMaxNum).toBeDefined();
    expect(variables['screen-xs-max']).toBe(`${variables.screenXsMaxNum}px`);

    expect(variables.screenMdMinNum).toBeDefined();
    expect(variables['screen-md-min']).toBe(`${variables.screenMdMinNum}px`);

    expect(variables.screenSmMaxNum).toBeDefined();
    expect(variables['screen-sm-max']).toBe(`${variables.screenSmMaxNum}px`);

    expect(variables.screenLgMinNum).toBeDefined();
    expect(variables['screen-lg-min']).toBe(`${variables.screenLgMinNum}px`);

    expect(variables.screenMdMaxNum).toBeDefined();
    expect(variables['screen-md-max']).toBe(`${variables.screenMdMaxNum}px`);

    expect(variables.fakeBreakpoint).toBeUndefined();
  });
});

describe('asset-path', () => {
  // We'll just check that it's defined so that different testing environments
  // don't yield different results, since this variable relies on process.env.PUBLIC_URL.
  it('is defined', () => {
    expect(variables['asset-path']).toBeDefined();
  });

  it('is defined when process.env.PUBLIC_URL exists', () => {
    process.env.PUBLIC_URL = 'test';
    expect(variables['asset-path']).toBe('"test"');
  });
});
