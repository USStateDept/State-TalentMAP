import BID_COUNT_DEFINITIONS from './BidCountDefinitions';

describe('BidCountDefinitions', () => {
  it('should return a value for valid bid count property', () => {
    expect(BID_COUNT_DEFINITIONS.totalBids.title).toBeDefined();
    expect(BID_COUNT_DEFINITIONS.inGradeBids.title).toBeDefined();
    expect(BID_COUNT_DEFINITIONS.atSkillBids.title).toBeDefined();
    expect(BID_COUNT_DEFINITIONS.inGradeAtSkillBids.title).toBeDefined();

    expect(BID_COUNT_DEFINITIONS.totalBids.definition).toBeDefined();
    expect(BID_COUNT_DEFINITIONS.inGradeBids.definition).toBeDefined();
    expect(BID_COUNT_DEFINITIONS.atSkillBids.definition).toBeDefined();
    expect(BID_COUNT_DEFINITIONS.inGradeAtSkillBids.definition).toBeDefined();
  });
});
