import * as SystemMessages from './SystemMessages';

describe('SystemMessages', () => {
  it('should have all expected messages defined', () => {
    const expectedMessages = [
      'NO_LANGUAGES',
      'NO_POST',
      'NO_POST_DIFFERENTIAL',
      'NO_DANGER_PAY',
      'NO_COLA',
      'NO_TOUR_OF_DUTY',
      'NO_BUREAU',
      'NO_ORG',
    ];
    expectedMessages.forEach((msg) => {
      expect(SystemMessages[msg]).toBeDefined();
    });
  });
});
