import breakpoints from './variables';

describe('breakpoints', () => {
  it('returns values for valid breakpoints', () => {
    expect(breakpoints.screenSmMinNum).toBeDefined();
    expect(breakpoints['screen-sm-min']).toBe(`${breakpoints.screenSmMinNum}px`);

    expect(breakpoints.screenXsMaxNum).toBeDefined();
    expect(breakpoints['screen-xs-max']).toBe(`${breakpoints.screenXsMaxNum}px`);

    expect(breakpoints.screenMdMinNum).toBeDefined();
    expect(breakpoints['screen-md-min']).toBe(`${breakpoints.screenMdMinNum}px`);

    expect(breakpoints.screenSmMaxNum).toBeDefined();
    expect(breakpoints['screen-sm-max']).toBe(`${breakpoints.screenSmMaxNum}px`);

    expect(breakpoints.screenLgMinNum).toBeDefined();
    expect(breakpoints['screen-lg-min']).toBe(`${breakpoints.screenLgMinNum}px`);

    expect(breakpoints.screenMdMaxNum).toBeDefined();
    expect(breakpoints['screen-md-max']).toBe(`${breakpoints.screenMdMaxNum}px`);

    expect(breakpoints.fakeBreakpoint).toBeUndefined();
  });
});
