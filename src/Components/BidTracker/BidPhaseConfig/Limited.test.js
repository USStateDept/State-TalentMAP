import bidClassesFromCurrentStatus from './Limited';

// Test that the result of each status prop is defined
describe('Limited BidPhase config', () => {
  it('is defined', () => {
    const result = bidClassesFromCurrentStatus();
    expect(result).toBeDefined();
  });
});
