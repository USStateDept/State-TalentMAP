import * as PropTypes from './PropTypes';

describe('AlertMessages', () => {
  it('Should return LANGUAGES', () => {
    expect(PropTypes.LANGUAGES).toBeDefined();
  });

  it('Should return POST_MISSION_DATA', () => {
    expect(PropTypes.POST_MISSION_DATA).toBeDefined();
  });

  it('Should return DETAILS', () => {
    expect(PropTypes.DETAILS).toBeDefined();
  });

  it('Should return RESULTS', () => {
    expect(PropTypes.RESULTS).toBeDefined();
  });

  it('Should return FILTERS', () => {
    expect(PropTypes.FILTERS).toBeDefined();
  });
});
