import { shallow } from 'enzyme';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import CompareCheck from './CompareCheck';
import COMPARE_LIMIT from '../../Constants/Compare';

describe('CompareCheck', () => {
  let compareCheck = null;

  beforeEach(() => {
    compareCheck = TestUtils.renderIntoDocument(<CompareCheck refKey="0036" type="compare" />);
  });

  it('is defined', () => {
    expect(compareCheck).toBeDefined();
  });

  it('can accept different kinds of props', () => {
    const wrapper = shallow(
      <CompareCheck refKey="0037" type="compare" />,
     );
    expect(wrapper).toBeDefined();
    const compareCheckOther = shallow(
      <CompareCheck refKey="0037" type="other" />,
     );
    expect(compareCheckOther).toBeDefined();
  });

  it('can add a compareCheck', () => {
    const wrapper = shallow(<CompareCheck refKey="0036" />);
    wrapper.find('InteractiveElement').simulate('click');
    expect(wrapper.instance().state.saved).toBe(true);
  });

  it('can add and remove a compareCheck', () => {
    const wrapper = shallow(<CompareCheck refKey="0037" />);
    wrapper.find('InteractiveElement').simulate('click');
    expect(wrapper.instance().state.saved).toBe(true);
    wrapper.find('InteractiveElement').simulate('click');
    expect(wrapper.instance().state.saved).toBe(false);
  });

  it('handles disabling when count is reached', () => {
    const wrapper = shallow(<CompareCheck refKey="0038" />);
    wrapper.instance().state.count = COMPARE_LIMIT + 1; // greater than default limit.
    wrapper.find('InteractiveElement').simulate('click');
    expect(wrapper.instance().state.saved).toBe(false); // should not be able to add another compare
  });

  it('handles disabling when count is reached and saved state is true', () => {
    const wrapper = shallow(<CompareCheck refKey="0038" />);
    wrapper.instance().state.count = COMPARE_LIMIT + 1; // greater than default limit
    wrapper.instance().state.saved = true;
    wrapper.find('InteractiveElement').simulate('click');
    expect(wrapper.instance().state.saved).toBe(false);
  });
});
