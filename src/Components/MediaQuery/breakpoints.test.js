import breakpoints from './breakpoints';

describe('breakpoints', () => {
  it('returns values for valid breakpoints', () => {
    expect(breakpoints.screenSmMin).toBeDefined();
    expect(breakpoints.screenXsMax).toBeDefined();
    expect(breakpoints.screenMdMin).toBeDefined();
    expect(breakpoints.screenSmMax).toBeDefined();
    expect(breakpoints.screenLgMin).toBeDefined();
    expect(breakpoints.screenMdMax).toBeDefined();
    expect(breakpoints.fakeBreakpoint).toBeUndefined();
  });
});
