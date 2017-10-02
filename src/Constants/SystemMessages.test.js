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
      'NO_REST_RELAXATION',
      'NO_LAST_UPDATED_DATE',
      'NO_POSITION_TITLE',
      'NO_SKILL',
      'NO_GRADE',
      'NO_POSITION_DESCRIPTION',
    ];
    expectedMessages.forEach((msg) => {
      expect(SystemMessages[msg]).toBeDefined();
    });
  });
});
