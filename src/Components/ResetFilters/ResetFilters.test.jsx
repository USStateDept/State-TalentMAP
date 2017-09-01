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
    wrapper.find('span').simulate('click');
  });

  it('can call resetFilters function', () => {
    const propSpy = sinon.spy();
    const wrapper = shallow(<ResetFilters resetFilters={propSpy} />);
    // define the instance
    const instance = wrapper.instance();
    // spy the onQueryParamUpdate function
    const handleUpdateSpy = sinon.spy(instance, 'resetFilters');
    wrapper.find('span').simulate('click');
    sinon.assert.calledOnce(handleUpdateSpy);
    wrapper.find('span').simulate('click');
    sinon.assert.calledOnce(propSpy);
  });
});
