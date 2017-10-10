import sinon from 'sinon';
import * as PropTypes from './PropTypes';

describe('SystemMessages', () => {
  it('Should return LANGUAGES', () => {
    expect(PropTypes.LANGUAGES).toBeDefined();
  });

  it('Should return POST_MISSION_DATA', () => {
    expect(PropTypes.POST_MISSION_DATA).toBeDefined();
  });

  it('Should return POSITION_DETAILS', () => {
    expect(PropTypes.POSITION_DETAILS).toBeDefined();
  });

  it('Should return POSITION_SEARCH_RESULTS', () => {
    expect(PropTypes.POSITION_SEARCH_RESULTS).toBeDefined();
  });

  it('Should return FILTERS', () => {
    expect(PropTypes.FILTERS).toBeDefined();
  });

  it('Should return USER_PROFILE', () => {
    expect(PropTypes.USER_PROFILE).toBeDefined();
  });
});

describe('PREVENT_DEFAULT', () => {
  it('Should return PREVENT_DEFAULT', () => {
    expect(PropTypes.PREVENT_DEFAULT).toBeDefined();
  });

  it('should handle a function call', () => {
    const e = { preventDefault: sinon.spy() };
    PropTypes.PREVENT_DEFAULT(e);
    expect(e.preventDefault.calledOnce).toBe(true);
  });
});
