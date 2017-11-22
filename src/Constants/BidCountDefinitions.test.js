import BID_COUNT_DEFINITIONS from './BidCountDefinitions';

describe('BidCountDefinitions', () => {
  it('should return a value for valid bid count property', () => {
    expect(BID_COUNT_DEFINITIONS.totalBids).toBeDefined();
    expect(BID_COUNT_DEFINITIONS.inGradeBids).toBeDefined();
    expect(BID_COUNT_DEFINITIONS.atSkillBids).toBeDefined();
    expect(BID_COUNT_DEFINITIONS.inGradeAtSkillBids).toBeDefined();
  });
});
