import BID_COUNT_DEFINITIONS from './BidCountDefinitions';

describe('BidCountDefinitions', () => {
  it('should return a value for valid bid count property', () => {
    expect(BID_COUNT_DEFINITIONS.totalBids.title).toBeDefined();
    expect(BID_COUNT_DEFINITIONS.atGradeBids.title).toBeDefined();
    expect(BID_COUNT_DEFINITIONS.inSkillBids.title).toBeDefined();
    expect(BID_COUNT_DEFINITIONS.atGradeInSkillBids.title).toBeDefined();

    expect(BID_COUNT_DEFINITIONS.totalBids.definition).toBeDefined();
    expect(BID_COUNT_DEFINITIONS.atGradeBids.definition).toBeDefined();
    expect(BID_COUNT_DEFINITIONS.inSkillBids.definition).toBeDefined();
    expect(BID_COUNT_DEFINITIONS.atGradeInSkillBids.definition).toBeDefined();
  });
});
