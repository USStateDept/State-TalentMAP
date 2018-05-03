import sinon from 'sinon';
import * as PropTypes from './PropTypes';

describe('PropTypes', () => {
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

  it('can call PREVENT_DEFAULT', () => {
    const mock = { fn: PropTypes.PREVENT_DEFAULT };
    const spy = sinon.spy(mock, 'fn');
    mock.fn({ preventDefault: () => {} });
    sinon.assert.calledOnce(spy);
  });
});
