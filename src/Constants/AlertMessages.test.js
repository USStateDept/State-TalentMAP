import * as AlertMessages from './AlertMessages';

describe('AlertMessages', () => {
  it('Should return NO_LANGUAGES', () => {
    expect(AlertMessages.NO_LANGUAGES).toBeDefined();
  });

  it('Should return NO_POST', () => {
    expect(AlertMessages.NO_POST).toBeDefined();
  });

  it('Should return NO_POST_DIFFERENTIAL', () => {
    expect(AlertMessages.NO_POST_DIFFERENTIAL).toBeDefined();
  });

  it('Should return NO_DANGER_PAY', () => {
    expect(AlertMessages.NO_DANGER_PAY).toBeDefined();
  });

  it('Should return NO_COLA', () => {
    expect(AlertMessages.NO_COLA).toBeDefined();
  });

  it('Should return NO_TOUR_OF_DUTY', () => {
    expect(AlertMessages.NO_TOUR_OF_DUTY).toBeDefined();
  });
});
