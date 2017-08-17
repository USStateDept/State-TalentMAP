import * as SystemMessages from './SystemMessages';

describe('SystemMessages', () => {
  it('Should return NO_LANGUAGES', () => {
    expect(SystemMessages.NO_LANGUAGES).toBeDefined();
  });

  it('Should return NO_POST', () => {
    expect(SystemMessages.NO_POST).toBeDefined();
  });

  it('Should return NO_POST_DIFFERENTIAL', () => {
    expect(SystemMessages.NO_POST_DIFFERENTIAL).toBeDefined();
  });

  it('Should return NO_DANGER_PAY', () => {
    expect(SystemMessages.NO_DANGER_PAY).toBeDefined();
  });

  it('Should return NO_COLA', () => {
    expect(SystemMessages.NO_COLA).toBeDefined();
  });

  it('Should return NO_TOUR_OF_DUTY', () => {
    expect(SystemMessages.NO_TOUR_OF_DUTY).toBeDefined();
  });
});
