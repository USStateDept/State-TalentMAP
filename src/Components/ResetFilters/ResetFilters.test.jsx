import { shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import sinon from 'sinon';
import ResetFilters from './ResetFilters';

describe('ResetFilters', () => {
  let resetButton = null;

  beforeEach(() => {
    resetButton = TestUtils.renderIntoDocument(<ResetFilters resetFilters={() => {}} />);
  });

  it('is defined', () => {
    expect(resetButton).toBeDefined();
  });


  it('can call resetFilters function', () => {
    const propSpy = sinon.spy();
    const wrapper = shallow(<ResetFilters resetFilters={propSpy} />);
    // define the instance
    const instance = wrapper.instance();
    // spy the onQueryParamUpdate function
    const handleUpdateSpy = sinon.spy(instance, 'resetFilters');
    instance.resetFilters();
    // the instance resetFilters should be called once
    sinon.assert.calledOnce(handleUpdateSpy);
    // The prop resetFilters should be called once
    sinon.assert.calledOnce(propSpy);
  });
});
