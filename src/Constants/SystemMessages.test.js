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
      'NO_POSITION_POC',
      'NO_POSITION_WEB_SITE',
      'GENERAL_SAVED_SEARCH_ERROR',
      'DELETE_BID_ITEM_SUCCESS',
      'DELETE_BID_ITEM_ERROR',
      'ADD_BID_ITEM_SUCCESS',
      'ADD_BID_ITEM_ERROR',
      'SUBMIT_BID_SUCCESS',
      'SUBMIT_BID_ERROR',
      'UPDATED_SAVED_SEARCH_SUCCESS',
      'NEW_SAVED_SEARCH_SUCCESS',
    ];
    expectedMessages.forEach((msg) => {
      expect(SystemMessages[msg]).toBeDefined();
    });
  });
});
