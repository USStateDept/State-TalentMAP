import { shallow } from 'enzyme';
import React from 'react';
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

  it('can click on the button', () => {
    const wrapper = shallow(<ResetFilters resetFilters={() => {}} />);
    wrapper.find('InteractiveElement').simulate('click');
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
    instance.resetFilters();
    // The prop resetFilters should be called once, since it doesn't get called until the
    // instance's resetFilters function is called twice.
    sinon.assert.calledOnce(propSpy);
  });
});
